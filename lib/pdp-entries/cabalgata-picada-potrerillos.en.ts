/**
 * Canonical English PDP content — Cabalgata + Picada, Potrerillos (Edmar Travel).
 * Maps to ExperienceRichContent + catalog row in products-data.ts.
 */
export const cabalgataPicadaPotrerillosEn = {
  title: "Cabalgata + Picada – Potrerillos",
  slug: "cabalgata-picada-potrerillos",
  subtitle:
    "A slow, cinematic ride into the Andean foothills—then a laid-back picada and a glass of wine facing the Potrerillos Dam.",
  shortDescription:
    "Guided horseback ride in Potrerillos with wide mountain views, operated by Los Camperitos, ending with a regional picnic and a glass of wine by the water. Transfers from central Mendoza included; morning or afternoon departures.",
  longDescription: [
    "Potrerillos is where the valley opens: long views, clean air, and a rhythm that feels far from the city without ever feeling staged. You’ll ride with Los Camperitos—local hands, calm horses, and a trail that favors scenery over speed. The pace stays walking: enough movement to feel the landscape, never a performance.",
    "The ride lasts about an hour, but the outing is measured in half-day windows—pickup in Mendoza, time at the stables, the trail, and a final pause where the mountains meet the water. That last moment is the signature: a regional picada set by the dam, one glass of wine in hand, the lake surface catching the light.",
    "It’s an easy fit for couples and friends, and genuinely welcoming if you’ve never sat a saddle. We handle the transfer from central Mendoza so you can focus on the views—and on arriving unhurried for the picnic.",
  ].join("\n\n"),
  priceFrom: 100_000,
  currency: "ARS" as const,
  duration:
    "About 4.5 hours full outing (~1 hour on horseback; includes transfer & picnic)",
  location:
    "Potrerillos, Mendoza — Los Camperitos stables · picnic by Potrerillos Dam",
  difficulty: "Easy — beginner-friendly; walking pace only",
  groupSize:
    "Small groups (typically up to 8–12 guests; confirm when booking)",
  languages: "English & Spanish (confirm when booking)",
  availability: "Daily departures — morning or afternoon session",
  idealFor:
    "Couples, close friends, and first-time riders who want scenery, calm horses, and a memorable finish by the water",
  quickFacts: [
    {
      label: "Full outing",
      value:
        "≈4.5 h · Morning 8:30–13:00 or afternoon 16:00–20:30 (including transfer & picnic)",
    },
    { label: "On horseback", value: "≈1 hour guided ride" },
    { label: "Stables", value: "Los Camperitos, Potrerillos" },
    {
      label: "Finale",
      value: "Regional picada + one glass of wine by Potrerillos Dam",
    },
    {
      label: "Transfers",
      value: "Included from central Mendoza (hotel or meeting point)",
    },
    { label: "Level", value: "Beginner-friendly · no trotting required" },
  ],
  highlights: [
    "Andean foothill views without the rush—space, silence, and light that changes by the hour.",
    "A boutique-feel ride with Los Camperitos: attentive handling and horses suited to first-timers.",
    "The dam as your closing scene: picnic, wine, and water in the same frame.",
    "Door-to-door logistics from central Mendoza so the day feels seamless, not logistical.",
  ],
  itinerary: [
    "08:30 (morning) or 16:00 (afternoon) — Pickup in central Mendoza (hotel or agreed meeting point)",
    "Arrival at Los Camperitos — greet your horse, quick orientation, adjust tack if needed",
    "≈1 hour guided ride — mountain trails and open views above Potrerillos",
    "Picnic by the dam — regional picada and a glass of wine overlooking the water",
    "≈13:00 (morning) or ≈20:30 (afternoon) — Drop-off in Mendoza",
  ],
  includes: [
    "Round-trip transportation from central Mendoza (hotel or meeting point)",
    "≈1 hour guided horseback ride with Los Camperitos",
    "Regional picada and one glass of wine by Potrerillos Dam",
    "Coordination by Edmar Travel",
  ],
  excludes: [
    "Additional beverages beyond the glass served with the picnic",
    "Personal travel insurance",
    "Gratuities (optional)",
    "Hotel outside central Mendoza unless agreed when booking",
  ],
  practicalInfo: {
    whatToBring: [
      "Long trousers and closed-toe shoes (light hiking shoes or trainers with grip)",
      "Layers: sun can be strong; breeze picks up near the water",
      "Sunscreen, sunglasses, and a small bottle of water",
      "Phone/camera—charged; pockets or a small belt bag help",
    ],
    restrictions:
      "Weight and age limits may apply for rider safety; please share details when booking. Not suitable for guests who cannot mount with brief assistance.",
    weather:
      "Mountain weather shifts quickly; light rain gear in your daypack is wise. We may adjust timing for unsafe conditions.",
    pickupDetails:
      "Pickup is confirmed after booking—central Mendoza hotels or a fixed meeting point. Please be ready 10 minutes before the agreed time.",
  },
  faq: [
    {
      question: "Is this suitable for beginners?",
      answer:
        "Yes. The ride stays at a walking pace and the team at Los Camperitos matches riders to calm horses. If you’re unsure, tell us in advance—we’ll brief you on posture and reins before leaving the yard.",
    },
    {
      question: "Is transportation included?",
      answer:
        "Yes. Round-trip transfers from central Mendoza are included, with pickup at your hotel or an agreed meeting point. Locations outside the central area may require an extra fee—ask when you book.",
    },
    {
      question: "What should I wear?",
      answer:
        "Long trousers, closed-toe shoes with grip, and layers for sun and wind. A brimmed hat or cap helps; avoid loose scarves that can flap near the horse.",
    },
    {
      question: "Can couples book this experience?",
      answer:
        "Absolutely—it’s one of our favorite requests. The pace is relaxed, the finale by the dam is memorable, and we keep groups intimate so it never feels crowded.",
    },
    {
      question: "Is wine included?",
      answer:
        "Yes. The experience includes one glass of wine served with the regional picnic by the dam. Additional drinks can be arranged where available, at extra cost.",
    },
  ],
  seoTitle:
    "Horseback ride & picnic by Potrerillos Dam | Edmar Travel Mendoza",
  metaDescription:
    "Guided 1h ride in Potrerillos with Los Camperitos, Andean views, regional picada & wine by the dam. Transfers from Mendoza. Daily departures.",
  ctaTitle: "Hold your date in Potrerillos",
  ctaText:
    "Tell us your preferred day and morning or afternoon slot—we’ll confirm pickup and finalize details on WhatsApp.",
} as const;

export type CabalgataPicadaPotrerillosEn = typeof cabalgataPicadaPotrerillosEn;
