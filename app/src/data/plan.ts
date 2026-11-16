import { KANJI_LEVEL_SECTIONS, catalog } from "./catalog";
import { kanjiList } from "./kanji";
import { verbs } from "./verbs";
import { vocab, wordCardId } from "./vocab";
import { verbCardId } from "./srs-items";

/**
 * Le parcours guidé : l'ordre conseillé pour apprendre, du premier hiragana au niveau N4.
 * Rien n'est verrouillé : toutes les leçons restent ouvertes, le parcours indique seulement quoi faire ensuite.
 * Les titres et explications de chaque étape sont dans les textes de l'interface (`plan.steps`).
 */

export type PlanTier = "hiragana" | "katakana" | "n5" | "n4";

export type PlanStep = {
  id: string;
  kind: "study" | "review";
  /** Niveau de départ à partir duquel l'étape est considérée comme acquise d'office. */
  tier: PlanTier;
  /** Éléments à rencontrer : leçon ouverte (progress.seen) ou carte déjà révisée. */
  ids: string[];
  /** Part des éléments à rencontrer pour que l'étape compte comme terminée. */
  threshold: number;
  /** Où étudier. */
  href: string;
  /** Étapes d'étude révisées (étape de révision). */
  covers?: string[];
};

const section = (script: "hiragana" | "katakana", id: string) =>
  (catalog[script].sections.find((s) => s.id === id)?.cells ?? []).flatMap((c) => (c?.href ? [c.href] : []));
const kanjiSection = (id: string) => (KANJI_LEVEL_SECTIONS.N5.find((s) => s.id === `n5-${id}`)?.cells ?? []).flatMap((c) => (c?.href ? [c.href] : []));
const grammar = (...slugs: string[]) => slugs.map((s) => `/grammaire/${s}`);
const reading = (...slugs: string[]) => slugs.map((s) => `/lecture/${s}`);
const words = (theme: string, level: "N5" | "N4", max = 999) => vocab.filter((w) => w.theme === theme && w.level === level).slice(0, max).map((w) => wordCardId(w.slug));

const study = (id: string, tier: PlanTier, href: string, ids: string[], threshold = 0.8): PlanStep => ({ id, kind: "study", tier, href, ids, threshold });

function build(): PlanStep[] {
  const steps: PlanStep[] = [
    study("hiragana-base", "hiragana", "/hiragana", section("hiragana", "base")),
    study("hiragana-plus", "hiragana", "/hiragana", [...section("hiragana", "dakuten"), ...section("hiragana", "combinaisons"), ...section("hiragana", "signes")]),
    study("mots-outils", "hiragana", "/vocabulaire", words("O", "N5"), 0.6),
    study("katakana-base", "katakana", "/katakana", section("katakana", "base")),
    study("katakana-plus", "katakana", "/katakana", [...section("katakana", "dakuten"), ...section("katakana", "combinaisons"), ...section("katakana", "signes"), ...section("katakana", "etendus")]),
    study("phrase", "n5", "/grammaire", grammar("structure-de-la-phrase", "desu", "wa", "ka", "no", "kosoado", "arimasu-imasu", "ga")),
    study("lecture-1", "n5", "/lecture", reading("premier-jour", "konbini"), 1),
    study("particules", "n5", "/grammaire", grammar("o", "ni", "e", "de", "to", "mo", "ne-yo")),
    study("kanji-nombres", "n5", "/kanji", [...kanjiSection("nombres"), ...kanjiSection("temps")]),
    study("kanji-nature", "n5", "/kanji", [...kanjiSection("nature"), ...kanjiSection("personnes")]),
    study("verbes-masu", "n5", "/verbes", [...grammar("masu", "masenka-mashou"), ...verbs.filter((v) => v.level === "N5").slice(0, 25).map((v) => verbCardId(v.slug))], 0.7),
    study("dialogue-1", "n5", "/dialogue", ["/dialogue/se-presenter"], 1),
    study("adjectifs", "n5", "/grammaire", [...grammar("adjectifs"), ...words("Q", "N5", 30)], 0.7),
    study("forme-te", "n5", "/grammaire", [...grammar("forme-te", "te-kudasai", "te-imasu", "te-mo-ii"), ...reading("ramen")]),
    study("dialogue-2", "n5", "/dialogue", ["saluer", "remercier", "commander", "acheter", "chemin"].map((x) => `/dialogue/${x}`)),
    study("kanji-quotidien", "n5", "/kanji", ["positions", "qualites", "verbes", "societe"].flatMap(kanjiSection), 0.7),
    study("passe-desirs", "n5", "/grammaire", grammar("forme-ta", "ta-koto-ga-aru", "tari", "tai", "nakereba")),
    study("kanji-n4", "n4", "/kanji", kanjiList.filter((k) => k.level !== "N5").map((k) => `/kanji/${k.slug}`), 0.5),
  ];
  // Une révision après chaque série de trois étapes d'étude (et à la fin des kana).
  const out: PlanStep[] = [];
  let pending: PlanStep[] = [];
  let n = 0;
  const flush = () => {
    if (!pending.length) return;
    const last = pending[pending.length - 1];
    out.push({ id: `revision-${++n}`, kind: "review", tier: last.tier, ids: [], threshold: 1, href: "/revisions", covers: pending.map((s) => s.id) });
    pending = [];
  };
  for (const s of steps) {
    out.push(s);
    pending.push(s);
    if (pending.length === 3 || s.id === "katakana-plus" || s.id === "mots-outils") flush();
  }
  flush();
  return out;
}

export const PLAN: PlanStep[] = build();
export const PLAN_IDS = PLAN.map((s) => s.id);
