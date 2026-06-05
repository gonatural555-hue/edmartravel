import { locales } from "@/lib/i18n/config";

export function isHomePath(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname === `/${l}/`);
}
