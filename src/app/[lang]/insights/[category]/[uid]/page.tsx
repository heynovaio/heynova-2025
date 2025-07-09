import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { Layout } from "@/components";
import { getLocales } from "@/utils";
import { DefaultIntro } from "@/components/Intros/DefaultIntro";
import { TagsIntro } from "@/components/Intros/TagsIntro";

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
    .getByUID("insight", uid, { lang })
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
    const page = await client.getByUID("insight", uid, { lang });
    const global = await client.getSingle("global", { lang });
    const menus = await client.getSingle("menus", { lang });
    const locales = await getLocales(page, client);

    console.log("Page data:", page);
    return (
      <Layout
        backgroundType="primary"
        locales={locales}
        global={global.data}
        menus={menus.data}
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
    // Get all insights and all categories
    const [insights, otherCategories] = await Promise.all([
      client.getAllByType("insight", { lang: "*" }),
      client.getAllByType("insights_categories", { lang: "*" }),
    ]);

    const params: Array<{ uid: string; category: string; lang: string }> = [];

    insights.forEach((insight) => {
      const insightCategories = insight.data.categories as Array<{
        category: prismic.FilledContentRelationshipField;
      }>;

      // Generate params for each category this insight belongs to
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
        // If insight has no categories, generate for all available categories
        // or use a default category
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

    console.log("Generated static params:", params);
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
