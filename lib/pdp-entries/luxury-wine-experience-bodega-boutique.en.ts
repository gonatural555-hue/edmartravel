/**
 * Canonical English PDP — Luxury Wine Experience, boutique winery (Edmar Travel).
 * Half-day premium wine visit with tasting + cheese & charcuterie.
 */
export const luxuryWineExperienceBodegaBoutiqueEn = {
  title: "Luxury Wine Experience – Bodega Boutique",
  slug: "luxury-wine-experience-bodega-boutique",
  subtitle:
    "A composed half-day in a premium boutique winery—unhurried tasting, thoughtful pairings, and the quiet confidence of a small-scale estate where every glass feels considered.",
  shortDescription:
    "Elegant half-day wine experience at a hand-picked boutique winery: guided visit, curated tasting, and a cheese & charcuterie board—plus private round-trip transport from central Mendoza. Designed for travelers who favour craft over crowds.",
  longDescription: [
    "This is wine country at its most intentional. We work with a boutique bodega where production stays human-scaled, architecture whispers rather than shouts, and the tasting room feels like an invitation—not a conveyor belt. The pace is relaxed: time to look at the vines, understand the cellar logic, and taste with clarity.",
    "Your host guides you through a structured tasting of estate wines, selected to show range and character without excess. Mid-morning light, polished glassware, and a curated cheese and charcuterie board turn the moment into something shareable: a refined pause, ideal for couples or a close circle of friends.",
    "Round-trip transportation from central Mendoza (hotel or meeting point) keeps the day seamless. From pickup to return, the experience is framed as a single, elegant arc—roughly four hours from 9:00 to 13:00—so you can plan the rest of your afternoon in Mendoza without rush.",
  ].join("\n\n"),
  priceFrom: 140_000,
  currency: "ARS" as const,
  duration: "Half day (~4 h) · 9:00–13:00 including transfers",
  location: "Premium boutique winery — Mendoza wine region (estate confirmed upon booking)",
  difficulty: "Easy — seated tasting; short walking segments at the estate",
  groupSize:
    "Intimate groups; ideal for couples and small groups of friends (capacity confirmed when booking)",
  languages: "Spanish & English (subject to winery host availability; confirm when booking)",
  availability:
    "Subject to boutique winery schedule — advance reservation recommended, especially weekends and harvest",
  idealFor:
    "Couples, design-minded travelers, and small groups seeking a refined, low-volume wine moment without the feel of a mass-market circuit",
  quickFacts: [
    {
      label: "Format",
      value: "Half-day boutique winery experience · 9:00–13:00",
    },
    {
      label: "Tasting",
      value: "Guided flight of estate wines",
    },
    {
      label: "Pairing",
      value: "Curated cheese & charcuterie board",
    },
    {
      label: "Transfers",
      value: "Round-trip from central Mendoza (hotel or meeting point)",
    },
    {
      label: "Style",
      value: "Boutique estate — quality over volume",
    },
    {
      label: "Price",
      value: "AR$ 140.000 per person",
    },
  ],
  highlights: [
    "Boutique scale: fewer guests, more attention to detail in the glass and on the estate.",
    "Guided tasting with structure—aromas, terroir, and style without the noise of a packed hall.",
    "Cheese and charcuterie board curated to complement the wines, not overwhelm them.",
    "Private transport from Mendoza city so the day stays elegant from door to door.",
    "A half-day window that feels complete: enough depth, still time left for your afternoon.",
  ],
  itinerary: [
    "09:00 — Pickup from central Mendoza (hotel or agreed meeting point)",
    "Arrival & welcome — introduction to the boutique winery and its philosophy",
    "Estate walk-through — vines, cellar, or production highlights (as opened by the winery)",
    "Guided tasting — curated flight of wines with host commentary",
    "Cheese & charcuterie board — served as part of the tasting experience",
    "~13:00 — Return transfer to Mendoza",
  ],
  includes: [
    "Round-trip transportation from central Mendoza (hotel or meeting point)",
    "Visit to a premium boutique winery",
    "Guided wine tasting (estate wines)",
    "Curated cheese and charcuterie board",
    "Coordination by Edmar Travel",
  ],
  excludes: [
    "Additional bottles or purchases beyond the tasting (available at cellar door where offered)",
    "Full lunch or à la carte dining unless explicitly added",
    "Gratuities (optional)",
    "Personal travel insurance",
  ],
  practicalInfo: {
    whatToBring: [
      "Smart-casual attire; comfortable shoes for short outdoor segments",
      "Light layer—cellars can be cool even on warm days",
      "Government-issued ID if required by the winery",
    ],
    restrictions:
      "Legal drinking age applies for alcohol service. Dietary restrictions for the board—please advise at booking.",
    weather:
      "Mendoza is typically dry and sunny; morning visits favour soft light and pleasant temperatures.",
    pickupDetails:
      "Exact pickup time and address are confirmed after booking (central Mendoza hotels or fixed meeting point).",
  },
  faq: [
    {
      question: "Is transportation included?",
      answer:
        "Yes. Round-trip private transfers from central Mendoza are included, with pickup at your hotel or an agreed meeting point. Locations outside the central area may require a surcharge—ask when you book.",
    },
    {
      question: "What is included in the tasting?",
      answer:
        "You’ll enjoy a guided tasting of the estate’s wines, hosted by the winery team. The exact selection follows the winery’s current releases and vintages—always aligned with the boutique, small-production character of the estate.",
    },
    {
      question: "Is this suitable for couples?",
      answer:
        "Very much so. The intimate scale of a boutique winery, the composed pacing, and the shared board make it a natural fit for a romantic or celebratory morning out.",
    },
    {
      question: "How long does the experience last?",
      answer:
        "The experience runs from approximately 9:00 to 13:00—a half-day including transfers. Minor timing adjustments may occur depending on traffic or winery logistics.",
    },
    {
      question: "Is food included?",
      answer:
        "Yes. A curated cheese and charcuterie board is included as part of the tasting experience. It is not a full restaurant lunch; if you’d like to add a meal, we can advise on options separately.",
    },
  ],
  seoTitle:
    "Luxury boutique winery experience in Mendoza | Tasting & charcuterie | Edmar Travel",
  metaDescription:
    "Half-day luxury wine experience at a boutique Mendoza winery: guided tasting, cheese & charcuterie board, transfers from the city. AR$ 140.000 pp. Book with Edmar Travel.",
  ctaTitle: "Reserve your boutique wine morning",
  ctaText:
    "Share your travel dates and preferred language—we’ll confirm the estate, pickup time, and any dietary notes before you arrive.",
} as const;

export type LuxuryWineExperienceBodegaBoutiqueEn =
  typeof luxuryWineExperienceBodegaBoutiqueEn;
