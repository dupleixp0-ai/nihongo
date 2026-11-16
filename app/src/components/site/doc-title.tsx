"use client";

import { useEffect } from "react";
import { useLang, useMessages } from "@/i18n/use-lang";
import type { Lang } from "@/i18n/lang";
import type { Messages } from "@/i18n/messages";

/**
 * Titre de l'onglet du navigateur dans la langue choisie. La page statique porte le titre français
 * (pour les moteurs de recherche) ; Next.js peut le remettre après coup, donc on surveille la balise <title>.
 */
export function DocTitle({ k }: { k: keyof Messages["docTitle"] }) {
  useDocTitle(useMessages().docTitle[k]);
  return null;
}

/** Titre d'onglet des pages de détail : le titre est calculé pour chaque langue par la page. */
export function DocTitleText({ titles }: { titles: Record<Lang, string> }) {
  useDocTitle(titles[useLang()]);
  return null;
}

function useDocTitle(title: string) {
  useEffect(() => {
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const el = document.querySelector("title");
    if (!el) return;
    const observer = new MutationObserver(apply);
    observer.observe(el, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [title]);
}
