import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

type Params = { uid: string; lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("insights_listing", uid, { lang })
    .catch(() => notFound());

  return {
    title:
      page.data.meta_title ||
      prismic.asText(page.data.title) ||
      "Insights | Hey Nova",
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
  const { uid, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("insights_listing", uid, { lang })
    .catch(() => notFound());
  // const global = await client.getSingle("global", { lang });
  // const menus = await client.getSingle("menus", { lang });
  // const locales = await getLocales(page, client);

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang: "en-ca" }}
    />
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client
    .getAllByType("insights_listing", {
      lang: "*",
    })
    .catch(() => notFound());

  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    };
  });
}
