"use client";

import { useRef, useState } from "react";
import { romajiToKana } from "@/lib/kana-input";
import { cn } from "@/lib/utils";
import { useMessages } from "@/i18n/use-lang";

/** Identifiant du formulaire, pour un bouton « Vérifier » placé ailleurs dans la page. */
export const KANA_FORM = "kana-answer-form";

/**
 * Champ où l'on tape la lecture en lettres latines. Selon `mode`, les lettres deviennent
 * des hiragana ou des katakana pendant la frappe (ka → か), ou restent latines (kana isolés).
 * Un clavier japonais du téléphone fonctionne aussi : on ne convertit pas pendant sa composition.
 */
export function KanaAnswer({
  mode,
  onSubmit,
  onSkip,
  withButton = false,
}: {
  mode: "latin" | "hiragana" | "katakana";
  onSubmit: (typed: string) => void;
  onSkip: () => void;
  /** Affiche un bouton « Vérifier » sous le champ (quand la page n'en a pas déjà un). */
  withButton?: boolean;
}) {
  const [value, setValue] = useState("");
  const t = useMessages().typing;
  const composing = useRef(false);
  const convert = (v: string) => (mode === "latin" ? v : romajiToKana(v, { katakana: mode === "katakana" }));

  const submit = () => {
    const typed = mode === "latin" ? value.trim() : romajiToKana(value.trim(), { katakana: mode === "katakana", final: true });
    if (typed) onSubmit(typed);
  };

  return (
    <form
      id={KANA_FORM}
      className="mt-5 grid w-full min-w-0 max-w-sm gap-2 justify-self-center"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor="kana-answer" className="text-center text-muted">
        {mode === "latin" ? t.labelLatin : t.label}
      </label>
      <input
        id="kana-answer"
        autoFocus
        value={value}
        onChange={(e) => setValue(composing.current ? e.target.value : convert(e.target.value))}
        onCompositionStart={() => (composing.current = true)}
        onCompositionEnd={(e) => {
          composing.current = false;
          setValue(convert(e.currentTarget.value));
        }}
        lang={mode === "latin" ? "en" : "ja"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="done"
        placeholder={mode === "latin" ? t.phLatin : mode === "katakana" ? t.phKatakana : t.phHiragana}
        className={cn(
          "h-14 w-full min-w-0 rounded-2xl border border-line bg-paper px-4 text-center text-2xl outline-none transition-colors placeholder:text-base placeholder:text-muted/70 focus:border-indigo focus:ring-2 focus:ring-indigo/25",
          mode !== "latin" && "font-kana",
        )}
      />
      {withButton ? (
        <button type="submit" className="rounded-2xl bg-indigo py-3 text-base font-semibold text-on-indigo transition-transform active:scale-[0.98]">
          {t.check}
        </button>
      ) : null}
      <button type="button" onClick={onSkip} className="justify-self-center text-sm font-medium text-muted hover:text-ink">
        {t.dontKnow}
      </button>
    </form>
  );
}
