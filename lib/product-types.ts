import type { Locale } from "@/lib/i18n/config";

export type ProductVariantOption = {
  label: string;
  value?: string;
  priceModifier?: number;
};

export type ProductVariants = {
  type: string;
  label: string;
  default?: string;
  options: ProductVariantOption[];
};

export type ProductTranslation = {
  title?: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string[];
  features?: string[];
  seo?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
};

export type ProductCardVideo = {
  src: string;
  poster?: string;
};

export type ProductMedia = {
  cardVideo?: ProductCardVideo;
};

/** Categorías de experiencias turísticas (Mendoza). */
export type ExperienceCategory = "wine" | "adventure" | "city";

export type ExperienceDifficulty = "easy" | "medium" | "hard";

/**
 * Producto / servicio base. Los campos de experiencia son opcionales para
 * compatibilidad con catálogos legacy o mixtos.
 */
export type Product = {
  id: string;
  slug?: string;
  title: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  shortDescription?: string;
  longDescription?: string[];
  features?: string[];
  media?: ProductMedia;
  freeShipping?: boolean;
  translations?: Partial<Record<Locale, ProductTranslation>>;
  variants?: ProductVariants | ProductVariants[];
  /** Experiencia turística (cuando aplica) */
  location?: string;
  duration?: string;
  schedule?: string[];
  difficulty?: ExperienceDifficulty;
  /** When true, PDP shows “available soon” and disables online booking */
  comingSoon?: boolean;
};

/**
 * Experiencia turística estricta: mismos campos obligatorios + categoría cerrada.
 */
export type TourismExperience = Product & {
  location: string;
  duration: string;
  schedule: string[];
  category: ExperienceCategory;
  difficulty?: ExperienceDifficulty;
};
