import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { 
  category: string; // Changed from uid to category
  lang: string 
};

export async function generateMetadata({
  params,
}: {
  params: Params; // Removed Promise wrapper
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("insights_categories", params.category, { lang: params.lang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title || prismic.asText(page.data.title) || "Insights Categories | Hey Nova",
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

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("insights_categories", params.category, { lang: params.lang })
    .catch(() => notFound());

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang: params.lang }} 
    />
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("insights_categories", { lang: "*" });

  return pages.map((page) => ({
    category: page.uid,
    lang: page.lang,
  }));
}