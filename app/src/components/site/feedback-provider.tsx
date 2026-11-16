"use client";

import { useEffect } from "react";
import { playFeedback, unlockAudio } from "@/lib/feedback";

/** Éléments qui répondent à un tapotement : boutons, liens, interrupteurs, listes déroulantes. */
const TAPPABLE = 'button, a[href], [role="button"], [role="switch"], [role="tab"], summary, select';

/**
 * Retour haptique léger à chaque clic sur un bouton ou un lien (vibration, ou « tic » sonore quand
 * le navigateur ne sait pas vibrer). Réveille aussi l'audio au premier geste.
 */
export function FeedbackProvider() {
  useEffect(() => {
    const onPointerDown = () => unlockAudio();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(TAPPABLE);
      if (!el || (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true") return;
      playFeedback("tap");
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("touchend", onPointerDown, { passive: true });
    document.addEventListener("keydown", onPointerDown);
    document.addEventListener("visibilitychange", onPointerDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("touchend", onPointerDown);
      document.removeEventListener("keydown", onPointerDown);
      document.removeEventListener("visibilitychange", onPointerDown);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
