export type BrandManifestoBlock = {
  title: string;
  body: string;
};

export const BRAND_MANIFESTO_TITLE_LINES = [
  "We don't show Mendoza.",
  "We help you experience it.",
] as const;

export const BRAND_MANIFESTO_BLOCKS: BrandManifestoBlock[] = [
  {
    title: "Real Experiences",
    body:
      "Designed around authentic places, people and moments that define Mendoza.",
  },
  {
    title: "Local Perspective",
    body:
      "Routes, recommendations and stories created by people who know Mendoza deeply.",
  },
  {
    title: "Simple Reservations",
    body:
      "Direct communication.\nCarefully organized experiences.\nNo unnecessary complexity.",
  },
];
