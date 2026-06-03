/**
 * Quita fondo negro sólido de un PNG (flood-fill desde bordes).
 * Uso: node scripts/remove-png-black-bg.mjs <entrada.png> [salida.png]
 *
 * NO usar en wine-bottle-jejox.png: ese asset debe conservar el fondo negro original.
 */
import sharp from "sharp";
import path from "node:path";

const input = process.argv[2];
const output = process.argv[3] ?? input;

if (!input) {
  console.error("Uso: node scripts/remove-png-black-bg.mjs <entrada.png> [salida.png]");
  process.exit(1);
}

/** Píxeles considerados fondo negro (conectados desde el borde). */
const BLACK_THRESH = 32;
/** Suavizado en el contorno botella/fondo. */
const FEATHER_THRESH = 72;

function isBgBlack(r, g, b) {
  return r <= BLACK_THRESH && g <= BLACK_THRESH && b <= BLACK_THRESH;
}

const { data, info } = await sharp(path.resolve(input))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h, channels } = info;
if (channels !== 4) {
  console.error("Se esperaba RGBA");
  process.exit(1);
}

const bg = new Uint8Array(w * h);
const queue = [];

function seed(x, y) {
  const pi = y * w + x;
  if (bg[pi]) return;
  const i = pi * 4;
  if (isBgBlack(data[i], data[i + 1], data[i + 2])) {
    bg[pi] = 1;
    queue.push([x, y]);
  }
}

for (let x = 0; x < w; x++) {
  seed(x, 0);
  seed(x, h - 1);
}
for (let y = 0; y < h; y++) {
  seed(0, y);
  seed(w - 1, y);
}

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

while (queue.length > 0) {
  const [x, y] = queue.shift();
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const pi = ny * w + nx;
    if (bg[pi]) continue;
    const i = pi * 4;
    if (isBgBlack(data[i], data[i + 1], data[i + 2])) {
      bg[pi] = 1;
      queue.push([nx, ny]);
    }
  }
}

let transparent = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const pi = y * w + x;
    const i = pi * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (bg[pi]) {
      data[i + 3] = 0;
      transparent++;
      continue;
    }

    const max = Math.max(r, g, b);
    if (max <= FEATHER_THRESH) {
      const t = (max - BLACK_THRESH) / (FEATHER_THRESH - BLACK_THRESH);
      data[i + 3] = Math.round(Math.max(0, Math.min(255, t * 255)));
    } else {
      data[i + 3] = 255;
    }
  }
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.resolve(output));

const meta = await sharp(output).metadata();
console.log(
  `OK ${path.basename(output)} — ${w}x${h}, alpha=${meta.hasAlpha}, ~${transparent} px transparentes`
);
