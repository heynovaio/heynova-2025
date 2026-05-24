export const fullLangList = {
  "en-ca": "English",
  "fr-ca": "French",
};

export const ogLocaleByLang: Record<string, string> = {
  "en-ca": "en_CA",
  "fr-ca": "fr_CA",
};

export function toOgLocale(lang: string | undefined): string {
  if (!lang) return "en_CA";
  if (ogLocaleByLang[lang]) return ogLocaleByLang[lang];
  // Fallback: best-effort transform ("en-us" → "en_US").
  const [language, region] = lang.split("-");
  return region ? `${language}_${region.toUpperCase()}` : (language ?? "en_CA");
}
