/**
 * Vérification des données de l'application.
 *  1. Cohérence interne (bloquante) : traits, liens, doublons, kanji présents dans leurs mots…
 *  2. Rōmaji : chaque transcription doit correspondre à sa lecture en kana.
 *  3. Dictionnaires de référence (reference/) : lectures des kanji (KANJIDIC2) et vocabulaire JLPT.
 * Les écarts acceptés en connaissance de cause sont listés dans reference/exceptions.json.
 *
 * Usage : npm run check   (ajouter --report pour la liste complète des avertissements)
 */
import { allSrsItems } from "../src/data/srs-items";
import { vocab as appVocab } from "../src/data/vocab";
import fs from "node:fs";
import path from "node:path";
import { kanjiList } from "@/data/kanji";
import { LOOKALIKES, READINGS } from "@/data/kanji-notes";
import { readings as texts } from "@/data/readings";
import { catalog } from "@/data/catalog";
import { grammar } from "@/data/grammar";
import { EXAM_PASSAGES } from "@/data/exam-n5";
import { verbs, verbExamplesRaw } from "@/data/verbs";
import { getHiraganaLesson, hiraganaLessonSlugs } from "@/data/hiragana";
import { getKatakanaLesson, katakanaLessonSlugs } from "@/data/katakana";
import kuromoji from "kuromoji";
import { kanaToRomaji, normalizeRomaji, toHiragana } from "./romaji";
import { readingOfCharacter } from "@/data/kanji-readings";

const root = path.resolve(__dirname, "..");
const kanjidic: Record<string, { strokes: number; jlpt: number | null; on: string[]; kun: string[] }> = JSON.parse(
  fs.readFileSync(path.join(root, "reference/kanjidic-subset.json"), "utf8"),
);
const vocab: [string, string, number, string][] = JSON.parse(fs.readFileSync(path.join(root, "reference/jlpt-vocab.json"), "utf8"));
const exceptions: Record<string, string> = fs.existsSync(path.join(root, "reference/exceptions.json"))
  ? JSON.parse(fs.readFileSync(path.join(root, "reference/exceptions.json"), "utf8"))
  : {};

const errors: string[] = [];
const warnings: string[] = [];
const err = (key: string, msg: string) => (exceptions[key] ? null : errors.push(`${msg}  [${key}]`));
const warn = (key: string, msg: string) => (exceptions[key] ? null : warnings.push(`${msg}  [${key}]`));

const vocabPairs = new Set(vocab.map(([e, r]) => `${e}|${toHiragana(r)}`));
const vocabExpr = new Set(vocab.map(([e]) => e));
const vocabReadings = new Set(vocab.map(([, r]) => toHiragana(r)));
const kanaOnly = /^[぀-ヿー]+$/;
const HAN = /[一-鿿々]/;

function checkRomaji(where: string, kana: string, romaji: string) {
  const a = normalizeRomaji(kanaToRomaji(kana));
  const b = normalizeRomaji(romaji);
  if (a !== b) err(`romaji:${kana}:${romaji}`, `${where} : rōmaji « ${romaji} » ≠ lecture « ${kana} » (${kanaToRomaji(kana)})`);
}

const pending: { where: string; expr: string; reading: string }[] = [];
function checkWord(where: string, expr: string, reading: string) {
  pending.push({ where, expr, reading: toHiragana(reading) });
}

// Lectures KANJIDIC normalisées : ひと.つ → ひとつ, -ひと → ひと
const kd = (s: string) => toHiragana(s).replace(/[.\-]/g, "");
const app = (s: string) => toHiragana(s).replace(/[()（）]/g, "");

/* ---------- Kanji ---------- */
const seenSlugs = new Set<string>();
const seenChars = new Set<string>();
for (const k of kanjiList) {
  const where = `kanji ${k.character}`;
  if (seenSlugs.has(k.slug)) err(`dup-slug:${k.slug}`, `${where} : identifiant en double ${k.slug}`);
  if (seenChars.has(k.character)) err(`dup-char:${k.character}`, `${where} : kanji en double`);
  seenSlugs.add(k.slug); seenChars.add(k.character);
  if (!k.strokes?.length) err(`strokes:${k.character}`, `${where} : pas de tracés`);
  const ref = kanjidic[k.character];
  if (!ref) { err(`kanjidic:${k.character}`, `${where} : absent de KANJIDIC`); continue; }
  if (k.strokes.length !== ref.strokes) err(`stroke-count:${k.character}`, `${where} : ${k.strokes.length} traits (KanjiVG) ≠ ${ref.strokes} (KANJIDIC)`);
  if (ref.jlpt && k.level !== `N${ref.jlpt}`) err(`level:${k.character}`, `${where} : classé ${k.level} ici, mais ${"N" + ref.jlpt} dans la référence`);
  const on = new Set(ref.on.map(kd));
  const kun = new Set(ref.kun.map(kd));
  const kunStem = new Set(ref.kun.map((x) => toHiragana(x).split(".")[0].replace(/-/g, "")));
  for (const r of k.onyomi) {
    if (!on.has(app(r.kana))) err(`on:${k.character}:${r.kana}`, `${where} : lecture on ${r.kana} absente de KANJIDIC (${ref.on.join(", ")})`);
    checkRomaji(where, r.kana.replace(/[()（）]/g, ""), r.romaji.replace(/[()]/g, ""));
  }
  for (const r of k.kunyomi) {
    const v = app(r.kana);
    const stem = toHiragana(r.kana).split(/[(（]/)[0];
    if (!kun.has(v) && !kunStem.has(stem)) err(`kun:${k.character}:${r.kana}`, `${where} : lecture kun ${r.kana} absente de KANJIDIC (${ref.kun.join(", ")})`);
    checkRomaji(where, r.kana.replace(/[()（）]/g, ""), r.romaji.replace(/[()]/g, ""));
  }
  for (const word of k.words) {
    if (!word.japanese.includes(k.character)) err(`word-char:${k.character}:${word.japanese}`, `${where} : le mot ${word.japanese} ne contient pas ${k.character}`);
    checkRomaji(`${where}, mot ${word.japanese}`, word.reading, word.romaji);
    checkWord(`${where}, mot`, word.japanese, word.reading);
  }
}

/* ---------- Encadrés ---------- */
for (const [char, note] of Object.entries(READINGS)) {
  if (!seenChars.has(char)) err(`readings-char:${char}`, `Lectures selon le mot : ${char} n'est pas une leçon`);
  for (const item of note.items) {
    if (!item.word.includes(char)) err(`readings-word:${item.word}`, `Lectures de ${char} : ${item.word} ne contient pas ${char}`);
    checkRomaji(`Lectures de ${char}, ${item.word}`, item.reading, item.romaji);
    checkWord(`Lectures de ${char}`, item.word, item.reading);
  }
}
for (const group of LOOKALIKES) for (const item of group.items) {
  if (!seenChars.has(item.character)) err(`lookalike:${item.character}`, `Sosies : ${item.character} n'est pas une leçon`);
}

/* ---------- Kana ---------- */
for (const [script, slugs, get] of [["hiragana", hiraganaLessonSlugs(), getHiraganaLesson], ["katakana", katakanaLessonSlugs(), getKatakanaLesson]] as const) {
  for (const slug of slugs) {
    const kana = get(slug)!;
    if (!kana.strokes?.length) err(`kana-strokes:${script}:${slug}`, `${script} ${slug} : pas de tracés`);
    for (const word of kana.words) {
      // Voyelles longues : le mot contient la seconde voyelle (おかあさん pour ああ), pas la paire telle quelle.
      if (kana.family !== "special" && !word.japanese.includes(kana.family === "long" ? kana.character.slice(-1) : kana.character)) err(`kana-word:${word.japanese}`, `${script} ${kana.character} : le mot ${word.japanese} ne contient pas le caractère`);
      if (!HAN.test(word.japanese)) checkRomaji(`${script} ${kana.character}`, word.japanese, word.romaji);
      checkWord(`${script} ${kana.character}`, word.japanese, word.japanese);
    }
  }
}

/* ---------- Catalogue ---------- */
for (const [script, data] of Object.entries(catalog)) for (const section of data.sections) for (const cell of section.cells) {
  if (cell && !cell.href) warn(`no-lesson:${script}:${cell.character}`, `${script} : ${cell.character} n'a pas de leçon`);
}

/* ---------- Textes de lecture ---------- */
for (const text of texts) text.sentences.forEach((s, i) => {
  const where = `Lecture ${text.slug}, phrase ${i + 1}`;
  for (const t of s.tokens) {
    if (HAN.test(t.t) && !t.r) err(`token-reading:${t.t}`, `${where} : « ${t.t} » contient un kanji sans lecture`);
    if (t.r && t.rm) checkRomaji(where, t.r, t.rm);
    if (!t.r && t.rm && kanaOnly.test(t.t) && !t.g) checkRomaji(where, t.t, t.rm);
    if (t.r && t.m) checkWord(where, t.t, t.r);
  }
  const PARTICLES: Record<string, string> = { は: "わ", へ: "え", を: "お" };
  const kana = s.tokens.map((t) => (t.g && PARTICLES[t.t] ? PARTICLES[t.t] : t.r ?? t.t)).join("");
  checkRomaji(`${where} (phrase entière)`, kana, s.romaji);
});

/* ---------- Règle : tout caractère cité dans un texte français a une lecture ---------- */
const CITED = /[\u2E80-\u2FDF\u3400-\u9FFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/gu;
const citedIn: [string, string][] = [
  ...kanjiList.flatMap((k) => [[`histoire de ${k.character}`, k.story], [`légende de ${k.character}`, k.caption]] as [string, string][]),
  ...LOOKALIKES.flatMap((g) => [["sosies", g.tip], ...g.items.map((i) => ["sosies " + i.character, i.hint] as [string, string])] as [string, string][]),
  ...Object.entries(READINGS).map(([c, n]) => [`règle de ${c}`, n.rule] as [string, string]),
];
const unreadable = new Map<string, string>();
for (const [where, text] of citedIn) for (const ch of text.match(CITED) ?? []) if (!readingOfCharacter(ch)) unreadable.set(ch, where);
for (const [ch, where] of unreadable) err(`no-reading:${ch}`, `${where} : « ${ch} » est cité sans lecture connue (ajoute-le dans kanji-readings.ts)`);

/* ---------- Grammaire ---------- */
/** Kana d'un exemple : les は, へ, を en fin de groupe sont des particules (wa, e, o). */
const particleKana = (kana: string) =>
  kana.split(/\s+/).map((chunk) => chunk.replace(/は([。、！？]*)$/, "わ$1").replace(/へ([。、！？]*)$/, "え$1").replace(/を([。、！？]*)$/, "お$1")).join(" ");
for (const point of grammar) for (const block of point.body) {
  const where = `Grammaire ${point.slug}`;
  if (block.type === "example") {
    const { jp, kana, romaji } = block.example;
    if (HAN.test(jp) && !kana) err(`grammar-kana:${jp}`, `${where} : « ${jp} » contient des kanji sans lecture`);
    checkRomaji(where, particleKana(kana ?? jp), romaji);
  }
  if (block.type === "table") for (const cell of block.rows.flat()) {
    const [cellJp, cellKana] = cell.split("|");
    if (HAN.test(cellJp) && !cellKana) err(`grammar-table:${cell}`, `${where} : case « ${cell} » avec des kanji sans lecture (écrire « kanji|kana »)`);
    if (cellKana && cellJp.replace(/[^\u3040-\u30ff]/g, "").split("").some((k) => !cellKana.includes(k)))
      warn(`grammar-table-kana:${cell}`, `${where} : case « ${cell} », la lecture ne reprend pas tous les kana`);
  }
  if (block.type === "diagram") for (const seg of block.segments) {
    if (HAN.test(seg.jp) && !seg.kana) err(`grammar-kana:${seg.jp}`, `${where} : « ${seg.jp} » contient des kanji sans lecture`);
    checkRomaji(where, particleKana(seg.kana ?? seg.jp), seg.romaji);
  }
}

/* ---------- Verbes ---------- */
const sentencePending: { where: string; jp: string; kana: string }[] = [];

/* ---------- Examen blanc : textes de lecture ---------- */
for (const passage of EXAM_PASSAGES) {
  for (const line of passage.lines) {
    const where = `Examen ${passage.id}`;
    checkRomaji(where, particleKana(line.kana), line.romaji.replace(/-/g, " "));
    if (HAN.test(line.jp)) sentencePending.push({ where, jp: line.jp.replace(/\s+/g, ""), kana: line.kana });
  }
  for (const q of passage.questions) {
    if (q.answer < 0 || q.answer >= q.choices.length) err(`exam-answer:${q.id}`, `Examen ${q.id} : réponse hors des choix`);
  }
}
{
  const seen = new Set<string>();
  for (const v of verbs) {
    const key = `${v.jp}|${v.kana}`;
    if (seen.has(key)) err(`verb-dup:${key}`, `Verbes : ${v.jp} (${v.kana}) en double`);
    seen.add(key);
    pending.push({ where: `Verbe ${v.jp}`, expr: v.jp, reading: toHiragana(v.kana) });
    if (!/[てで]$/.test(v.te.kana) || v.te.kana.slice(0, -1) !== v.plain.past.kana.slice(0, -1)) err(`verb-te:${v.jp}`, `Verbe ${v.jp} : forme en て incohérente (${v.te.kana})`);
    if (!/ない$/.test(v.plain.neg.kana) || !/[ただ]$/.test(v.plain.past.kana)) err(`verb-plain:${v.jp}`, `Verbe ${v.jp} : formes familières incohérentes (${v.plain.neg.kana}, ${v.plain.past.kana})`);
    if (!/[うくぐすつぬぶむる]$/.test(v.kana)) err(`verb-end:${v.jp}`, `Verbe ${v.jp} : le kana ${v.kana} ne finit pas comme un verbe`);
  }
  for (const { jp, exJp, exKana } of verbExamplesRaw) {
    const stem = jp.replace(/[ぁ-んァ-ヶー]+$/, "");
    const kanaStem = verbs.find((v) => v.jp === jp)?.kana.slice(0, -1) ?? "";
    if (stem && !exJp.includes(stem.slice(0, 1)) && !exJp.includes(kanaStem)) err(`verb-ex:${jp}`, `Verbe ${jp} : l'exemple « ${exJp} » ne contient pas le verbe`);
    sentencePending.push({ where: `Exemple de ${jp}`, jp: exJp, kana: exKana.replace(/_/g, "").replace(/\s+/g, "") });
  }
}

/* ---------- Mots : liste JLPT, puis analyseur kuromoji (dictionnaire IPADIC) ---------- */
async function verifyWords() {
  const tokenizer = await new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) =>
    kuromoji.builder({ dicPath: path.join(root, "node_modules/kuromoji/dict") }).build((e, t) => (e ? reject(e) : resolve(t))),
  );
  const done = new Set<string>();
  for (const { where, expr, reading } of pending) {
    const key = `${expr}|${reading}`;
    if (done.has(key)) continue;
    done.add(key);
    if (vocabPairs.has(key) || (kanaOnly.test(expr) && (vocabExpr.has(expr) || vocabReadings.has(toHiragana(expr))))) continue;
    const tokens = tokenizer.tokenize(expr);
    if (kanaOnly.test(expr)) {
      if (tokens.every((t) => t.word_type === "KNOWN")) continue;
      err(`word:${expr}`, `${where} : « ${expr} » inconnu des deux dictionnaires`);
      continue;
    }
    const guess = toHiragana(tokens.map((t) => t.reading ?? t.surface_form).join(""));
    if (guess === reading) continue;
    err(`word:${expr}:${reading}`, `${where} : « ${expr} » lu « ${reading} » ici, « ${guess} » selon kuromoji`);
  }
}

async function verifySentences() {
  const tokenizer = await new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) =>
    kuromoji.builder({ dicPath: path.join(root, "node_modules/kuromoji/dict") }).build((e, t) => (e ? reject(e) : resolve(t))),
  );
  const strip = (s: string) => toHiragana(s).replace(/[、。！？「」\s…]/g, "");
  for (const { where, jp, kana } of sentencePending) {
    const guess = strip(tokenizer.tokenize(jp).map((t) => t.reading ?? t.surface_form).join(""));
    if (guess !== strip(kana)) warn(`sentence:${jp}`, `${where} : kana « ${strip(kana)} » ≠ kuromoji « ${guess} »`);
  }
}

for (const t of texts) {
  if (HAN.test(t.title) && !t.titleKana) err(`title-kana:${t.slug}`, `Lecture ${t.slug} : titre avec kanji sans lecture (titleKana)`);
  checkRomaji(`Lecture ${t.slug}, titre`, (t.titleKana ?? t.title).replace(/や(?=で)/, "や"), t.titleRomaji.replace("-", " "));
}

/* ---------- Vocabulaire ---------- */
// Chaque mot doit être dans la liste JLPT du niveau indiqué (par sa lecture), avec une lecture cohérente.
{
  const ref = JSON.parse(fs.readFileSync("reference/jlpt-vocab.json", "utf8")) as [string, string, number, string][];
  const kanaByLevel = new Map<number, Set<string>>();
  for (const [, k, lvl] of ref) for (const one of k.split(/[;；]\s*/)) {
    const clean = one.replace(/\s*\(.*?\)\s*/g, "").replace(/^\(.*?\)\s*/, "").trim();
    if (!kanaByLevel.has(lvl)) kanaByLevel.set(lvl, new Set());
    kanaByLevel.get(lvl)!.add(toHiragana(clean));
  }
  const slugs = new Set<string>();
  for (const w of appVocab) {
    const lvl = Number(w.level.slice(1));
    const known = kanaByLevel.get(lvl);
    // La liste écrit parfois l'adverbe avec と (ゆっくりと) : les deux formes sont acceptées.
    // Les noms en する sont parfois listés avec する (うんどうする) : on accepte les deux.
    const k = toHiragana(w.kana);
    if (!known?.has(k) && !known?.has(`${k}と`) && !known?.has(`${k}する`)) err(`vocab-jlpt:${w.kana}`, `Vocabulaire : ${w.jp} (${w.kana}) absent de la liste JLPT ${w.level}`);
    if (slugs.has(w.slug)) err(`vocab-slug:${w.slug}`, `Vocabulaire : identifiant en double ${w.slug}`);
    slugs.add(w.slug);
    if (!w.fr || !w.romaji) err(`vocab-vide:${w.kana}`, `Vocabulaire : ${w.jp} sans sens ou sans rōmaji`);
    if (w.jp === w.kana && HAN.test(w.jp)) err(`vocab-kana:${w.jp}`, `Vocabulaire : ${w.jp} sans lecture`);
  }
  console.log(`Vocabulaire : ${appVocab.length} mots.`);
}

/* ---------- Cartes de révision ---------- */
// Chaque carte doit montrer la lecture (kana et rōmaji) au verso, et les identifiants doivent être uniques.
{
  const items = allSrsItems();
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) err(`srs-dup:${item.id}`, `Révisions : carte en double ${item.id}`);
    ids.add(item.id);
    if (!item.reading.kana || !item.reading.romaji) err(`srs-reading:${item.id}`, `Révisions : ${item.id} sans lecture kana / rōmaji`);
    for (const e of item.extra) if (!e.reading.kana || !e.reading.romaji) err(`srs-extra:${item.id}`, `Révisions : ${item.id}, forme « ${e.label} » sans lecture`);
  }
  console.log(`Révisions : ${items.length} cartes possibles.`);
}

/* ---------- Rapport ---------- */
async function main() {
  await verifyWords();
  await verifySentences();
const report = process.argv.includes("--report");
console.log(`Vérification : ${kanjiList.length} kanji, ${Object.keys(READINGS).length} encadrés de lectures, ${texts.length} textes.`);
if (warnings.length) {
  console.log(`\n${warnings.length} avertissement(s) (à vérifier, non bloquants)`);
  if (report) for (const w of warnings) console.log("  ⚠ " + w);
  else console.log("  (npm run check -- --report pour la liste)");
}
if (errors.length) {
  console.log(`\n${errors.length} erreur(s) :`);
  for (const e of errors) console.log("  ✗ " + e);
  process.exit(1);
}
console.log("\n✓ Aucune erreur bloquante.");
}

void main();
