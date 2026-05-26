import type { Metadata } from "next";
import { toOgLocale } from "@/constants/languages";

// Strip any trailing slashes so downstream concatenation (e.g. `${SITE_URL}/sitemap.xml`) stays canonical regardless of how the env var is set.
export const SITE_URL = (
  process.env.SITE_URL || "https://heynova.io"
).replace(/\/+$/, "");

export const DEFAULT_LOCALE = "en-ca";

// Brand asset URLs. The brief recommends self-hosting in /public; using
// Prismic CDN per Kirsten's choice. If we ever need stable, immutable
// URLs (e.g. for AI training corpora that crawl once), download and swap
// these for /public paths.
export const BRAND_IMAGE_URL =
  "https://images.prismic.io/heynova/aXJXCwIvOtkhB09N_Screenshot2026-01-22at12.57.39PM.png";
export const LOGO_URL = BRAND_IMAGE_URL;
export const OG_IMAGE_URL = BRAND_IMAGE_URL;

export const DEFAULT_OG_IMAGE = OG_IMAGE_URL;

// Stable entity identifiers. Every schema block that references the
// organization or founder should use these exact `@id` strings so Google
// stitches them into a single entity node across pages.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const KIRSTEN_ID = `${SITE_URL}/#kirsten-dodd`;

// Kirsten's Person entity, defined once so Organization.founder and the
// /about-us ProfilePage emit identical content under the same `@id`.
export const KIRSTEN_PERSON = {
  "@type": "Person",
  "@id": KIRSTEN_ID,
  name: "Kirsten Dodd",
  jobTitle: "Founder and CEO, Hey Nova",
  description:
    "Founder and CEO of Hey Nova, a women-led digital agency based in Nova Scotia. Kirsten and her team design and build accessible websites and digital products, and help organizations make accessibility stick through audits, implementation support, and training that builds internal capacity.",
  email: "kirsten@heynova.io",
  url: `${SITE_URL}/en-ca/about-us`,
  knowsAbout: [
    "web accessibility",
    "WCAG 2.1 and 2.2",
    "Accessible Canada Act",
    "AODA",
    "UX strategy",
    "inclusive design",
    "accessible web development",
  ],
  sameAs: ["https://www.linkedin.com/in/kirsten-dodd-heynova/"],
  worksFor: { "@id": ORG_ID },
} as const;

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
  lang?: string;
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
  lang,
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
      locale: toOgLocale(lang),
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
