import type { TourismExperience } from "@/lib/product-types";
import { cabalgataPicadaPotrerillosEn } from "@/lib/pdp-entries/cabalgata-picada-potrerillos.en";
import { monoCityTourMendozaEn } from "@/lib/pdp-entries/mono-city-tour-mendoza.en";
import { privateWineryTransfersMendozaEn } from "@/lib/pdp-entries/private-winery-transfers-mendoza.en";
import { luxuryWineExperienceBodegaBoutiqueEn } from "@/lib/pdp-entries/luxury-wine-experience-bodega-boutique.en";
import { andesExperienceHorsebackSunsetPicnicEn } from "@/lib/pdp-entries/andes-experience-horseback-sunset-picnic.en";
import { highMountainTourMendozaEn } from "@/lib/pdp-entries/high-mountain-tour-mendoza.en";
import { halfDayWineryTourMaipuEn } from "@/lib/pdp-entries/half-day-winery-tour-maipu.en";
import { canonDelAtuelSanRafaelTourEn } from "@/lib/pdp-entries/canon-del-atuel-san-rafael-tour.en";
import { villavicencioNatureReserveTourEn } from "@/lib/pdp-entries/villavicencio-nature-reserve-tour.en";
import { cityTourMendozaEn } from "@/lib/pdp-entries/city-tour-mendoza.en";
import { valleDeUcoCordonDelPlataEn } from "@/lib/pdp-entries/valle-de-uco-cordon-del-plata.en";
import { epicAndesAdventureTrekkingHotSpringsEn } from "@/lib/pdp-entries/epic-andes-adventure-trekking-hot-springs.en";

/**
 * Catálogo de experiencias (fuente única para `getProducts` vía `lib/products.ts`).
 */
export const PRODUCTS_DATA: TourismExperience[] = [
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
        { label: "Morning · 8:30–13:00", value: "morning" },
        { label: "Afternoon · 16:00–20:30", value: "afternoon" },
      ],
    },
    translations: {
      es: {
        title: "Cabalgata + Picada – Potrerillos",
        description:
          "Cabalgata guiada en Potrerillos con vistas cordilleranas, operada por Los Camperitos, con picada regional y copa de vino frente al Dique de Potrerillos. Traslados desde Mendoza centro incluidos; salidas mañana o tarde.",
        shortDescription:
          "Cabalgata en Potrerillos con vistas de montaña, picada regional y vino frente al dique. Traslado desde Mendoza centro. Ideal para principiantes.",
        seo: {
          title: "Cabalgata y picada en Potrerillos | Edmar Travel Mendoza",
          description:
            "Cabalgata guiada de 1 h en Potrerillos con Los Camperitos, picada regional y copa de vino frente al dique. Traslados desde Mendoza. Salidas diarias.",
        },
      },
    },
  },
  {
    id: "mono-city-tour-mendoza",
    slug: monoCityTourMendozaEn.slug,
    title: monoCityTourMendozaEn.title,
    location: monoCityTourMendozaEn.location,
    duration: monoCityTourMendozaEn.duration,
    price: monoCityTourMendozaEn.priceOptions[0].price,
    description: monoCityTourMendozaEn.shortDescription,
    shortDescription: monoCityTourMendozaEn.shortDescription,
    longDescription: monoCityTourMendozaEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/MonoCityTour/featuredmonocitytour.webp"],
    features: [...monoCityTourMendozaEn.highlights],
    category: "city",
    difficulty: "easy",
    schedule: [...monoCityTourMendozaEn.itinerary],
    variants: [
      {
        type: "scooter",
        label: "Scooter",
        default: "small",
        options: [
          {
            label: "Small · AR$ 20.000",
            value: "small",
            priceModifier: 0,
          },
          {
            label: "Large · AR$ 25.000",
            value: "large",
            priceModifier: 5_000,
          },
        ],
      },
      {
        type: "session",
        label: "Session",
        default: "morning",
        options: [
          {
            label: "11:00–12:30",
            value: "morning",
            priceModifier: 0,
          },
          {
            label: "17:00–18:30",
            value: "afternoon",
            priceModifier: 0,
          },
        ],
      },
    ],
    translations: {
      es: {
        title: "Scooter City Tour – Mendoza",
        description:
          "Experiencia en monopatín eléctrico autoguiada: cinco plazas, centro y vuelta al lago en el Parque San Martín. Casco y mapa incluidos. Dos turnos diarios.",
        shortDescription:
          "Recorré Mendoza en monopatín eléctrico a tu ritmo: plazas, centro y lago en el Parque San Martín. Sin guía. Chico AR$ 20.000 · Grande AR$ 25.000.",
        seo: {
          title: "Mono City Tour Mendoza | Monopatín eléctrico | Edmar Travel",
          description:
            "City tour en monopatín eléctrico autoguiado en Mendoza. Plazas, centro y Parque San Martín. Casco y mapa. Dos horarios. Reservá tu turno.",
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
        title: "Traslados privados a bodegas – Mendoza",
        description:
          "Auto privado con conductor para hasta 4 pasajeros hacia Maipú, Luján de Cuyo o Valle de Uco. Tarifas por región. Comodidad y seguridad para disfrutar el vino sin manejar.",
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
          "Media jornada en una bodega boutique premium: visita guiada, degustación y tabla de quesos y fiambres. Traslados desde Mendoza centro. Ideal para parejas y grupos pequeños.",
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
          "Jornada completa en alta montaña (Uspallata, Puente del Inca, Aconcagua, Las Cuevas, etc.) y cierre en Potrerillos: cabalgata guiada y picnic regional con vino frente al dique. Salidas diarias. Traslados desde Mendoza centro. Almuerzo no incluido.",
        shortDescription:
          "Día completo: ruta cordillerana icónica + cabalgata en Potrerillos y picnic con vino frente al dique. Traslados incluidos. AR$ 150.000 por persona. Cristo Redentor sujeto a temporada y condiciones.",
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
        title: "Tour Alta Montaña – Mendoza",
        description:
          "Circuito clásico de día completo: Cacheuta, Potrerillos, Uspallata, Puente del Inca, Parque Aconcagua, Las Cuevas. Almuerzo no incluido. Cristo Redentor solo en verano y sujeto a condiciones. Salidas de lunes a domingo.",
        shortDescription:
          "Tour de alta montaña desde Mendoza: los paisajes más icónicos de los Andes. Traslados desde hoteles desde las 7:15. AR$ 86.000 por persona. Almuerzo no incluido.",
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
        title: "Tour de bodegas media tarde – Maipú",
        description:
          "Recorrido introductorio por Maipú: bodega artesanal, bodega industrial, fábrica de aceite de oliva y bodega de vinos dulces. 4 visitas. Entradas y degustaciones incluidas. Retiros desde hoteles desde las 14:00. Lunes a sábado.",
        shortDescription:
          "Media tarde en Maipú: 4 paradas, vino, aceite y vino dulce. Todo incluido en la tarifa. AR$ 48.000 por persona. Regreso ~20:00.",
        seo: {
          title: "Tour de bodegas Maipú media tarde | Edmar Travel",
          description:
            "Circuito por Maipú con degustaciones incluidas. Salidas de lunes a sábado. Reservá con Edmar Travel.",
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
        title: "Cañón del Atuel y San Rafael – Tour día completo",
        description:
          "Excursión desde Mendoza a San Rafael y el Cañón del Atuel por Ruta 40. Ciudad e histórico, cañón y tiempo libre en Valle Grande (catamarán o rafting opcional, no incluido). Salidas jueves y domingos. AR$ 99.000 por persona.",
        shortDescription:
          "Día completo al sur: San Rafael, Cañón del Atuel y Valle Grande. ~3 h de viaje. Regreso ~21:00. Opcionales con costo aparte. Jueves y domingos.",
        seo: {
          title: "Tour Cañón del Atuel y San Rafael desde Mendoza | Edmar Travel",
          description:
            "Excursión de día completo al Cañón del Atuel y Valle Grande. Consultá fechas y disponibilidad.",
        },
      },
    },
  },
  {
    id: "villavicencio-nature-reserve-tour",
    slug: villavicencioNatureReserveTourEn.slug,
    title: villavicencioNatureReserveTourEn.title,
    location: villavicencioNatureReserveTourEn.location,
    duration: villavicencioNatureReserveTourEn.duration,
    price: villavicencioNatureReserveTourEn.priceFrom,
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
        title: "Tour Reserva Natural Villavicencio",
        description:
          "Media mañana en la Reserva Natural Villavicencio: senderos con guías, centro de interpretación, hotel histórico y capilla, subida a los caracoles. Entrada a la reserva no incluida (~AR$ 25.000). Salidas miércoles y sábados. AR$ 50.000 por persona el tour.",
        shortDescription:
          "Tour a Villavicencio: naturaleza, historia y mirador en los caracoles. Retiros desde las 8:00. Entrada al parque aparte. Miércoles y sábados.",
        seo: {
          title: "Tour Villavicencio desde Mendoza | Edmar Travel",
          description:
            "Media jornada en la reserva Villavicencio. Consultá fechas y tarifas de entrada.",
        },
      },
    },
  },
  {
    id: "city-tour-mendoza",
    slug: cityTourMendozaEn.slug,
    title: cityTourMendozaEn.title,
    location: cityTourMendozaEn.location,
    duration: cityTourMendozaEn.duration,
    price: cityTourMendozaEn.priceFrom,
    description: cityTourMendozaEn.shortDescription,
    shortDescription: cityTourMendozaEn.shortDescription,
    longDescription: cityTourMendozaEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/CityTour/city-tour-1.webp"],
    features: [...cityTourMendozaEn.highlights],
    category: "city",
    difficulty: "easy",
    schedule: [...cityTourMendozaEn.itinerary],
    translations: {
      es: {
        title: "City Tour – Mendoza",
        description:
          "Tour urbano media mañana: ciudad fundacional, plazas, distrito cívico, Parque General San Martín y Cerro de la Gloria. Retiros desde hoteles desde las 8:30. Martes, jueves y sábados. AR$ 31.000 por persona.",
        shortDescription:
          "Recorrido clásico por Mendoza: historia, plazas, parque y mirador. Ideal para empezar el viaje. Martes, jueves y sábados.",
        seo: {
          title: "City Tour Mendoza | Edmar Travel",
          description:
            "Media jornada por la ciudad: plazas, Parque San Martín y Cerro de la Gloria. Reservá tu tour.",
        },
      },
    },
  },
  {
    id: "valle-de-uco-cordon-del-plata",
    slug: valleDeUcoCordonDelPlataEn.slug,
    title: valleDeUcoCordonDelPlataEn.title,
    location: valleDeUcoCordonDelPlataEn.location,
    duration: valleDeUcoCordonDelPlataEn.duration,
    price: valleDeUcoCordonDelPlataEn.priceFrom,
    description: valleDeUcoCordonDelPlataEn.shortDescription,
    shortDescription: valleDeUcoCordonDelPlataEn.shortDescription,
    longDescription: valleDeUcoCordonDelPlataEn.longDescription
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    images: ["/assets/images/products/ValleDeUco/valle-uco.webp"],
    features: [...valleDeUcoCordonDelPlataEn.highlights],
    category: "wine",
    difficulty: "easy",
    schedule: [...valleDeUcoCordonDelPlataEn.itinerary],
    translations: {
      es: {
        title: "Valle de Uco y Cordón del Plata",
        description:
          "Día escénico en Valle de Uco: Cristo Rey, Manzano Histórico, corredor productivo y parada en Bodega Atamisque (degustación opcional, no incluida). Almuerzo no incluido. Salidas viernes. AR$ 86.000 por persona el tour.",
        shortDescription:
          "Tour de día completo al Valle de Uco con vistas al Cordón del Plata. Parada en Atamisque (extra). Almuerzo aparte. Viernes. ~7:30 a ~17:00.",
        seo: {
          title: "Tour Valle de Uco y Cordón del Plata | Edmar Travel",
          description:
            "Circuito escénico por el Valle de Uco desde Mendoza. Consultá fechas y opcionales.",
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
    comingSoon: true,
    translations: {
      es: {
        title: "Epic Andes Adventure – Trekking + Termas",
        description:
          "Día completo en Cacheuta: trekking moderado a exigente (~5 km), vistas a los Andes y Potrerillos, termas al final. Incluye traslado, almuerzo, fotos y seguro de accidentes. Cupos limitados — próximamente disponible.",
        shortDescription:
          "Aventura en Cacheuta: trekking + termas. ~9:00 a ~19:00. Próximamente — consultá lista de espera. AR$ 95.000 por persona.",
        seo: {
          title: "Trekking y termas Cacheuta | Epic Andes | Edmar Travel",
          description:
            "Aventura de día completo en los Andes mendocinos. Próximamente. Consultá disponibilidad.",
        },
      },
    },
  },
];
