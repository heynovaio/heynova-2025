import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { Container, Layout } from "@/components";
import { buildAlternateLanguages, buildMetadata, getLocales } from "@/utils";
import { TagsIntro } from "@/components/Intros/TagsIntro";
import Author from "@/components/Author/Author";
import {
  ContentRelationshipField,
  ImageField,
  KeyTextField,
  RichTextField,
  isFilled,
} from "@prismicio/client";

interface AuthorDocumentData {
  name?: KeyTextField;
  job_title?: KeyTextField;
  bio?: RichTextField;
  image?: ImageField;
}

interface InsightAuthorItem {
  author: ContentRelationshipField<"author">;
}

type Params = {
  uid: string;
  category: string;
  lang?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, category, lang = "en-ca" } = await params;

  const client = createClient();
  const page = await client
    .getByUID("insight", uid, {
      lang,
      fetchLinks: [
        "author.name",
        "author.job_title",
        "author.bio",
        "author.image",
      ],
    })
    .catch(() => notFound());

  const title =
    page.data.meta_title ||
    prismic.asText(page.data.title) ||
    "Insight | Hey Nova";

  return buildMetadata({
    title,
    description: page.data.meta_description,
    canonical: `/${lang}/insights/${category}/${uid}`,
    lang,
    languages: buildAlternateLanguages(
      lang,
      (l, u) => `/${l}/insights/${category}/${u}`,
      page.alternate_languages,
      uid,
    ),
    ogImage: page.data.meta_image?.url,
    ogType: "article",
    publishedTime: page.first_publication_date,
    modifiedTime: page.last_publication_date,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, category, lang = "en-ca" } = await params;
  const client = createClient();

  try {
    const page = await client.getByUID("insight", uid, {
      lang,
      fetchLinks: [
        "author.name",
        "author.job_title",
        "author.bio",
        "author.image",
      ],
    });

    const global = await client.getSingle("global", { lang });
    const menus = await client.getSingle("menus", { lang });
    const locales = await getLocales(page, client);

    const authors = (page.data.authors || [])
      .map((item: InsightAuthorItem) => {
        const a = item.author;
        if (!isFilled.contentRelationship(a)) return null;
        const d = a.data as AuthorDocumentData;
        if (!d?.name) return null;
        return {
          "@type": "Person" as const,
          name: d.name,
          ...(d.job_title ? { jobTitle: d.job_title } : {}),
        };
      })
      .filter(Boolean);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: prismic.asText(page.data.title) || "",
      description: page.data.meta_description || "",
      url: `https://heynova.io/${lang}/insights/${category}/${uid}`,
      datePublished: page.first_publication_date,
      dateModified: page.last_publication_date,
      author:
        authors.length > 0
          ? authors
          : {
              "@type": "Organization",
              name: "Hey Nova",
              url: "https://heynova.io",
            },
      publisher: {
        "@type": "Organization",
        name: "Hey Nova",
        url: "https://heynova.io",
        logo: {
          "@type": "ImageObject",
          url: "https://heynova.io/logo.png",
        },
      },
      image: page.data.meta_image?.url || "https://heynova.io/icon.png",
      inLanguage: lang,
      mainEntityOfPage: `https://heynova.io/${lang}/insights/${category}/${uid}`,
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://heynova.io/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Insights",
          item: `https://heynova.io/${lang}/insights`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category,
          item: `https://heynova.io/${lang}/insights/${category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: prismic.asText(page.data.title) || "Article",
          item: `https://heynova.io/${lang}/insights/${category}/${uid}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Layout
          backgroundType="primary"
          locales={locales}
          global={global.data}
          menus={menus.data}
          include_newsletter_sign_up_banner={
            page.data.include_newsletter_sign_up
          }
        >
          <TagsIntro
            data={page.data}
            tags={page.tags}
            content={<PrismicRichText field={page.data.body} />}
            uid={page.uid}
          />

          <SliceZone
            slices={page.data.slices}
            components={components}
            context={{ lang, category, isBlogPage: true }}
          />

          {page.data.authors.length > 0 && (
            <Container>
              <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-center">
                {page.data.authors?.map((item: InsightAuthorItem, index) => {
                  const author = item.author;

                  if (!isFilled.contentRelationship(author)) return null;

                  const data = author.data as AuthorDocumentData;

                  return (
                    <Author
                      key={index}
                      image={data.image}
                      author={data.name}
                      jobTitle={data.job_title}
                    />
                  );
                })}
              </div>
            </Container>
          )}
        </Layout>
      </>
    );
  } catch (error) {
    console.error("Error fetching insight:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  const client = createClient();

  try {
    const [insights, otherCategories] = await Promise.all([
      client.getAllByType("insight", { lang: "*" }),
      client.getAllByType("insights_categories", { lang: "*" }),
    ]);

    const params: Array<{ uid: string; category: string; lang: string }> = [];

    insights.forEach((insight) => {
      const insightCategories = insight.data.categories;

      if (insightCategories && insightCategories.length > 0) {
        insightCategories.forEach((categoryItem) => {
          // Access the category relationship using isFilled
          if (
            isFilled.contentRelationship(categoryItem.name) &&
            categoryItem.name.uid
          ) {
            params.push({
              uid: insight.uid,
              category: categoryItem.name.uid,
              lang: insight.lang,
            });
          }
        });
      } else {
        otherCategories
          .filter((cat) => cat.lang === insight.lang)
          .forEach((category) => {
            params.push({
              uid: insight.uid,
              category: category.uid || "other",
              lang: insight.lang,
            });
          });
      }
    });

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
