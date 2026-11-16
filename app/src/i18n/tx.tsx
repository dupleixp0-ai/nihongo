import type { Lang } from "./lang";
import { ctr } from "./content";
import { L } from "./t";

const QUOTES: Record<Lang, [string, string]> = { fr: ["« ", " »"], en: ["“", "”"], de: ["„", "“"] };

/**
 * Un texte de leçon (grammaire, lecture) dans les trois langues, retrouvé par son texte français.
 * `quote` l'entoure des guillemets de chaque langue. Sans traduction, le français s'affiche tel quel.
 */
export function Tx({ t, quote }: { t: string; quote?: boolean }) {
  const v = ctr(t);
  if (v.en === undefined && !quote) return <>{t}</>;
  const wrap = (l: Lang, s: string) => (quote ? `${QUOTES[l][0]}${s}${QUOTES[l][1]}` : s);
  return <L v={{ fr: wrap("fr", v.fr), en: v.en === undefined ? undefined : wrap("en", v.en), de: v.de === undefined ? undefined : wrap("de", v.de) }} />;
}
