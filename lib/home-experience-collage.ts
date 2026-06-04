export type CollageExperienceId = "wine" | "adventure" | "city";

export type CollageItemDef = {
  id: string;
  experienceId: CollageExperienceId;
  src: string;
  alt: string;
  /** Posición % dentro del stage fijo */
  left: string;
  top: string;
  rotate: number;
  zIndex: number;
};

/** 6 imágenes — mismas dimensiones vía CSS en el componente (aspect 16/10). */
export const COLLAGE_ITEMS: CollageItemDef[] = [
  {
    id: "wine-1",
    experienceId: "wine",
    src: "/assets/images/products/HalfDayWine/tour-bodega-medio-dia-1.webp",
    alt: "Wine tour en bodega",
    left: "6%",
    top: "6%",
    rotate: -4,
    zIndex: 2,
  },
  {
    id: "adventure-1",
    experienceId: "adventure",
    src: "/assets/scenes/adventure-mendoza/backgrounds/hero-cabalgata.jpg",
    alt: "Cabalgata Mendoza",
    left: "38%",
    top: "4%",
    rotate: 2,
    zIndex: 4,
  },
  {
    id: "city-1",
    experienceId: "city",
    src: "/assets/images/products/MonoCityTour/featuredmonocitytour.webp",
    alt: "Monopatín en Mendoza",
    left: "70%",
    top: "8%",
    rotate: 5,
    zIndex: 2,
  },
  {
    id: "wine-2",
    experienceId: "wine",
    src: "/assets/images/products/ValleDeUco/valle-uco.webp",
    alt: "Valle de Uco",
    left: "4%",
    top: "54%",
    rotate: 3,
    zIndex: 1,
  },
  {
    id: "adventure-2",
    experienceId: "adventure",
    src: "/assets/images/products/CabalgataPicada/cabalgatapicada1.webp",
    alt: "Cabalgata y picada",
    left: "36%",
    top: "56%",
    rotate: -2,
    zIndex: 3,
  },
  {
    id: "city-2",
    experienceId: "city",
    src: "/assets/images/products/CityTour/city-tour-2.webp",
    alt: "Ciudad de Mendoza",
    left: "68%",
    top: "52%",
    rotate: -5,
    zIndex: 2,
  },
];

export const COLLAGE_PRODUCT_HASH: Record<CollageExperienceId, string> = {
  wine: "products-cat-wine",
  adventure: "products-cat-adventure",
  city: "products-cat-city",
};

/** Empuje sutil hacia afuera cuando otra imagen está activa */
export function collagePushOffset(
  left: string,
  top: string,
  amountPx: number
): { x: number; y: number } {
  const lx = parseFloat(left) / 100 - 0.5;
  const ty = parseFloat(top) / 100 - 0.5;
  const len = Math.hypot(lx, ty) || 1;
  return {
    x: (lx / len) * amountPx,
    y: (ty / len) * amountPx,
  };
}
