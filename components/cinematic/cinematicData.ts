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
      layerId: "contact-shadow",
      // Sombra de contacto bajo botella/copa para anclarlas a la mesa.
      src: WINE_ASSETS.contactShadow,
      alt: "",
      zIndex: 14,
      kind: "effect",
      decorative: true,
      imageClassName: "opacity-60 mix-blend-multiply",
      className:
        "left-[45%] bottom-[24%] h-[8vh] w-[70vw] -translate-x-1/2 md:w-[42vw] md:h-[9vh]",
      placeholder: {
        style: {
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
        },
      },
    },
    {
      layerId: "cheese-board",
      // Tabla de quesos a la izquierda, sobre la superficie.
      src: WINE_ASSETS.cheeseBoard,
      alt: "Tabla de quesos regionales",
      zIndex: 18,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Tabla de quesos" },
    },
    {
      layerId: "grapes",
      // Uvas conectando la tabla de quesos con la base de la botella.
      src: WINE_ASSETS.grapes,
      alt: "Racimo de uvas",
      zIndex: 19,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Uvas" },
    },
    {
      layerId: "glass",
      // Copa emparejada con la botella, ligeramente a su derecha.
      src: WINE_ASSETS.glass,
      alt: "Copa de vino tinto",
      zIndex: 28,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Copa de vino" },
    },
    {
      layerId: "bottle",
      // Punto focal principal: botella Edmar, apoyada sobre la mesa.
      src: WINE_ASSETS.bottle,
      alt: "Botella de vino Edmar",
      zIndex: 30,
      kind: "object",
      className: "block",
      placeholder: { label: "Botella Edmar" },
    },
    // NOTA: la capa "particles" se reactivará cuando exista un PNG transparente
    // real en effects/wine-atmospheric-particles-01.png (zIndex 40, inset-0,
    // imageClassName "opacity-50 mix-blend-screen").
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
