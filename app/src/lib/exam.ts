/**
 * Examen blanc JLPT N5 : fabrication des questions à partir des données de l'appli.
 * Fonctions pures (le hasard est injecté) : testées dans scripts/check-exam.ts.
 */

import { vowelOf } from "./kana-input";

export type Rng = () => number;

export const shuffleWith = <T,>(list: T[], rng: Rng): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ------------------------------------------------------------------ */
/* Lectures « presque justes » : les pièges classiques du JLPT          */
/* ------------------------------------------------------------------ */

const VOICED: Record<string, string[]> = {};
for (const [plain, voiced] of [["かきくけこ", "がぎぐげご"], ["さしすせそ", "ざじずぜぞ"], ["たちつてと", "だぢづでど"]]) {
  [...plain].forEach((c, i) => {
    VOICED[c] = [voiced[i]];
    VOICED[voiced[i]] = [c];
  });
}
[..."はひふへほ"].forEach((c, i) => {
  const b = "ばびぶべぼ"[i];
  const p = "ぱぴぷぺぽ"[i];
  VOICED[c] = [b, p];
  VOICED[b] = [c, p];
  VOICED[p] = [c, b];
});
const SMALL_BIG: Record<string, string> = { ゃ: "や", ゅ: "ゆ", ょ: "よ", や: "ゃ", ゆ: "ゅ", よ: "ょ" };
const SMALL = /[ゃゅょぁぃぅぇぉ]/;
/** Kana devant lesquels un っ est possible (lignes k, s, t, p). */
const GEMINABLE = /[かきくけこさしすせそたちつてとぱぴぷぺぽ]/;

/**
 * Variantes fausses d'une lecture en hiragana : son voisé ou non (か/が), voyelle longue
 * en trop ou en moins (きょう/きょ), っ en trop ou en moins, petit ょ ou grand よ.
 * Ce sont les erreurs que le JLPT propose comme pièges.
 */
export function readingVariants(kana: string): string[] {
  const out = new Set<string>();
  const chars = [...kana];
  const at = (i: number, replacement: string, remove = 1) => out.add([...chars.slice(0, i), replacement, ...chars.slice(i + remove)].join(""));
  chars.forEach((c, i) => {
    for (const alt of VOICED[c] ?? []) {
      // ぢ・づ ne sont presque jamais la bonne réponse : on ne les propose pas.
      if (alt !== "ぢ" && alt !== "づ") at(i, alt);
    }
    // Petit ゃゅょ ↔ grand やゆよ (seulement après un kana en い : きょ ↔ きよ).
    if (SMALL_BIG[c] && i > 0 && vowelOf(chars[i - 1]) === "い") at(i, SMALL_BIG[c]);
    const prev = chars[i - 1];
    const vPrev = prev ? vowelOf(prev) : undefined;
    // Voyelle longue en moins : とう → と, けい → け.
    if (i > 0 && ((c === "う" && (vPrev === "お" || vPrev === "う")) || (c === "い" && vPrev === "え"))) at(i, "");
    // Voyelle longue en trop : と → とう (pas avant un petit kana ni avant une voyelle longue existante).
    const next = chars[i + 1];
    if (vowelOf(c) === "お" && !SMALL.test(next ?? "") && next !== "う" && next !== "お") at(i, c + "う");
    // っ en moins, っ en trop.
    if (c === "っ") at(i, "");
    else if (i > 0 && GEMINABLE.test(c) && prev !== "っ" && prev !== "ん" && !SMALL.test(c)) at(i, "っ" + c);
  });
  out.delete(kana);
  return [...out].filter((v) => v.length > 0 && !/^[っゃゅょ]/.test(v));
}

/** Trois mauvaises lectures : d'abord les pièges, puis d'autres mots de même longueur. */
export function readingDistractors(kana: string, others: string[], rng: Rng, avoid: string[] = []): string[] {
  const banned = new Set([kana, ...avoid]);
  const picks: string[] = [];
  for (const v of shuffleWith(readingVariants(kana), rng)) {
    if (picks.length === 3) break;
    if (!banned.has(v)) {
      picks.push(v);
      banned.add(v);
    }
  }
  const sameLength = shuffleWith(others.filter((o) => Math.abs(o.length - kana.length) <= 1), rng);
  for (const o of sameLength) {
    if (picks.length === 3) break;
    if (!banned.has(o)) {
      picks.push(o);
      banned.add(o);
    }
  }
  return picks;
}

const HAN = /[一-鿿々]/;

/** Trois fausses écritures en kanji : un kanji du mot remplacé par un sosie ou un autre kanji. */
export function spellingDistractors(jp: string, lookalikes: string[][], pool: string[], rng: Rng, avoid: string[] = []): string[] {
  const banned = new Set([jp, ...avoid]);
  const picks: string[] = [];
  const positions = [...jp].map((c, i) => (HAN.test(c) ? i : -1)).filter((i) => i >= 0);
  const candidates: string[] = [];
  for (const i of positions) {
    const c = [...jp][i];
    const group = lookalikes.find((g) => g.includes(c)) ?? [];
    const subs = [...group.filter((x) => x !== c), ...shuffleWith(pool.filter((x) => x !== c), rng).slice(0, 6)];
    for (const s of subs) candidates.push([...jp].map((x, j) => (j === i ? s : x)).join(""));
  }
  // Les sosies d'abord (ils sont en tête de chaque liste), puis le reste mélangé.
  const lookalikeFirst = candidates.filter((c) => [...c].some((x) => lookalikes.some((g) => g.includes(x) && !jp.includes(x))));
  for (const c of [...shuffleWith(lookalikeFirst, rng), ...shuffleWith(candidates, rng)]) {
    if (picks.length === 3) break;
    if (!banned.has(c)) {
      picks.push(c);
      banned.add(c);
    }
  }
  return picks;
}

/* ------------------------------------------------------------------ */
/* Particules à trous                                                   */
/* ------------------------------------------------------------------ */

export const PARTICLES = ["は", "が", "を", "に", "で", "へ", "と", "も", "の", "から", "まで"] as const;
/** Particules qui pourraient aussi convenir : jamais proposées ensemble. */
const CLOSE: Record<string, string[]> = {
  // Après un nom de personne, と (« avec ») est souvent possible aussi : おばあさん{は/と}かわへ…
  は: ["が", "も", "と"], が: ["は", "も", "と"], も: ["は", "が", "を", "と"], を: ["も", "は"],
  // Direction et limite se recoupent : えき{へ/に/まで}あるきます, えき{から/まで}…
  に: ["へ", "まで"], へ: ["に", "まで"], まで: ["へ", "に", "から"], から: ["まで"],
  で: [], と: ["は", "が", "も"], の: [],
};

/** Trois particules fausses, en évitant celles qui pourraient aussi être justes. */
export function particleDistractors(correct: string, rng: Rng): string[] {
  const banned = new Set([correct, ...(CLOSE[correct] ?? [])]);
  return shuffleWith(PARTICLES.filter((p) => !banned.has(p)), rng).slice(0, 3);
}

/* ------------------------------------------------------------------ */
/* Résultat                                                             */
/* ------------------------------------------------------------------ */

export type SectionId = "vocabulaire" | "grammaire" | "lecture" | "ecoute";

export type ExamScore = { section: SectionId; score: number; total: number };

/**
 * Estimation indicative, sur le modèle du JLPT N5 : il faut environ 44 % au total (80 sur 180),
 * au moins 32 % en « connaissances et lecture » (38 sur 120) et 32 % en écoute (19 sur 60).
 * Le vrai examen pondère les questions (échelle « scaled score ») : ce n'est qu'un repère.
 */
export function estimate(scores: ExamScore[]) {
  const sum = (ids: SectionId[]) => scores.filter((s) => ids.includes(s.section)).reduce((a, s) => ({ score: a.score + s.score, total: a.total + s.total }), { score: 0, total: 0 });
  const knowledge = sum(["vocabulaire", "grammaire", "lecture"]);
  const listening = sum(["ecoute"]);
  const pct = (x: { score: number; total: number }) => (x.total ? x.score / x.total : 0);
  // Comme au JLPT : 120 points pour connaissances et lecture, 60 pour l'écoute.
  const points = Math.round(pct(knowledge) * 120 + (listening.total ? pct(listening) * 60 : 0));
  const outOf = listening.total ? 180 : 120;
  const passed = listening.total
    ? points >= 80 && pct(knowledge) >= 38 / 120 && pct(listening) >= 19 / 60
    : pct(knowledge) >= 80 / 180 && pct(knowledge) >= 38 / 120;
  return { knowledge, listening, points, outOf, passed };
}
