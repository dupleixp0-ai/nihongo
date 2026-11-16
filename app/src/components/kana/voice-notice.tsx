"use client";

import { useEffect, useState } from "react";
import { useHasJapaneseVoice } from "@/lib/japanese-speech";
import { useMessages } from "@/i18n/use-lang";

const KEY = "voice-notice-dismissed";

/**
 * Prévient, une seule fois, que l'appareil n'a pas de voix japonaise.
 * Une fois fermé, le message ne revient plus (choix gardé dans le navigateur).
 */
export function VoiceNotice() {
  const hasVoice = useHasJapaneseVoice();
  const m = useMessages();
  const [dismissed, setDismissed] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(localStorage.getItem(KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (hasVoice || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* rien à garder */
    }
  };

  return (
    <div role="status" className="mt-3 max-w-md rounded-xl border border-line bg-sheet px-3.5 py-2.5 text-sm text-muted">
      <div className="flex items-center gap-3">
        <span className="flex-1">{m.lesson.noVoice}</span>
        <button type="button" onClick={() => setOpen((o) => !o)} className="shrink-0 font-medium text-indigo hover:underline">
          {open ? m.lesson.voiceHide : m.lesson.voiceEnable}
        </button>
        <button type="button" onClick={dismiss} aria-label={m.lesson.voiceClose} className="shrink-0 rounded-full px-1.5 text-lg leading-none text-muted hover:text-ink">
          ×
        </button>
      </div>
      {open ? (
        <p className="mt-2 leading-relaxed">{m.lesson.voiceHelp}</p>
      ) : null}
    </div>
  );
}
