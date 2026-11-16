"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { speakJapanese, useHasJapaneseVoice } from "@/lib/japanese-speech";
import { useMessages } from "@/i18n/use-lang";

type SpeakButtonProps = {
  /** Texte japonais à prononcer. */
  text: string;
  /** Texte visible du bouton ; sans texte, le bouton n'affiche que l'icône. */
  children?: React.ReactNode;
  className?: string;
};

function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6" />
      {active ? <path d="M18.5 6.5a8 8 0 0 1 0 11" /> : null}
    </svg>
  );
}

export function SpeakButton({ text, children, className }: SpeakButtonProps) {
  const hasVoice = useHasJapaneseVoice();
  const m = useMessages();
  const [speaking, setSpeaking] = useState(false);

  return (
    <Button
      type="button"
      variant="quiet"
      disabled={!hasVoice}
      aria-label={children ? undefined : m.lesson.listenWord(text)}
      className={cn("gap-2", !children && "w-11 px-0", className)}
      onClick={() =>
        speakJapanese(text, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) })
      }
    >
      <SpeakerIcon active={speaking} />
      {children}
    </Button>
  );
}
