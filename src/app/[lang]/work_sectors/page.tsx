import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import {
  buildAlternateLanguages,
  buildMetadata,
  getLocales,
  SITE_URL,
} from "@/utils";
import { Layout } from "@/components";
import { DefaultIntro } from "@/components/Intros/DefaultIntro";
import { ServiceGrid } from "@/components/Grid/ServiceGrid";

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

type Params = { uid: string; lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;

  const client = createClient();
  const page = await client
    .getSingle("work_sectors_listing", { lang })
    .catch(() => notFound());

  const title =
    page.data.meta_title ||
    prismic.asText(page.data.title) ||
    "Work Sectors | Hey Nova";

  return buildMetadata({
    title,
    description: page.data.meta_description,
    canonical: `/${lang}/work_sectors`,
    lang,
    languages: buildAlternateLanguages(
      lang,
      (l) => `/${l}/work_sectors`,
      page.alternate_languages,
    ),
    ogImage: page.data.meta_image?.url,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  const client = createClient();
  const page = await client
    .getSingle("work_sectors_listing", { lang })
    .catch(() => notFound());

  const global = await client.getSingle("global", { lang });
  const menus = await client.getSingle("menus", { lang });
  const locales = await getLocales(page, client);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/${lang}/work_sectors`,
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
      <Layout
        backgroundType="primary"
        locales={locales}
        global={global.data}
        menus={menus.data}
        include_newsletter_sign_up_banner={page.data.include_newsletter_sign_up}
      >
        <DefaultIntro data={page.data} />
        <ServiceGrid lang={lang} />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ lang: lang }}
        />
      </Layout>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client
    .getAllByType("work_sectors_listing", {
      lang: "*",
    })
    .catch(() => notFound());

  return pages.map((page) => {
    return {
      lang: page.lang,
    };
  });
}
