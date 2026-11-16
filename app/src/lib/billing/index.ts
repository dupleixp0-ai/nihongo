"use client";

import { useSyncExternalStore } from "react";

/**
 * Version complète : achat unique (pas d'abonnement).
 *
 * - `store` : le paiement passe par Google Play ou l'App Store, via un petit pont natif (`window.NihongoBilling`)
 *   que l'emballage Capacitor installera. Tant qu'il n'est pas là (navigateur), l'achat est indisponible.
 * - `test`  : le déblocage est simulé, sans paiement, pour essayer l'appli (GitHub Pages, développement).
 * Le mode se règle à la compilation : NEXT_PUBLIC_BILLING_MODE=store pour une version publiée.
 *
 * Le droit d'accès est gardé sur l'appareil (localStorage) et n'est pas inclus dans les sauvegardes :
 * sur un autre appareil, « Restaurer mon achat » interroge la boutique.
 */

export const PRODUCT_ID = "nihongo_full";
export const BILLING_MODE: "test" | "store" = process.env.NEXT_PUBLIC_BILLING_MODE === "store" ? "store" : "test";

/** Pont natif, fourni par l'appli Android/iPhone. */
export type NativeBilling = {
  /** Prix localisé affiché par la boutique (« 9,99 € »), ou null. */
  price(productId: string): Promise<string | null>;
  /** Lance l'achat. */
  purchase(productId: string): Promise<"ok" | "cancelled" | "error">;
  /** Retrouve un achat déjà fait avec ce compte de boutique. */
  restore(productId: string): Promise<"ok" | "none" | "error">;
};
declare global { interface Window { NihongoBilling?: NativeBilling } }

const KEY = "nihongo-entitlement-v1";
type Entitlement = { productId: string; at: number; source: "store" | "test" };

let cache: { raw: string | null; value: boolean } | null = null;
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (cache && cache.raw === raw) return cache.value;
    let value = false;
    if (raw) {
      const e = JSON.parse(raw) as Partial<Entitlement>;
      // Un déblocage « test » ne vaut rien dans une version de boutique.
      value = e.productId === PRODUCT_ID && (e.source === "store" || (e.source === "test" && BILLING_MODE === "test"));
    }
    cache = { raw, value };
    return value;
  } catch {
    return false;
  }
}

/** Lecture directe (hors composant), pour les règles d'accès. */
export function isPremiumNow(): boolean {
  return typeof window !== "undefined" && read();
}

function write(entitlement: Entitlement | null) {
  try {
    if (entitlement) localStorage.setItem(KEY, JSON.stringify(entitlement));
    else localStorage.removeItem(KEY);
  } catch { /* stockage indisponible : le déblocage ne sera pas gardé */ }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) l(); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

/** `null` tant que l'état n'est pas lu (premier affichage), puis vrai ou faux. */
export function usePremium(): boolean | null {
  return useSyncExternalStore<boolean | null>(subscribe, read, () => null);
}

export type PurchaseResult = "ok" | "cancelled" | "none" | "unavailable" | "error";

export function nativeAvailable() {
  return typeof window !== "undefined" && Boolean(window.NihongoBilling);
}

/** Peut-on payer ici ? En mode test oui ; sinon seulement dans l'appli avec son pont natif. */
export function useCanPay() {
  return useSyncExternalStore(() => () => {}, () => BILLING_MODE === "test" || nativeAvailable(), () => false);
}

export async function localizedPrice(): Promise<string | null> {
  if (BILLING_MODE === "test" || !window.NihongoBilling) return null;
  try { return await window.NihongoBilling.price(PRODUCT_ID); } catch { return null; }
}

export async function purchase(): Promise<PurchaseResult> {
  if (BILLING_MODE === "test") {
    write({ productId: PRODUCT_ID, at: Date.now(), source: "test" });
    return "ok";
  }
  if (!window.NihongoBilling) return "unavailable";
  try {
    const r = await window.NihongoBilling.purchase(PRODUCT_ID);
    if (r === "ok") write({ productId: PRODUCT_ID, at: Date.now(), source: "store" });
    return r;
  } catch {
    return "error";
  }
}

export async function restore(): Promise<PurchaseResult> {
  if (BILLING_MODE === "test") return read() ? "ok" : "none";
  if (!window.NihongoBilling) return "unavailable";
  try {
    const r = await window.NihongoBilling.restore(PRODUCT_ID);
    if (r === "ok") write({ productId: PRODUCT_ID, at: Date.now(), source: "store" });
    return r;
  } catch {
    return "error";
  }
}

/** Test seulement : reverrouille pour essayer la version gratuite. */
export function resetTestUnlock() {
  if (BILLING_MODE === "test") write(null);
}
