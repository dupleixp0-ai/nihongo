"use client";

import { useSyncExternalStore } from "react";

function findJapaneseVoice(): SpeechSynthesisVoice | undefined {
  return window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("ja"));
}

function subscribe(onChange: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return () => {};
  }
  // Les voix se chargent de façon asynchrone dans plusieurs navigateurs.
  window.speechSynthesis.addEventListener("voiceschanged", onChange);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", onChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return findJapaneseVoice() !== undefined;
}

/** Vrai si l'appareil propose une voix japonaise pour la synthèse vocale. */
export function useHasJapaneseVoice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Prononce un texte en japonais. Ne fait rien si aucune voix japonaise n'est disponible. */
export function speakJapanese(text: string, handlers?: { onStart?: () => void; onEnd?: () => void; rate?: number }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const voice = findJapaneseVoice();
  if (!voice) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = handlers?.rate ?? 0.8; // un peu plus lent pour un apprenant
  utterance.onstart = () => handlers?.onStart?.();
  utterance.onend = () => handlers?.onEnd?.();
  utterance.onerror = () => handlers?.onEnd?.();
  window.speechSynthesis.speak(utterance);
}
