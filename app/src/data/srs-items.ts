import { catalog, type Script } from "./catalog";
import { getHiraganaLesson } from "./hiragana";
import { getKatakanaLesson } from "./katakana";
import { getKanji, kanjiList } from "./kanji";
import { mainReading } from "./kanji-readings";
import { verbs } from "./verbs";
import { vocab, wordCardId } from "./vocab";
import { mapTr, type Tr } from "@/i18n/meanings";
import { localizeKana } from "@/i18n/kana";

/**
 * Ce qu'une carte de révision affiche, pour chaque élément qu'on peut réviser.
 * Calculé côté serveur (au build) et transmis aux pages : les tracés des caractères ne partent pas avec.
 *
 * Identifiants : celui de la leçon (« /hiragana/a », « /kanji/soleil ») ou « verbe:<slug> ».
 */

export type SrsKind = "hiragana" | "katakana" | "kanji" | "verbe" | "mot";
export type Reading = { kana: string; romaji: string };

export type SrsItem = {
  id: string;
  kind: SrsKind;
  /** Ce qu'on montre au recto. */
  front: string;
  /** Lien vers la leçon. */
  href: string;
  reading: Reading;
  meaning?: string;
  /** Sens en anglais et en allemand. */
  meaningTr?: Tr;
  /** Autres lectures (kanji) ou formes (verbes), chacune avec kana et rōmaji. */
  extra: { label: string; jp?: string; reading: Reading }[];
  example?: { jp: string; kana?: string; romaji: string; fr: string; tr?: Tr };
  /** Texte envoyé à la synthèse vocale. */
  speak: string;
  /** Lectures acceptées quand on tape la réponse au clavier. */
  answers: string[];
  /** Ce que montre le champ de saisie : lettres latines (kana isolés), hiragana ou katakana. */
  input: "latin" | "hiragana" | "katakana";
  level?: string;
};

export const KIND_LABEL: Record<SrsKind, string> = { hiragana: "Hiragana", katakana: "Katakana", kanji: "Kanji", verbe: "Verbes", mot: "Vocabulaire" };

export const verbCardId = (slug: string) => `verbe:${slug}`;

function lessonHrefs(script: Script): string[] {
  const hrefs = catalog[script].sections.flatMap((s) => s.cells.flatMap((c) => (c?.href ? [c.href] : [])));
  return [...new Set(hrefs)];
}

function kanaItem(script: "hiragana" | "katakana", href: string): SrsItem | null {
  const slug = href.split("/").pop()!;
  const lesson = script === "hiragana" ? getHiraganaLesson(slug) : getKatakanaLesson(slug);
  if (!lesson) return null;
  const word = lesson.words[0];
  const special = lesson.family === "special";
  const en = localizeKana(lesson, "en");
  const de = localizeKana(lesson, "de");
  const short = (s?: string) => s?.split(":")[0].split(".")[0];
  return {
    id: href,
    kind: script,
    front: lesson.character,
    href,
    reading: { kana: lesson.character, romaji: lesson.romaji },
    meaning: special ? short(lesson.pronunciation) : undefined,
    meaningTr: special ? { en: short(en.pronunciation), de: short(de.pronunciation) } : undefined,
    extra: [],
    example: word ? { jp: word.japanese, romaji: word.romaji, fr: word.meaning, tr: { en: en.words[0], de: de.words[0] } } : undefined,
    speak: special && word ? word.japanese : lesson.character,
    // Petits signes (っ, voyelles longues) : pas de lecture à taper, on garde la carte classique.
    answers: special || lesson.family === "long" ? [] : [lesson.character],
    input: "latin",
  };
}

function kanjiItem(href: string): SrsItem | null {
  const k = getKanji(href.split("/").pop()!);
  if (!k) return null;
  const main = mainReading(k);
  const word = k.words[0];
  const extra = [
    ...k.kunyomi.slice(0, 3).map((r) => ({ label: "kun", reading: { kana: r.kana, romaji: r.romaji } })),
    ...k.onyomi.slice(0, 2).map((r) => ({ label: "on", reading: { kana: r.kana, romaji: r.romaji } })),
  ];
  return {
    id: href,
    kind: "kanji",
    front: k.character,
    href,
    reading: main ?? { kana: "", romaji: "" },
    meaning: k.meaning,
    meaningTr: k.meaningTr,
    extra,
    example: word ? { jp: word.japanese, kana: word.reading, romaji: word.romaji, fr: word.meaning, tr: word.meaningTr } : undefined,
    speak: word?.reading ?? main?.kana ?? k.character,
    answers: [...(main ? [main.kana] : []), ...k.kunyomi.map((r) => r.kana), ...k.onyomi.map((r) => r.kana)],
    input: "hiragana",
    level: k.level,
  };
}

/** Tous les éléments qu'on peut réviser, dans l'ordre d'apprentissage. */
export function allSrsItems(): SrsItem[] {
  return buildItems().map((i) => (i.answers.length ? { ...i, answers: [...new Set([...i.answers, i.reading.romaji.replace(/-/g, "")])] } : i));
}

function buildItems(): SrsItem[] {
  const items: SrsItem[] = [];
  for (const href of lessonHrefs("hiragana")) {
    const item = kanaItem("hiragana", href);
    if (item) items.push(item);
  }
  for (const href of lessonHrefs("katakana")) {
    const item = kanaItem("katakana", href);
    if (item) items.push(item);
  }
  const kanjiHrefs = new Set(lessonHrefs("kanji"));
  for (const k of kanjiList) kanjiHrefs.add(`/kanji/${k.slug}`);
  for (const href of kanjiHrefs) {
    const item = kanjiItem(href);
    if (item) items.push(item);
  }
  for (const v of verbs) {
    items.push({
      id: verbCardId(v.slug),
      kind: "verbe",
      front: v.jp,
      href: `/verbes?q=${encodeURIComponent(v.jp)}`,
      reading: { kana: v.kana, romaji: v.romaji },
      meaning: v.meaning,
      meaningTr: v.meaningTr,
      extra: [
        { label: "poli", jp: v.masu.jp, reading: { kana: v.masu.kana, romaji: v.masu.romaji } },
        { label: "négatif", jp: v.plain.neg.jp, reading: { kana: v.plain.neg.kana, romaji: v.plain.neg.romaji } },
        { label: "passé", jp: v.plain.past.jp, reading: { kana: v.plain.past.kana, romaji: v.plain.past.romaji } },
        { label: "en て", jp: v.te.jp, reading: { kana: v.te.kana, romaji: v.te.romaji } },
      ],
      example: v.example,
      speak: v.kana,
      answers: [v.kana, v.masu.kana],
      input: "hiragana",
      level: v.level,
    });
  }
  for (const w of vocab) {
    items.push({
      id: wordCardId(w.slug),
      kind: "mot",
      front: w.jp,
      href: `/vocabulaire?q=${encodeURIComponent(w.kana)}`,
      reading: { kana: w.kana, romaji: w.romaji },
      meaning: w.fr,
      meaningTr: w.tr,
      extra: [],
      speak: w.kana.replace(/^～/, ""),
      answers: [w.kana],
      input: /^[～〜]?[ァ-ヺー・]+$/.test(w.kana) ? "katakana" : "hiragana",
      level: w.level,
    });
  }
  return items;
}

/** Identifiants des leçons de chaque écriture, dans l'ordre (pour le tableau de bord). */
export function lessonOrder(): Record<Script, { href: string; character: string; label: string; labelTr?: Tr }[]> {
  const order = (script: Script) => {
    const cells = catalog[script].sections.flatMap((s) => s.cells.flatMap((c) => (c?.href ? [c] : [])));
    const unique = cells.filter((c, i) => cells.findIndex((o) => o.href === c.href) === i);
    return unique.map((c) => ({
      href: c.href!,
      character: c.character,
      label: c.reading ? `${c.reading} · ${c.romaji} · ${c.label}` : c.label,
      labelTr: c.reading ? mapTr(c.labelTr, (l) => `${c.reading} · ${c.romaji} · ${l}`) : c.labelTr,
    }));
  };
  return { hiragana: order("hiragana"), katakana: order("katakana"), kanji: order("kanji") };
}

/** Groupes de leçons pour les sceaux (récompenses). */
export function lessonGroups() {
  const base = (script: "hiragana" | "katakana") =>
    (catalog[script].sections.find((s) => s.id === "base")?.cells ?? []).flatMap((c) => (c?.href ? [c.href] : []));
  const kanji = kanjiList.map((k) => ({ href: `/kanji/${k.slug}`, level: k.level }));
  return {
    hiraganaBase: base("hiragana"),
    katakanaBase: base("katakana"),
    kanjiN5: kanji.filter((k) => k.level === "N5").map((k) => k.href),
    kanjiN4: kanji.filter((k) => k.level !== "N5").map((k) => k.href),
  };
}
