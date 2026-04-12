import type { Locale } from "@/lib/i18n/config";
import type { TourismExperience } from "@/lib/product-types";

export function tourTitleForLocale(
  product: TourismExperience,
  locale: Locale
): string {
  const tr = product.translations?.[locale];
  if (tr?.title?.trim()) return tr.title;
  return product.title;
}
