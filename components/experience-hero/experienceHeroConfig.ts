import type { ExperienceWorldId } from "./types";

export type ExperienceWorldConfig = {
  id: ExperienceWorldId;
  /** @deprecated Usar titleLines — solo compat director */
  title: string;
  sidebarTitle: string;
  icon: "wine" | "mountain" | "city";
  heroImage: string;
  heroImageAlt: string;
  titleLines: string[];
  subtitle: string;
  ctaLabel: string;
  detailTags: string[];
  imagePosition: string;
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
    sidebarTitle: "Wine",
    icon: "wine",
    heroImage: "/assets/scenes/wine-tours/backgrounds/background-vino.png",
    heroImageAlt: "Experiencia de vino y gastronomía en Mendoza",
    titleLines: ["WINE TOURS", "& BODEGAS"],
    subtitle: "Bodegas emblemáticas y gastronomía de altura en Mendoza.",
    ctaLabel: "Explorar wine tours",
    detailTags: ["Bodegas", "Gastronomía", "Paisajes"],
    imagePosition: "55% 45%",
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
    sidebarTitle: "Aventura",
    icon: "mountain",
    heroImage:
      "/assets/scenes/adventure-mendoza/backgrounds/hero-aventura.png",
    heroImageAlt: "Cabalgata en los Andes, Mendoza",
    titleLines: ["AVENTURA", "MENDOZA"],
    subtitle: "Cabalgatas, trekking y paisajes que no se olvidan.",
    ctaLabel: "Explorar aventuras",
    detailTags: ["Cabalgatas", "Trekking", "Montaña"],
    imagePosition: "52% 40%",
    spotlight: {
      core: "rgba(58, 95, 74, 0.38)",
      mid: "rgba(210, 140, 55, 0.16)",
      edge: "rgba(10, 18, 15, 0.92)",
    },
    accent: "#D4A84B",
  },
  {
    id: "city",
    title: "EXPLORA LA CIUDAD DE MENDOZA",
    sidebarTitle: "Ciudad",
    icon: "city",
    heroImage:
      "/assets/scenes/discover-mendoza/backgrounds/background-mendoza.png",
    heroImageAlt: "Descubrí Mendoza en scooter, plaza y fuente al atardecer",
    titleLines: ["explora", "la ciudad", "de mendoza"],
    subtitle:
      "Scooters, Parques Historicos y los\nlugares más emblematícos.",
    ctaLabel: "Explorar la ciudad",
    detailTags: ["Scooters", "Historia", "Cultura"],
    imagePosition: "52% 42%",
    spotlight: {
      core: "rgba(168, 92, 58, 0.32)",
      mid: "rgba(212, 168, 90, 0.14)",
      edge: "rgba(10, 18, 15, 0.92)",
    },
    accent: "#C89B3C",
  },
];

export const WORLD_ORDER: ExperienceWorldId[] = ["wine", "adventure", "city"];

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
