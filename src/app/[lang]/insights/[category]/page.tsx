import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { getLocales } from "@/utils";
import { Layout } from "@/components";
import { DefaultIntro } from "@/components/Intros/DefaultIntro";
import { InsightCategoryGrid } from "@/components/Grid/InsightCategoryGrid";
/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

type Params = { category: string; lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("insights_categories", category, { lang })
    .catch(() => notFound());

  return {
    title:
      page.data.meta_title ||
      prismic.asText(page.data.title) ||
      "Insight Category | Hey Nova",
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
  const { category, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("insights_categories", category, { lang })
    .catch(() => notFound());
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
      <DefaultIntro data={page.data} />
      <InsightCategoryGrid lang={lang} categoryId={page.id} />
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ lang: lang }}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const categories = await client
    .getAllByType("insights_categories", { lang: "*" })
    .catch(() => notFound());

  return categories.map((category) => {
    return {
      category: category.uid,
      lang: category.lang,
    };
  });
}
