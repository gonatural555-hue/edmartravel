/**
 * Exporta el layout calibrado del panel director desde localStorage del navegador.
 * Requiere dev server en http://localhost:3000 y haber usado ?director=true al menos una vez.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORAGE_KEY = "experience-hero-debug-layout";
const url = process.argv[2] ?? "http://localhost:3000/es?director=true";
const outFile =
  process.argv[3] ?? path.join(root, "calibration/hero-layout.json");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  const stored = await page.evaluate(
    (key) => localStorage.getItem(key),
    STORAGE_KEY
  );

  if (!stored) {
    console.error(
      "No hay valores en localStorage. Abrí ?director=true, calibrá y mové un slider."
    );
    process.exit(1);
  }

  const parsed = JSON.parse(stored);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(parsed, null, 2));
  console.log(`Exportado → ${outFile}`);
} finally {
  await browser.close();
}
