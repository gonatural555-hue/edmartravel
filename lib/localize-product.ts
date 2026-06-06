import type { Locale } from "@/lib/i18n/config";
import type { Product, ProductTranslation, ProductVariants } from "@/lib/product-types";
import { PRODUCT_LOCALE_FIELDS } from "@/lib/products-locale-fields";

function mergeVariants(
  base: ProductVariants | ProductVariants[] | undefined,
  localized: ProductVariants | ProductVariants[] | undefined
): ProductVariants | ProductVariants[] | undefined {
  if (!localized) return base;
  return localized;
}

/**
 * Devuelve el producto con textos operativos y de catálogo alineados al locale.
 * La base del catálogo está en inglés; `es` aplica overrides en `products-locale-fields`.
 */
export function localizeProduct(product: Product, locale: Locale): Product {
  const translation = product.translations?.[locale];
  const localeFields = PRODUCT_LOCALE_FIELDS[locale]?.[product.id];

  const mergedTranslation: ProductTranslation | undefined = translation
    ? {
        ...translation,
        seo: translation.seo,
      }
    : undefined;

  return {
    ...product,
    title: mergedTranslation?.title ?? product.title,
    description: mergedTranslation?.description ?? product.description,
    shortDescription:
      mergedTranslation?.shortDescription ?? product.shortDescription,
    longDescription: mergedTranslation?.longDescription ?? product.longDescription,
    features: mergedTranslation?.features ?? product.features,
    duration: localeFields?.duration ?? product.duration,
    location: localeFields?.location ?? product.location,
    schedule: localeFields?.schedule ?? product.schedule,
    variants: mergeVariants(product.variants, localeFields?.variants),
    translations: product.translations,
  };
}

export function localizeProducts(products: Product[], locale: Locale): Product[] {
  return products.map((product) => localizeProduct(product, locale));
}
