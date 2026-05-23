import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";
import { SITE_URL, DEFAULT_LOCALE } from "@/utils/seo";
import { fullLangList } from "@/constants/languages";

type SitemapEntry = MetadataRoute.Sitemap[number];

const LOCALES = Object.keys(fullLangList);

const EXCLUDED_UIDS = new Set(["home", "test-page", "test-service"]);

function url(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function localizedPaths(pathBuilder: (locale: string) => string): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  LOCALES.forEach((locale) => {
    languages[locale] = url(pathBuilder(locale));
  });
  languages["x-default"] = languages[DEFAULT_LOCALE];
  return { canonical: languages[DEFAULT_LOCALE], languages };
}

function entryFor(
  pathBuilder: (locale: string) => string,
  lastModified?: string | Date,
  changeFrequency?: SitemapEntry["changeFrequency"],
  priority?: number,
): SitemapEntry[] {
  const { languages } = localizedPaths(pathBuilder);
  return LOCALES.map((locale) => ({
    url: languages[locale],
    lastModified: lastModified ? new Date(lastModified) : undefined,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const [
    pages,
    services,
    insights,
    insightCategories,
  ] = await Promise.all([
    client.getAllByType("page", { lang: "*" }).catch(() => []),
    client.getAllByType("service", { lang: "*" }).catch(() => []),
    client.getAllByType("insight", { lang: "*" }).catch(() => []),
    client.getAllByType("insights_categories", { lang: "*" }).catch(() => []),
  ]);

  const entries: SitemapEntry[] = [];

  // Static / singleton routes
  entries.push(
    ...entryFor((l) => `/${l}`, new Date(), "weekly", 1),
    ...entryFor((l) => `/${l}/services`, new Date(), "weekly", 0.9),
    ...entryFor((l) => `/${l}/insights`, new Date(), "daily", 0.8),
    ...entryFor((l) => `/${l}/team`, undefined, "monthly", 0.6),
    ...entryFor((l) => `/${l}/contact`, undefined, "yearly", 0.5),
  );

  // Custom pages ([uid])
  const pagesByUid = new Map<string, typeof pages>();
  pages
    .filter((p) => p.uid && !EXCLUDED_UIDS.has(p.uid))
    .forEach((p) => {
      const list = pagesByUid.get(p.uid!) ?? [];
      list.push(p);
      pagesByUid.set(p.uid!, list);
    });
  pagesByUid.forEach((versions) => {
    const languages: Record<string, string> = {};
    versions.forEach((v) => {
      languages[v.lang] = url(`/${v.lang}/${v.uid}`);
    });
    languages["x-default"] = languages[DEFAULT_LOCALE] ?? Object.values(languages)[0];
    versions.forEach((v) => {
      entries.push({
        url: url(`/${v.lang}/${v.uid}`),
        lastModified: new Date(v.last_publication_date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    });
  });

  // Services
  const servicesByUid = new Map<string, typeof services>();
  services
    .filter((s) => s.uid && !EXCLUDED_UIDS.has(s.uid))
    .forEach((s) => {
      const list = servicesByUid.get(s.uid!) ?? [];
      list.push(s);
      servicesByUid.set(s.uid!, list);
    });
  servicesByUid.forEach((versions) => {
    const languages: Record<string, string> = {};
    versions.forEach((v) => {
      languages[v.lang] = url(`/${v.lang}/services/${v.uid}`);
    });
    languages["x-default"] = languages[DEFAULT_LOCALE] ?? Object.values(languages)[0];
    versions.forEach((v) => {
      entries.push({
        url: url(`/${v.lang}/services/${v.uid}`),
        lastModified: new Date(v.last_publication_date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      });
    });
  });

  // Insight categories
  const categoryUidsByLang = new Map<string, Map<string, string>>();
  insightCategories.forEach((c) => {
    if (!c.uid) return;
    const byLang = categoryUidsByLang.get(c.uid) ?? new Map<string, string>();
    byLang.set(c.lang, url(`/${c.lang}/insights/${c.uid}`));
    categoryUidsByLang.set(c.uid, byLang);
  });
  categoryUidsByLang.forEach((byLang, uid) => {
    const languages: Record<string, string> = Object.fromEntries(byLang);
    languages["x-default"] = languages[DEFAULT_LOCALE] ?? Object.values(languages)[0];
    insightCategories
      .filter((c) => c.uid === uid)
      .forEach((c) => {
        entries.push({
          url: url(`/${c.lang}/insights/${c.uid}`),
          lastModified: new Date(c.last_publication_date),
          changeFrequency: "weekly",
          priority: 0.6,
          alternates: { languages },
        });
      });
  });

  // Insights — emit one URL per (category, insight). Insights are stored with a
  // category relationship; sitemap mirrors the router shape.
  insights.forEach((insight) => {
    const categories = (insight.data as { categories?: Array<{ name?: { uid?: string | null } }> }).categories ?? [];
    const categorySlugs = categories
      .map((c) => c?.name?.uid)
      .filter((u): u is string => Boolean(u));

    const slugs = categorySlugs.length > 0 ? categorySlugs : ["other"];

    slugs.forEach((category) => {
      entries.push({
        url: url(`/${insight.lang}/insights/${category}/${insight.uid}`),
        lastModified: new Date(insight.last_publication_date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}
