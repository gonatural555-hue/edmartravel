import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";
import { ABOUT_SLUGS, CONTACT_SLUGS } from "@/lib/page-slugs";
import {
  LEGAL_SLUGS,
  LEGAL_SLUG_ALIASES,
  type LegalPageKey,
} from "@/lib/seo";

const LEGAL_KEYS = Object.keys(LEGAL_SLUGS) as LegalPageKey[];

/** Slugs legales FR/IT → clave legal (para redirects legacy). */
const LEGACY_LEGAL_SLUG_TO_KEY: Record<string, LegalPageKey> = {
  "fr/informations-legales": "legal",
  "it/informazioni-legali": "legal",
  "fr/confidentialite": "privacy",
  "it/privacy": "privacy",
  "fr/conditions": "terms",
  "it/termini": "terms",
  "fr/annulations": "cancellations",
  "it/cancellazioni": "cancellations",
  "fr/cookies": "cookies",
  "it/cookies": "cookies",
};

function findLegalKey(locale: Locale, slug: string): LegalPageKey | null {
  for (const key of LEGAL_KEYS) {
    if (LEGAL_SLUGS[key][locale] === slug) return key;
  }
  const aliases = LEGAL_SLUG_ALIASES[locale];
  if (aliases && slug in aliases) {
    return aliases[slug as keyof typeof aliases];
  }
  return null;
}

function mapSlugToLocale(
  slug: string,
  fromLocale: Locale | "fr" | "it",
  toLocale: Locale
): string {
  if (
    slug === ABOUT_SLUGS.es ||
    slug === ABOUT_SLUGS.en ||
    slug === "about"
  ) {
    return ABOUT_SLUGS[toLocale];
  }
  if (
    slug === CONTACT_SLUGS.es ||
    slug === CONTACT_SLUGS.en ||
    slug === "contact"
  ) {
    return CONTACT_SLUGS[toLocale];
  }

  const legacyKey = LEGACY_LEGAL_SLUG_TO_KEY[`${fromLocale}/${slug}`];
  if (legacyKey) {
    return LEGAL_SLUGS[legacyKey][toLocale];
  }

  if (fromLocale === "es" || fromLocale === "en") {
    const legalKey = findLegalKey(fromLocale, slug);
    if (legalKey) return LEGAL_SLUGS[legalKey][toLocale];
  }

  return slug;
}

/**
 * Convierte un pathname localizado al equivalente en `nextLocale`
 * (nosotros ↔ about, contacto ↔ contact, slugs legales, etc.).
 */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${nextLocale}`;

  const fromLocale = segments[0];
  if (
    fromLocale !== "es" &&
    fromLocale !== "en" &&
    fromLocale !== "fr" &&
    fromLocale !== "it"
  ) {
    segments.unshift(nextLocale);
    return `/${segments.join("/")}`;
  }

  const rest = segments.slice(1);
  if (rest.length >= 1) {
    rest[0] = mapSlugToLocale(
      rest[0],
      fromLocale as Locale | "fr" | "it",
      nextLocale
    );
  }

  return `/${nextLocale}${rest.length ? `/${rest.join("/")}` : ""}`;
}

/**
 * Redirige rutas `/fr/*` y `/it/*` al equivalente en español (locale por defecto).
 */
export function remapDeprecatedLocalePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${defaultLocale}`;

  const legacy = segments[0];
  if (legacy !== "fr" && legacy !== "it") return pathname;

  const rest = segments.slice(1);
  if (rest.length >= 1) {
    rest[0] = mapSlugToLocale(rest[0], legacy, defaultLocale);
  }

  return `/${defaultLocale}${rest.length ? `/${rest.join("/")}` : ""}`;
}
