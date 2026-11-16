import type { ReactNode } from "react";
import { LANGS, type Lang } from "./lang";
import { MESSAGES, type Messages } from "./messages";

export type Pick = (m: Messages) => ReactNode;

/**
 * Un texte de l'interface dans les trois langues ; la feuille de style n'affiche que la langue choisie.
 * Utilisable dans les composants serveur et client (pas de hook) : <T m={(m) => m.nav.kanji} />.
 */
export function T({ m }: { m: Pick }) {
  return (
    <>
      {LANGS.map((l) => (
        <span key={l} data-l={l} lang={l}>
          {m(MESSAGES[l])}
        </span>
      ))}
    </>
  );
}

/**
 * Un contenu déjà connu dans chaque langue (textes des leçons) : même principe que <T>.
 * Une langue absente (pas encore traduite) affiche le français.
 */
export function L({ v }: { v: { fr: ReactNode; en?: ReactNode; de?: ReactNode } }) {
  return (
    <>
      {LANGS.map((l) => (
        <span key={l} data-l={l} lang={v[l] === undefined ? "fr" : l}>
          {v[l] ?? v.fr}
        </span>
      ))}
    </>
  );
}

/** Le texte dans une langue donnée (attributs, titres de page, messages calculés). */
export const tr = <R,>(lang: Lang, m: (msg: Messages) => R): R => m(MESSAGES[lang]);

/** Les trois versions d'un texte, côte à côte (pour les listes construites côté serveur). */
export const all = <R,>(m: (msg: Messages) => R) => Object.fromEntries(LANGS.map((l) => [l, m(MESSAGES[l])])) as Record<Lang, R>;
