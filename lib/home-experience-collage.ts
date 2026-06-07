export type CollageExperienceId = "wine" | "adventure" | "city";

export type CollageItemDef = {
  id: string;
  experienceId: CollageExperienceId;
  /** Si está presente, el overlay enlaza al PDP en lugar de la categoría */
  productId?: string;
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
    productId: "luxury-wine-experience-bodega-boutique",
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
    productId: "cabalgata-picada-potrerillos",
    src: "/assets/scenes/adventure-mendoza/collage/aventura-mendoza.webp",
    alt: "Aventura en Mendoza",
    left: "38%",
    top: "4%",
    rotate: 2,
    zIndex: 4,
  },
  {
    id: "city-1",
    experienceId: "city",
    productId: "mono-city-tour-mendoza",
    src: "/assets/scenes/city-tours/collage-scooter.webp",
    alt: "Scooter en Mendoza",
    left: "70%",
    top: "8%",
    rotate: 5,
    zIndex: 2,
  },
  {
    id: "wine-2",
    experienceId: "wine",
    productId: "half-day-winery-tour-maipu",
    src: "/assets/scenes/wine-tours/wine-tours-collage.webp",
    alt: "Wine tours con montañas de Mendoza",
    left: "4%",
    top: "54%",
    rotate: 3,
    zIndex: 1,
  },
  {
    id: "adventure-2",
    experienceId: "adventure",
    productId: "andes-experience-horseback-sunset-picnic",
    src: "/assets/scenes/adventure-mendoza/collage/aventura-mendoza-01.webp",
    alt: "Experiencia de aventura en Mendoza",
    left: "36%",
    top: "56%",
    rotate: -2,
    zIndex: 3,
  },
  {
    id: "city-2",
    experienceId: "city",
    productId: "city-tour-mendoza",
    src: "/assets/images/products/CityTour/city-tour-2.webp",
    alt: "Ciudad de Mendoza",
    left: "68%",
    top: "52%",
    rotate: -5,
    zIndex: 2,
  },
];

/** URL de la categoría de experiencia */
export function collageExperienceHref(
  locale: string,
  experienceId: CollageExperienceId
): string {
  return `/${locale}/category/${experienceId}`;
}

/** URL del PDP de una experiencia concreta */
export function collageProductHref(locale: string, productId: string): string {
  return `/${locale}/products/${productId}`;
}

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
