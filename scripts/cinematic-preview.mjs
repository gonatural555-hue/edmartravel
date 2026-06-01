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
  { file: "effects/wine-warm-glow-01.png", cx: 45, bottom: 30, w: 46, h: 50, blend: "screen", opacity: 0.5 },
  { file: "props/wine-cheese-board-01.png", cx: 20, bottom: 22, w: 34, h: 34 },
  { file: "props/wine-grapes-01.png", cx: 31, bottom: 22, w: 20, h: 22 },
  { file: "props/wine-dish-a-01.png", cx: 80, bottom: 22, w: 32, h: 32 },
  { file: "props/wine-napkin-knife-01.png", cx: 70, bottom: 14, w: 30, h: 22 },
  { file: "props/wine-glass-red-01.png", cx: 60, bottom: 25, w: 17, h: 42 },
  { file: "props/wine-bottle-edmar-01.png", cx: 43, bottom: 26, w: 28, h: 60 },
];

const TABLE = { file: "foreground/wine-table-foreground-01.png", factor: 0.82, scale: 1.0 };
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
  const base = sharp(A("backgrounds/wine-background-01.png")).resize(W, H, { fit: "cover" });
  const composites = [];

  // glow (primer objeto) va detrás de la mesa
  const glow = objects[0];
  {
    const { out, w, h } = await layerBuffer(glow.file, (glow.w / 100) * W, (glow.h / 100) * H, glow.opacity);
    const { left, top } = placeBottom(glow, w, h);
    composites.push({ input: out, left, top, blend: glow.blend || "over" });
  }

  // mesa: ancho completo, patas recortadas por abajo
  {
    const tw = Math.round(W * TABLE.scale);
    const resized = await sharp(A(TABLE.file)).resize(tw).png().toBuffer();
    const meta = await sharp(resized).metadata();
    const left = Math.round((W - meta.width) / 2);
    const top = Math.round(H - TABLE.factor * meta.height);
    composites.push({ input: resized, left, top, blend: "over" });
  }

  // sombra de contacto
  {
    const { out, w, h } = await layerBuffer(SHADOW.file, (SHADOW.w / 100) * W, (SHADOW.h / 100) * H, SHADOW.opacity);
    const { left, top } = placeBottom(SHADOW, w, h);
    composites.push({ input: out, left, top, blend: SHADOW.blend });
  }

  // resto de objetos (de atrás hacia delante)
  for (const o of objects.slice(1)) {
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
