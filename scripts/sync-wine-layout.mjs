/**
 * Aplica un JSON exportado del panel de layout a wineSceneLayout.ts
 *
 * 1. ?director=true → panel layout → Copiar JSON
 * 2. Guardar como calibration/wine-layout.json
 * 3. node scripts/sync-wine-layout.mjs calibration/wine-layout.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Uso: node scripts/sync-wine-layout.mjs <ruta-al-json>");
  process.exit(1);
}

const keyMap = {
  ContactShadow: "contactShadow",
  CheeseBoard: "cheeseBoard",
  Grapes: "grapes",
  Glass: "glass",
  Bottle: "bottle",
  CTA: "cta",
};

const data = JSON.parse(fs.readFileSync(path.resolve(root, inputPath), "utf8"));
const layout = {};

for (const [label, values] of Object.entries(data)) {
  const key = keyMap[label] ?? label;
  layout[key] = values;
}

const order = [
  "contactShadow",
  "cheeseBoard",
  "grapes",
  "glass",
  "bottle",
  "cta",
];

function formatEntry(key, v) {
  const top = v.top == null ? "null" : v.top;
  return `  ${key}: {
    left: ${v.left},
    top: ${top},
    bottom: ${v.bottom},
    width: ${v.width},
    height: ${v.height},
    scale: ${v.scale},
    zIndex: ${v.zIndex},
  }`;
}

const entries = order
  .filter((k) => layout[k])
  .map((k) => formatEntry(k, layout[k]))
  .join(",\n");

const block = `export const WINE_SCENE_LAYOUT: Record<WineLayoutLayerKey, WineLayerLayout> = {
${entries},
};`;

const outPath = path.join(root, "components/cinematic/wineSceneLayout.ts");
let src = fs.readFileSync(outPath, "utf8");

src = src.replace(
  /export const WINE_SCENE_LAYOUT: Record<WineLayoutLayerKey, WineLayerLayout> = \{[\s\S]*?\};/,
  block
);

fs.writeFileSync(outPath, src);
console.log("wineSceneLayout.ts actualizado.");
