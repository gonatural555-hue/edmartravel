import type { ExperienceCategory } from "@/lib/product-types";

export type CategorySlug = ExperienceCategory;

export const CATEGORY_HERO_IMAGES: Record<CategorySlug, string> = {
  wine: "/assets/images/products/HalfDayWine/tour-bodega-medio-dia-1.webp",
  adventure:
    "/assets/images/products/HighMountainTour/tour-alta-montaña.webp",
  city: "/assets/images/products/CityTour/city-tour-1.webp",
};

export const CATEGORY_FINAL_CTA_IMAGES: Record<CategorySlug, string> = {
  wine: "/assets/images/products/trasladobodegas/traslado-bodegas-5.webp",
  adventure:
    "/assets/images/products/AndesTreckingHot/trekkingmendoza.webp",
  city: "/assets/images/products/CityTour/city-tour-1.webp",
};

export const CATEGORY_PAGE_BG = "#F8F5EE";

/** Fondo editorial de Home — mismo tono que categorías y blog */
export const HOME_PAGE_BG = CATEGORY_PAGE_BG;
