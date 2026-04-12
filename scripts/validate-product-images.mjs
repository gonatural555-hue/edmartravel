import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PRODUCTS_DATA_PATH = path.join(ROOT, "lib", "products-data.ts");
const PRODUCTS_JSON_DIR = path.join(ROOT, "scripts", "products");

function readActiveIds() {
  const source = fs.readFileSync(PRODUCTS_DATA_PATH, "utf8");
  return [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function readJsonFiles() {
  return fs
    .readdirSync(PRODUCTS_JSON_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

function parseJsonFile(filename) {
  const fullPath = path.join(PRODUCTS_JSON_DIR, filename);
  const expectedId = filename.replace(/\.json$/, "");
  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    const data = JSON.parse(raw);
    return { filename, expectedId, data, parseError: null };
  } catch (error) {
    return {
      filename,
      expectedId,
      data: null,
      parseError: error instanceof Error ? error.message : String(error),
    };
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateActiveJsonShape(entry) {
  const issues = [];
  const { filename, expectedId, data, parseError } = entry;
  if (parseError) {
    issues.push(`JSON inválido (${parseError})`);
    return { filename, expectedId, issues };
  }
  if (!data || typeof data !== "object") {
    issues.push("El contenido no es un objeto JSON");
    return { filename, expectedId, issues };
  }
  if (data.id !== expectedId) {
    issues.push(`id interno distinto a filename (id=${JSON.stringify(data.id)})`);
  }
  if (!data.images || typeof data.images !== "object") {
    issues.push("Falta objeto images");
    return { filename, expectedId, issues };
  }

  const requiredArrays = ["featured", "gallery", "lifestyle", "extras"];
  for (const key of requiredArrays) {
    if (!Array.isArray(data.images[key])) {
      issues.push(`images.${key} no es array`);
      continue;
    }
    const invalidItem = data.images[key].find((v) => !isNonEmptyString(v));
    if (invalidItem !== undefined) {
      issues.push(`images.${key} contiene rutas vacías/no-string`);
    }
  }

  if (!Array.isArray(data.images.featured) || data.images.featured.length === 0) {
    issues.push("images.featured[0] no existe");
  } else if (!isNonEmptyString(data.images.featured[0])) {
    issues.push("images.featured[0] está vacío o no es string");
  }

  return { filename, expectedId, issues };
}

function buildReport() {
  const activeIds = readActiveIds();
  const jsonFiles = readJsonFiles();
  const parsed = jsonFiles.map(parseJsonFile);

  const byFilename = new Set(jsonFiles);
  const missingJsonFiles = activeIds.filter((id) => !byFilename.has(`${id}.json`));
  const orphanJsonFiles = jsonFiles.filter((f) => {
    const expectedId = f.replace(/\.json$/, "");
    return !activeIds.includes(expectedId);
  });

  const mismatchedJson = parsed
    .filter((entry) => entry.parseError || entry.data?.id !== entry.expectedId)
    .map((entry) => ({
      file: entry.filename,
      expectedId: entry.expectedId,
      id: entry.data?.id ?? null,
      parseError: entry.parseError,
    }));

  const activeEntries = activeIds.map((id) => parseJsonFile(`${id}.json`));
  const strictIssues = activeEntries.map(validateActiveJsonShape).filter((r) => r.issues.length > 0);

  return {
    activeIds,
    jsonFiles,
    jsonIds: parsed.map((p) => p.data?.id).filter(Boolean),
    missingJsonFiles,
    orphanJsonFiles,
    mismatchedJson,
    strict: {
      totalActive: activeIds.length,
      validActive: activeIds.length - strictIssues.length,
      invalidActive: strictIssues.length,
      issuesByFile: strictIssues,
    },
  };
}

const args = new Set(process.argv.slice(2));
const strictMode = args.has("--strict");
const jsonMode = args.has("--json");
const report = buildReport();

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("=== Product Images Audit ===");
  console.log(`activeIds: ${report.activeIds.length}`);
  console.log(`jsonFiles: ${report.jsonFiles.length}`);
  console.log(`jsonIds: ${report.jsonIds.length}`);
  console.log(`missingJsonFiles: ${report.missingJsonFiles.length}`);
  console.log(`orphanJsonFiles: ${report.orphanJsonFiles.length}`);
  console.log(`mismatchedJson: ${report.mismatchedJson.length}`);
  console.log(
    `strict(valid/total): ${report.strict.validActive}/${report.strict.totalActive}`
  );
}

if (strictMode) {
  const hasErrors =
    report.missingJsonFiles.length > 0 ||
    report.strict.invalidActive > 0;
  if (hasErrors) {
    console.error("Strict validation failed.");
    process.exit(1);
  }
}
