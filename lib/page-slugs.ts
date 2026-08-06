import type { Locale } from "@/lib/i18n/config";

/** Slugs localizados — Nosotros / About */
export const ABOUT_SLUGS: Record<Locale, string> = {
  es: "nosotros",
  en: "about",
};

/** Slugs localizados — Contacto / Contact */
export const CONTACT_SLUGS: Record<Locale, string> = {
  es: "contacto",
  en: "contact",
};

export function buildAboutPathByLocale(): Record<Locale, string> {
  return {
    en: `/en/${ABOUT_SLUGS.en}`,
    es: `/es/${ABOUT_SLUGS.es}`,
  };
}

export function buildContactPathByLocale(): Record<Locale, string> {
  return {
    en: `/en/${CONTACT_SLUGS.en}`,
    es: `/es/${CONTACT_SLUGS.es}`,
  };
}

export function getAboutHref(locale: Locale): string {
  return `/${locale}/${ABOUT_SLUGS[locale]}`;
}

export function getContactHref(locale: Locale): string {
  return `/${locale}/${CONTACT_SLUGS[locale]}`;
}

/** Detecta rutas Nosotros/About para nav editorial y estado activo. */
export function isAboutPath(pathname: string): boolean {
  return /\/(nosotros|about)(\/|$)/.test(pathname);
}

/** Detecta rutas Contacto/Contact para nav editorial y estado activo. */
export function isContactPath(pathname: string): boolean {
  return /\/(contacto|contact)(\/|$)/.test(pathname);
}
