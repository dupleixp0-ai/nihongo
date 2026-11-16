import type { Progress, Settings, StoredCard } from "./db/types";
import type { PlanStep, PlanTier } from "@/data/plan";

/** Où en est l'utilisateur dans le parcours guidé. Fonctions pures : testées dans scripts/check-plan.ts. */

export type StepState = "done" | "skipped" | "auto" | "current" | "todo";
export type StepStatus = { step: PlanStep; state: StepState; met: number; total: number; due: number };

type Data = { progress: Progress; cards: StoredCard[]; settings: Settings };

/** Niveaux déjà acquis selon le choix fait au premier lancement. */
const KNOWN: Record<NonNullable<Settings["startLevel"]>, PlanTier[]> = {
  debutant: [],
  hiragana: ["hiragana"],
  kana: ["hiragana", "katakana"],
  n4: ["hiragana", "katakana", "n5"],
};

/** Un élément est « rencontré » quand sa leçon est ouverte ou qu'il a été révisé au moins une fois. */
export function met(id: string, progress: Progress, cardById: Map<string, StoredCard>) {
  return Boolean(progress.seen[id] || (cardById.get(id)?.reps ?? 0) > 0);
}

export function computePlan(steps: PlanStep[], data: Data, now: number) {
  const cardById = new Map(data.cards.map((c) => [c.id, c]));
  const done = new Set(data.settings.plan?.done ?? []);
  const skipped = new Set(data.settings.plan?.skipped ?? []);
  const known = KNOWN[data.settings.startLevel ?? "debutant"];
  const byId = new Map(steps.map((s) => [s.id, s]));
  let currentFound = false;
  const list: StepStatus[] = steps.map((step) => {
    const ids = step.kind === "review" ? (step.covers ?? []).flatMap((c) => byId.get(c)?.ids ?? []) : step.ids;
    const total = step.kind === "review" ? 0 : ids.length;
    const m = step.kind === "review" ? 0 : ids.filter((id) => met(id, data.progress, cardById)).length;
    const due = step.kind === "review" ? ids.filter((id) => { const c = cardById.get(id); return c && c.reps > 0 && c.due <= now; }).length : 0;
    let state: StepState;
    if (done.has(step.id)) state = "done";
    else if (skipped.has(step.id)) state = "skipped";
    else if (known.includes(step.tier)) state = "auto";
    else if (step.kind === "study" && total > 0 && m / total >= step.threshold) state = "done";
    else if (!currentFound) { state = "current"; currentFound = true; }
    else state = "todo";
    return { step, state, met: m, total, due };
  });
  const finished = list.filter((s) => s.state !== "current" && s.state !== "todo").length;
  return { steps: list, current: list.find((s) => s.state === "current") ?? null, percent: Math.round((finished / Math.max(1, list.length)) * 100) };
}

/** Réglages après avoir marqué une étape terminée ou passée (ou rouverte). */
export function markStep(settings: Settings, id: string, as: "done" | "skipped" | "open"): Settings {
  const plan = settings.plan ?? { done: [], skipped: [] };
  const without = (l: string[]) => l.filter((x) => x !== id);
  return {
    ...settings,
    plan: { done: as === "done" ? [...without(plan.done), id] : without(plan.done), skipped: as === "skipped" ? [...without(plan.skipped), id] : without(plan.skipped) },
  };
}
