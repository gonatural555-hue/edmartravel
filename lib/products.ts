import type { Product } from "./product-types";

export * from "./product-types";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import {
  CATALOG_PRODUCTS,
  getCatalogProductById,
} from "./products-catalog";

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

const scriptJsonCache = new Map<string, ProductScriptJson | undefined>();

function readProductScriptJson(productId: string): ProductScriptJson | undefined {
  if (scriptJsonCache.has(productId)) {
    return scriptJsonCache.get(productId);
  }

  const jsonPath = join(process.cwd(), "scripts", "products", `${productId}.json`);
  if (!existsSync(jsonPath)) {
    scriptJsonCache.set(productId, undefined);
    return undefined;
  }

  try {
    const raw = readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as ProductScriptJson;
    scriptJsonCache.set(productId, parsed);
    return parsed;
  } catch {
    scriptJsonCache.set(productId, undefined);
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

let mergedCatalog: Product[] | null = null;

function buildMergedCatalog(): Product[] {
  if (mergedCatalog) return mergedCatalog;
  mergedCatalog = CATALOG_PRODUCTS.map(mergeScriptAssets);
  return mergedCatalog;
}

export const getProducts = cache((): Product[] => buildMergedCatalog());

export const getProductById = cache((id: string): Product | undefined => {
  const base = getCatalogProductById(id);
  if (!base) return undefined;
  return mergeScriptAssets(base);
});
