/**
 * Aplica calibration/hero-layout.json al código de producción del hero.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Uso: node scripts/sync-hero-layout.mjs <ruta-al-json>");
  process.exit(1);
}

const raw = JSON.parse(
  fs.readFileSync(path.resolve(root, inputPath), "utf8")
);

function slotFromPayload(key) {
  const entry = raw.slots?.[key];
  if (!entry) throw new Error(`Falta slots.${key} en el JSON`);
  return entry.debug ?? entry;
}

const slots = {
  center: slotFromPayload("center"),
  left: slotFromPayload("left"),
  right: slotFromPayload("right"),
};

const panelCopy = raw.panelCopy ?? null;

const fileBody = `import type {
  CarouselStageDebugValues,
  CarouselWrapDebugValues,
  LogoDebugValues,
  PanelCopyDebugValues,
  PanelSizeDebugValues,
  SlotDebugValues,
} from "./director/experienceHeroDebugConfig";
import type { ExperienceWorldId, SpatialSlot } from "./types";

/**
 * Fuente de verdad del hero — sincronizada desde calibration/hero-layout.json
 * (npm run hero-layout:sync)
 */
export const HERO_LOGO_LAYOUT: LogoDebugValues = ${JSON.stringify(raw.logo, null, 2)};

export const HERO_CAROUSEL_WRAP: CarouselWrapDebugValues = ${JSON.stringify(raw.carouselWrap, null, 2)};

export const HERO_CAROUSEL_STAGE: CarouselStageDebugValues = ${JSON.stringify(raw.carouselStage, null, 2)};

export const HERO_PANEL_SIZE: PanelSizeDebugValues = ${JSON.stringify(raw.panelSize, null, 2)};

export const HERO_SLOT_LAYOUT: Record<SpatialSlot, SlotDebugValues> = ${JSON.stringify(slots, null, 2)};

export const HERO_PANEL_COPY: Record<ExperienceWorldId, PanelCopyDebugValues> = ${JSON.stringify(panelCopy, null, 2)};
`;

fs.writeFileSync(
  path.join(root, "components/experience-hero/heroLayoutProduction.ts"),
  fileBody
);
console.log("heroLayoutProduction.ts actualizado.");
if (!panelCopy) {
  console.warn("Aviso: el JSON no incluye panelCopy — HERO_PANEL_COPY quedará null.");
}
