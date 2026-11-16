"use client";

import { useSyncExternalStore } from "react";
import { currentLang, LANG_EVENT, type Lang } from "./lang";
import { MESSAGES, type Messages } from "./messages";

function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  return () => window.removeEventListener(LANG_EVENT, onChange);
}

/**
 * Langue choisie, pour les composants client. Au premier affichage (hydratation), on renvoie
 * le français comme la page préparée au build, puis la vraie langue : pas d'erreur d'hydratation.
 * Pour du texte visible, préférer <T> (aucun changement visible) ; ce hook sert aux attributs
 * (aria-label, placeholder, title) et aux messages calculés.
 */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, currentLang, () => "fr");
}

/** Les textes de la langue choisie : const m = useMessages(); m.nav.kanji */
export function useMessages(): Messages {
  return MESSAGES[useLang()];
}
