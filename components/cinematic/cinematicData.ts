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
export const wineScene: CinematicSceneDef = {
  id: "wine",
  cta: {
    title: "Wine Tours & Bodegas",
    button: "Explorar experiencias",
  },
  layers: [
    {
      layerId: "contact-shadow",
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
      src: WINE_ASSETS.cheeseBoard,
      alt: "Tabla de quesos regionales",
      zIndex: 18,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Tabla de quesos" },
    },
    {
      layerId: "grapes",
      src: WINE_ASSETS.grapes,
      alt: "Racimo de uvas",
      zIndex: 19,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Uvas" },
    },
    {
      layerId: "glass",
      src: WINE_ASSETS.glass,
      alt: "Copa de vino tinto",
      zIndex: 28,
      kind: "object",
      className: "hidden md:block",
      placeholder: { label: "Copa de vino" },
    },
    {
      layerId: "bottle",
      src: WINE_ASSETS.bottle,
      alt: "Botella de vino Edmar",
      zIndex: 30,
      kind: "object",
      className: "block",
      placeholder: { label: "Botella Edmar" },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* EXPERIENCE NAVIGATOR — datos por categoría (catálogo oficial: 10)   */
/* ------------------------------------------------------------------ */

export const experienceCategories: Record<SceneId, ExperienceCategory> = {
  wine: {
    id: "wine",
    title: "Wine Tours & Bodegas",
    subtitle: "Experiencias seleccionadas en Mendoza",
    cta: "Explorar experiencias",
    experiences: [
      {
        id: "half-day",
        productId: "half-day-winery-tour-maipu",
        title: "Tour Bodegas",
        description:
          "Media tarde por Maipú: 3 bodegas con degustación, aceite de oliva y traslado incluido.",
        image: WINE_CARD_IMAGES.halfDay,
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
        id: "luxury-wine",
        productId: "luxury-wine-experience-bodega-boutique",
        title: "Luxury Wine Experience",
        description:
          "Bodega boutique, degustación guiada y una experiencia relajada entre viñedos.",
        image: WINE_CARD_IMAGES.luxuryWine,
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
        id: "villavicencio",
        productId: "villavicencio-nature-reserve-tour",
        title: "Reserva Natural Villavicencio",
        description:
          "Naturaleza, historia y mirador en los caracoles de la precordillera.",
        image: "/assets/images/products/Villavicencio/villavicencio-4.webp",
      },
      {
        id: "canon-atuel",
        productId: "canon-del-atuel-san-rafael-tour",
        title: "Cañón del Atuel y San Rafael",
        description:
          "Ruta 40 al sur: San Rafael, el cañón y Valle Grande en día completo.",
        image: "/assets/images/products/CañonDelAtuel/cañon-del-atuel-3.webp",
      },
      {
        id: "andes-experience",
        productId: "andes-experience-horseback-sunset-picnic",
        title: "Andes Experience",
        description:
          "Alta montaña icónica + cabalgata y picnic con vino en Potrerillos.",
        image: ADVENTURE_CARD_IMAGES.andesExperience,
      },
      {
        id: "alta-montana",
        productId: "high-mountain-tour-mendoza",
        title: "Alta Montaña",
        description:
          "La ruta de los gigantes hasta el corazón de la cordillera.",
        image: ADVENTURE_CARD_IMAGES.altaMontana,
      },
      {
        id: "cabalgata-picada",
        productId: "cabalgata-picada-potrerillos",
        title: "Cabalgata + Picada",
        description: "A caballo por Potrerillos seguido de una picada regional.",
        image: ADVENTURE_CARD_IMAGES.cabalgataPicada,
      },
      {
        id: "trekking-cacheuta",
        productId: "epic-andes-adventure-trekking-hot-springs",
        title: "Trekking + Termas",
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
        title: "Mono City Tour",
        description: "Recorre la ciudad sobre monopatín eléctrico a tu ritmo.",
        image: DISCOVER_CARD_IMAGES.scooterCityTour,
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
