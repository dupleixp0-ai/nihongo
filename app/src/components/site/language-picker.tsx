"use client";

import { LANG_NAMES, LANGS, setLang } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";

/** Choix de la langue de l'interface : Français, English, Deutsch (chacune écrite dans sa langue). */
export function LanguagePicker({ label, className }: { label: string; className?: string }) {
  const lang = useLang();
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex w-fit gap-1 rounded-2xl border border-line bg-sheet p-1", className)}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          lang={l}
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={cn("rounded-xl px-4 py-2 text-sm font-medium transition-colors", lang === l ? "bg-contrast text-on-contrast" : "text-muted hover:text-ink")}
        >
          {LANG_NAMES[l]}
        </button>
      ))}
    </div>
  );
}
