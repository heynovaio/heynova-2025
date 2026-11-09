import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { fullLangList } from "./constants/languages";

const defaultLocale = "en-ca";
const locales = Object.keys(fullLangList);

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language");
  if (!acceptedLanguage) return defaultLocale;

  try {
    const languages = new Negotiator({
      headers: { "accept-language": acceptedLanguage },
    }).languages();
    return match(languages, locales, defaultLocale);
  } catch (err) {
    console.warn("[middleware] locale resolution failed, using default", err);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Prismic opens previews as `<page>?session=…`. The v5 Prismic toolbar only
  // starts once /api/preview has set the preview cookies and Next.js draft
  // mode, so send those links through it first; it redirects back to `path`.
  const previewSession = request.nextUrl.searchParams.get("session");
  if (previewSession) {
    const pageUrl = request.nextUrl.clone();
    pageUrl.searchParams.delete("session");
    const previewUrl = new URL("/api/preview", request.url);
    previewUrl.searchParams.set("session", previewSession);
    previewUrl.searchParams.set("path", `${pageUrl.pathname}${pageUrl.search}`);
    return NextResponse.redirect(previewUrl);
  }
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Strip any existing locale from the pathname
    const strippedPathname = locales.reduce((path, locale) => {
      if (path.startsWith(`/${locale}/`)) {
        return path.slice(locale.length + 1);
      } else if (path === `/${locale}`) {
        return "/";
      }
      return path;
    }, pathname);

    // Clone request.nextUrl so we keep search params, host, etc.
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${strippedPathname}`;

    return NextResponse.redirect(url);
  }

  // If no locale fix needed, just continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|assets|slice-simulator|auth/.*|.*\\..*|_next|_form).*)"],
};
