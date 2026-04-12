/**
 * Canonical English PDP content — Private Winery Transfers, Mendoza (Edmar Travel).
 * Private transport service (not a guided winery tour).
 */
export const privateWineryTransfersMendozaEn = {
  title: "Private Winery Transfers – Mendoza",
  slug: "private-winery-transfers-mendoza",
  subtitle:
    "A discreet private car for up to four guests—so you can savour the vineyards, linger over lunch, and return relaxed. No driving. No clock-watching behind the wheel. Just the day, done properly.",
  shortDescription:
    "Premium private transfers for up to 4 passengers between Mendoza and the wine routes you choose. Two regional rates: Maipú / Luján de Cuyo or Valle de Uco. Comfort-first, safety-led, and built around your winery plans—not ours.",
  longDescription: [
    "The best wine days are unhurried. This service is the quiet layer that makes them possible: a private vehicle and professional driver dedicated to your group, whether you’re hopping between tastings, settling in for a long table lunch, or stretching the afternoon into golden hour.",
    "It is transport—not a guided tour. We don’t narrate the terroir from the passenger seat; we protect your time, your comfort, and your peace of mind. You choose the wineries (within the region covered by your booking), and we connect the dots with smooth, predictable logistics.",
    "Rates reflect distance and time on the road: Maipú and Luján de Cuyo sit closer to the city; Valle de Uco asks for a longer, scenic run into one of Argentina’s most celebrated valleys. Same vehicle, same cap of four passengers—clear pricing, no guesswork at the end of the day.",
  ].join("\n\n"),
  priceOptions: [
    {
      id: "maipu_lujan",
      label: "Maipú / Luján de Cuyo",
      price: 100_000,
      hint: "Ideal for classic routes near Mendoza capital—efficient, elegant, and easy to pair with tastings or lunch.",
    },
    {
      id: "valle_uco",
      label: "Valle de Uco",
      price: 140_000,
      hint: "Covers the longer run to the Uco Valley—room to breathe between stops and space for a full-day rhythm.",
    },
  ] as const,
  currency: "ARS" as const,
  duration:
    "Flexible — typically half-day or full-day, timed around your winery reservations (confirm window when booking)",
  location:
    "Mendoza wine country: Maipú, Luján de Cuyo, or Valle de Uco (per selected rate)",
  serviceType:
    "Private chauffeured transfers — vehicle and driver only; not a guided winery tour or tasting package",
  capacity: "Up to 4 passengers per vehicle (private use for your group)",
  languages:
    "Driver coordination in Spanish; English assistance available on request when booking",
  availability:
    "Subject to vehicle availability — advance booking recommended, especially weekends and harvest season",
  idealFor:
    "Couples, friends, and small groups who want a polished wine-country day without splitting focus between glasses and the road",
  quickFacts: [
    {
      label: "Service",
      value: "Private car & driver — not a shared shuttle",
    },
    {
      label: "Passengers",
      value: "Up to 4 passengers per booking",
    },
    {
      label: "Regions & rates",
      value: "Maipú / Luján de Cuyo AR$ 100.000 · Valle de Uco AR$ 140.000",
    },
    {
      label: "Focus",
      value: "Comfort, safety, and flexibility around your winery schedule",
    },
    {
      label: "Best for",
      value: "Wine tours, long lunches, and full-day tastings—without driving",
    },
  ],
  highlights: [
    "Private use: your vehicle, your itinerary window, your pace between stops.",
    "Designed for wine—sip, savour, and share bottles without a designated driver dilemma.",
    "Two transparent regional rates so distance and time on the road are reflected fairly.",
    "Premium, calm service: punctual handovers, tidy vehicle, and discretion as standard.",
    "Ideal bridge between Mendoza city and the estates you’ve already chosen to visit.",
  ],
  itinerary: [
    "Book your region (Maipú / Luján de Cuyo or Valle de Uco) and share your winery or lunch timings",
    "Pickup at your hotel or agreed point in Mendoza — meet your driver and confirm the day’s order of stops",
    "Private transfers between addresses in the selected wine region — wait times as agreed in advance",
    "Return to Mendoza when your last reservation ends — unhurried, with the day closed on your terms",
  ],
  includes: [
    "Private vehicle dedicated to your group (up to 4 passengers)",
    "Professional driver for the booked service window",
    "Fuel and route logistics within the selected regional rate",
    "Coordination by Edmar Travel ahead of your date",
  ],
  excludes: [
    "Winery reservations, tastings, tours, or cellar fees (arranged directly with each estate)",
    "Meals, wines, or service charges at wineries or restaurants",
    "Entrance fees or experiences not related to ground transport",
    "Gratuities (optional)",
    "Stops outside the booked region without prior agreement (may incur an adjustment)",
  ],
  practicalInfo: {
    whatToBring: [
      "Winery confirmation emails or names of estates for smooth routing",
      "Sun protection and a light layer—vineyards can be breezy even on warm days",
      "Government-issued ID if a winery requires it for visits",
    ],
    restrictions:
      "Maximum 4 passengers per vehicle. Child seats or special requirements—please request when booking.",
    weather:
      "Routes are drivable year-round; rare storms may affect timing—your driver will prioritise safety.",
    pickupDetails:
      "Pickup and drop-off points are confirmed after booking (typically central Mendoza hotels or an agreed address). Share any gate codes or access notes in advance.",
  },
  faq: [
    {
      question: "Is this a private service?",
      answer:
        "Yes. The vehicle is reserved exclusively for your party—no shared rides, no extra pickups en route unless agreed in writing when you book.",
    },
    {
      question: "How many people can travel?",
      answer:
        "Up to four passengers per vehicle. If your group is larger, ask us about a second vehicle or alternative arrangement.",
    },
    {
      question: "Are winery reservations included?",
      answer:
        "No. This is a transport service. You—or Edmar Travel, if you request concierge support separately—secure tastings, tours, and lunch slots directly with each winery. We’ll align the driving schedule to the times you provide.",
    },
    {
      question:
        "What is the difference between Maipú/Luján and Valle de Uco pricing?",
      answer:
        "Maipú and Luján de Cuyo are closer to Mendoza capital, with shorter road time. Valle de Uco is farther south-west, involving a longer transfer—hence the higher rate. Both options use the same vehicle capacity and private-service standard.",
    },
    {
      question: "Can I use this for lunch at a winery?",
      answer:
        "Absolutely—that’s one of the most popular ways to use the service. Share your lunch reservation time when booking so we can plan arrival, parking, and your return leg without rushing the table.",
    },
  ],
  seoTitle:
    "Private winery transfers in Mendoza | Up to 4 guests | Edmar Travel",
  metaDescription:
    "Private car service for up to 4 passengers to Maipú, Luján de Cuyo, or Valle de Uco. AR$ 100k / AR$ 140k by region. Comfort & safety—no driving. Book your wine day.",
  ctaTitle: "Reserve your private wine-country car",
  ctaText:
    "Tell us your dates, region, and winery schedule—we’ll confirm pickup details and tailor the day around your reservations.",
} as const;

export type PrivateWineryTransfersMendozaEn = typeof privateWineryTransfersMendozaEn;
