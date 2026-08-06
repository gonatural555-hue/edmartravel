import type { Locale } from "@/lib/i18n/config";
import type { ProductTranslation } from "@/lib/product-types";

/**
 * Traducciones extra de catálogo fusionadas en `getProductById`.
 * ES usa `products-locale-fields.ts`; EN usa la base en `products-data.ts`.
 */
export const PRODUCT_I18N_EXTRA: Record<
  string,
  Partial<Record<Locale, ProductTranslation>>
> = {};
