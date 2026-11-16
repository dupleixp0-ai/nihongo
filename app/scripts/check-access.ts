import { readFileSync } from "node:fs";
import { derive, render, units } from "./access-derive";
import { isFreeId } from "../src/data/access";
import { grammar } from "../src/data/grammar";
import { readings } from "../src/data/readings";
import { dialogues } from "../src/data/dialogues";

/** La part gratuite doit rester entre ces deux bornes (en % du contenu). */
const MIN = 10, MAX = 15;

let bad = 0;
const fail = (m: string) => { console.error("✗ " + m); bad++; };
const d = derive();
if (readFileSync("src/data/access-ids.ts", "utf8") !== render()) fail("src/data/access-ids.ts n'est pas à jour : lancer `npm run access`");
const all = units();
const free = all.filter((id) => id !== "/examen" && isFreeId(id)).length;
const share = (free / all.length) * 100;
console.log(`Contenu gratuit : ${free} sur ${all.length} unités (${share.toFixed(1)} %)`);
if (share < MIN || share > MAX) fail(`part gratuite hors de ${MIN}–${MAX} %`);
for (const s of d.grammar) if (!grammar.some((g) => g.slug === s)) fail(`grammaire gratuite inconnue : ${s}`);
for (const s of d.readings) if (!readings.some((r) => r.slug === s)) fail(`lecture gratuite inconnue : ${s}`);
for (const s of d.dialogues) if (!dialogues.some((x) => x.slug === s)) fail(`dialogue gratuit inconnu : ${s}`);
if (d.katakana.length < 40) fail("katakana de base introuvables");
if (d.kanji.length < 10) fail("kanji des nombres introuvables");
if (isFreeId("/kanji/montagne") || !isFreeId("/hiragana/a") || isFreeId("/grammaire/keigo") || isFreeId("/examen")) fail("règles d'accès inattendues");
if (process.env.RELEASE === "1" && process.env.NEXT_PUBLIC_BILLING_MODE !== "store") fail("RELEASE=1 exige NEXT_PUBLIC_BILLING_MODE=store (le mode test débloque sans payer)");
if (process.env.NEXT_PUBLIC_BILLING_MODE !== "store") console.warn("⚠ mode test : le déblocage est simulé (aucun paiement réel)");
if (bad) process.exit(1);
console.log("✓ accès gratuit / complet cohérent");
