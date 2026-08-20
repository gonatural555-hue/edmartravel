import { unstable_cache } from "next/cache";
import type { Locale } from "@/lib/i18n/config";
import { SITE_CONFIG } from "@/lib/config";

const BRAND_TEXT = "Go Natural";

function replaceBrandText(value: unknown): unknown {
  if (typeof value === "string") {
    return value.split(BRAND_TEXT).join(SITE_CONFIG.name);
  }

  if (Array.isArray(value)) {
    return value.map(replaceBrandText);
  }

  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, next] of Object.entries(value as Record<string, unknown>)) {
      result[key] = replaceBrandText(next);
    }
    return result;
  }

  return value;
}

async function loadMessages(locale: Locale): Promise<Record<string, any>> {
  const messages = (await import(`@/messages/${locale}.json`)).default as Record<
    string,
    any
  >;
  return replaceBrandText(messages) as Record<string, any>;
}

const getCachedMessages = (locale: Locale) =>
  unstable_cache(
    () => loadMessages(locale),
    ["i18n-messages", locale],
    { revalidate: false }
  )();

export async function getMessages(locale: Locale): Promise<Record<string, any>> {
  return getCachedMessages(locale);
}
