/**
 * Canonical English PDP — City Tour, Mendoza (Edmar Travel).
 * Classic half-day urban introduction: foundations, plazas, park, Cerro de la Gloria.
 */
export const cityTourMendozaEn = {
  title: "City Tour – Mendoza",
  slug: "city-tour-mendoza",
  subtitle:
    "Read Mendoza in layers: the grid where the city was born, the plazas that still organise civic life, the green exhale of Parque San Martín, and the monument panorama from Cerro de la Gloria—one relaxed half-day that turns the map into memory.",
  shortDescription:
    "Classic half-day city tour: foundational quarter, modern centre with main plazas, civic district, Parque General San Martín, and Cerro de la Gloria. Hotel pickups from 8:30; return ~13:00. Tuesdays, Thursdays & Saturdays. AR$ 31.000 per person — ideal first contact with Mendoza.",
  longDescription: [
    "Mendoza is a city designed to be walked: wide avenues, shade where it matters, and plazas that feel like open-air living rooms. This tour connects the city’s origin story with the rhythm of today—where institutions meet cafés, and where the Andes first announce themselves from a hilltop monument.",
    "You’ll begin in the foundational area, where the urban plan reveals how settlers organised life around water and squares. From there, the route opens into the newer city fabric—main plazas, pedestrian energy, and the civic district where public buildings frame daily Mendoza. The pace stays conversational: context, orientation, and space to photograph.",
    "Parque General San Martín offers the green counterpoint—avenues of trees, lakes, and the scale of a park big enough to feel like a landscape. The morning closes at Cerro de la Gloria, with views that stitch the city to the cordillera. It’s the classic introduction travellers still recommend after their first night in town.",
  ].join("\n\n"),
  priceFrom: 31_000,
  currency: "ARS" as const,
  duration:
    "Half day · ~08:30 hotel pickup · ~13:00 return (~4.5 h including transfers)",
  location: "Greater Mendoza city — historic core, centre, park & Cerro de la Gloria",
  difficulty: "Easy — short walks at stops; steps or gentle slopes at Cerro de la Gloria",
  groupSize:
    "Scheduled group departures (confirm capacity when booking)",
  languages:
    "Spanish-led with English support where available — confirm when booking",
  availability: "Departures on Tuesdays, Thursdays, and Saturdays",
  idealFor:
    "First-time visitors, short stays, and anyone who wants bearings, history, and photo-friendly viewpoints before heading to wine country or the mountains",
  quickFacts: [
    {
      label: "Pickup",
      value: "From ~08:30 at Mendoza hotels (exact window confirmed at booking)",
    },
    { label: "Return", value: "~13:00 (approximate)" },
    {
      label: "Route",
      value:
        "Foundational area · main plazas & new city · civic district · Parque San Martín · Cerro de la Gloria",
    },
    { label: "Style", value: "Classic guided city tour with vehicle segments" },
    { label: "Price", value: "AR$ 31.000 per person" },
    { label: "Departures", value: "Tuesdays, Thursdays, Saturdays" },
  ],
  highlights: [
    "Contrast in one morning: colonial foundations beside a modern, plaza-centred centre.",
    "Civic district: understand how Mendoza organises public life and identity.",
    "Parque General San Martín: trees, scale, and the city’s green lung.",
    "Cerro de la Gloria: iconic monument setting with Andean backdrop.",
    "Friendly orientation—perfect before wineries, trekking, or self-guided days.",
  ],
  itinerary: [
    "~08:30 — Pickups at hotels in Mendoza (schedule confirmed at booking)",
    "Foundational area — origins of the urban grid and early city layout",
    "New city & main plazas — pedestrian heart, landmarks, contemporary Mendoza",
    "Civic district — government and institutional architecture",
    "Parque General San Martín — scenic drive/walk through the park’s key sectors",
    "Cerro de la Gloria — viewpoint and monument (time for photos)",
    "~13:00 — Drop-off in Mendoza (approximate; order may vary)",
  ],
  includes: [
    "Round-trip transport from Mendoza hotels on the tour route",
    "Guided sightseeing as per programme",
    "Coordination by Edmar Travel",
  ],
  excludes: [
    "Meals, snacks, or beverages",
    "Museum or attraction tickets not specified in the programme",
    "Gratuities (optional)",
    "Hotel outside standard pickup zone unless agreed when booking",
  ],
  practicalInfo: {
    whatToBring: [
      "Comfortable walking shoes and light daypack",
      "Sun protection — Mendoza mornings are bright year-round",
      "Camera or phone with charge; light layer for breeze on Cerro de la Gloria",
      "Cash or card if you wish to buy drinks during short free moments",
    ],
    restrictions:
      "Some sectors may involve stairs or uneven paths at the viewpoint—inform us of mobility needs when booking.",
    weather:
      "Generally dry; carry water. In summer, hats are essential.",
    pickupDetails:
      "Pickup time and hotel access notes are confirmed after booking—please be ready at the agreed lobby time.",
  },
  faq: [
    {
      question: "What places are included?",
      answer:
        "The tour covers Mendoza’s foundational area, the modern centre with its main plazas, the civic district, Parque General San Martín, and Cerro de la Gloria with its viewpoint and monument. The exact order and time at each stop may vary slightly with traffic and group pace.",
    },
    {
      question: "Is this a good first tour in Mendoza?",
      answer:
        "Yes. It’s designed as a classic orientation: history, urban design, green spaces, and a panoramic finish—so you understand the city before deeper dives into wine routes or the Andes.",
    },
    {
      question: "How long does it last?",
      answer:
        "About four and a half hours from pickup to return, with a target finish around 13:00. Timing can shift slightly with hotel pickups and traffic.",
    },
    {
      question: "Is transportation included?",
      answer:
        "Yes. The tour includes vehicle transport between sectors and hotel pickup/drop-off within the standard Mendoza programme. If you stay far outside the usual zone, ask us when booking.",
    },
    {
      question: "What should I bring?",
      answer:
        "Comfortable shoes, sun protection, water, and a camera. A light jacket helps on Cerro de la Gloria if the wind picks up.",
    },
  ],
  seoTitle:
    "Mendoza city tour | Plazas, San Martín park & Cerro de la Gloria | Edmar Travel",
  metaDescription:
    "Half-day Mendoza city tour: foundational area, plazas, civic district, Parque San Martín, Cerro de la Gloria. From AR$ 31k. Pickup 8:30. Tue, Thu, Sat.",
  ctaTitle: "Book your Mendoza orientation morning",
  ctaText:
    "Share your hotel and travel dates—we’ll confirm Tuesday, Thursday, or Saturday availability and your pickup window.",
} as const;

export type CityTourMendozaEn = typeof cityTourMendozaEn;
