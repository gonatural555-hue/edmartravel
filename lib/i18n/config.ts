export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Locales retirados — solo para redirects en middleware. */
export const deprecatedLocales = ["fr", "it"] as const;
export type DeprecatedLocale = (typeof deprecatedLocales)[number];

export function isDeprecatedLocale(value: string): value is DeprecatedLocale {
  return (deprecatedLocales as readonly string[]).includes(value);
}
