import type { Lang } from "../lang";

/** Noms des personnages qui changent d'une langue à l'autre (les prénoms restent tels quels). */
const SPEAKER_TR: Record<string, readonly [en: string, de: string]> = {
  "店員": ["Waiter", "Kellner"],
  "受付": ["Reception", "Rezeption"],
};

export const speakerLabel = (key: string, fr: string, lang: Lang): string => (lang === "fr" ? fr : SPEAKER_TR[key]?.[lang === "en" ? 0 : 1] ?? fr);
export const SPEAKER_KEYS = Object.keys(SPEAKER_TR);
