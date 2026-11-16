import { fr } from "./fr";
import { en } from "./en";
import { de } from "./de";
import type { Lang } from "../lang";

/** La forme des textes : celle du français (référence). */
export type Messages = typeof fr;

export const MESSAGES: Record<Lang, Messages> = { fr, en, de };
