"use client";

/**
 * Retours sonores et haptiques : bon / faux / fin d'exercice / clic.
 * - Les sons sont synthétisés (Web Audio) : aucun fichier à charger, rien à télécharger, tout marche hors ligne.
 * - Le son et les retours haptiques se coupent séparément dans les réglages ; le choix est gardé sur l'appareil
 *   (localStorage), hors sauvegarde : un téléphone peut être muet, une tablette non.
 * - Haptique = vibration (Android). Safari sur iPhone n'a pas d'API de vibration : on joue alors un très léger
 *   « tic » à la place, tant que les retours haptiques sont activés.
 */

import { useSyncExternalStore } from "react";

export type FeedbackKind = "correct" | "wrong" | "complete" | "tap";
export type HapticLevel = 1 | 2 | 3; // léger, moyen, fort
export type FeedbackPrefs = { sound: boolean; haptics: boolean; level: HapticLevel };

const KEY = { sound: "nihongo.sound", haptics: "nihongo.haptics", level: "nihongo.hapticLevel" } as const;
const EVENT = "nihongo:feedback-prefs";
const DEFAULTS: FeedbackPrefs = { sound: true, haptics: true, level: 2 };

function read(key: string): boolean {
  try {
    return localStorage.getItem(key) !== "off";
  } catch {
    return true;
  }
}

function readLevel(): HapticLevel {
  try {
    const n = Number(localStorage.getItem(KEY.level));
    return n === 1 || n === 3 ? n : 2;
  } catch {
    return 2;
  }
}

let cache: FeedbackPrefs | null = null;

export function getFeedbackPrefs(): FeedbackPrefs {
  if (typeof window === "undefined") return DEFAULTS;
  cache ??= { sound: read(KEY.sound), haptics: read(KEY.haptics), level: readLevel() };
  return cache;
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // stockage indisponible : le choix vaut pour la session
  }
  window.dispatchEvent(new Event(EVENT));
}

export function setFeedbackPref(name: "sound" | "haptics", value: boolean) {
  cache = { ...getFeedbackPrefs(), [name]: value };
  save(KEY[name], value ? "on" : "off");
  // Petit aperçu quand on active : on entend / sent tout de suite ce que ça donne.
  if (value) playFeedback(name === "sound" ? "correct" : "tap", true);
}

/** Intensité des vibrations (1 léger, 2 moyen, 3 fort), avec un aperçu immédiat. */
export function setHapticLevel(level: HapticLevel) {
  cache = { ...getFeedbackPrefs(), level };
  save(KEY.level, String(level));
  playFeedback("tap", true);
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** Réglages de son et de haptique, pour les composants client (premier affichage : activés, comme le build). */
export function useFeedbackPrefs(): FeedbackPrefs {
  return useSyncExternalStore(subscribe, getFeedbackPrefs, () => DEFAULTS);
}

// ───────────────────────────── Son ─────────────────────────────

type AudioCtor = typeof AudioContext;
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  // Contexte fermé (le système l'a libéré) : on en recrée un.
  if (ctx && ctx.state === "closed") ctx = null;
  if (!ctx) {
    const Ctor: AudioCtor | undefined = window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  return ctx;
}

/**
 * Réveille le contexte audio s'il ne tourne pas. Safari le met en « suspended » au départ, puis en « interrupted »
 * (synthèse vocale, appel, changement d'onglet) : dans les deux cas il faut resume(), et les notes ne doivent être
 * programmées qu'une fois l'horloge repartie, sinon elles tombent dans le vide.
 */
function ensureRunning(c: AudioContext): Promise<boolean> {
  if (c.state === "running") return Promise.resolve(true);
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(c.state === "running"), 400);
    c.resume().then(
      () => {
        clearTimeout(timer);
        resolve(c.state === "running");
      },
      () => {
        clearTimeout(timer);
        resolve(false);
      },
    );
  });
}

type Note = { f: number; at: number; dur: number; gain?: number; type?: OscillatorType; slideTo?: number };

function schedule(c: AudioContext, notes: Note[]) {
  const t0 = c.currentTime + 0.02;
  for (const n of notes) {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.setValueAtTime(n.f, t0 + n.at);
    if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, t0 + n.at + n.dur);
    const peak = n.gain ?? 0.2;
    g.gain.setValueAtTime(0.0001, t0 + n.at);
    g.gain.exponentialRampToValueAtTime(peak, t0 + n.at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.at + n.dur);
    osc.connect(g).connect(c.destination);
    osc.start(t0 + n.at);
    osc.stop(t0 + n.at + n.dur + 0.03);
  }
}

function play(notes: Note[]) {
  const c = audio();
  if (!c) return;
  if (c.state === "running") {
    schedule(c, notes);
    return;
  }
  void ensureRunning(c).then((ok) => {
    if (ok) schedule(c, notes);
  });
}

const SOUNDS: Record<FeedbackKind, Note[]> = {
  // Juste : deux notes montantes, brèves et claires.
  correct: [
    { f: 659.25, at: 0, dur: 0.11 },
    { f: 880, at: 0.09, dur: 0.18 },
  ],
  // Faux : deux notes graves descendantes, mates (pas agressives).
  wrong: [
    { f: 196, at: 0, dur: 0.14, type: "triangle", gain: 0.24 },
    { f: 146.83, at: 0.12, dur: 0.24, type: "triangle", gain: 0.24 },
  ],
  // Fin d'exercice : petite fanfare joyeuse, arpège montant puis accord.
  complete: [
    { f: 523.25, at: 0, dur: 0.14 },
    { f: 659.25, at: 0.12, dur: 0.14 },
    { f: 783.99, at: 0.24, dur: 0.14 },
    { f: 1046.5, at: 0.36, dur: 0.5, gain: 0.2 },
    { f: 783.99, at: 0.36, dur: 0.5, gain: 0.12 },
    { f: 659.25, at: 0.36, dur: 0.5, gain: 0.1 },
  ],
  // Clic : un « tic » presque inaudible, seulement quand la vibration n'existe pas.
  tap: [{ f: 1400, at: 0, dur: 0.03, gain: 0.05, type: "triangle", slideTo: 900 }],
};

/** Le « tic » de remplacement suit l'intensité choisie (léger : très discret, fort : bien net). */
const TICK_GAIN: Record<HapticLevel, number> = { 1: 0.025, 2: 0.05, 3: 0.1 };

// ─────────────────────────── Vibration ───────────────────────────

const VIBRATION: Record<FeedbackKind, number[]> = {
  correct: [18],
  wrong: [45, 40, 45],
  complete: [25, 40, 25, 40, 70],
  tap: [10],
};

/**
 * Le navigateur ne permet pas de régler la force du moteur, seulement la durée : une impulsion plus longue
 * se sent plus fort. Les durées de vibration sont donc multipliées, les pauses restent les mêmes.
 */
const LEVEL_SCALE: Record<HapticLevel, number> = { 1: 0.5, 2: 1, 3: 2 };

function vibrate(kind: FeedbackKind, level: HapticLevel) {
  const pattern = VIBRATION[kind].map((ms, i) => (i % 2 === 0 ? Math.max(3, Math.round(ms * LEVEL_SCALE[level])) : ms));
  navigator.vibrate(pattern);
}

export function canVibrate(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

// ───────────────────────────── Public ─────────────────────────────

let lastResultAt = 0;
let lastTapAt = 0;

/**
 * Joue le retour d'un événement selon les réglages.
 * `force` ignore la vérification des réglages (aperçu au moment de l'activation).
 */
export function playFeedback(kind: FeedbackKind, force = false) {
  if (typeof window === "undefined") return;
  const prefs = getFeedbackPrefs();
  if (kind !== "tap") lastResultAt = Date.now();
  // Le clic qui valide une réponse ne doit pas s'ajouter au son « juste / faux » qui vient de jouer.
  if (kind === "tap" && Date.now() - lastResultAt < 400) return;

  if (kind === "tap") {
    if (!prefs.haptics && !force) return;
    // Un aperçu (réglages) et le clic qui l'a déclenché ne doivent pas se doubler.
    if (Date.now() - lastTapAt < 150) return;
    lastTapAt = Date.now();
    if (canVibrate()) vibrate("tap", prefs.level);
    else play([{ ...SOUNDS.tap[0], gain: TICK_GAIN[prefs.level] }]);
    return;
  }
  if (prefs.sound || (force && kind === "correct")) play(SOUNDS[kind]);
  if (prefs.haptics && canVibrate()) vibrate(kind, prefs.level);
}

/**
 * Réveille l'audio à chaque geste (iOS et Safari exigent une interaction) et joue un instant de silence,
 * ce qui « déverrouille » vraiment la sortie sonore.
 */
export function unlockAudio() {
  const c = audio();
  if (!c) return;
  void ensureRunning(c).then((ok) => {
    if (!ok) return;
    try {
      const buf = c.createBuffer(1, 1, 22050);
      const src = c.createBufferSource();
      src.buffer = buf;
      src.connect(c.destination);
      src.start(0);
    } catch {
      // sans importance : le contexte tourne déjà
    }
  });
}
