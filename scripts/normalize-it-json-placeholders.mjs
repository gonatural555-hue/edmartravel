#!/usr/bin/env node
/**
 * Corrige patrones comunes de ? (mojibake) en messages/it.json.
 * Ejecutar: node scripts/normalize-it-json-placeholders.mjs
 * Luego: npm run check:i18n && revisar git diff
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET = path.join(__dirname, "..", "messages", "it.json");

const VOWEL = "aeiouàèéìíîòóùúAEIOUÀÈÉÌÍÎÒÓÙÚ";

/** @param {string} s */
function applyPipeline(s) {
  let t = s;

  t = t.replace(/Travel \? Mendoza/g, "Travel · Mendoza");

  for (const [a, b] of [
    ["piacer\\?", "piacerà"],
    ["sar\\?", "sarà"],
    ["andr\\?", "andrà"],
    ["potr\\?", "potrà"],
    ["avr\\?", "avrà"],
    ["dovr\\?", "dovrà"],
    ["terr\\?", "terrà"],
    ["verr\\?", "verrà"],
    ["star\\?", "starà"],
  ]) {
    t = t.replace(new RegExp(a, "g"), b);
  }

  t = t.replace(/Cos\?\?/g, "Cos'è");
  t = t.replace(/cos\?\?/g, "cos'è");
  t = t.replace(/Non c\?\?/g, "Non c'è");
  t = t.replace(/non c\?\?/g, "non c'è");
  t = t.replace(/(^|[^\w])c\?\?/gm, "$1c'è");
  t = t.replace(/(^|[^\w])C\?\?/gm, "$1C'è");

  t = t.replace(/non \?/g, "non è");
  t = t.replace(/Non \?/g, "Non è");

  t = t.replace(/"\? intenzione/g, '"È intenzione');

  // Terminazioni in -anza / -enza / -izza ( ? → a )
  const zaStem = [
    "sicurezz",
    "Sicurezz",
    "esperienz",
    "Esperienz",
    "esigenz",
    "urgenz",
    "importanz",
    "conseguenz",
    "Conseguenz",
    "tendenz",
    "Tendenz",
    "frequenz",
    "sequenz",
    "scienz",
    "coscienz",
    "efficienz",
    "proficienz",
    "sufficienz",
    "deficienz",
    "finanz",
    "istanz",
    "sostanz",
    "distanz",
    "eleganz",
    "speranz",
    "consapevolezz",
    "umanit",
    "Umanit",
    "ospitalit",
  ];
  for (const w of zaStem) {
    t = t.replace(new RegExp(`${w}\\?`, "g"), `${w}a`);
  }

  // -tà / -ità ( ? → à )
  const taStem = [
    "Citt",
    "citt",
    "Puntualit",
    "attivit",
    "Attivit",
    "qualit",
    "Qualit",
    "semplicit",
    "Semplicit",
    "identit",
    "comunit",
    "priorit",
    "facilit",
    "necessit",
    "possibilit",
    "difficolt",
    "Difficolt",
    "libert",
    "verit",
    "capacit",
    "Capacit",
    "velocit",
    "Velocit",
    "universit",
    "civilt",
    "serenit",
    "societ",
    "realt",
    "Realt",
    "specialit",
    "localit",
    "funzionalit",
    "curiosit",
    "costanz",
    "Costanz",
  ];
  for (const w of taStem) {
    t = t.replace(new RegExp(`${w}\\?`, "g"), `${w}à`);
  }
  t = t.replace(/costanzà/g, "costanza");
  t = t.replace(/Costanzà/g, "Costanza");

  t = t.replace(/ci\? che/g, "ciò che");
  t = t.replace(/ solo ci\? /g, " solo ciò ");
  t = t.replace(/Condividiamo solo ci\? /g, "Condividiamo solo ciò ");

  t = t.replace(/caff\?/g, "caffè");
  t = t.replace(/gi\?/g, "già");
  t = t.replace(/Cos\? /g, "Così ");
  t = t.replace(/\bcos\? /g, "così ");
  t = t.replace(/\bcos\?$/gm, "così");

  t = t.replace(/un po\?/g, "un po'");

  t = t.replace(/pi\?/g, "più");
  t = t.replace(/Pi\?/g, "Più");

  const apos = (p) => new RegExp(`${p}\\?([${VOWEL}])`, "g");
  t = t.replace(apos("l"), "l'$1");
  t = t.replace(apos("L"), "L'$1");
  t = t.replace(apos("d"), "d'$1");
  t = t.replace(apos("t"), "t'$1");
  t = t.replace(apos("n"), "n'$1");

  t = t.replace(/all\?([aeiou])/gi, "all'$1");
  t = t.replace(/All\?([aeiou])/g, "All'$1");
  t = t.replace(/un\?([aeiou])/gi, "un'$1");
  t = t.replace(/Un\?([aeiou])/g, "Un'$1");
  t = t.replace(/dell\?([aeiou])/gi, "dell'$1");
  t = t.replace(/Dell\?([aeiou])/g, "Dell'$1");
  t = t.replace(/nell\?([aeiou])/gi, "nell'$1");
  t = t.replace(/sull\?([aeiou])/gi, "sull'$1");
  t = t.replace(/dall\?([aeiou])/gi, "dall'$1");
  t = t.replace(/coll\?([aeiou])/gi, "coll'$1");
  t = t.replace(/quest\?([aeiou])/gi, "quest'$1");
  t = t.replace(/Quest\?([aeiou])/g, "Quest'$1");

  t = t.replace(/24\?48/g, "24–48");
  t = t.replace(/ in vendita \? /g, " in vendita — ");
  t = t.replace(/ \? scrivici/g, " — scrivici");
  t = t.replace(/ in l\?/g, " in là");
  t = t.replace(/più in l\?/g, "più in là");

  t = t.replace(/ il ciclismo \? /g, " il ciclismo è ");
  t = t.replace(/ anche il riposo \? /g, " anche il riposo è ");
  t = t.replace(/ tutto \? pensato/g, " tutto è pensato");
  t = t.replace(/corto \? che/g, "corto è che");
  t = t.replace(/La Spagna \?/g, "La Spagna è");
  t = t.replace(/La Francia \?/g, "La Francia è");
  t = t.replace(/l'Italia \?/g, "l'Italia è");
  t = t.replace(/Un giorno \? /g, "Un giorno è ");
  t = t.replace(/ché \? /g, "ché è ");

  // Resto: spaziatura " è " (era byte perso dell'accento)
  t = t.replace(/ \? /g, " è ");

  return t;
}

function main() {
  const raw = fs.readFileSync(TARGET, "utf8");
  const next = applyPipeline(raw);
  if (next === raw) {
    console.log("normalize-it-json-placeholders: sin cambios.");
    return;
  }
  JSON.parse(next);
  fs.writeFileSync(TARGET, next, "utf8");
  console.log("normalize-it-json-placeholders: OK", TARGET);
}

main();
