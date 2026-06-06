import type { Product } from "./product-types";

export * from "./product-types";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
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

type ProductScriptJson = {
  images?: {
    featured?: unknown[];
  };
  media?: {
    cardVideo?: {
      src?: unknown;
      poster?: unknown;
    };
  };
};

function readProductScriptJson(productId: string): ProductScriptJson | undefined {
  const jsonPath = join(process.cwd(), "scripts", "products", `${productId}.json`);
  if (!existsSync(jsonPath)) return undefined;
  try {
    const raw = readFileSync(jsonPath, "utf8");
    return JSON.parse(raw) as ProductScriptJson;
  } catch {
    return undefined;
  }
}

function readProductMedia(productId: string): Product["media"] | undefined {
  const parsed = readProductScriptJson(productId);
  if (!parsed) return undefined;
  const cardVideo = parsed.media?.cardVideo;
  if (!cardVideo || typeof cardVideo !== "object") return undefined;
  if (typeof cardVideo.src !== "string" || cardVideo.src.length === 0) {
    return undefined;
  }
  const media: Product["media"] = {
    cardVideo: {
      src: cardVideo.src,
      poster: typeof cardVideo.poster === "string" ? cardVideo.poster : undefined,
    },
  };
  return media;
}

function readProductFeaturedImage(productId: string): string | undefined {
  const parsed = readProductScriptJson(productId);
  const featured = parsed?.images?.featured;
  if (!Array.isArray(featured) || featured.length === 0) return undefined;
  const first = featured[0];
  return typeof first === "string" && first.startsWith("/") ? first : undefined;
}

function mergeScriptAssets(base: Product): Product {
  const media = readProductMedia(base.id);
  const featuredImage = readProductFeaturedImage(base.id);
  const images = featuredImage
    ? [featuredImage, ...base.images.filter((img) => img !== featuredImage)]
    : base.images;

  if (!media && images === base.images) return base;
  return {
    ...base,
    images,
    ...(media ? { media } : {}),
  };
}

function mergeScriptMedia(base: Product): Product {
  return mergeScriptAssets(base);
}

const BASE_PRODUCTS: Product[] = PRODUCTS_DATA.map(mergeCatalogTranslations);

export function getProducts(): Product[] {
  return BASE_PRODUCTS.map(mergeScriptMedia);
}

export function getProductById(id: string): Product | undefined {
  const base = BASE_PRODUCTS.find((p) => p.id === id);
  if (!base) return undefined;
  return mergeScriptMedia(base);
}
