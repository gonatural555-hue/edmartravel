import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { HeaderUtilitiesDebugValues } from "@/components/experience-hero/director/experienceHeroDebugConfig";

const calibrationPath = path.join(
  process.cwd(),
  "calibration",
  "hero-layout.json"
);
const productionPath = path.join(
  process.cwd(),
  "components",
  "experience-hero",
  "heroLayoutProduction.ts"
);

function isHeaderUtilities(
  value: unknown
): value is HeaderUtilitiesDebugValues {
  if (!value || typeof value !== "object") return false;
  const keys = [
    "home",
    "tours",
    "blog",
    "language",
    "login",
    "reservations",
  ] as const;
  return keys.every((key) => key in (value as Record<string, unknown>));
}

function patchProductionFile(utilities: HeaderUtilitiesDebugValues) {
  const source = fs.readFileSync(productionPath, "utf8");
  const block = JSON.stringify(utilities, null, 2);
  const next = source.replace(
    /export const HERO_HEADER_UTILITIES: HeaderUtilitiesDebugValues = \{[\s\S]*?\};/,
    `export const HERO_HEADER_UTILITIES: HeaderUtilitiesDebugValues = ${block};`
  );
  if (next === source) {
    throw new Error("No se encontró HERO_HEADER_UTILITIES en heroLayoutProduction.ts");
  }
  fs.writeFileSync(productionPath, next);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Solo en desarrollo" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const headerUtilities = (body as { headerUtilities?: unknown })
    .headerUtilities;
  if (!isHeaderUtilities(headerUtilities)) {
    return NextResponse.json(
      { error: "Falta headerUtilities válido" },
      { status: 400 }
    );
  }

  const layout = fs.existsSync(calibrationPath)
    ? JSON.parse(fs.readFileSync(calibrationPath, "utf8"))
    : {};
  layout.headerUtilities = headerUtilities;
  fs.mkdirSync(path.dirname(calibrationPath), { recursive: true });
  fs.writeFileSync(calibrationPath, JSON.stringify(layout, null, 2));
  patchProductionFile(headerUtilities);

  return NextResponse.json({ ok: true, headerUtilities });
}
