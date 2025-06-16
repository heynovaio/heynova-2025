import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
// import { getLocales } from "@/utils";
import React from "react";
import { Layout } from "@/components/Layout/Layout";
import { HomeIntro } from "@/components/Intros/HomeIntro";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("page", "home", { lang })
    .catch(() => notFound());

  return {
    title:
      page.data.meta_title ||
      prismic.asText(page.data.title) ||
      "Home | Hey Nova",
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
  const { lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("page", "home", { lang })
    .catch(() => notFound());
  const global = await client.getSingle("global", { lang });
  const menus = await client.getSingle("menus", { lang });
  // const locales = await getLocales(page, client);

  return (
    <Layout
      backgroundType="primary"
      locales={[]}
      global={global.data}
      menus={menus.data}
    >
      <div>
        <HomeIntro data={page.data} />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ lang }}
        />
      </div>
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.at("my.page.uid", "home")],
  });

  return pages.map((page) => {
    return {
      lang: page.lang,
    };
  });
}
