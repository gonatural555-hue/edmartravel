import type { TourismExperience } from "@/lib/product-types";
import { cabalgataPicadaPotrerillosEn } from "@/lib/pdp-entries/cabalgata-picada-potrerillos.en";
import { privateWineryTransfersMendozaEn } from "@/lib/pdp-entries/private-winery-transfers-mendoza.en";
import { luxuryWineExperienceBodegaBoutiqueEn } from "@/lib/pdp-entries/luxury-wine-experience-bodega-boutique.en";
import { andesExperienceHorsebackSunsetPicnicEn } from "@/lib/pdp-entries/andes-experience-horseback-sunset-picnic.en";
import { highMountainTourMendozaEn } from "@/lib/pdp-entries/high-mountain-tour-mendoza.en";
import { halfDayWineryTourMaipuEn } from "@/lib/pdp-entries/half-day-winery-tour-maipu.en";
import { canonDelAtuelSanRafaelTourEn } from "@/lib/pdp-entries/canon-del-atuel-san-rafael-tour.en";
import { villavicencioNatureReserveTourEn } from "@/lib/pdp-entries/villavicencio-nature-reserve-tour.en";
import { epicAndesAdventureTrekkingHotSpringsEn } from "@/lib/pdp-entries/epic-andes-adventure-trekking-hot-springs.en";

/**
 * Catálogo oficial Edmar Travel (9 experiencias públicas).
 * Fuente única para `getProducts` vía `lib/products.ts`.
 */
export const PRODUCTS_DATA: TourismExperience[] = [
  {
    id: "villavicencio-nature-reserve-tour",
    slug: villavicencioNatureReserveTourEn.slug,
    title: villavicencioNatureReserveTourEn.title,
    location: villavicencioNatureReserveTourEn.location,
    duration: villavicencioNatureReserveTourEn.duration,
    price: villavicencioNatureReserveTourEn.priceFrom,
    compareAtPrice: villavicencioNatureReserveTourEn.compareAtPrice,
    description: villavicencioNatureReserveTourEn.shortDescription,
    shortDescription: villavicencioNatureReserveTourEn.shortDescription,
    longDescription: villavicencioNatureReserveTourEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/Villavicencio/villavicencio-4.webp"],
    features: [...villavicencioNatureReserveTourEn.highlights],
    category: "adventure",
    difficulty: "easy",
    schedule: [...villavicencioNatureReserveTourEn.itinerary],
    translations: {
      es: {
        title: "Reserva Natural Villavicencio",
        description:
          "Conectá con la naturaleza en la precordillera. Recorremos senderos de flora y fauna autóctona junto a guías de la reserva, visitamos el centro de interpretación, la histórica estructura del Antiguo Hotel, su capilla y subimos los icónicos caracoles hasta el mirador.",
        shortDescription:
          "Tour a Villavicencio: naturaleza, historia y mirador en los caracoles. Retiros desde las 8:00. Entrada al parque aparte (~AR$ 10.000). Miércoles y sábados. AR$ 44.000 por persona.",
        seo: {
          title: "Tour Villavicencio desde Mendoza | Edmar Travel",
          description:
            "Media jornada en la reserva Villavicencio. Consultá fechas y tarifas de entrada.",
        },
      },
    },
  },
  {
    id: "canon-del-atuel-san-rafael-tour",
    slug: canonDelAtuelSanRafaelTourEn.slug,
    title: canonDelAtuelSanRafaelTourEn.title,
    location: canonDelAtuelSanRafaelTourEn.location,
    duration: canonDelAtuelSanRafaelTourEn.duration,
    price: canonDelAtuelSanRafaelTourEn.priceFrom,
    compareAtPrice: canonDelAtuelSanRafaelTourEn.compareAtPrice,
    description: canonDelAtuelSanRafaelTourEn.shortDescription,
    shortDescription: canonDelAtuelSanRafaelTourEn.shortDescription,
    longDescription: canonDelAtuelSanRafaelTourEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/CañonDelAtuel/cañon-del-atuel-3.webp"],
    features: [...canonDelAtuelSanRafaelTourEn.highlights],
    category: "adventure",
    difficulty: "easy",
    schedule: [...canonDelAtuelSanRafaelTourEn.itinerary],
    translations: {
      es: {
        title: "Cañón del Atuel y San Rafael",
        description:
          "¡Nos vamos al sur mendocino! Un viaje imperdible por la Ruta 40 para explorar la ciudad de San Rafael, el histórico Cañón del Atuel y el impresionante Valle Grande. Tiempo libre para almorzar o sumar actividades opcionales de pura adrenalina como catamarán o rafting.",
        shortDescription:
          "Día completo al sur: San Rafael, Cañón del Atuel y Valle Grande. Regreso ~21:00. Opcionales con costo aparte. Jueves y domingos. AR$ 88.000 por persona.",
        seo: {
          title: "Tour Cañón del Atuel y San Rafael desde Mendoza | Edmar Travel",
          description:
            "Excursión de día completo al Cañón del Atuel y Valle Grande. Consultá fechas y disponibilidad.",
        },
      },
    },
  },
  {
    id: "andes-experience-horseback-sunset-picnic",
    slug: andesExperienceHorsebackSunsetPicnicEn.slug,
    title: andesExperienceHorsebackSunsetPicnicEn.title,
    location: andesExperienceHorsebackSunsetPicnicEn.location,
    duration: andesExperienceHorsebackSunsetPicnicEn.duration,
    price: andesExperienceHorsebackSunsetPicnicEn.priceFrom,
    description: andesExperienceHorsebackSunsetPicnicEn.shortDescription,
    shortDescription: andesExperienceHorsebackSunsetPicnicEn.shortDescription,
    longDescription: andesExperienceHorsebackSunsetPicnicEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/hero/storysection.webp"],
    features: [...andesExperienceHorsebackSunsetPicnicEn.highlights],
    category: "adventure",
    difficulty: "easy",
    schedule: [...andesExperienceHorsebackSunsetPicnicEn.itinerary],
    translations: {
      es: {
        title: "Andes Experience + Cabalgata y Picnic al Atardecer",
        description:
          "Una experiencia completa que combina lo mejor de la montaña mendocina: recorrido por Alta Montaña (Uspallata, Puente del Inca, Aconcagua) y cierre en Potrerillos con cabalgata guiada, picada regional y copa de vino frente al dique. Salidas diarias.",
        shortDescription:
          "Día completo: ruta cordillerana icónica + cabalgata en Potrerillos y picnic con vino frente al dique. Traslados incluidos. AR$ 180.000 por persona.",
        seo: {
          title:
            "Tour Alta Montaña + cabalgata y picnic Potrerillos | Edmar Travel",
          description:
            "Experiencia full day en los Andes mendocinos y cierre en Potrerillos. Traslados desde la ciudad. Consultá fechas y disponibilidad.",
        },
      },
    },
  },
  {
    id: "high-mountain-tour-mendoza",
    slug: highMountainTourMendozaEn.slug,
    title: highMountainTourMendozaEn.title,
    location: highMountainTourMendozaEn.location,
    duration: highMountainTourMendozaEn.duration,
    price: highMountainTourMendozaEn.priceFrom,
    description: highMountainTourMendozaEn.shortDescription,
    shortDescription: highMountainTourMendozaEn.shortDescription,
    longDescription: highMountainTourMendozaEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/HighMountainTour/tour-alta-montaña-1.webp"],
    features: [...highMountainTourMendozaEn.highlights],
    category: "adventure",
    difficulty: "easy",
    schedule: [...highMountainTourMendozaEn.itinerary],
    translations: {
      es: {
        title: "Alta Montaña",
        description:
          "¿Ganas de escapar de la rutina y rodearte de picos nevados? Sumate a nuestro Full Day por la Alta Montaña mendocina. Más que un tour, es una experiencia social perfecta para compartir mates, anécdotas y conocer gente copada de todos lados.",
        shortDescription:
          "Tour de alta montaña desde Mendoza: Aconcagua, Puente del Inca, Uspallata, Potrerillos y postales inolvidables. Traslados desde las 7:15. AR$ 95.000 por persona. Salidas diarias.",
        seo: {
          title: "Tour Alta Montaña Mendoza | Aconcagua | Edmar Travel",
          description:
            "Día completo por la cordillera: Uspallata, Puente del Inca, Aconcagua y más. Salidas diarias. Consultá disponibilidad.",
        },
      },
    },
  },
  {
    id: "half-day-winery-tour-maipu",
    slug: halfDayWineryTourMaipuEn.slug,
    title: halfDayWineryTourMaipuEn.title,
    location: halfDayWineryTourMaipuEn.location,
    duration: halfDayWineryTourMaipuEn.duration,
    price: halfDayWineryTourMaipuEn.priceFrom,
    description: halfDayWineryTourMaipuEn.shortDescription,
    shortDescription: halfDayWineryTourMaipuEn.shortDescription,
    longDescription: halfDayWineryTourMaipuEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/HalfDayWine/tour-bodega-medio-dia-1.webp"],
    features: [...halfDayWineryTourMaipuEn.highlights],
    category: "wine",
    difficulty: "easy",
    schedule: [...halfDayWineryTourMaipuEn.itinerary],
    translations: {
      es: {
        title: "Tour Bodegas",
        description:
          "¿Ganas de un plan relajado con una copa en la mano? Sumate a nuestra salida de medio día por los caminos del vino. Es el escenario perfecto para disfrutar, relajarse y conocer gente con onda mientras brindamos con lo mejor de nuestra tierra.",
        shortDescription:
          "Media tarde por Maipú: 3 bodegas con degustación, fábrica de aceite de oliva y traslado ida y vuelta. AR$ 53.000 por persona. Lunes a sábado, 14:00–20:00.",
        seo: {
          title: "Tour de bodegas Mendoza | Edmar Travel",
          description:
            "Circuito por Maipú con degustaciones incluidas. Salidas de lunes a sábado. Reservá con Edmar Travel.",
        },
      },
    },
  },
  {
    id: "cabalgata-picada-potrerillos",
    slug: cabalgataPicadaPotrerillosEn.slug,
    title: cabalgataPicadaPotrerillosEn.title,
    location: cabalgataPicadaPotrerillosEn.location,
    duration: cabalgataPicadaPotrerillosEn.duration,
    price: cabalgataPicadaPotrerillosEn.priceFrom,
    description: cabalgataPicadaPotrerillosEn.shortDescription,
    shortDescription: cabalgataPicadaPotrerillosEn.shortDescription,
    longDescription: cabalgataPicadaPotrerillosEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/hero/storysection.webp"],
    features: [...cabalgataPicadaPotrerillosEn.highlights],
    category: "adventure",
    difficulty: "easy",
    schedule: [...cabalgataPicadaPotrerillosEn.itinerary],
    variants: {
      type: "shift",
      label: "Departure",
      default: "morning",
      options: [
        { label: "Morning · 10:00–15:00", value: "morning" },
        { label: "Afternoon · 15:00–20:30", value: "afternoon" },
      ],
    },
    translations: {
      es: {
        title: "Cabalgata + Picada – Potrerillos",
        description:
          "Cabalgata guiada por la montaña con vistas únicas a la cordillera. Recorrido de 2 horas por Potrerillos a cargo de Los Camperitos, finalizando con picada regional y copa de vino frente al Dique.",
        shortDescription:
          "Cabalgata de 2 h en Potrerillos con picada regional y vino frente al dique. Traslado desde Mendoza centro. AR$ 130.000 por persona. Salidas diarias.",
        seo: {
          title: "Cabalgata y picada en Potrerillos | Edmar Travel Mendoza",
          description:
            "Cabalgata guiada en Potrerillos con Los Camperitos, picada regional y copa de vino frente al dique. Traslados desde Mendoza. Salidas diarias.",
        },
      },
    },
  },
  {
    id: "epic-andes-adventure-trekking-hot-springs",
    slug: epicAndesAdventureTrekkingHotSpringsEn.slug,
    title: epicAndesAdventureTrekkingHotSpringsEn.title,
    location: epicAndesAdventureTrekkingHotSpringsEn.location,
    duration: epicAndesAdventureTrekkingHotSpringsEn.duration,
    price: epicAndesAdventureTrekkingHotSpringsEn.priceFrom,
    description: epicAndesAdventureTrekkingHotSpringsEn.shortDescription,
    shortDescription: epicAndesAdventureTrekkingHotSpringsEn.shortDescription,
    longDescription: epicAndesAdventureTrekkingHotSpringsEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/AndesTreckingHot/trekkingmendoza.webp"],
    features: [...epicAndesAdventureTrekkingHotSpringsEn.highlights],
    category: "adventure",
    difficulty: "medium",
    schedule: [...epicAndesAdventureTrekkingHotSpringsEn.itinerary],
    translations: {
      es: {
        title: "Trekking + Termas",
        description:
          "¿Estás para un plan diferente? Salimos de la rutina para meternos de lleno en los Andes y Potrerillos. Trekking guiado de 5 km, vistas increíbles, almuerzo incluido, fotos y seguro contra accidentes.",
        shortDescription:
          "Aventura en Cacheuta: trekking + termas. 9:00 a 19:00. AR$ 95.000 por persona. Dificultad moderada / desafiante.",
        seo: {
          title: "Trekking y termas Cacheuta | Edmar Travel",
          description:
            "Aventura de día completo en los Andes mendocinos. Consultá disponibilidad.",
        },
      },
    },
  },
  {
    id: "private-winery-transfers-mendoza",
    slug: privateWineryTransfersMendozaEn.slug,
    title: privateWineryTransfersMendozaEn.title,
    location: privateWineryTransfersMendozaEn.location,
    duration: privateWineryTransfersMendozaEn.duration,
    price: privateWineryTransfersMendozaEn.priceOptions[0].price,
    description: privateWineryTransfersMendozaEn.shortDescription,
    shortDescription: privateWineryTransfersMendozaEn.shortDescription,
    longDescription: privateWineryTransfersMendozaEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/trasladobodegas/traslado-bodegas-8.webp"],
    features: [...privateWineryTransfersMendozaEn.highlights],
    category: "wine",
    difficulty: "easy",
    schedule: [...privateWineryTransfersMendozaEn.itinerary],
    variants: {
      type: "region",
      label: "Wine region",
      default: "maipu_lujan",
      options: [
        {
          label: "Maipú / Luján de Cuyo · AR$ 100.000",
          value: "maipu_lujan",
          priceModifier: 0,
        },
        {
          label: "Valle de Uco · AR$ 140.000",
          value: "valle_uco",
          priceModifier: 40_000,
        },
      ],
    },
    translations: {
      es: {
        title: "Traslados Privados a Bodegas",
        description:
          "Seguridad y servicio premium. Traslados privados en auto de hasta 4 personas. Ideal para wine tours, almuerzos en bodega y experiencias de día completo sin manejar.",
        shortDescription:
          "Traslados privados a bodegas (hasta 4 personas). Maipú/Luján AR$ 100.000 · Valle de Uco AR$ 140.000. No incluye visitas guiadas ni reservas en bodegas.",
        seo: {
          title: "Traslados privados a bodegas en Mendoza | Edmar Travel",
          description:
            "Servicio de auto privado para circuitos vitivinícolas en Mendoza. Hasta 4 pasajeros. Tarifas Maipú/Luján y Valle de Uco. Reservá tu día de bodegas.",
        },
      },
    },
  },
  {
    id: "luxury-wine-experience-bodega-boutique",
    slug: luxuryWineExperienceBodegaBoutiqueEn.slug,
    title: luxuryWineExperienceBodegaBoutiqueEn.title,
    location: luxuryWineExperienceBodegaBoutiqueEn.location,
    duration: luxuryWineExperienceBodegaBoutiqueEn.duration,
    price: luxuryWineExperienceBodegaBoutiqueEn.priceFrom,
    description: luxuryWineExperienceBodegaBoutiqueEn.shortDescription,
    shortDescription: luxuryWineExperienceBodegaBoutiqueEn.shortDescription,
    longDescription: luxuryWineExperienceBodegaBoutiqueEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/trasladobodegas/traslado-bodegas-5.webp"],
    features: [...luxuryWineExperienceBodegaBoutiqueEn.highlights],
    category: "wine",
    difficulty: "easy",
    schedule: [...luxuryWineExperienceBodegaBoutiqueEn.itinerary],
    translations: {
      es: {
        title: "Luxury Wine Experience – Bodega Boutique",
        description:
          "Una experiencia relajada y elegante para quienes buscan disfrutar el vino como se merece: visita a bodega boutique, degustación guiada y tabla de quesos y fiambres. Traslados desde Mendoza centro.",
        shortDescription:
          "Experiencia de vino boutique media mañana: visita, degustación guiada y tabla de quesos y charcutería. Traslado desde Mendoza. AR$ 140.000 por persona.",
        seo: {
          title: "Experiencia de vino boutique en Mendoza | Edmar Travel",
          description:
            "Media jornada en bodega boutique en Mendoza: degustación, quesos y fiambres, traslados desde la ciudad. Reservá con Edmar Travel.",
        },
      },
    },
  },
];
