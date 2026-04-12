import type { ExperienceRichContent } from "@/lib/experience-model";
import type { Locale } from "@/lib/i18n/config";
import { RICH_ES } from "@/lib/experience-rich/locale-es";
import { RICH_FR } from "@/lib/experience-rich/locale-fr";
import { RICH_IT } from "@/lib/experience-rich/locale-it";
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

const POTRERILLOS: ExperienceRichContent = {
  subtitle: cabalgataPicadaPotrerillosEn.subtitle,
  badges: [
    "Daily departures",
    "Los Camperitos",
    "Transfer included",
    "Beginner-friendly",
  ],
  whyLove: [...cabalgataPicadaPotrerillosEn.highlights],
  editorial: cabalgataPicadaPotrerillosEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Los Camperitos stables, Potrerillos",
    "High trails with Andean views",
    "Picnic & wine by Potrerillos Dam",
  ],
  included: [...cabalgataPicadaPotrerillosEn.includes],
  excluded: [...cabalgataPicadaPotrerillosEn.excludes],
  practical: {
    whatToBring: [...cabalgataPicadaPotrerillosEn.practicalInfo.whatToBring],
    restrictions: cabalgataPicadaPotrerillosEn.practicalInfo.restrictions,
    weather: cabalgataPicadaPotrerillosEn.practicalInfo.weather,
    pickupDetails: cabalgataPicadaPotrerillosEn.practicalInfo.pickupDetails,
  },
  faq: cabalgataPicadaPotrerillosEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Helena & Tom",
      text: "Unhurried ride, stunning light on the water, and the picnic felt personal—not a packaged lunch.",
      rating: 5,
    },
  ],
  language: cabalgataPicadaPotrerillosEn.languages,
  groupSize: cabalgataPicadaPotrerillosEn.groupSize,
  season: "Year-round (subject to weather & stable availability)",
  pickup: "Central Mendoza — hotel or agreed meeting point",
  cancellation:
    "Per voucher terms; ask at booking for changes, holds, or weather-related options.",
};

const MONO_CITY: ExperienceRichContent = {
  subtitle: monoCityTourMendozaEn.subtitle,
  badges: [
    "Self-guided",
    "E-scooter",
    "Helmet + map",
    "Two daily slots",
  ],
  whyLove: [...monoCityTourMendozaEn.highlights],
  editorial: monoCityTourMendozaEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Mendoza’s five main plazas",
    "Downtown streets & urban landmarks",
    "Lake loop in Parque General San Martín",
  ],
  included: [...monoCityTourMendozaEn.includes],
  excluded: [...monoCityTourMendozaEn.excludes],
  practical: {
    whatToBring: [...monoCityTourMendozaEn.practicalInfo.whatToBring],
    restrictions: monoCityTourMendozaEn.practicalInfo.restrictions,
    weather: monoCityTourMendozaEn.practicalInfo.weather,
    pickupDetails: monoCityTourMendozaEn.practicalInfo.pickupDetails,
  },
  faq: monoCityTourMendozaEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Nico & Flo",
      text: "Felt like the city unlocked—no tour bus, just us, the park, and the lake.",
      rating: 5,
    },
  ],
  language: monoCityTourMendozaEn.languages,
  groupSize: monoCityTourMendozaEn.groupSize,
  season: "Year-round (subject to weather & operator availability)",
  pickup: "Central Mendoza — meeting point confirmed at booking",
  cancellation:
    "Per voucher terms; ask at booking for changes or weather-related holds.",
};

const WINERY_TRANSFERS: ExperienceRichContent = {
  subtitle: privateWineryTransfersMendozaEn.subtitle,
  badges: [
    "Private vehicle",
    "Up to 4 guests",
    "Regional rates",
    "Driver included",
  ],
  whyLove: [...privateWineryTransfersMendozaEn.highlights],
  editorial: privateWineryTransfersMendozaEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Maipú wine routes",
    "Luján de Cuyo",
    "Valle de Uco estates",
  ],
  included: [...privateWineryTransfersMendozaEn.includes],
  excluded: [...privateWineryTransfersMendozaEn.excludes],
  practical: {
    whatToBring: [...privateWineryTransfersMendozaEn.practicalInfo.whatToBring],
    restrictions: privateWineryTransfersMendozaEn.practicalInfo.restrictions,
    weather: privateWineryTransfersMendozaEn.practicalInfo.weather,
    pickupDetails: privateWineryTransfersMendozaEn.practicalInfo.pickupDetails,
  },
  faq: privateWineryTransfersMendozaEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Alex & Jordan",
      text: "We could finally book a long lunch and a second tasting—knowing the drive home was sorted.",
      rating: 5,
    },
  ],
  language: privateWineryTransfersMendozaEn.languages,
  groupSize: privateWineryTransfersMendozaEn.capacity,
  season: "Year-round (subject to availability)",
  pickup: "Mendoza city — hotel or agreed address (confirmed at booking)",
  cancellation:
    "Per voucher terms; regional rate locked at booking unless otherwise agreed.",
};

const LUXURY_BOUTIQUE_WINE: ExperienceRichContent = {
  subtitle: luxuryWineExperienceBodegaBoutiqueEn.subtitle,
  badges: [
    "Boutique winery",
    "Half day",
    "Tasting + board",
    "Transfers included",
  ],
  whyLove: [...luxuryWineExperienceBodegaBoutiqueEn.highlights],
  editorial: luxuryWineExperienceBodegaBoutiqueEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Boutique estate & tasting room",
    "Vineyard or cellar (per winery programme)",
    "Setting for cheese & charcuterie service",
  ],
  included: [...luxuryWineExperienceBodegaBoutiqueEn.includes],
  excluded: [...luxuryWineExperienceBodegaBoutiqueEn.excludes],
  practical: {
    whatToBring: [
      ...luxuryWineExperienceBodegaBoutiqueEn.practicalInfo.whatToBring,
    ],
    restrictions: luxuryWineExperienceBodegaBoutiqueEn.practicalInfo.restrictions,
    weather: luxuryWineExperienceBodegaBoutiqueEn.practicalInfo.weather,
    pickupDetails:
      luxuryWineExperienceBodegaBoutiqueEn.practicalInfo.pickupDetails,
  },
  faq: luxuryWineExperienceBodegaBoutiqueEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Camille & James",
      text: "Understated luxury—the kind of morning where the wine, the light, and the table all felt in sync.",
      rating: 5,
    },
  ],
  language: luxuryWineExperienceBodegaBoutiqueEn.languages,
  groupSize: luxuryWineExperienceBodegaBoutiqueEn.groupSize,
  season: "Year-round (subject to winery availability)",
  pickup: "Central Mendoza — hotel or agreed meeting point",
  cancellation:
    "Per voucher terms; boutique estates may require notice for changes—confirm at booking.",
};

const ANDES_HORSE_PICNIC: ExperienceRichContent = {
  subtitle: andesExperienceHorsebackSunsetPicnicEn.subtitle,
  badges: [
    "Full day",
    "Daily departures",
    "Andes + Potrerillos",
    "Transfers included",
  ],
  whyLove: [...andesExperienceHorsebackSunsetPicnicEn.highlights],
  editorial: andesExperienceHorsebackSunsetPicnicEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Uspallata & Penitentes",
    "Puente del Inca · Aconcagua Provincial Park",
    "Las Cuevas (lunch window)",
    "Potrerillos — horseback & dam picnic",
  ],
  included: [...andesExperienceHorsebackSunsetPicnicEn.includes],
  excluded: [...andesExperienceHorsebackSunsetPicnicEn.excludes],
  practical: {
    whatToBring: [
      ...andesExperienceHorsebackSunsetPicnicEn.practicalInfo.whatToBring,
    ],
    restrictions: andesExperienceHorsebackSunsetPicnicEn.practicalInfo.restrictions,
    weather: andesExperienceHorsebackSunsetPicnicEn.practicalInfo.weather,
    pickupDetails:
      andesExperienceHorsebackSunsetPicnicEn.practicalInfo.pickupDetails,
  },
  faq: andesExperienceHorsebackSunsetPicnicEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Marina & Greg",
      text: "The scale of the mountains, then the quiet trail and wine by the water—this day earned every hour.",
      rating: 5,
    },
  ],
  language: andesExperienceHorsebackSunsetPicnicEn.languages,
  groupSize: andesExperienceHorsebackSunsetPicnicEn.groupSize,
  season: "Year-round with seasonal routing (Cristo Redentor summer-only if open)",
  pickup: "Central Mendoza — hotel pickups from ~7:15 (confirmed at booking)",
  cancellation:
    "Per voucher terms; mountain weather may force changes—confirm policy when booking.",
};

const HIGH_MOUNTAIN_TOUR: ExperienceRichContent = {
  subtitle: highMountainTourMendozaEn.subtitle,
  badges: [
    "Full day",
    "Classic route",
    "Aconcagua viewpoints",
    "Daily departures",
  ],
  whyLove: [...highMountainTourMendozaEn.highlights],
  editorial: highMountainTourMendozaEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Cacheuta & Potrerillos",
    "Uspallata · Penitentes",
    "Puente del Inca · Aconcagua Provincial Park",
    "Las Cuevas · (Cristo Redentor seasonal)",
  ],
  included: [...highMountainTourMendozaEn.includes],
  excluded: [...highMountainTourMendozaEn.excludes],
  practical: {
    whatToBring: [...highMountainTourMendozaEn.practicalInfo.whatToBring],
    restrictions: highMountainTourMendozaEn.practicalInfo.restrictions,
    weather: highMountainTourMendozaEn.practicalInfo.weather,
    pickupDetails: highMountainTourMendozaEn.practicalInfo.pickupDetails,
  },
  faq: highMountainTourMendozaEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Elena R.",
      text: "Every stop had a reason—we arrived back tired in the best way, with hundreds of photos and zero logistics stress.",
      rating: 5,
    },
  ],
  language: highMountainTourMendozaEn.languages,
  groupSize: highMountainTourMendozaEn.groupSize,
  season: "Year-round departures (Cristo Redentor segment summer-only if open)",
  pickup: "Mendoza hotels — from ~7:15 (city pickup rounds ~45 min)",
  cancellation:
    "Per voucher terms; itinerary may change for safety—confirm when booking.",
};

const HALF_DAY_MAIPU_WINE: ExperienceRichContent = {
  subtitle: halfDayWineryTourMaipuEn.subtitle,
  badges: [
    "Half-day PM",
    "4 visits",
    "Tastings included",
    "Maipú classic",
  ],
  whyLove: [...halfDayWineryTourMaipuEn.highlights],
  editorial: halfDayWineryTourMaipuEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Artisanal winery — Maipú",
    "Industrial winery — Maipú",
    "Olive oil factory",
    "Sweet-wine winery",
  ],
  included: [...halfDayWineryTourMaipuEn.includes],
  excluded: [...halfDayWineryTourMaipuEn.excludes],
  practical: {
    whatToBring: [...halfDayWineryTourMaipuEn.practicalInfo.whatToBring],
    restrictions: halfDayWineryTourMaipuEn.practicalInfo.restrictions,
    weather: halfDayWineryTourMaipuEn.practicalInfo.weather,
    pickupDetails: halfDayWineryTourMaipuEn.practicalInfo.pickupDetails,
  },
  faq: halfDayWineryTourMaipuEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Priya & Sam",
      text: "Sweet wine and olive oil in the same afternoon—Maipú made sense in one go.",
      rating: 5,
    },
  ],
  language: halfDayWineryTourMaipuEn.languages,
  groupSize: halfDayWineryTourMaipuEn.groupSize,
  season: "Year-round (Mon–Sat; subject to winery availability)",
  pickup: "Mendoza hotels — pickups from ~14:00 (city rounds ~45 min)",
  cancellation:
    "Per voucher terms; confirm changes with Edmar Travel in advance.",
};

const ATUEL_SAN_RAFAEL: ExperienceRichContent = {
  subtitle: canonDelAtuelSanRafaelTourEn.subtitle,
  badges: [
    "Full day",
    "Route 40 south",
    "Atuel Canyon",
    "Thu & Sun",
  ],
  whyLove: [...canonDelAtuelSanRafaelTourEn.highlights],
  editorial: canonDelAtuelSanRafaelTourEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "San Rafael — city & historic quarter",
    "Cañón del Atuel",
    "Valle Grande (optional activities)",
  ],
  included: [...canonDelAtuelSanRafaelTourEn.includes],
  excluded: [...canonDelAtuelSanRafaelTourEn.excludes],
  practical: {
    whatToBring: [...canonDelAtuelSanRafaelTourEn.practicalInfo.whatToBring],
    restrictions: canonDelAtuelSanRafaelTourEn.practicalInfo.restrictions,
    weather: canonDelAtuelSanRafaelTourEn.practicalInfo.weather,
    pickupDetails: canonDelAtuelSanRafaelTourEn.practicalInfo.pickupDetails,
  },
  faq: canonDelAtuelSanRafaelTourEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Chris & Mira",
      text: "We came for wine—this day reminded us Mendoza is mountains and rivers too.",
      rating: 5,
    },
  ],
  language: canonDelAtuelSanRafaelTourEn.languages,
  groupSize: canonDelAtuelSanRafaelTourEn.groupSize,
  season: "Thu & Sun departures (subject to season & demand)",
  pickup: "Mendoza hotels — from ~07:00 (city rounds ~45 min)",
  cancellation:
    "Per voucher terms; long-distance day—confirm changes early with Edmar Travel.",
};

const VILLAVICENCIO_RESERVE: ExperienceRichContent = {
  subtitle: villavicencioNatureReserveTourEn.subtitle,
  badges: [
    "Half day",
    "Nature reserve",
    "Historic hotel",
    "Wed & Sat",
  ],
  whyLove: [...villavicencioNatureReserveTourEn.highlights],
  editorial: villavicencioNatureReserveTourEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Villavicencio Natural Reserve trails",
    "Interpretation centre",
    "Historic hotel grounds & chapel · caracoles viewpoint",
  ],
  included: [...villavicencioNatureReserveTourEn.includes],
  excluded: [...villavicencioNatureReserveTourEn.excludes],
  practical: {
    whatToBring: [
      ...villavicencioNatureReserveTourEn.practicalInfo.whatToBring,
    ],
    restrictions: villavicencioNatureReserveTourEn.practicalInfo.restrictions,
    weather: villavicencioNatureReserveTourEn.practicalInfo.weather,
    pickupDetails: villavicencioNatureReserveTourEn.practicalInfo.pickupDetails,
  },
  faq: villavicencioNatureReserveTourEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Isabel T.",
      text: "Finally a Mendoza morning that wasn’t about grapes—just wind, light, and those old hotel walls.",
      rating: 5,
    },
  ],
  language: villavicencioNatureReserveTourEn.languages,
  groupSize: villavicencioNatureReserveTourEn.groupSize,
  season: "Wed & Sat departures (subject to reserve opening hours)",
  pickup: "Mendoza hotels — from ~08:00 (city rounds ~45 min)",
  cancellation:
    "Per voucher terms; reserve policies may affect access—confirm when booking.",
};

const CITY_TOUR_MENDOZA: ExperienceRichContent = {
  subtitle: cityTourMendozaEn.subtitle,
  badges: [
    "Half day",
    "Classic route",
    "Plazas & park",
    "Tue · Thu · Sat",
  ],
  whyLove: [...cityTourMendozaEn.highlights],
  editorial: cityTourMendozaEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Foundational quarter & main plazas",
    "Civic district",
    "Parque General San Martín",
    "Cerro de la Gloria",
  ],
  included: [...cityTourMendozaEn.includes],
  excluded: [...cityTourMendozaEn.excludes],
  practical: {
    whatToBring: [...cityTourMendozaEn.practicalInfo.whatToBring],
    restrictions: cityTourMendozaEn.practicalInfo.restrictions,
    weather: cityTourMendozaEn.practicalInfo.weather,
    pickupDetails: cityTourMendozaEn.practicalInfo.pickupDetails,
  },
  faq: cityTourMendozaEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Daniel K.",
      text: "We finally understood the grid—San Martín and the hill view made the rest of the trip click.",
      rating: 5,
    },
  ],
  language: cityTourMendozaEn.languages,
  groupSize: cityTourMendozaEn.groupSize,
  season: "Year-round (Tue, Thu, Sat departures)",
  pickup: "Mendoza hotels — from ~08:30 (confirmed at booking)",
  cancellation:
    "Per voucher terms; notify changes in advance when possible.",
};

const VALLE_UCO_CORDON_PLATA: ExperienceRichContent = {
  subtitle: valleDeUcoCordonDelPlataEn.subtitle,
  badges: [
    "Full day",
    "Valle de Uco",
    "Scenic + optional wine",
    "Fridays",
  ],
  whyLove: [...valleDeUcoCordonDelPlataEn.highlights],
  editorial: valleDeUcoCordonDelPlataEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Cristo Rey viewpoint",
    "Manzano Histórico",
    "Valle de Uco productive corridor",
    "Bodega Atamisque (optional tasting)",
  ],
  included: [...valleDeUcoCordonDelPlataEn.includes],
  excluded: [...valleDeUcoCordonDelPlataEn.excludes],
  practical: {
    whatToBring: [...valleDeUcoCordonDelPlataEn.practicalInfo.whatToBring],
    restrictions: valleDeUcoCordonDelPlataEn.practicalInfo.restrictions,
    weather: valleDeUcoCordonDelPlataEn.practicalInfo.weather,
    pickupDetails: valleDeUcoCordonDelPlataEn.practicalInfo.pickupDetails,
  },
  faq: valleDeUcoCordonDelPlataEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [
    {
      name: "Sophie & Marc",
      text: "We wanted the Uco without a packed tasting schedule—the drive and the light were enough; Atamisque was the cherry on top.",
      rating: 5,
    },
  ],
  language: valleDeUcoCordonDelPlataEn.languages,
  groupSize: valleDeUcoCordonDelPlataEn.groupSize,
  season: "Fridays + possible seasonal departures",
  pickup: "Mendoza — departure ~07:30 (confirm at booking)",
  cancellation:
    "Per voucher terms; winery optional fees may change—confirm when booking.",
};

const EPIC_ANDES_TREK_THERMAL: ExperienceRichContent = {
  subtitle: epicAndesAdventureTrekkingHotSpringsEn.subtitle,
  badges: [
    "Available soon",
    "Limited spots",
    "Trek + hot springs",
    "Cacheuta",
  ],
  whyLove: [...epicAndesAdventureTrekkingHotSpringsEn.highlights],
  editorial: epicAndesAdventureTrekkingHotSpringsEn.longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
  places: [
    "Cacheuta trailheads & viewpoints",
    "Andes & Potrerillos panoramas",
    "Thermal pools",
  ],
  included: [...epicAndesAdventureTrekkingHotSpringsEn.includes],
  excluded: [...epicAndesAdventureTrekkingHotSpringsEn.excludes],
  practical: {
    whatToBring: [
      ...epicAndesAdventureTrekkingHotSpringsEn.practicalInfo.whatToBring,
    ],
    restrictions: epicAndesAdventureTrekkingHotSpringsEn.practicalInfo.restrictions,
    weather: epicAndesAdventureTrekkingHotSpringsEn.practicalInfo.weather,
    pickupDetails:
      epicAndesAdventureTrekkingHotSpringsEn.practicalInfo.pickupDetails,
  },
  faq: epicAndesAdventureTrekkingHotSpringsEn.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
  testimonials: [],
  language: epicAndesAdventureTrekkingHotSpringsEn.languages,
  groupSize: epicAndesAdventureTrekkingHotSpringsEn.groupSize,
  season: "Launching soon — dates released in waves",
  pickup: "Mendoza — ~09:00 departure (confirmed when booking opens)",
  cancellation:
    "Per voucher terms; confirm with Edmar Travel when reservations go live.",
};

const BY_ID: Record<string, ExperienceRichContent> = {
  "cabalgata-picada-potrerillos": POTRERILLOS,
  "mono-city-tour-mendoza": MONO_CITY,
  "private-winery-transfers-mendoza": WINERY_TRANSFERS,
  "luxury-wine-experience-bodega-boutique": LUXURY_BOUTIQUE_WINE,
  "andes-experience-horseback-sunset-picnic": ANDES_HORSE_PICNIC,
  "high-mountain-tour-mendoza": HIGH_MOUNTAIN_TOUR,
  "half-day-winery-tour-maipu": HALF_DAY_MAIPU_WINE,
  "canon-del-atuel-san-rafael-tour": ATUEL_SAN_RAFAEL,
  "villavicencio-nature-reserve-tour": VILLAVICENCIO_RESERVE,
  "city-tour-mendoza": CITY_TOUR_MENDOZA,
  "valle-de-uco-cordon-del-plata": VALLE_UCO_CORDON_PLATA,
  "epic-andes-adventure-trekking-hot-springs": EPIC_ANDES_TREK_THERMAL,
};

const RICH_BY_LOCALE: Record<
  Exclude<Locale, "en">,
  Record<string, ExperienceRichContent>
> = {
  es: RICH_ES,
  fr: RICH_FR,
  it: RICH_IT,
};

/**
 * Contenido editorial enriquecido para la PDP. `en` usa la base inglesa;
 * `es` / `fr` / `it` usan mapas dedicados con fallback al inglés si falta una entrada.
 */
export function getExperienceRichContent(
  productId: string,
  locale: Locale
): ExperienceRichContent | null {
  const en = BY_ID[productId];
  if (!en) return null;
  if (locale === "en") return en;
  return RICH_BY_LOCALE[locale][productId] ?? en;
}
