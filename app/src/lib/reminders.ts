"use client";

import { MESSAGES } from "@/i18n/messages";
import { currentLang, type Lang } from "@/i18n/lang";
import type { Flame } from "./streak-rules";
import { withBase } from "./base-path";

/**
 * Rappels d'étude.
 *
 * Toute l'appli passe par l'interface `Notifier`. Aujourd'hui, la version navigateur ne peut prévenir
 * que lorsque l'appli est ouverte (un onglet suffit). Dans l'appli native (Capacitor), une version
 * « notifications locales » programmera un rappel quotidien qui arrive même appli fermée.
 */

export type Permission = "granted" | "denied" | "default" | "unsupported";

export interface Notifier {
  /** Nom affiché dans les réglages. */
  readonly kind: string;
  /** Vrai si le rappel arrive même quand l'appli est fermée. */
  readonly background: boolean;
  permission(): Permission;
  request(): Promise<Permission>;
  show(title: string, body: string): Promise<boolean>;
  /** Programme le rappel quotidien (appli native). Sans effet dans le navigateur. */
  scheduleDaily(time: string, title: string, body: string): Promise<void>;
  cancel(): Promise<void>;
}

class WebNotifier implements Notifier {
  readonly kind = "navigateur";
  readonly background = false;

  permission(): Permission {
    if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
    return Notification.permission;
  }

  async request(): Promise<Permission> {
    if (this.permission() === "unsupported") return "unsupported";
    try {
      return await Notification.requestPermission();
    } catch {
      return this.permission();
    }
  }

  async show(title: string, body: string) {
    if (this.permission() !== "granted") return false;
    try {
      // Sur certains téléphones, seule la voie « service worker » est permise.
      const registration = await navigator.serviceWorker?.getRegistration?.();
      if (registration) {
        await registration.showNotification(title, { body, icon: withBase("/icon.png"), tag: "nihongo-rappel" });
        return true;
      }
      new Notification(title, { body, icon: withBase("/icon.png"), tag: "nihongo-rappel" });
      return true;
    } catch {
      return false;
    }
  }

  async scheduleDaily() {
    /* Le navigateur ne sait pas programmer : le rappel est vérifié tant que l'appli est ouverte. */
  }

  async cancel() {}
}

let notifier: Notifier | null = null;

/** Le moyen de prévenir de cet appareil. Point unique à changer pour l'appli native. */
export function getNotifier(): Notifier {
  notifier ??= new WebNotifier();
  return notifier;
}

/** Texte du rappel selon l'état de la flamme (null : rien à rappeler). */
export function reminderMessage(flame: Flame, points: number, goal: number, lang: Lang = currentLang()): { title: string; body: string } | null {
  const left = Math.max(1, goal - points);
  const t = MESSAGES[lang].events.notify;
  switch (flame.status) {
    case "allumee":
      return null;
    case "en-attente":
      return { title: t.waitingTitle(flame.count), body: t.waitingBody(left) };
    case "vacille":
      return { title: t.flickerTitle, body: t.flickerBody(flame.missed.length, flame.atStake) };
    default:
      return { title: t.newTitle, body: t.newBody(left) };
  }
}

/** L'heure du rappel est-elle passée aujourd'hui ? */
export function reminderDue(time: string, now: number) {
  const [h, m] = time.split(":").map(Number);
  const at = new Date(now);
  at.setHours(h, m, 0, 0);
  return now >= at.getTime();
}
