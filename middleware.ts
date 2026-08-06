import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isDeprecatedLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { remapDeprecatedLocalePath } from "@/lib/i18n/switch-locale-path";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function pathnameHasDeprecatedLocale(pathname: string): boolean {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ? isDeprecatedLocale(segment) : false;
}

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return locales.includes(segment as Locale)
    ? (segment as Locale)
    : defaultLocale;
}

function nextWithLocale(request: NextRequest, locale: Locale): NextResponse {
  const response = NextResponse.next({ request });
  response.headers.set("x-locale", locale);
  return response;
}

/**
 * Locale routing only — no Supabase/network here (avoids EDGE middleware timeouts on Vercel).
 * Session refresh and /account protection run in Server Components / route handlers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /** Rutas de laboratorio fuera de i18n (app/lab/...) */
  if (pathname === "/lab" || pathname.startsWith("/lab/")) {
    return NextResponse.next();
  }

  /** Redirect legacy FR/IT → equivalente en español (301). */
  if (pathnameHasDeprecatedLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = remapDeprecatedLocalePath(pathname);
    return NextResponse.redirect(url, 301);
  }

  if (!pathnameHasLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === "/"
        ? `/${defaultLocale}`
        : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return nextWithLocale(request, getLocaleFromPathname(pathname));
}

export const config = {
  matcher: [
    /*
     * Document navigations only — exclude API, Next internals, auth callback, and static files.
     */
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|auth/callback|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?|ttf|eot)$).*)",
  ],
};
