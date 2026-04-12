import { Product, getProducts } from "@/lib/products";

export interface Category {
  slug: string;
  name: string;
  description: string;
  parentSlug?: string;
}

/** Tres categorías de experiencias (alineadas con `product.category` en el catálogo). */
export const CATEGORIES: Category[] = [
  {
    slug: "wine",
    name: "Wine Tours y Bodegas",
    description:
      "Catas, traslados privados y jornadas entre viñedos en Mendoza y el Valle de Uco.",
  },
  {
    slug: "adventure",
    name: "Aventura en Mendoza",
    description:
      "Montaña, cabalgatas, reservas naturales y circuitos de desierto y cordillera con operadores locales.",
  },
  {
    slug: "city",
    name: "Conoce la ciudad de Mendoza",
    description:
      "Tours urbanos y experiencias en el centro: ritmo tranquilo y mirada local.",
  },
];

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.map((cat) => cat.slug);
}

export function getMainCategories(): Category[] {
  return CATEGORIES;
}

export function getSubcategories(_parentSlug: string): Category[] {
  return [];
}

export function getCategoryWithChildren(slug: string): {
  category: Category;
  subcategories: Category[];
} | null {
  const category = getCategoryBySlug(slug);
  if (!category) return null;
  return { category, subcategories: [] };
}

export function getProductsByCategorySlug(slug: string): Product[] {
  if (!getCategoryBySlug(slug)) return [];
  return getProducts().filter((product) => product.category === slug);
}
