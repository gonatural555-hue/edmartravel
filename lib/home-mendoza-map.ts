import type { ExperienceWorldId } from "@/components/experience-hero/types";

export type MapRegionId = ExperienceWorldId;

export type MapLocation = {
  name: string;
  x: number;
  y: number;
};

export type MapRegion = {
  id: MapRegionId;
  title: string;
  description: string;
  ctaLabel: string;
  color: string;
  colorMuted: string;
  /** SVG path (viewBox 900×560) */
  areaPath: string;
  locations: MapLocation[];
  /** Centro para marcador editorial */
  center: { x: number; y: number };
};

/** Ruta narrativa: Ciudad → Wine → Aventura */
export const JOURNEY_ROUTE_PATH =
  "M 468 318 C 520 300, 580 295, 628 308 C 560 260, 420 220, 268 228";

export const PROVINCE_OUTLINE_PATH =
  "M 168 108 L 748 72 L 828 388 L 642 508 L 188 472 Z";

export const TERRAIN_DETAIL_PATHS = [
  "M 200 200 Q 320 160 440 190 T 620 240",
  "M 240 360 Q 400 400 560 380 T 720 340",
  "M 280 140 Q 180 220 220 320",
];

export const MAP_REGIONS: MapRegion[] = [
  {
    id: "city",
    title: "Conocer la Ciudad",
    description:
      "Scooters, parques históricos y los rincones más emblemáticos de la capital mendocina.",
    ctaLabel: "Explorar la ciudad",
    color: "#4A6B8A",
    colorMuted: "rgba(74, 107, 138, 0.22)",
    areaPath:
      "M 388 248 L 528 228 L 572 352 L 448 392 L 348 328 Z",
    center: { x: 468, y: 318 },
    locations: [
      { name: "Mendoza City", x: 478, y: 302 },
      { name: "Parque General San Martín", x: 432, y: 348 },
    ],
  },
  {
    id: "wine",
    title: "Wine Tours & Bodegas",
    description:
      "Luján de Cuyo, Maipú y el Valle de Uco — bodegas emblemáticas y gastronomía de altura.",
    ctaLabel: "Explorar wine tours",
    color: "#6B2842",
    colorMuted: "rgba(107, 40, 66, 0.28)",
    areaPath:
      "M 508 188 L 798 168 L 832 392 L 588 428 L 472 312 Z",
    center: { x: 628, y: 308 },
    locations: [
      { name: "Luján de Cuyo", x: 548, y: 268 },
      { name: "Maipú", x: 598, y: 318 },
      { name: "Valle de Uco", x: 698, y: 358 },
    ],
  },
  {
    id: "adventure",
    title: "Aventura Mendoza",
    description:
      "Potrerillos, la cordillera de los Andes y paisajes de montaña que no se olvidan.",
    ctaLabel: "Explorar aventuras",
    color: "#C4873A",
    colorMuted: "rgba(196, 135, 58, 0.26)",
    areaPath:
      "M 168 108 L 398 92 L 438 278 L 298 408 L 152 358 Z",
    center: { x: 268, y: 228 },
    locations: [
      { name: "Potrerillos", x: 248, y: 268 },
      { name: "Andes", x: 218, y: 178 },
      { name: "Mountain areas", x: 312, y: 198 },
    ],
  },
];

export const MAP_DRAW_DURATION_S = 2.5;
