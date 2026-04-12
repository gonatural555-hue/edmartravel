#!/usr/bin/env node
/**
 * Valida que messages/*.json sea UTF-8 estricto y JSON válido.
 * Turbopack/Next falla con "invalid utf-8 sequence" si hay bytes Latin-1 sueltos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

/** @returns {number} número de bytes inválidos en UTF-8 */
function countInvalidUtf8Bytes(buf) {
  let i = 0;
  let bad = 0;
  while (i < buf.length) {
    const c = buf[i];
    if (c < 0x80) {
      i += 1;
      continue;
    }
    if ((c & 0xe0) === 0xc0 && i + 1 < buf.length && (buf[i + 1] & 0xc0) === 0x80) {
      i += 2;
      continue;
    }
    if (
      (c & 0xf0) === 0xe0 &&
      i + 2 < buf.length &&
      (buf[i + 1] & 0xc0) === 0x80 &&
      (buf[i + 2] & 0xc0) === 0x80
    ) {
      i += 3;
      continue;
    }
    if (
      (c & 0xf8) === 0xf0 &&
      i + 3 < buf.length &&
      (buf[i + 1] & 0xc0) === 0x80 &&
      (buf[i + 2] & 0xc0) === 0x80 &&
      (buf[i + 3] & 0xc0) === 0x80
    ) {
      i += 4;
      continue;
    }
    bad += 1;
    i += 1;
  }
  return bad;
}

function main() {
  if (!fs.existsSync(MESSAGES_DIR)) {
    console.error("check-i18n-utf8: no existe", MESSAGES_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
  let failed = false;

  for (const name of files) {
    const filePath = path.join(MESSAGES_DIR, name);
    const buf = fs.readFileSync(filePath);
    const invalid = countInvalidUtf8Bytes(buf);
    const text = buf.toString("utf8");

    if (invalid > 0) {
      console.error(`[FAIL] ${name}: ${invalid} byte(s) no UTF-8 válidos.`);
      console.error(
        "  Sugerencia: si el archivo se guardó como Latin-1, decodificar ISO-8859-1 y reescribir UTF-8.",
      );
      failed = true;
      continue;
    }

    if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      console.warn(`[WARN] ${name}: tiene BOM UTF-8; se recomienda guardar sin BOM.`);
    }

    try {
      JSON.parse(text);
    } catch (e) {
      console.error(`[FAIL] ${name}: JSON inválido — ${e.message}`);
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.log(`check-i18n-utf8: OK (${files.length} archivo(s)).`);
}

main();
