import { NextRequest, NextResponse } from "next/server";
import { createLocaleRedirect, pathnameHasLocale } from "./i18n";

export function middleware(request: NextRequest): NextResponse {
  // Check if pathname already has a locale
  if (!pathnameHasLocale(request)) {
    return createLocaleRedirect(request);
  }

  // If pathname already has a locale, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|assets|slice-simulator|auth/.*|.*\\..*|_next).*)"],
};
