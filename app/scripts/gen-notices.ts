import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

/**
 * Liste des bibliothèques qui partent dans l'appli (pas les outils de compilation) : npm run notices
 * Écrit src/data/third-party.ts à partir de node_modules (nom, version, licence, mention de copyright).
 */
const SHIPPED = [
  "react", "react-dom", "scheduler", "next", "styled-jsx", "client-only", "@swc/helpers", "framer-motion", "motion-dom", "motion-utils",
  "ts-fsrs", "tailwind-merge", "clsx", "class-variance-authority", "@radix-ui/react-slot", "@radix-ui/react-compose-refs",
  "@fontsource/klee-one", "@fontsource-variable/schibsted-grotesk",
];
// Licences Apache-2.0 : le fichier ne contient que le texte type ; le titulaire vient du paquet.
const OVERRIDE: Record<string, string> = {
  "@swc/helpers": "Copyright 2024 SWC contributors",
  "class-variance-authority": "Copyright (c) Joe Bell",
  "client-only": "",
};
const rows = SHIPPED.map((name) => {
  const dir = `node_modules/${name}`;
  const pkg = JSON.parse(readFileSync(`${dir}/package.json`, "utf8"));
  const file = readdirSync(dir).find((f) => /^licen[cs]e/i.test(f));
  const text = file ? readFileSync(`${dir}/${file}`, "utf8") : "";
  const found = text.split("\n").map((l) => l.trim()).find((l) => /^copyright (\(c\)|\d)/i.test(l) || /^\(c\)/i.test(l)) ?? "";
  const copyright = (OVERRIDE[name] ?? found)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/ \(https?:[^)]*\).*$/, "");
  const license = typeof pkg.license === "string" ? pkg.license : pkg.license?.type ?? "";
  return { name, version: pkg.version as string, license, copyright: copyright.replace(/\s+/g, " ").slice(0, 160) };
});
for (const r of rows) if (!r.license) throw new Error(`Licence introuvable : ${r.name}`);
const out = `/** Généré par « npm run notices » : ne pas modifier à la main. */\nexport const THIRD_PARTY: { name: string; version: string; license: string; copyright: string }[] = ${JSON.stringify(rows, null, 2)};\n`;
if (!existsSync("src/data")) throw new Error("À lancer depuis la racine de l'appli.");
writeFileSync("src/data/third-party.ts", out);
console.log(`${rows.length} bibliothèques listées.`);
for (const r of rows) console.log(`${r.name}@${r.version} · ${r.license} · ${r.copyright || "(pas de ligne copyright)"}`);
