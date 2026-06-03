// Preview de calibración de la Escena 01 (Wine Tours).
// Compone los cutouts reales sobre el fondo con sharp para ajustar la
// composición contra la imagen de referencia, sin abrir el navegador.
// Uso: node scripts/cinematic-preview.mjs
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const A = (p) => path.join(root, "public/assets/scenes/wine-tours", p);
const W = 1600;
const H = 900;

// Objetos: cx = centro horizontal (%), bottom = base desde abajo (%),
// w/h = caja máxima (% de W/H), object-bottom contain.
const objects = [
  { file: "props/wine-cheese-board-01.png", cx: 20, bottom: 22, w: 34, h: 34 },
  { file: "props/wine-grapes-01.png", cx: 31, bottom: 22, w: 20, h: 22 },
  { file: "props/wine-glass-red-01.png", cx: 60, bottom: 25, w: 17, h: 42 },
  { file: "props/wine-bottle-jejox.png", cx: 43, bottom: 26, w: 28, h: 60 },
];

const SHADOW = { file: "effects/wine-contact-shadow-01.png", cx: 45, bottom: 24, w: 42, h: 9, blend: "multiply", opacity: 0.65 };

async function layerBuffer(file, boxW, boxH, opacity, cover) {
  let img = sharp(A(file)).resize(Math.round(boxW), Math.round(boxH), {
    fit: cover ? "cover" : "inside",
  });
  if (opacity != null && opacity < 1) {
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * opacity);
    img = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  }
  const out = await img.png().toBuffer();
  const meta = await sharp(out).metadata();
  return { out, w: meta.width, h: meta.height };
}

function placeBottom(o, w, h) {
  const left = Math.round((o.cx / 100) * W - w / 2);
  const top = Math.round(H - (o.bottom / 100) * H - h);
  return { left, top };
}

async function run() {
  const base = sharp(A("backgrounds/reference/background.png")).resize(W, H, { fit: "cover" });
  const composites = [];

  {
    const { out, w, h } = await layerBuffer(SHADOW.file, (SHADOW.w / 100) * W, (SHADOW.h / 100) * H, SHADOW.opacity);
    const { left, top } = placeBottom(SHADOW, w, h);
    composites.push({ input: out, left, top, blend: SHADOW.blend });
  }

  for (const o of objects) {
    const { out, w, h } = await layerBuffer(o.file, (o.w / 100) * W, (o.h / 100) * H, o.opacity, o.cover);
    const left = o.cover ? 0 : Math.round((o.cx / 100) * W - w / 2);
    const top = o.cover ? 0 : Math.round(H - (o.bottom / 100) * H - h);
    composites.push({ input: out, left, top, blend: o.blend || "over" });
  }

  await base.composite(composites).jpeg({ quality: 86 }).toFile(path.join(root, "scripts/cinematic-preview.jpg"));
  console.log("preview escrito en scripts/cinematic-preview.jpg");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
