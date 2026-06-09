import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { Layout } from "@/components";

import {
  buildAlternateLanguages,
  buildMetadata,
  getLocales,
  KIRSTEN_PERSON,
  SITE_URL,
} from "@/utils";
import { WorkIntro } from "@/components/Intros/WorkIntro";

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
    .getByUID("work_example", uid, { lang })
    .catch(() => notFound());

  const title =
    page.data.meta_title ||
    prismic.asText(page.data.title) ||
    "Work Example | Hey Nova";

  return buildMetadata({
    title,
    description: page.data.meta_description,
    canonical: `/${lang}/work_examples/${uid}`,
    lang,
    languages: buildAlternateLanguages(
      lang,
      (l, u) => `/${l}/${u}`,
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
    .getByUID("work_example", uid, { lang })
    .catch(() => notFound());
  const global = await client.getSingle("global", { lang });
  const menus = await client.getSingle("menus", { lang });
  const prices = await client.getSingle("prices", { lang });
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
        name: prismic.asText(page.data.title) || uid,
        item: `${SITE_URL}/${lang}/work_examples/${uid}`,
      },
    ],
  };

  // Block 5 — mount ProfilePage + Person on the about-us page. Person `@id`
  // matches the one Organization.founder uses, so Google stitches them as
  // one entity.
  const profileSchema =
    uid === "about-us"
      ? {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: KIRSTEN_PERSON,
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      {profileSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Layout
        backgroundType="primary"
        locales={locales}
        global={global.data}
        menus={menus.data}
        include_newsletter_sign_up_banner={page.data.include_newsletter_sign_up}
      >
        {/* <WorkExampleIntro data={page.data} /> */}
        <WorkIntro data={page.data} lang={lang} uid={uid} />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{
            services: page.data.services,
            sectors: page.data.sectors,
          }}
        />
      </Layout>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client
    .getAllByType("work_example", {
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
