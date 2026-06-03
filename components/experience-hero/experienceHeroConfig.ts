import { WINE_ASSETS } from "@/components/cinematic/cinematicAssets";
import type { ExperienceWorldId } from "./types";

export type ExperienceWorldConfig = {
  id: ExperienceWorldId;
  title: string;
  sidebarTitle: string;
  icon: "wine" | "mountain" | "city";
  heroImage: string;
  heroImageAlt: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaAction: string;
  /** Radial spotlight tones */
  spotlight: {
    core: string;
    mid: string;
    edge: string;
  };
  accent: string;
};

export const EXPERIENCE_WORLDS: ExperienceWorldConfig[] = [
  {
    id: "wine",
    title: "WINE TOURS & BODEGAS",
    sidebarTitle: "Wine Tours & Bodegas",
    icon: "wine",
    heroImage: "",
    heroImageAlt: "Wine Tours Mendoza",
    ctaTitle: "WINE TOURS & BODEGAS",
    ctaSubtitle:
      "Descubrí las bodegas más emblemáticas de Mendoza.",
    ctaAction: "Explorar experiencias →",
    spotlight: {
      core: "rgba(120, 28, 48, 0.42)",
      mid: "rgba(200, 155, 60, 0.14)",
      edge: "rgba(10, 18, 15, 0.92)",
    },
    accent: "#C89B3C",
  },
  {
    id: "adventure",
    title: "AVENTURA EN MENDOZA",
    sidebarTitle: "Aventura Mendoza",
    icon: "mountain",
    heroImage:
      "/assets/scenes/adventure-mendoza/backgrounds/hero-aventura.png",
    heroImageAlt: "Cabalgata en los Andes, Mendoza",
    ctaTitle: "AVENTURA EN MENDOZA",
    ctaSubtitle: "Cabalgatas, trekking y paisajes inolvidables.",
    ctaAction: "Explorar aventuras →",
    spotlight: {
      core: "rgba(58, 95, 74, 0.38)",
      mid: "rgba(210, 140, 55, 0.16)",
      edge: "rgba(10, 18, 15, 0.92)",
    },
    accent: "#D4A84B",
  },
  {
    id: "city",
    title: "CONOCER LA CIUDAD",
    sidebarTitle: "Conocer la Ciudad",
    icon: "city",
    heroImage:
      "/assets/scenes/city-tours/backgrounds/hero-plaza-san-martin.webp",
    heroImageAlt: "Plaza San Martín, Mendoza",
    ctaTitle: "CONOCER LA CIUDAD",
    ctaSubtitle: "Descubrí los rincones más emblemáticos de Mendoza.",
    ctaAction: "Explorar la ciudad →",
    spotlight: {
      core: "rgba(168, 92, 58, 0.32)",
      mid: "rgba(212, 168, 90, 0.14)",
      edge: "rgba(10, 18, 15, 0.92)",
    },
    accent: "#C89B3C",
  },
];

export const WORLD_ORDER: ExperienceWorldId[] = ["wine", "adventure", "city"];

export const WINE_LAYER_ASSETS = {
  contactShadow: WINE_ASSETS.contactShadow,
  cheeseBoard: WINE_ASSETS.cheeseBoard,
  grapes: WINE_ASSETS.grapes,
  glass: WINE_ASSETS.glass,
  bottle: WINE_ASSETS.bottle,
};

/** Preview ciudad — arco + scooter */
export const CITY_PEEK_ASSETS = {
  gate: "/assets/scenes/city-tours/backgrounds/hero-plaza-san-martin.webp",
  scooter: "/assets/images/products/MonoCityTour/monocitytour.webp",
};

export const FOOTER_PILLS = [
  { icon: "nature" as const, label: "NATURALEZA EN ESTADO PURO" },
  { icon: "horse" as const, label: "EXPERIENCIAS AUTÉNTICAS" },
  { icon: "memory" as const, label: "RECUERDOS QUE PERDURAN" },
];

export function getWorldConfig(id: ExperienceWorldId): ExperienceWorldConfig {
  return EXPERIENCE_WORLDS.find((w) => w.id === id)!;
}

export function getSpatialSlots(
  activeId: ExperienceWorldId
): Record<ExperienceWorldId, "center" | "left" | "right"> {
  const i = WORLD_ORDER.indexOf(activeId);
  const left = WORLD_ORDER[(i - 1 + 3) % 3];
  const right = WORLD_ORDER[(i + 1) % 3];
  return {
    [activeId]: "center",
    [left]: "left",
    [right]: "right",
  } as Record<ExperienceWorldId, "center" | "left" | "right">;
}
