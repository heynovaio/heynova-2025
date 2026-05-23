import type { Metadata } from "next";

export const SITE_URL = process.env.SITE_URL || "https://heynova.io";

export const DEFAULT_LOCALE = "en-ca";

export const DEFAULT_OG_IMAGE = "/icon.png";

type AlternateLanguage = { lang: string; uid?: string | null };

export function buildAlternateLanguages(
  currentLang: string,
  pathTemplate: (langCode: string, uid?: string) => string,
  alternateLanguages: AlternateLanguage[] = [],
  currentUid?: string,
): Record<string, string> {
  const langs: Record<string, string> = {
    [currentLang]: pathTemplate(currentLang, currentUid),
  };

  alternateLanguages.forEach((alt) => {
    if (!alt?.lang) return;
    langs[alt.lang] = pathTemplate(alt.lang, alt.uid ?? undefined);
  });

  langs["x-default"] = langs[DEFAULT_LOCALE] ?? langs[currentLang];

  return langs;
}

type BuildMetadataOpts = {
  title: string;
  description?: string | null;
  canonical: string;
  languages: Record<string, string>;
  ogImage?: string | null;
  ogType?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
};

export function buildMetadata({
  title,
  description,
  canonical,
  languages,
  ogImage,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataOpts): Metadata {
  const image = ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  const desc = description || undefined;

  return {
    title,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName: "Hey Nova",
      images: [{ url: image }],
      type: ogType,
      locale: "en_CA",
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? undefined }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}
