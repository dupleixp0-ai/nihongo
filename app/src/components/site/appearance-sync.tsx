"use client";

import { useEffect } from "react";
import { useAppState } from "@/lib/store";

/** Applique la couleur de flamme et d'encre choisies (attributs sur <html>). */
export function AppearanceSync() {
  const { ready, settings } = useAppState();
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.flame = settings.flameColor;
    root.dataset.ink = settings.inkColor;
    try {
      // Gardé aussi ici pour l'appliquer dès le prochain chargement, avant la lecture de la base.
      localStorage.setItem("appearance", JSON.stringify({ flame: settings.flameColor, ink: settings.inkColor }));
    } catch {
      /* rien */
    }
  }, [ready, settings.flameColor, settings.inkColor]);
  return null;
}
