import type { Product } from "./product-types";

export * from "./product-types";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
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

export function getProducts(): Product[] {
  return CATALOG_PRODUCTS.map(mergeScriptAssets);
}

export function getProductById(id: string): Product | undefined {
  const base = getCatalogProductById(id);
  if (!base) return undefined;
  return mergeScriptAssets(base);
}
