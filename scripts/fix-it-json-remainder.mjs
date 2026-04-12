import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "..", "messages", "it.json");

let t = fs.readFileSync(p, "utf8");

const reps = [
  ["portabilit?", "portabilità"],
  ["stabilit?", "stabilità"],
  ["disponibilit?", "disponibilità"],
  ["quantit?", "quantità"],
  ["Propriet?", "Proprietà"],
  ["responsabilit?", "responsabilità"],
  ["autenticit?", "autenticità"],
  ["Affidabilit?", "Affidabilità"],
  ["Funzionalit?", "Funzionalità"],
  ["durabilit?", "durabilità"],
  ["intensit?", "intensità"],
  ["produttivit?", "produttività"],
  ["tranquillit?", "tranquillità"],
  ["visibilit?", "visibilità"],
  ["Intensit?.", "Intensità."],
  ["pu?", "può"],
  ["Pu?", "Può"],
  [`d? un'`, `dà un'`],
  ["d? fastidio", "dà fastidio"],
  ["l? tutto", "lì tutto"],
  ["è l? che", "è lì che"],
  ["Ci? che", "Ciò che"],
  ["cos?.", "così."],
  ['cos?."', 'così."'],
  ["? Continua", "← Continua"],
  ["Luned?", "Lunedì"],
  ["Venerd?", "Venerdì"],
  ["ultra?specializzata", "ultra-specializzata"],
  ["?tecnologia", "«tecnologia"],
  ["rivoluzionaria?", "rivoluzionaria»"],
  [" ?per sicurezza?", " «per sicurezza»"],
  ["solo ?per provare?", "solo «per provare»"],
  ["Mont Saint?Michel", "Mont Saint-Michel"],
  ["espa?a.webp", "españa.webp"],
  ["that?s", "that's"],
  ["non lo ?.", "non lo è."],
  ["meglio ?.", "meglio è."],
  [`po? d'`, `po' d'`],
  ["? tra le", "È tra le"],
  ["? pensata", "È pensata"],
  [`? un'app`, `È un'app`],
  [
    "La cosa migliore del camping corto è che non c'è pressione a è sfruttarlo ?.",
    "La cosa migliore del camping corto è che non c'è pressione a sfruttare ogni minuto.",
  ],
  [
    "In famiglia, lo snorkeling non è un'attività per è riuscire ?.",
    "In famiglia, lo snorkeling non è un'attività per dimostrare nulla.",
  ],
  ["Si pu?.", "Si può."],
  ["Si pu? fare", "Si può fare"],
  ["ma?ana", "mañana"],
  ["monta?a", "montaña"],
  ["? fermarsi", "Fermarsi"],
];

for (const [a, b] of reps) {
  t = t.split(a).join(b);
}

JSON.parse(t);
fs.writeFileSync(p, t, "utf8");
console.log("fix-it-json-remainder: OK");
