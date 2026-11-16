"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Petit réglage « oui / non » gardé sur l'appareil (localStorage), partagé entre les composants. */
export function useLocalFlag(key: string, initial: boolean): [boolean, (value: boolean) => void] {
  const event = `nihongo:flag:${key}`;
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(event, onChange);
    return () => window.removeEventListener(event, onChange);
  }, [event]);
  const read = useCallback(() => {
    try {
      const v = localStorage.getItem(key);
      return v === null ? initial : v === "on";
    } catch {
      return initial;
    }
  }, [key, initial]);
  const value = useSyncExternalStore(subscribe, read, () => initial);
  const set = useCallback((next: boolean) => {
    try {
      localStorage.setItem(key, next ? "on" : "off");
    } catch {
      // stockage indisponible : sans effet
    }
    window.dispatchEvent(new Event(event));
  }, [key, event]);
  return [value, set];
}
