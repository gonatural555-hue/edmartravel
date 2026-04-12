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
  media?: {
    cardVideo?: {
      src?: unknown;
      poster?: unknown;
    };
  };
};

function readProductMedia(productId: string): Product["media"] | undefined {
  const jsonPath = join(process.cwd(), "scripts", "products", `${productId}.json`);
  if (!existsSync(jsonPath)) return undefined;
  try {
    const raw = readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as ProductScriptJson;
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
  } catch {
    return undefined;
  }
}

function mergeScriptMedia(base: Product): Product {
  const media = readProductMedia(base.id);
  if (!media) return base;
  return { ...base, media };
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
