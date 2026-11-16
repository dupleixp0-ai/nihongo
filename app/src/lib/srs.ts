"use client";

import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from "ts-fsrs";
import type { StoredCard } from "./db";
import { MESSAGES } from "@/i18n/messages";
import type { Lang } from "@/i18n/lang";
import { addReview, deleteCards, getState, putCards, whenLoaded } from "./store";
import { earn } from "./streak";
import { isFreeId } from "@/data/access";
import { isPremiumNow } from "./billing";

/**
 * Répétition espacée avec l'algorithme FSRS (bibliothèque ts-fsrs, licence MIT).
 * Chaque carte revient juste avant le moment où on risque de l'oublier : quelques minutes
 * au début, puis des jours, des semaines, des mois.
 */

const scheduler = fsrs(generatorParameters({ request_retention: 0.9, enable_fuzz: true, enable_short_term: true, maximum_interval: 3650 }));

export { Rating, State };
export type { Grade };

/** Les cartes en apprentissage dues dans les 20 prochaines minutes restent dans la séance. */
const LEARN_AHEAD = 20 * 60 * 1000;

const toCard = (c: StoredCard): Card => ({
  due: new Date(c.due),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state as State,
  last_review: c.last_review ? new Date(c.last_review) : undefined,
});

const fromCard = (id: string, added: number, c: Card): StoredCard => ({
  id,
  added,
  due: c.due.getTime(),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review ? c.last_review.getTime() : null,
});

export function newCard(id: string, now = Date.now(), offset = 0): StoredCard {
  // `offset` garde l'ordre d'ajout quand plusieurs cartes sont créées d'un coup.
  return fromCard(id, now + offset, createEmptyCard(new Date(now)));
}

/** Ajoute des cartes (celles déjà présentes ne bougent pas). Renvoie le nombre de cartes ajoutées. */
export function addCards(wanted: string[]): number {
  const { cardsById } = getState();
  // Les éléments de la version complète n'entrent pas dans les révisions tant qu'elle n'est pas débloquée.
  const ids = isPremiumNow() ? wanted : wanted.filter(isFreeId);
  const now = Date.now();
  const fresh = ids.filter((id) => !cardsById[id]).map((id, i) => newCard(id, now, i));
  putCards(fresh);
  return fresh.length;
}

export function removeCards(ids: string[]) {
  deleteCards(ids);
}

/** Délai avant le prochain passage, pour chaque réponse possible. */
export function previewIntervals(card: StoredCard, now = Date.now()): Record<Grade, number> {
  const preview = scheduler.repeat(toCard(card), new Date(now));
  return {
    [Rating.Again]: preview[Rating.Again].card.due.getTime() - now,
    [Rating.Hard]: preview[Rating.Hard].card.due.getTime() - now,
    [Rating.Good]: preview[Rating.Good].card.due.getTime() - now,
    [Rating.Easy]: preview[Rating.Easy].card.due.getTime() - now,
  } as Record<Grade, number>;
}

export function answer(card: StoredCard, grade: Grade, now = Date.now()): StoredCard {
  const result = scheduler.next(toCard(card), new Date(now), grade);
  const next = fromCard(card.id, card.added, result.card);
  putCards([next]);
  addReview({ card: card.id, at: now, rating: grade as 1 | 2 | 3 | 4, state: card.state });
  earn(1);
  return next;
}

/** Début de la journée d'étude (minuit, heure locale). */
export function startOfDay(time = Date.now()) {
  const d = new Date(time);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Nouvelles cartes déjà vues aujourd'hui. */
export function newStudiedToday(reviews = getState().reviews, now = Date.now()) {
  const since = startOfDay(now);
  return new Set(reviews.filter((r) => r.at >= since && r.state === State.New).map((r) => r.card)).size;
}

export type Queue = { due: StoredCard[]; fresh: StoredCard[]; learning: StoredCard[] };

/**
 * Cartes à présenter maintenant : les révisions dues, puis des nouvelles cartes (dans la limite du jour).
 * `learning` : cartes en apprentissage qui reviennent dans quelques minutes.
 */
export function buildQueue(cards: StoredCard[], reviews = getState().reviews, newPerDay = getState().settings.newPerDay, now = Date.now()): Queue {
  const due = cards.filter((c) => c.state !== State.New && c.due <= now).sort((a, b) => a.due - b.due);
  const learning = cards
    .filter((c) => (c.state === State.Learning || c.state === State.Relearning) && c.due > now && c.due <= now + LEARN_AHEAD)
    .sort((a, b) => a.due - b.due);
  const room = Math.max(0, newPerDay - newStudiedToday(reviews, now));
  const fresh = cards.filter((c) => c.state === State.New).sort((a, b) => a.added - b.added).slice(0, room);
  return { due, fresh, learning };
}

/** Prochaine échéance après maintenant (pour « prochaine révision dans… »). */
export function nextDue(cards: StoredCard[], now = Date.now()) {
  const later = cards.filter((c) => c.state !== State.New && c.due > now).map((c) => c.due);
  return later.length ? Math.min(...later) : null;
}

/** « 1 min », « 10 min », « 3 h », « 4 j », « 2 mois », « 1,5 an ». */
export function formatDelay(ms: number, lang: Lang = "fr") {
  const u = MESSAGES[lang].delay;
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return `${min} ${u.min}`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} ${u.h}`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d} ${u.d}`;
  const months = d / 30.4;
  if (months < 12) return `${Math.round(months)} ${u.months}`;
  const years = Math.round((d / 365) * 10) / 10;
  return `${years.toString().replace(".", u.decimal)} ${u.years(years)}`;
}

/** Une carte est « ancrée » quand l'intervalle dépasse trois semaines. */
export const isAnchored = (c: StoredCard) => c.state === State.Review && c.scheduled_days >= 21;

/** Une leçon de caractère (hiragana, katakana, kanji) : son adresse sert d'identifiant de carte. */
export const isLessonId = (id: string) => /^\/(hiragana|katakana|kanji)\/[^/]+$/.test(id);

// Première ouverture après la mise à jour : les leçons déjà vues entrent dans les révisions.
if (typeof window !== "undefined") {
  whenLoaded(() => {
    const { cards, reviews, progress, settings } = getState();
    if (settings.autoAdd && cards.length === 0 && reviews.length === 0) {
      const seen = Object.entries(progress.seen).filter(([id]) => isLessonId(id)).sort((a, b) => a[1] - b[1]).map(([id]) => id);
      addCards(seen);
    }
  });
}
