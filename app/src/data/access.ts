import { FREE } from "./access-ids";

/**
 * Ce qui est gratuit, et ce qui demande la version complète (achat unique).
 *
 * Le gratuit forme un petit parcours complet de débutant : tous les hiragana, les katakana de base,
 * les nombres en kanji, quelques mots, verbes, points de grammaire, un conte et deux dialogues.
 * Le reste reste visible dans l'appli, mais ne s'ouvre pas avant le déblocage.
 * Les outils de suivi (flamme, statistiques, parcours, révisions des éléments gratuits, réglages) restent gratuits.
 * La part gratuite (10 à 15 % du contenu) est vérifiée par `npm run check`.
 * Les listes viennent de scripts/access-derive.ts (`npm run access`) pour que ce fichier reste léger.
 */

const sets = {
  katakana: new Set<string>(FREE.katakana),
  kanji: new Set<string>(FREE.kanji),
  vocab: new Set<string>(FREE.vocab),
  verbs: new Set<string>(FREE.verbs),
  grammar: new Set<string>(FREE.grammar),
  readings: new Set<string>(FREE.readings),
  dialogues: new Set<string>(FREE.dialogues),
};

export const isFreeWord = (slug: string) => sets.vocab.has(slug);
export const isFreeVerb = (slug: string) => sets.verbs.has(slug);

/** Une page de leçon (ex. « /kanji/un ») ou un identifiant de carte (« mot:… », « verbe:… ») est-il gratuit ? */
export function isFreeId(id: string): boolean {
  if (id.startsWith("mot:")) return isFreeWord(id.slice(4));
  if (id.startsWith("verbe:")) return isFreeVerb(id.slice(6));
  const [, section, slug] = id.split("/");
  switch (section) {
    case "hiragana": return true;
    case "katakana": return sets.katakana.has(id);
    case "kanji": return sets.kanji.has(id);
    case "grammaire": return sets.grammar.has(slug);
    case "lecture": return sets.readings.has(slug);
    case "dialogue": return sets.dialogues.has(slug);
    case "examen": return false;
    default: return true;
  }
}
