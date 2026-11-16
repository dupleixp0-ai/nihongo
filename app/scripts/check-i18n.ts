/**
 * Textes de l'interface : mêmes clés dans les trois langues (déjà vérifié par TypeScript),
 * aucun texte vide, et pas de phrase française oubliée dans la version anglaise ou allemande.
 */
import { readdirSync, readFileSync } from "node:fs";
import { MESSAGES } from "../src/i18n/messages";

let fails = 0;
const SAMPLE: unknown[] = [2, 3, 4, 5];
const sameAllowed = new Set(["Hiragana", "Kana", "Rōmaji", "Question 2", "Express · Nihongo", "Express · 5 min", "Katakana", "Kanji", "Nihongo", "iCloud", "Kanji N5", "Kanji N4", "Normal", "Service", "Offline", "Indigo", "indigo", "min", "h", "Omamori", "Sections", "Intense", "2 points", "2 / 3 points", "omamori", "50 kanji", "points", "Dakuten", ", © Ulrich Apel, licence ", "2 kanji", "Dialogue", "Dialogues", "Contact", "Dialogues · Nihongo", "conversations", "2 dialogues", "Kana + rōmaji", "Analyse"]);

function walk(path: string, fr: unknown, other: unknown, lang: string) {
  if (typeof fr === "function") {
    const args = SAMPLE.slice(0, fr.length).map((a, i) => (path.includes("line") && i === 2 ? "seen" : a));
    return walk(`${path}()`, fr(...args), (other as (...a: unknown[]) => unknown)(...args), lang);
  }
  if (Array.isArray(fr)) return fr.forEach((v, i) => walk(`${path}[${i}]`, v, (other as unknown[])[i], lang));
  if (fr && typeof fr === "object") {
    for (const k of Object.keys(fr)) walk(`${path}.${k}`, (fr as Record<string, unknown>)[k], (other as Record<string, unknown>)?.[k], lang);
    return;
  }
  if (typeof fr !== "string") return;
  if (typeof other !== "string" || !other.trim()) {
    fails++;
    console.log(`✗ ${lang} ${path} : texte manquant ou vide`);
  } else if (other === fr && fr.length > 3 && !sameAllowed.has(fr) && /[a-zà-ü]{4}/i.test(fr) && !/^[\d\s/·%.,:]+$/.test(fr)) {
    fails++;
    console.log(`✗ ${lang} ${path} : identique au français (« ${fr.slice(0, 60)} »)`);
  }
}

let count = 0;
const countStrings = (v: unknown): void => {
  if (typeof v === "string" || typeof v === "function") count++;
  else if (v && typeof v === "object") Object.values(v).forEach(countStrings);
};
countStrings(MESSAGES.fr);
walk("", MESSAGES.fr, MESSAGES.en, "en");
walk("", MESSAGES.fr, MESSAGES.de, "de");
if (fails) {
  console.log(`\n${fails} problème(s) dans les traductions.`);
  process.exit(1);
}
console.log(`Traductions de l'interface : ${count} textes, complets en anglais et en allemand.`);

/* ---------------- Contenu des leçons de kana ---------------- */
import { getHiraganaLesson, hiraganaLessonSlugs } from "../src/data/hiragana";
import { getKatakanaLesson, katakanaLessonSlugs } from "../src/data/katakana";
import { KANA_LOCALES, localizeKana } from "../src/i18n/kana";
import type { Kana } from "../src/domain/kana";

/** Écritures dont la traduction doit être complète (les autres affichent encore le français). */
const KANA_DONE = new Set<string>(["hiragana", "katakana"]);
const lessons: Kana[] = [
  ...hiraganaLessonSlugs().map((s) => getHiraganaLesson(s)!),
  ...katakanaLessonSlugs().map((s) => getKatakanaLesson(s)!),
];
let kanaFails = 0;
const coverage: Record<string, { done: number; total: number }> = {};
for (const kana of lessons) {
  const key = `${kana.script}/${kana.slug ?? kana.romaji}`;
  for (const lang of ["en", "de"] as const) {
    const t = localizeKana(kana, lang);
    const missing: string[] = [
      !t.pronunciation && "prononciation",
      !t.mnemonic && "histoire",
      kana.illustration && !t.caption && "légende",
      ...kana.words.flatMap((w, i) => (t.words[i] ? [] : [`mot ${w.japanese}`])),
    ].filter((x): x is string => Boolean(x));
    const french = [t.pronunciation, t.mnemonic, t.caption, ...t.words].some((x) => x && /[«»]/.test(x));
    // Leçons construites : le nom de l'objet du dessin doit exister dans la langue (sinon phrase de repli).
    const o = kana.origin;
    const loc = KANA_LOCALES[lang];
    const ids = o?.kind === "dakuten" ? [o.object] : o?.kind === "yoon" ? [o.object, o.smallObject] : [];
    for (const id of ids) if (!id || !loc.object[id]) missing.push(`objet ${id ?? "?"}`);
    const c = (coverage[`${kana.script} ${lang}`] ??= { done: 0, total: 0 });
    c.total++;
    if (!missing.length && !french) c.done++;
    if (KANA_DONE.has(kana.script) && (missing.length || french)) {
      kanaFails++;
      console.log(`✗ ${lang} ${key} : ${missing.join(", ")}${french ? " guillemets français" : ""}`);
    }
  }
}
if (kanaFails) {
  console.log(`\n${kanaFails} leçon(s) de kana incomplète(s).`);
  process.exit(1);
}
console.log(`Leçons de kana traduites : ${Object.entries(coverage).map(([k, v]) => `${k} ${v.done}/${v.total}`).join(", ")}.`);

/* ---------------- Sens des kanji, des mots et des verbes ---------------- */
import { kanjiList } from "../src/data/kanji";
import { vocab } from "../src/data/vocab";
import { verbs } from "../src/data/verbs";
import { KANJI_MEANINGS, KANJI_WORD_MEANINGS } from "../src/i18n/meanings/kanji";
import { VOCAB_MEANINGS } from "../src/i18n/meanings/vocab";
import { VERB_MEANINGS } from "../src/i18n/meanings/verbs";

let meaningFails = 0;
function checkTable(name: string, table: Record<string, readonly string[]>, keys: string[]) {
  const wanted = new Set(keys);
  for (const k of wanted) {
    const row = table[k];
    if (!row) { meaningFails++; console.log(`✗ ${name} : « ${k} » sans traduction`); continue; }
    if (row.some((t) => !t.trim() || /[«»]/.test(t))) { meaningFails++; console.log(`✗ ${name} : « ${k} » traduction vide ou en français`); }
  }
  for (const k of Object.keys(table)) if (!wanted.has(k)) { meaningFails++; console.log(`✗ ${name} : « ${k} » ne correspond à aucun élément (identifiant changé ?)`); }
}
checkTable("kanji", KANJI_MEANINGS, kanjiList.map((k) => k.slug));
checkTable("mots des kanji", KANJI_WORD_MEANINGS, kanjiList.flatMap((k) => k.words.map((w) => w.japanese)));
checkTable("vocabulaire", VOCAB_MEANINGS, vocab.map((w) => w.slug));
checkTable("verbes", VERB_MEANINGS, verbs.map((v) => v.slug));
if (meaningFails) {
  console.log(`\n${meaningFails} problème(s) dans les sens traduits.`);
  process.exit(1);
}
console.log(`Sens traduits : ${kanjiList.length} kanji, ${Object.keys(KANJI_WORD_MEANINGS).length} mots des kanji, ${vocab.length} mots, ${verbs.length} verbes (avec exemples).`);

/* ---------------- Grammaire, lectures, examen ---------------- */
import { grammar } from "../src/data/grammar";
import { readings } from "../src/data/readings";
import { dialogues } from "../src/data/dialogues";
import { EXAM_PASSAGES } from "../src/data/exam-n5";
import { LOOKALIKES, READINGS } from "../src/data/kanji-notes";
import { CONTENT_SENTENCES_DE, CONTENT_TEXTS, needsTr } from "../src/i18n/content";

{
  const need = new Set<string>();
  const add = (s?: string) => { if (s && needsTr(s)) need.add(s); };
  for (const g of grammar) {
    add(g.title); add(g.summary);
    for (const b of g.body) {
      if (b.type === "p" || b.type === "h" || b.type === "tip" || b.type === "warning") add(b.text);
      else if (b.type === "example") { add(b.example.fr); add(b.example.note); }
      else if (b.type === "diagram") { add(b.caption); add(b.fr); b.segments.forEach((s) => add(s.fr)); }
      else if (b.type === "table") { b.head.forEach(add); b.rows.forEach((r) => r.forEach(add)); }
    }
  }
  for (const t of readings) {
    add(t.titleFr); add(t.intro);
    for (const s of t.sentences) for (const k of s.tokens) { add(k.m); add(k.g); add(k.n); }
  }
  for (const k of kanjiList) { add(k.story); add(k.caption); }
  // Textes alternatifs des illustrations : lus directement dans le code des composants.
  const dir = "src/components/kana";
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    for (const m of readFileSync(`${dir}/${f}`, "utf8").matchAll(/<Scene label="([^"]+)"/g)) add(m[1]);
  }
  for (const g of LOOKALIKES) { add(g.tip); g.items.forEach((i) => add(i.hint)); }
  for (const n of Object.values(READINGS)) { add(n.rule); n.items.forEach((i) => { add(i.meaning); add(i.special); }); }
  for (const p of EXAM_PASSAGES) { add(p.title); add(p.fr); p.questions.forEach((q) => { add(q.question); q.choices.forEach(add); }); }

  // Dialogues : tous les textes, même très courts (« où », « oui »), doivent être traduits.
  for (const d of dialogues) {
    const all = (x?: string) => { if (x) need.add(x); };
    all(d.titleFr); all(d.intro);
    if (!d.partnerKana) all(d.partner);
    for (const t of d.turns) {
      const lines = t.kind === "say" ? [t] : t.choices;
      if (t.kind === "reply") all(t.prompt);
      for (const l of lines) { all(l.fr); l.words?.forEach((w) => all(w.fr)); if (t.kind === "reply") all((l as { why?: string }).why); }
    }
  }

  let bad = 0;
  const known = new Set<string>();
  const sameOk = new Set(["Yuki", "Ken", "Momotarō", "Haru", "Type", "Form", "Forme"]);
  for (const [name, dict] of Object.entries(CONTENT_TEXTS)) {
    for (const [fr, [en, de]] of Object.entries(dict)) {
      known.add(fr);
      if (!en.trim() || !de.trim()) { bad++; console.log(`✗ ${name} : traduction vide pour « ${fr.slice(0, 50)} »`); }
      else if ((en === fr || de === fr) && fr.length > 12 && !sameOk.has(fr)) { bad++; console.log(`✗ ${name} : identique au français (« ${fr.slice(0, 50)} »)`); }
      if (!need.has(fr)) { bad++; console.log(`✗ ${name} : entrée orpheline (« ${fr.slice(0, 50)} »)`); }
    }
  }
  for (const fr of need) if (!known.has(fr)) { bad++; console.log(`✗ texte sans traduction : « ${fr.slice(0, 60)} »`); }
  // Une même clé dans deux fichiers doit avoir la même traduction.
  const seen = new Map<string, string>();
  for (const dict of Object.values(CONTENT_TEXTS)) for (const [fr, p] of Object.entries(dict)) { const v = p.join("¦"); if (seen.has(fr) && seen.get(fr) !== v) { bad++; console.log(`✗ deux traductions différentes pour « ${fr.slice(0, 50)} »`); } seen.set(fr, v); }

  const romajis = new Set(readings.flatMap((t) => t.sentences.map((s) => s.romaji)));
  for (const r of romajis) if (!CONTENT_SENTENCES_DE[r]?.trim()) { bad++; console.log(`✗ phrase sans traduction allemande : ${r}`); }
  for (const r of Object.keys(CONTENT_SENTENCES_DE)) if (!romajis.has(r)) { bad++; console.log(`✗ traduction allemande orpheline : ${r}`); }
  if (bad) { console.log(`\n${bad} problème(s) dans les textes de grammaire, de lecture ou d'examen.`); process.exit(1); }
  console.log(`Grammaire, lectures, examen, kanji : ${need.size} textes et ${romajis.size} phrases allemandes, complets en anglais et en allemand.`);
}
