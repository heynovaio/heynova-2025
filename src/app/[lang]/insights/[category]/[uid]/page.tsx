import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";

type Params = {
  uid: string;
  category: string;
  lang?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>; // Make this consistent with Next.js 15
}): Promise<Metadata> {
  const { uid, lang = "en-ca" } = await params; // Await the params

  const client = createClient();
  const page = await client
    .getByUID("insight", uid, { lang })
    .catch(() => notFound());

  return {
    title:
      page.data.meta_title ||
      prismic.asText(page.data.title) ||
      "Canadian Women in Sports",
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
  console.log("Insight page params:", { uid, category, lang });

  const client = createClient();

  try {
    const page = await client.getByUID("insight", uid, { lang });

    // Optional: Verify the insight actually belongs to this category
    const insightCategories = page.data.categories as Array<{
      category: prismic.FilledContentRelationshipField;
    }>;

    const belongsToCategory = insightCategories?.some(
      (cat) => cat.category?.uid === category
    );

    // You can choose to handle this however you want
    if (!belongsToCategory && insightCategories?.length > 0) {
      console.warn(`Insight ${uid} doesn't belong to category ${category}`);
      // Optionally redirect or show different content
    }

    return (
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ lang, category }}
      />
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
    const [insights, allCategories] = await Promise.all([
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
        allCategories
          .filter((cat) => cat.lang === insight.lang)
          .forEach((category) => {
            params.push({
              uid: insight.uid,
              category: category.uid,
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
