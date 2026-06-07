import type { Product } from "./product-types";
import { locales, type Locale } from "./i18n/config";
import { PRODUCT_I18N_EXTRA } from "./products-i18n-extra";
import { PRODUCTS_DATA } from "./products-data";

function mergeCatalogTranslations(base: Product): Product {
  const extra = PRODUCT_I18N_EXTRA[base.id];
  if (!extra) return base;
  const translations = { ...base.translations };
  for (const loc of locales) {
    const patch = extra[loc as Locale];
    if (!patch) continue;
    const prev = translations[loc as Locale];
    translations[loc as Locale] = {
      ...prev,
      ...patch,
      seo: { ...prev?.seo, ...patch.seo },
    };
  }
  return { ...base, translations };
}

/** Catálogo estático (sin assets de scripts/products/*.json). Seguro para client components. */
export const CATALOG_PRODUCTS: Product[] =
  PRODUCTS_DATA.map(mergeCatalogTranslations);

export function getCatalogProductById(id: string): Product | undefined {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}
