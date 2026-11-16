import { catalog } from "../src/data/catalog";
import { vocab } from "../src/data/vocab";
import { verbs } from "../src/data/verbs";
import { grammar } from "../src/data/grammar";
import { readings } from "../src/data/readings";
import { dialogues } from "../src/data/dialogues";

/** Ce qui est gratuit. Pour changer la part gratuite, modifier ici puis lancer `npm run access`. */
const cellsOf = (script: "katakana" | "kanji", sectionId: string) =>
  (catalog[script].sections.find((s) => s.id === sectionId)?.cells ?? []).flatMap((c) => (c?.href ? [c.href] : []));

export function derive() {
  return {
    /** Tous les hiragana sont gratuits (règle dans access.ts). */
    katakana: cellsOf("katakana", "base"),
    kanji: cellsOf("kanji", "n5-nombres"),
    vocab: [...vocab.filter((w) => w.theme === "K"), ...vocab.filter((w) => w.theme === "N").slice(0, 27)].map((w) => w.slug),
    verbs: verbs.slice(0, 20).map((v) => v.slug),
    grammar: ["structure-de-la-phrase", "wa", "desu", "masu"],
    readings: ["momotaro", "premier-jour"],
    dialogues: ["se-presenter", "saluer"],
  };
}

/** Décompte du contenu : une leçon, un mot, un verbe, une page de grammaire, un texte ou un dialogue = une unité ; l'examen compte pour une. */
export function units() {
  const lessons = (["hiragana", "katakana", "kanji"] as const).flatMap((s) => catalog[s].sections.flatMap((x) => x.cells.flatMap((c) => (c?.href ? [c.href] : []))));
  return [
    ...lessons,
    ...vocab.map((w) => `mot:${w.slug}`),
    ...verbs.map((v) => `verbe:${v.slug}`),
    ...grammar.map((g) => `/grammaire/${g.slug}`),
    ...readings.map((r) => `/lecture/${r.slug}`),
    ...dialogues.map((d) => `/dialogue/${d.slug}`),
    "/examen",
  ];
}

export const render = () =>
  `// Fichier généré par \`npm run access\` (scripts/access-derive.ts) : ne pas modifier à la main.\nexport const FREE = ${JSON.stringify(derive(), null, 2)} as const;\n`;
