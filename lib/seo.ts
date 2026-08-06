import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

export type LegalPageKey =
  | "legal"
  | "privacy"
  | "cookies"
  | "terms"
  | "cancellations";

export const LEGAL_SLUGS: Record<LegalPageKey, Record<Locale, string>> = {
  legal: {
    en: "legal",
    es: "informacion-legal",
  },
  privacy: {
    en: "privacy",
    es: "privacidad",
  },
  cookies: {
    en: "cookies",
    es: "cookies",
  },
  terms: {
    en: "terms",
    es: "terminos",
  },
  cancellations: {
    en: "cancellations",
    es: "cancelaciones",
  },
};

/** Slugs históricos — re-exportados como alias para no romper enlaces. */
export const LEGAL_SLUG_ALIASES: Partial<
  Record<Locale, Record<string, LegalPageKey>>
> = {
  en: {
    "privacy-policy": "privacy",
    "cookie-policy": "cookies",
    "terms-and-conditions": "terms",
    disclaimer: "legal",
  },
  es: {
    "politica-de-privacidad": "privacy",
    "politica-de-cookies": "cookies",
    "terminos-y-condiciones": "terms",
    "descargo-de-responsabilidad": "legal",
  },
};

export function buildLegalPathByLocale(
  key: LegalPageKey
): Record<Locale, string> {
  return {
    en: `/en/${LEGAL_SLUGS[key].en}`,
    es: `/es/${LEGAL_SLUGS[key].es}`,
  };
}

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const baseUrl = envUrl || vercelUrl || "http://localhost:3000";
  return baseUrl.replace(/\/+$/, "");
}

export function toAbsoluteUrl(path: string) {
  if (!path) return getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildAlternates({
  locale,
  pathByLocale,
}: {
  locale: Locale;
  pathByLocale: Record<Locale, string>;
}) {
  return {
    canonical: toAbsoluteUrl(pathByLocale[locale]),
    languages: {
      en: toAbsoluteUrl(pathByLocale.en),
      es: toAbsoluteUrl(pathByLocale.es),
      "x-default": toAbsoluteUrl(pathByLocale[defaultLocale]),
    },
  };
}

export function buildMetadata({
  locale,
  title,
  description,
  pathByLocale,
  ogImage,
  ogTitle,
  ogDescription,
  ogType = "website",
  robotsIndex = true,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathByLocale: Record<Locale, string>;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article" | "product";
  robotsIndex?: boolean;
}): Metadata {
  const url = toAbsoluteUrl(pathByLocale[locale]);
  const imageUrl = toAbsoluteUrl(
    ogImage || "/assets/images/blog/blog-hero.webp"
  );
  const openGraphType = ogType === "product" ? "website" : ogType;

  return {
    title,
    description,
    robots: robotsIndex
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: buildAlternates({ locale, pathByLocale }),
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url,
      type: openGraphType,
      locale: OG_LOCALES[locale],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export function formatTemplate(
  template: string,
  params: Record<string, string>
) {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(new RegExp(`\\{${key}\\}`, "g"), params[key]),
    template
  );
}
