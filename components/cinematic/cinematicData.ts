import {
  ADVENTURE_CARD_IMAGES,
  DISCOVER_CARD_IMAGES,
  WINE_ASSETS,
  WINE_CARD_IMAGES,
} from "./cinematicAssets";
import type {
  CinematicSceneDef,
  ExperienceCategory,
  SceneId,
} from "./types";

/* ------------------------------------------------------------------ */
/* SCENE 01 — WINE TOURS & BODEGAS                                     */
/* ------------------------------------------------------------------ */
/*
 * Orden de capas (de fondo a frente). Cada capa expone `layerId`
 * (→ data-layer) para que la futura coreografía de scroll pueda
 * targetearla por separado. Las posiciones viven en `className` para
 * poder refinar la composición fácilmente.
 */
export const wineScene: CinematicSceneDef = {
  id: "wine",
  cta: {
    title: "Wine Tours & Bodegas",
    button: "Explorar experiencias",
  },
  layers: [
    {
      layerId: "background",
      src: WINE_ASSETS.background,
      alt: "Cordillera de los Andes nevada en la hora dorada sobre Mendoza",
      zIndex: 0,
      kind: "background",
      className: "inset-0",
      priority: true,
      placeholder: {
        style: {
          background:
            "linear-gradient(180deg, #f6c77a 0%, #e7a35a 26%, #b9805a 46%, #6f5a55 64%, #3a3b41 100%)",
        },
      },
    },
    {
      layerId: "warm-glow",
      src: WINE_ASSETS.warmGlow,
      alt: "",
      zIndex: 5,
      kind: "effect",
      decorative: true,
      className:
        "left-1/2 bottom-[12%] h-[52vh] w-[70vw] -translate-x-1/2 md:left-[34%] md:w-[44vw]",
      placeholder: {
        style: {
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,201,120,0.32) 0%, rgba(255,201,120,0) 65%)",
          mixBlendMode: "screen",
        },
      },
    },
    {
      layerId: "table",
      src: WINE_ASSETS.table,
      alt: "Mesa premium de nogal oscuro",
      zIndex: 10,
      kind: "foreground",
      className: "inset-x-0 bottom-0 h-[38%] md:h-[42%]",
      placeholder: {
        style: {
          background:
            "linear-gradient(180deg, #2a1a12 0%, #1c120c 60%, #120b07 100%)",
        },
      },
    },
    {
      layerId: "contact-shadow",
      src: WINE_ASSETS.contactShadow,
      alt: "",
      zIndex: 15,
      kind: "effect",
      decorative: true,
      className: "inset-x-[12%] bottom-[33%] h-[9%] md:inset-x-[20%]",
      placeholder: {
        style: {
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)",
        },
      },
    },
    {
      layerId: "cheese-board",
      src: WINE_ASSETS.cheeseBoard,
      alt: "Tabla de quesos regionales",
      zIndex: 20,
      kind: "object",
      className: "hidden md:block left-[8%] bottom-[15%] h-[15vh] w-[16vw]",
      placeholder: { label: "Tabla de quesos" },
    },
    {
      layerId: "grapes",
      src: WINE_ASSETS.grapes,
      alt: "Racimo de uvas",
      zIndex: 21,
      kind: "object",
      className: "hidden md:block left-[21%] bottom-[13%] h-[10vh] w-[9vw]",
      placeholder: { label: "Uvas" },
    },
    {
      layerId: "dish-b",
      src: WINE_ASSETS.dishB,
      alt: "Plato gastronómico",
      zIndex: 22,
      kind: "object",
      className: "hidden lg:block right-[22%] bottom-[12%] h-[11vh] w-[13vw]",
      placeholder: { label: "Plato B" },
    },
    {
      layerId: "dish-a",
      src: WINE_ASSETS.dishA,
      alt: "Plato gastronómico",
      zIndex: 23,
      kind: "object",
      className: "hidden md:block right-[8%] bottom-[15%] h-[13vh] w-[15vw]",
      placeholder: { label: "Plato A" },
    },
    {
      layerId: "napkin-knife",
      src: WINE_ASSETS.napkinKnife,
      alt: "Servilleta y cuchillo",
      zIndex: 24,
      kind: "object",
      className: "hidden lg:block right-[33%] bottom-[11%] h-[8vh] w-[11vw]",
      placeholder: { label: "Servilleta + cuchillo" },
    },
    {
      layerId: "bottle",
      src: WINE_ASSETS.bottle,
      alt: "Botella de vino Edmar",
      zIndex: 30,
      kind: "object",
      className:
        "left-1/2 bottom-[19%] h-[36vh] w-[52vw] -translate-x-1/2 md:left-[34%] md:bottom-[17%] md:h-[44vh] md:w-[18vw]",
      placeholder: { label: "Botella Edmar" },
    },
    {
      layerId: "glass",
      src: WINE_ASSETS.glass,
      alt: "Copa de vino tinto",
      zIndex: 31,
      kind: "object",
      className:
        "hidden md:block left-[50%] bottom-[18%] h-[31vh] w-[11vw] -translate-x-1/2",
      placeholder: { label: "Copa de vino" },
    },
    {
      layerId: "particles",
      src: WINE_ASSETS.particles,
      alt: "",
      zIndex: 40,
      kind: "overlay",
      decorative: true,
      className: "inset-0",
      placeholder: {
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
/* EXPERIENCE NAVIGATOR — datos por categoría                          */
/* ------------------------------------------------------------------ */

export const experienceCategories: Record<SceneId, ExperienceCategory> = {
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
        image: WINE_CARD_IMAGES.luxuryWine,
      },
      {
        id: "private-transfers",
        productId: "private-winery-transfers-mendoza",
        title: "Traslados Privados a Bodegas",
        description:
          "Servicio privado para disfrutar bodegas de Maipú, Luján de Cuyo o Valle de Uco sin manejar.",
        image: WINE_CARD_IMAGES.privateTransfers,
      },
      {
        id: "valle-de-uco",
        productId: "valle-de-uco-cordon-del-plata",
        title: "Valle de Uco y Cordón del Plata",
        description:
          "Paisajes de montaña, cultura local y una ruta escénica por una de las regiones más imponentes de Mendoza.",
        image: WINE_CARD_IMAGES.valleDeUco,
      },
      {
        id: "half-day",
        productId: "half-day-winery-tour-maipu",
        title: "Bodegas Medio Día",
        description:
          "Una salida simple y completa para conocer bodegas, degustaciones y sabores locales.",
        image: WINE_CARD_IMAGES.halfDay,
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
        image: ADVENTURE_CARD_IMAGES.cabalgataPicada,
      },
      {
        id: "andes-experience",
        productId: "andes-experience-horseback-sunset-picnic",
        title: "Andes Experience",
        description: "Cabalgata al atardecer con picnic frente a los Andes.",
        image: ADVENTURE_CARD_IMAGES.andesExperience,
      },
      {
        id: "alta-montana",
        productId: "high-mountain-tour-mendoza",
        title: "Alta Montaña",
        description: "La ruta de los gigantes hasta el corazón de la cordillera.",
        image: ADVENTURE_CARD_IMAGES.altaMontana,
      },
      {
        id: "trekking-cacheuta",
        productId: "epic-andes-adventure-trekking-hot-springs",
        title: "Trekking Cacheuta",
        description: "Senderismo andino y termas naturales para reconectar.",
        image: ADVENTURE_CARD_IMAGES.trekkingCacheuta,
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
        image: DISCOVER_CARD_IMAGES.scooterCityTour,
      },
      {
        id: "city-tour",
        productId: "city-tour-mendoza",
        title: "City Tour",
        description: "Plazas, parques y la historia viva de Mendoza.",
        image: DISCOVER_CARD_IMAGES.cityTour,
      },
      {
        id: "villavicencio",
        productId: "villavicencio-nature-reserve-tour",
        title: "Villavicencio",
        description: "Reserva natural, manantiales y caminos serpenteantes.",
        image: DISCOVER_CARD_IMAGES.villavicencio,
      },
    ],
  },
};

export type { SceneId } from "./types";
export type {
  CinematicSceneDef,
  ExperienceCard,
  ExperienceCategory,
  SceneLayerDef,
} from "./types";
