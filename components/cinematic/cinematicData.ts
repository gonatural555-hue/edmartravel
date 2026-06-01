import type { CSSProperties } from "react";

/**
 * EDMAR TRAVEL — Cinematic Storytelling Landing.
 *
 * FASE 1: composición estática del Capítulo 01 (Wine Tours & Bodegas).
 * Los assets reales todavía no existen; mientras `USE_PLACEHOLDERS` sea `true`
 * cada capa se dibuja como un bloque etiquetado que respeta su posición/tamaño
 * final. Cuando subas los PNG/WebP a /public/cinematic, pon el flag en `false`
 * (o usa overrides por capa) y la composición usará las imágenes reales sin
 * tocar nada más.
 */
export const USE_PLACEHOLDERS = true;

/** Raíz de los assets cinematográficos dentro de /public. */
export const CINEMATIC_ASSETS_BASE = "/cinematic";

export type SceneLayerKind = "background" | "midground" | "object" | "overlay";

export type SceneLayerDef = {
  id: string;
  /** Ruta real del asset (se usa cuando USE_PLACEHOLDERS = false). */
  src: string;
  alt: string;
  zIndex: number;
  kind: SceneLayerKind;
  /** Clases de posicionamiento/tamaño del wrapper de la capa. */
  className: string;
  /** Visualización provisional mientras no haya asset real. */
  placeholder?: {
    label: string;
    className?: string;
    style?: CSSProperties;
  };
};

export type CinematicSceneDef = {
  id: string;
  /** Texto del CTA por capítulo. */
  cta: {
    title: string;
    button: string;
  };
  layers: SceneLayerDef[];
};

/* ------------------------------------------------------------------ */
/* CHAPTER 01 — WINE TOURS & BODEGAS                                   */
/* ------------------------------------------------------------------ */

const wineAsset = (file: string) => `${CINEMATIC_ASSETS_BASE}/wine/${file}`;

export const wineScene: CinematicSceneDef = {
  id: "wine",
  cta: {
    title: "Wine Tours & Bodegas",
    button: "Explorar experiencias",
  },
  layers: [
    {
      id: "mountains",
      src: wineAsset("mountains.webp"),
      alt: "Cordillera de los Andes nevada en la hora dorada",
      zIndex: 0,
      kind: "background",
      className: "inset-0",
      placeholder: {
        label: "Andes nevados · golden hour",
        style: {
          background:
            "linear-gradient(180deg, #f6c77a 0%, #e7a35a 26%, #b9805a 46%, #6f5a55 64%, #3a3b41 100%)",
        },
      },
    },
    {
      id: "vineyard",
      src: wineAsset("vineyard.webp"),
      alt: "Viñedo de Mendoza al atardecer",
      zIndex: 10,
      kind: "midground",
      className: "inset-x-0 bottom-[30%] h-[34%]",
      placeholder: {
        label: "Viñedo de Mendoza",
        style: {
          background:
            "linear-gradient(180deg, rgba(58,95,74,0) 0%, #3a5f4a 45%, #2c4a39 100%)",
        },
      },
    },
    {
      id: "table",
      src: wineAsset("table.png"),
      alt: "Mesa premium de nogal oscuro",
      zIndex: 20,
      kind: "midground",
      className: "inset-x-0 bottom-0 h-[42%]",
      placeholder: {
        label: "Mesa de nogal oscuro",
        style: {
          background:
            "linear-gradient(180deg, #2a1a12 0%, #1c120c 60%, #120b07 100%)",
        },
      },
    },
    {
      id: "contact-shadows",
      src: wineAsset("contact-shadows.png"),
      alt: "",
      zIndex: 25,
      kind: "overlay",
      className: "inset-x-0 bottom-[36%] h-[10%]",
      placeholder: {
        label: "",
        style: {
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
        },
      },
    },
    {
      id: "cheese-board",
      src: wineAsset("cheese-board.png"),
      alt: "Tabla de quesos",
      zIndex: 30,
      kind: "object",
      className: "hidden md:block left-[8%] bottom-[16%] h-[16vh] w-[18vw]",
      placeholder: { label: "Tabla de quesos" },
    },
    {
      id: "grapes",
      src: wineAsset("grapes.png"),
      alt: "Racimo de uvas",
      zIndex: 31,
      kind: "object",
      className: "hidden md:block left-[20%] bottom-[14%] h-[10vh] w-[10vw]",
      placeholder: { label: "Uvas" },
    },
    {
      id: "dish-a",
      src: wineAsset("dish-a.png"),
      alt: "Plato gastronómico",
      zIndex: 30,
      kind: "object",
      className: "hidden md:block right-[10%] bottom-[16%] h-[13vh] w-[15vw]",
      placeholder: { label: "Plato A" },
    },
    {
      id: "dish-b",
      src: wineAsset("dish-b.png"),
      alt: "Plato gastronómico",
      zIndex: 29,
      kind: "object",
      className: "hidden lg:block right-[24%] bottom-[13%] h-[11vh] w-[13vw]",
      placeholder: { label: "Plato B" },
    },
    {
      id: "napkin-knife",
      src: wineAsset("napkin-knife.png"),
      alt: "Servilleta y cuchillo",
      zIndex: 32,
      kind: "object",
      className: "hidden lg:block right-[38%] bottom-[12%] h-[8vh] w-[12vw]",
      placeholder: { label: "Servilleta + cuchillo" },
    },
    {
      id: "bottle",
      src: wineAsset("bottle.png"),
      alt: "Botella de vino Edmar",
      zIndex: 40,
      kind: "object",
      className: "left-[20%] bottom-[18%] h-[42vh] w-[16vw] -translate-x-1/2",
      placeholder: { label: "Botella Edmar" },
    },
    {
      id: "wine-glass",
      src: wineAsset("wine-glass.png"),
      alt: "Copa de vino",
      zIndex: 39,
      kind: "object",
      className: "right-[26%] bottom-[19%] h-[30vh] w-[12vw] translate-x-1/2",
      placeholder: { label: "Copa de vino" },
    },
    {
      id: "golden-glow",
      src: wineAsset("golden-glow.png"),
      alt: "",
      zIndex: 45,
      kind: "overlay",
      className: "inset-0",
      placeholder: {
        label: "",
        style: {
          background:
            "radial-gradient(50% 45% at 35% 40%, rgba(255,206,128,0.28) 0%, rgba(255,206,128,0) 60%)",
          mixBlendMode: "screen",
        },
      },
    },
    {
      id: "particles",
      src: wineAsset("particles.png"),
      alt: "",
      zIndex: 46,
      kind: "overlay",
      className: "inset-0",
      placeholder: {
        label: "",
        style: {
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,240,210,0.5) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 70% 50%, rgba(255,240,210,0.35) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 45% 70%, rgba(255,240,210,0.3) 50%, transparent 51%)",
          mixBlendMode: "screen",
        },
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* EXPERIENCE NAVIGATOR — datos (se renderiza en Fase 2)               */
/* ------------------------------------------------------------------ */

export type ExperienceCard = {
  id: string;
  /** ID del producto existente → href = /{locale}/products/{productId} */
  productId: string;
  title: string;
  description: string;
  /** Imagen cuadrada de la tarjeta del navigator. */
  image: string;
};

export type ExperienceCategory = {
  id: "wine" | "adventure" | "discover";
  title: string;
  subtitle: string;
  cta: string;
  experiences: ExperienceCard[];
};

const navImage = (chapter: string, file: string) =>
  `${CINEMATIC_ASSETS_BASE}/${chapter}/nav/${file}`;

/**
 * Imagen cuadrada de una tarjeta del Experience Navigator.
 * TODO(assets): dejar los JPG reales en /public/cinematic/cards/.
 */
const cardImage = (file: string) => `${CINEMATIC_ASSETS_BASE}/cards/${file}`;

export const experienceCategories: Record<
  ExperienceCategory["id"],
  ExperienceCategory
> = {
  wine: {
    id: "wine",
    title: "Wine Tours & Bodegas",
    subtitle: "Experiencias seleccionadas en Mendoza",
    cta: "Explorar experiencias",
    experiences: [
      {
        id: "luxury-wine",
        productId: "luxury-wine-experience-bodega-boutique",
        title: "Luxury Wine Experience",
        description:
          "Bodega boutique, degustación guiada y una experiencia relajada entre viñedos.",
        image: cardImage("luxury-wine.jpg"),
      },
      {
        id: "private-transfers",
        productId: "private-winery-transfers-mendoza",
        title: "Traslados Privados a Bodegas",
        description:
          "Servicio privado para disfrutar bodegas de Maipú, Luján de Cuyo o Valle de Uco sin manejar.",
        image: cardImage("private-winery-transfers.jpg"),
      },
      {
        id: "valle-de-uco",
        productId: "valle-de-uco-cordon-del-plata",
        title: "Valle de Uco y Cordón del Plata",
        description:
          "Paisajes de montaña, cultura local y una ruta escénica por una de las regiones más imponentes de Mendoza.",
        image: cardImage("valle-de-uco.jpg"),
      },
      {
        id: "half-day",
        productId: "half-day-winery-tour-maipu",
        title: "Bodegas Medio Día",
        description:
          "Una salida simple y completa para conocer bodegas, degustaciones y sabores locales.",
        image: cardImage("half-day-winery.jpg"),
      },
    ],
  },
  adventure: {
    id: "adventure",
    title: "Adventure Mendoza",
    subtitle: "Libertad, naturaleza y la Mendoza más auténtica",
    cta: "Explorar experiencias",
    experiences: [
      {
        id: "cabalgata-picada",
        productId: "cabalgata-picada-potrerillos",
        title: "Cabalgata + Picada",
        description: "A caballo por Potrerillos seguido de una picada regional.",
        image: navImage("adventure", "cabalgata-picada.webp"),
      },
      {
        id: "andes-experience",
        productId: "andes-experience-horseback-sunset-picnic",
        title: "Andes Experience",
        description: "Cabalgata al atardecer con picnic frente a los Andes.",
        image: navImage("adventure", "andes-experience.webp"),
      },
      {
        id: "alta-montana",
        productId: "high-mountain-tour-mendoza",
        title: "Alta Montaña",
        description: "La ruta de los gigantes hasta el corazón de la cordillera.",
        image: navImage("adventure", "alta-montana.webp"),
      },
      {
        id: "trekking-cacheuta",
        productId: "epic-andes-adventure-trekking-hot-springs",
        title: "Trekking Cacheuta",
        description: "Senderismo andino y termas naturales para reconectar.",
        image: navImage("adventure", "trekking-cacheuta.webp"),
      },
    ],
  },
  discover: {
    id: "discover",
    title: "Discover Mendoza",
    subtitle: "La Mendoza urbana, joven y relajada",
    cta: "Explorar experiencias",
    experiences: [
      {
        id: "scooter-city-tour",
        productId: "mono-city-tour-mendoza",
        title: "Scooter City Tour",
        description: "Recorre la ciudad sobre dos ruedas eléctricas.",
        image: navImage("discover", "scooter-city-tour.webp"),
      },
      {
        id: "city-tour",
        productId: "city-tour-mendoza",
        title: "City Tour",
        description: "Plazas, parques y la historia viva de Mendoza.",
        image: navImage("discover", "city-tour.webp"),
      },
      {
        id: "villavicencio",
        productId: "villavicencio-nature-reserve-tour",
        title: "Villavicencio",
        description: "Reserva natural, manantiales y caminos serpenteantes.",
        image: navImage("discover", "villavicencio.webp"),
      },
    ],
  },
};
