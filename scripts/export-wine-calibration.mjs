/**
 * Lee layout desde localStorage del perfil Chrome/Edge
 * (misma origen que http://localhost:3000) y escribe calibration/wine-layout.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = "http://localhost:3000/es?director=true";
const LAYOUT_KEY = "wine-scene01-debug-layout";

const profileCandidates = [
  process.env.LOCALAPPDATA &&
    path.join(
      process.env.LOCALAPPDATA,
      "Google",
      "Chrome",
      "User Data",
      "Default"
    ),
  process.env.LOCALAPPDATA &&
    path.join(
      process.env.LOCALAPPDATA,
      "Microsoft",
      "Edge",
      "User Data",
      "Default"
    ),
].filter(Boolean);

async function readFromProfile(userDataDir) {
  let context;
  try {
    context = await chromium.launchPersistentContext(userDataDir, {
      channel: "chrome",
      headless: true,
      args: ["--disable-dev-shm-usage"],
    });
  } catch {
    try {
      context = await chromium.launchPersistentContext(userDataDir, {
        headless: true,
        args: ["--disable-dev-shm-usage"],
      });
    } catch {
      return null;
    }
  }

  try {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);
    const layout = await page.evaluate((key) => localStorage.getItem(key), LAYOUT_KEY);
    return layout;
  } finally {
    await context.close();
  }
}

async function readFreshProfile() {
  const tmp = path.join(root, ".calibration-export-profile");
  fs.rmSync(tmp, { recursive: true, force: true });
  const context = await chromium.launchPersistentContext(tmp, {
    headless: true,
  });
  try {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    return await page.evaluate((key) => localStorage.getItem(key), LAYOUT_KEY);
  } finally {
    await context.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

async function main() {
  let layoutRaw = null;

  for (const dir of profileCandidates) {
    if (!fs.existsSync(dir)) continue;
    console.log("Intentando perfil:", dir);
    try {
      layoutRaw = await readFromProfile(dir);
      if (layoutRaw) break;
    } catch (e) {
      console.warn("Perfil bloqueado o error:", e.message);
    }
  }

  if (!layoutRaw) {
    console.log("Perfiles del sistema sin datos; probando perfil vacío…");
    layoutRaw = await readFreshProfile();
  }

  if (!layoutRaw) {
    console.warn("No hay wine-scene01-debug-layout en localStorage.");
    process.exit(1);
  }

  const calDir = path.join(root, "calibration");
  fs.mkdirSync(calDir, { recursive: true });

  const layoutObj = JSON.parse(layoutRaw);
  const panelFormat = {
    ContactShadow: layoutObj.contactShadow,
    CheeseBoard: layoutObj.cheeseBoard,
    Grapes: layoutObj.grapes,
    Glass: layoutObj.glass,
    Bottle: layoutObj.bottle,
    CTA: layoutObj.cta,
  };
  const layoutPath = path.join(calDir, "wine-layout.json");
  fs.writeFileSync(layoutPath, JSON.stringify(panelFormat, null, 2));
  console.log("Guardado:", layoutPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
