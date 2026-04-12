import type { ExperienceCategory } from "@/lib/product-types";

/** Orden fijo en UI: vino → aventura → ciudad. No importar `lib/categories` aquí (cliente / sin fs). */
export const EXPERIENCE_CATEGORY_ORDER: ExperienceCategory[] = [
  "wine",
  "adventure",
  "city",
];
