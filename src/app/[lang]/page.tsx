import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import React from "react";
import { Layout } from "@/components";
import { HomeIntro } from "@/components/Intros/HomeIntro";
import { getLocales } from "@/utils";
import { LOCALES, reverseLocaleLookup } from "@/i18n";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  const prismicLocale = reverseLocaleLookup(lang);

  if (!prismicLocale) {
    console.error("Invalid locale:", lang);
    notFound();
  }

  const client = createClient();
  const page = await client
    .getByUID("page", "home", { lang: prismicLocale })
    .catch((error) => {
      console.error("Error fetching page in generateMetadata:", error);
      console.error("Lang parameter:", lang);
      console.error("Prismic locale:", prismicLocale);
      return notFound();
    });

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
  const prismicLocale = reverseLocaleLookup(lang);

  console.log("Page lang:", lang);
  console.log("Prismic locale:", prismicLocale);

  if (!prismicLocale) {
    console.error("Invalid locale:", lang);
    notFound();
  }

  const client = createClient();

  const page = await client
    .getByUID("page", "home", { lang: prismicLocale })
    .catch((error) => {
      console.error("Error fetching page:", error);
      console.error("Lang parameter:", lang);
      console.error("Prismic locale:", prismicLocale);
      return notFound();
    });

  const global = await client.getSingle("global", { lang: prismicLocale });
  const menus = await client.getSingle("menus", { lang: prismicLocale });
  const locales = await getLocales(page, client);

  return (
    <Layout
      backgroundType="primary"
      locales={locales}
      global={global.data}
      menus={menus.data}
    >
      <HomeIntro data={page.data} />
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ lang }}
      />
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
    // Convert Prismic locale back to URL locale
    const urlLocale = Object.entries(LOCALES).find(
      ([key]) => key === page.lang
    )?.[1];

    return {
      lang: urlLocale || page.lang,
    };
  });
}
