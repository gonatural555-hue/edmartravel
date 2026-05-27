import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
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
