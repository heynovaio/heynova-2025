import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
export const LOCALES = {
  "en-ca": "en-ca",
  "fr-ca": "fr-ca",
} as const;

// Type for locale keys
export type LocaleKey = keyof typeof LOCALES;
export type LocaleValue = (typeof LOCALES)[LocaleKey];

/** Creates a redirect with an auto-detected locale prepended to the URL. */
export function createLocaleRedirect(request: NextRequest): NextResponse {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  const languages = new Negotiator({ headers }).languages();
  const locales = Object.keys(LOCALES) as LocaleKey[];
  const defaultLocale = locales[0];
  const locale = match(languages, locales, defaultLocale);

  // Clone the URL to preserve search params and other properties
  const url = request.nextUrl.clone();
  url.pathname = `/${LOCALES[locale as LocaleKey]}${request.nextUrl.pathname}`;

  return NextResponse.redirect(url);
}

/** Determines if a pathname has a locale as its first segment. */
export function pathnameHasLocale(request: NextRequest): boolean {
  const localeValues = Object.values(LOCALES);
  const regexp = new RegExp(`^/(${localeValues.join("|")})(\/|$)`);

  return regexp.test(request.nextUrl.pathname);
}

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string): LocaleKey | undefined {
  for (const key in LOCALES) {
    if (LOCALES[key as LocaleKey] === locale) {
      return key as LocaleKey;
    }
  }
  return undefined;
}
