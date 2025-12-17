import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { Container, Layout } from "@/components";
import { getLocales } from "@/utils";
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
  const { uid, lang = "en-ca" } = await params;

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

  return {
    title:
      page.data.meta_title ||
      prismic.asText(page.data.title) ||
      "Insight | Hey Nova",
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
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

    return (
      <Layout
        backgroundType="primary"
        locales={locales}
        global={global.data}
        menus={menus.data}
        include_newsletter_sign_up_banner={page.data.include_newsletter_sign_up}
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
          context={{ lang, category }}
        />

        {page.data.authors.length > 0 && (
          <Container>
            <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
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
      const insightCategories = insight.data.categories as Array<{
        category: prismic.FilledContentRelationshipField;
      }>;

      if (insightCategories && insightCategories.length > 0) {
        insightCategories.forEach((categoryItem) => {
          if (categoryItem.category?.uid) {
            params.push({
              uid: insight.uid,
              category: categoryItem.category.uid,
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
