"use client";

import { BASE_PATH } from "./base-path";

/** Mode hors ligne : enregistrement du service worker (out/sw.js, généré au build) et état du cache. */

export type OfflineState = { supported: boolean; ready: boolean; progress: number | null; total: number | null };

const listeners = new Set<(s: OfflineState) => void>();
let state: OfflineState = { supported: false, ready: false, progress: null, total: null };

function emit(patch: Partial<OfflineState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

export function onOfflineState(listener: (s: OfflineState) => void) {
  listeners.add(listener);
  listener(state);
  return () => {
    listeners.delete(listener);
  };
}

async function checkReady() {
  try {
    const hit = await caches.match(`${BASE_PATH}/__offline-ready`);
    if (hit) {
      const info = (await hit.json()) as { total: number };
      emit({ ready: true, progress: null, total: info.total });
    }
  } catch {
    /* rien */
  }
}

let started = false;

/** À lancer une fois au démarrage (seulement dans la version publiée, pas avec `npm run dev`). */
export function registerOffline(onUpdate: () => void) {
  if (started || typeof window === "undefined" || !("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;
  started = true;
  emit({ supported: true });
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("message", (event) => {
    const data = event.data as { type?: string; done?: number; total?: number };
    if (data?.type === "offline-progress") {
      emit({ progress: data.done ?? 0, total: data.total ?? null });
      if (data.done === data.total) void checkReady();
    }
  });
  // Une nouvelle version vient de prendre la main : proposer de recharger.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    void checkReady();
    if (hadController) onUpdate();
  });
  void navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` }).then(() => checkReady()).catch(() => emit({ supported: false }));
}
