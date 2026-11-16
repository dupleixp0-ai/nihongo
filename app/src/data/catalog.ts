import type { KanaCell } from "@/domain/kana";
import {
  dakutenRows, getHiraganaLesson, hiraganaRows, hiraganaSignCells, yoonRows,
} from "./hiragana";
import {
  getKatakanaLesson, katakanaDakutenRows, katakanaExtendedRows, katakanaRows, katakanaSpecialCells, katakanaYoonRows,
} from "./katakana";
import { getKanji, kanjiList } from "./kanji";
import { mainReading } from "./kanji-readings";
import { firstSenseTr, mapTr, type Tr } from "@/i18n/meanings";

/** Catalogue des écritures : sections affichées dans les pages d'index, et ordre des leçons. */

export type Script = "hiragana" | "katakana" | "kanji";

export type GridCell = {
  character: string;
  label: string;
  /** Libellé en anglais et en allemand (sens des kanji). */
  labelTr?: Tr;
  href: string | null;
  reading?: string;
  romaji?: string;
  level?: string;
  /** Kanji : toutes ses lectures (kun et on), acceptées quand on tape la réponse au clavier. */
  readings?: string[];
} | null;

export type CatalogSection = {
  id: string;
  title: string;
  description: string;
  columns: 3 | 5;
  cells: GridCell[];
};

function kanaCells(rows: KanaCell[][], script: "hiragana" | "katakana"): GridCell[] {
  const lookup = script === "hiragana" ? getHiraganaLesson : getKatakanaLesson;
  return rows.flat().map((cell) => {
    if (!cell) return null;
    const slug = cell.slug ?? cell.romaji;
    return { character: cell.character, label: cell.romaji, href: lookup(slug) ? `/${script}/${slug}` : null };
  });
}

const KANJI_GROUPS: { id: string; title: string; description: string; slugs: string[] }[] = [
  { id: "nombres", title: "Nombres", description: "Compter de un à dix mille, et le yen.",
    slugs: ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "cent", "mille", "dix-mille", "yen"] },
  { id: "nature", title: "Nature et éléments", description: "Les jours de la semaine viennent d'ici : soleil, lune, feu, eau, arbre, or, terre.",
    slugs: ["soleil", "lune", "feu", "eau", "arbre", "or", "terre", "montagne", "riviere", "ciel", "esprit", "pluie", "blanc", "fleur", "poisson"] },
  { id: "personnes", title: "Corps et personnes", description: "Le corps, la famille et les amis.",
    slugs: ["personne", "bouche", "oeil", "oreille", "main", "pied", "femme", "homme", "enfant", "pere", "mere", "ami"] },
  { id: "temps", title: "Temps", description: "L'heure, la semaine, l'année.",
    slugs: ["annee", "maintenant", "heure", "minute", "moitie", "midi", "chaque", "semaine", "intervalle"] },
  { id: "positions", title: "Positions et directions", description: "Haut, bas, devant, derrière et les quatre points cardinaux.",
    slugs: ["haut", "bas", "milieu", "devant", "apres", "gauche", "droite", "est", "ouest", "sud", "nord", "dehors"] },
  { id: "qualites", title: "Qualités", description: "Les adjectifs les plus courants.",
    slugs: ["grand", "petit", "long", "eleve", "bon-marche", "nouveau", "ancien", "nombreux", "peu"] },
  { id: "verbes", title: "Verbes du quotidien", description: "Aller, venir, voir, manger, lire…",
    slugs: ["vie", "venir", "aller", "voir", "entendre", "parler", "lire", "ecrire", "manger", "boire", "acheter", "repos", "sortir", "entrer", "debout", "dire"] },
  { id: "societe", title: "École, ville et société", description: "Les lieux, les transports et la vie en société.",
    slugs: ["livre", "avant", "etude", "ecole", "nom", "quoi", "langue", "pays", "societe", "rencontre", "magasin", "chemin", "voiture", "electricite", "gare"] },
];

const cellOf = (k: NonNullable<ReturnType<typeof getKanji>>) => {
  const r = mainReading(k);
  return {
    character: k.character, label: k.meaning.split(/[,;]/)[0], labelTr: firstSenseTr(k.meaningTr), href: `/kanji/${k.slug}`, reading: r?.kana, romaji: r?.romaji, level: k.level,
    readings: [...k.kunyomi, ...k.onyomi].map((x) => x.kana),
  };
};

/** Kanji N5 : groupes thématiques ci-dessus, en ne gardant que les vrais N5. */
function kanjiN5Sections(): CatalogSection[] {
  const sections: CatalogSection[] = KANJI_GROUPS.map((group) => ({
    id: `n5-${group.id}`,
    title: group.title,
    description: group.description,
    columns: 5 as const,
    cells: group.slugs.flatMap((slug) => {
      const kanji = getKanji(slug);
      if (!kanji) throw new Error(`Kanji inconnu dans le catalogue : ${slug}`);
      return kanji.level === "N5" ? [cellOf(kanji)] : [];
    }),
  })).filter((s) => s.cells.length);
  const used = new Set(sections.flatMap((s) => s.cells.map((c) => c!.href)));
  const missing = kanjiList.filter((k) => k.level === "N5" && !used.has(`/kanji/${k.slug}`));
  if (missing.length) sections.push({ id: "n5-autres", title: "Autres", description: "", columns: 5, cells: missing.map(cellOf) });
  return sections;
}

const N4_GROUPS: { id: string; title: string; description: string }[] = [
  { id: "famille", title: "Famille et personnes", description: "Frères, sœurs, parents, et les mots pour parler des gens." },
  { id: "corps", title: "Corps et santé", description: "Le corps, le cœur, la maladie et l'hôpital." },
  { id: "temps", title: "Temps et saisons", description: "Les saisons, le matin, le soir, les époques." },
  { id: "nature", title: "Nature et couleurs", description: "Animaux, ciel, mer, et les couleurs." },
  { id: "lieux", title: "Lieux et ville", description: "La maison, la ville, les bâtiments." },
  { id: "ecole", title: "École et travail", description: "Apprendre, enseigner, les examens et le travail." },
  { id: "verbes", title: "Verbes", description: "Marcher, commencer, envoyer, penser…" },
  { id: "quotidien", title: "Vie quotidienne", description: "Repas, vêtements, objets et voyages." },
  { id: "notions", title: "Notions et qualités", description: "Juste, proche, lourd, spécial…" },
];

/** Kanji N4 (et les quelques N3 déjà présents), par groupe. */
function kanjiN4Sections(): CatalogSection[] {
  return N4_GROUPS.map((g) => ({
    id: `n4-${g.id}`,
    title: g.title,
    description: g.description,
    columns: 5 as const,
    cells: kanjiList.filter((k) => k.level !== "N5" && k.group === g.id).map(cellOf),
  }));
}

export const KANJI_LEVEL_SECTIONS = { N5: kanjiN5Sections(), N4: kanjiN4Sections() };

/** Onglets de la page Kanji : « Tous » (le niveau entier sur une page), puis les groupes thématiques. */
function withAllTab(level: "N5" | "N4", sections: CatalogSection[]): CatalogSection[] {
  const cells = sections.flatMap((s) => s.cells);
  return [
    { id: level === "N5" ? "tous" : "n4-tous", title: "Tous", description: `Les kanji du niveau ${level} sur une seule page, rangés par thème.`, columns: 5, cells },
    ...sections,
  ];
}
export const KANJI_LEVEL_TABS = { N5: withAllTab("N5", KANJI_LEVEL_SECTIONS.N5), N4: withAllTab("N4", KANJI_LEVEL_SECTIONS.N4) };

export const catalog: Record<Script, { title: string; glyph: string; intro: string; sections: CatalogSection[] }> = {
  hiragana: {
    title: "Hiragana",
    glyph: "あ",
    intro: "L'écriture de base du japonais : les terminaisons, les petits mots, et tout ce qui n'a pas de kanji.",
    sections: [
      { id: "base", title: "Base", description: "Les 46 caractères de base. Commence ici, ligne par ligne.", columns: 5, cells: kanaCells(hiraganaRows, "hiragana") },
      { id: "dakuten", title: "Dakuten", description: "Deux gouttes (゛) ou une bulle (゜) changent le son : か devient が, は devient ば ou ぱ.", columns: 5, cells: kanaCells(dakutenRows, "hiragana") },
      { id: "combinaisons", title: "Combinaisons", description: "Un petit ゃ, ゅ ou ょ après un caractère : une seule syllabe, き + ゃ = きゃ.", columns: 3, cells: kanaCells(yoonRows, "hiragana") },
      { id: "signes", title: "っ et voyelles longues", description: "Le petit っ double la consonne ; deux voyelles qui se suivent (おう, えい…) allongent le son.", columns: 3, cells: kanaCells([hiraganaSignCells], "hiragana") },
    ],
  },
  katakana: {
    title: "Katakana",
    glyph: "ア",
    intro: "L'écriture des mots étrangers, des noms de marques et des onomatopées : カメラ, コーヒー.",
    sections: [
      { id: "base", title: "Base", description: "Les 46 katakana de base, plus anguleux que les hiragana.", columns: 5, cells: kanaCells(katakanaRows, "katakana") },
      { id: "dakuten", title: "Dakuten", description: "Les mêmes marques que pour les hiragana : カ → ガ, ハ → パ.", columns: 5, cells: kanaCells(katakanaDakutenRows, "katakana") },
      { id: "combinaisons", title: "Combinaisons", description: "キ + ャ = キャ : une seule syllabe.", columns: 3, cells: kanaCells(katakanaYoonRows, "katakana") },
      { id: "signes", title: "ッ et ー", description: "Le petit ッ double la consonne, le trait ー allonge la voyelle.", columns: 3, cells: kanaCells([katakanaSpecialCells], "katakana") },
      { id: "etendus", title: "Étendus", description: "Pour les sons étrangers : ファ, ティ, ウィ, ヴ…", columns: 5, cells: kanaCells(katakanaExtendedRows, "katakana") },
    ],
  },
  kanji: {
    title: "Kanji",
    glyph: "日",
    intro: "Les caractères d'origine chinoise, qui portent un sens. Les kanji des niveaux JLPT N5 et N4, rangés par thème.",
    sections: [...KANJI_LEVEL_SECTIONS.N5, ...KANJI_LEVEL_SECTIONS.N4],
  },
};

export function countLessons(script: Script): number {
  return catalog[script].sections.reduce((n, s) => n + s.cells.filter((c) => c?.href).length, 0);
}

/** Leçon précédente et suivante, dans l'ordre des sections. */
export function neighbours(script: Script, href: string) {
  const order = catalog[script].sections.flatMap((s) =>
    s.cells.flatMap((c) => (c?.href ? [{ href: c.href, character: c.character, label: c.reading ? `${c.reading} · ${c.romaji} · ${c.label}` : c.label, labelTr: c.reading ? mapTr(c.labelTr, (l) => `${c.reading} · ${c.romaji} · ${l}`) : c.labelTr }] : [])),
  );
  const unique = order.filter((item, i) => order.findIndex((o) => o.href === item.href) === i);
  const index = unique.findIndex((item) => item.href === href);
  return {
    previous: index > 0 ? unique[index - 1] : null,
    next: index >= 0 && index < unique.length - 1 ? unique[index + 1] : null,
    position: index + 1,
    total: unique.length,
  };
}
