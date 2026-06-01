// Prepara assets que no llegaron con transparencia.
// La mesa (wine-table-foreground-01.png) vino con fondo blanco opaco; al ser
// madera oscura, hacemos un luminance-key seguro del blanco y reescribimos el
// PNG con alfa. Idempotente: si ya es transparente, no hace daño.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(
  root,
  "public/assets/scenes/wine-tours/foreground/wine-table-foreground-01.png"
);

// El asset traía el patrón de transparencia (blanco + cuadros grises) quemado.
// Keyeamos neutros claros (blanco y grises del tablero) protegiendo la madera,
// que es marrón saturado (sat alta) y queda intacta.
const HARD = 158; // >= este mínimo de canal (y neutro) => fondo (alfa 0)
const SOFT = 128; // zona de feather para bordes
const MAX_SAT = 16; // solo neutros (fondo/tablero), no madera

const { data, info } = await sharp(file)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const sat = max - min;
  if (sat > MAX_SAT) continue; // pixel con color (madera) => intacto
  if (min >= HARD) {
    data[i + 3] = 0;
  } else if (min >= SOFT) {
    const a = Math.round((255 * (HARD - min)) / (HARD - SOFT));
    data[i + 3] = Math.min(data[i + 3], a);
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(file);

console.log(`mesa procesada con transparencia: ${info.width}x${info.height}`);
