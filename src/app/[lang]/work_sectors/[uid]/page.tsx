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
  ORG_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/utils";
import { Layout } from "@/components";
import { DefaultIntro } from "@/components/Intros/DefaultIntro";

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
    .getByUID("work_sector", uid, { lang })
    .catch(() => notFound());

  const title =
    page.data.meta_title ||
    prismic.asText(page.data.title) ||
    "Work Sector | Hey Nova";

  return buildMetadata({
    title,
    description: page.data.meta_description,
    canonical: `/${lang}/work_sectors/${uid}`,
    lang,
    languages: buildAlternateLanguages(
      lang,
      (l, u) => `/${l}/work_sectors/${u}`,
      page.alternate_languages,
      uid,
    ),
    ogImage: page.data.meta_image?.url,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("work_sector", uid, { lang })
    .catch(() => notFound());
  const global = await client.getSingle("global", { lang });
  const menus = await client.getSingle("menus", { lang });
  const locales = await getLocales(page, client);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${lang}/work_sectors/${uid}#work_sector`,
    name: prismic.asText(page.data.title) || "Work Sector",
    description: page.data.meta_description || undefined,
    url: `${SITE_URL}/${lang}/work_sectors/${uid}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Canada" },
    audience: {
      "@type": "Audience",
      audienceType:
        "Nonprofits, government agencies, and purpose-driven businesses",
    },
    isPartOf: { "@id": WEBSITE_ID },
  };

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
        name: "Work Sectors",
        item: `${SITE_URL}/${lang}/work_sectors`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: prismic.asText(page.data.title) || "Work Sector",
        item: `${SITE_URL}/${lang}/work_sectors/${uid}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
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
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ lang: "en-ca" }}
        />
      </Layout>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client
    .getAllByType("work_sector", {
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
