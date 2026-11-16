"use client";

import type { CloudProviderId } from "../db/types";
import { exportBackup, getState, setSettings } from "../store";
import { dayKey } from "../streak-rules";
import { downloadBackup, DriveAuthError, uploadBackup } from "./drive-rest";
import { accountEmail, currentToken, googleConfigured, signIn, signOut } from "./google-auth";
import { capacitor, icloudPlugin } from "./icloud";

/**
 * Sauvegarde en ligne, une fois par jour, dans le cloud de l'utilisateur (pas de serveur Nihongo) :
 * iCloud sur iPhone et iPad (appli native), Google Drive ailleurs.
 */

export interface CloudBackupProvider {
  readonly id: CloudProviderId;
  readonly name: string;
  /** Peut sauvegarder sans action de l'utilisateur (jeton valable, iCloud actif). */
  ready(): Promise<boolean>;
  /** Connexion (fenêtre Google) : à lancer depuis un clic. Renvoie le compte connecté. */
  connect(): Promise<{ account?: string }>;
  disconnect(): Promise<void>;
  upload(json: string): Promise<{ at: string }>;
  download(): Promise<{ json: string; at: string } | null>;
}

const icloudProvider = (): CloudBackupProvider | null => {
  const plugin = icloudPlugin();
  if (!plugin) return null;
  return {
    id: "icloud",
    name: "iCloud",
    ready: async () => (await plugin.status()).available,
    connect: async () => {
      if (!(await plugin.status()).available) throw new Error("iCloud n'est pas actif : connecte-toi à iCloud dans les Réglages de l'appareil.");
      return {};
    },
    disconnect: async () => {},
    upload: async (json) => ({ at: (await plugin.save({ json })).modified }),
    download: async () => {
      const r = await plugin.load();
      return r.json ? { json: r.json, at: r.modified ?? "" } : null;
    },
  };
};

const driveProvider = (): CloudBackupProvider | null => {
  // Dans l'appli Android, la connexion Google passera par le module natif (à brancher ici).
  if (!googleConfigured || capacitor()?.isNativePlatform?.()) return null;
  const withToken = async <T,>(fn: (token: string) => Promise<T>) => {
    const token = currentToken();
    if (!token) throw new DriveAuthError("Pas connecté à Google.");
    return fn(token);
  };
  return {
    id: "gdrive",
    name: "Google Drive",
    ready: async () => currentToken() !== null,
    connect: async () => {
      const token = await signIn(getState().settings.cloudBackup.account);
      return { account: await accountEmail(token) };
    },
    disconnect: async () => signOut(),
    upload: (json) => withToken(async (t) => ({ at: (await uploadBackup(fetch, t, json)).modifiedTime })),
    download: () => withToken(async (t) => {
      const r = await downloadBackup(fetch, t);
      return r ? { json: r.json, at: r.modifiedTime } : null;
    }),
  };
};

/** Services disponibles sur cet appareil. */
export function availableProviders(): CloudBackupProvider[] {
  return [icloudProvider(), driveProvider()].filter((p): p is CloudBackupProvider => p !== null);
}

/** Le service choisi dans les réglages (ou le premier disponible). */
export function currentProvider(): CloudBackupProvider | null {
  const list = availableProviders();
  const chosen = getState().settings.cloudBackup.provider;
  return list.find((p) => p.id === chosen) ?? list[0] ?? null;
}

/* —— Sauvegarde du jour en attente d'un clic (navigateur : jeton expiré) —— */
type Listener = () => void;
const listeners = new Set<Listener>();
let pending = false;
export const backupPending = () => pending;
export function onBackupPendingChange(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
function setPending(v: boolean) {
  if (pending === v) return;
  pending = v;
  listeners.forEach((l) => l());
}

let running = false;

/** Sauvegarde maintenant (bouton, ou sauvegarde du jour). */
export async function backupNow(provider = currentProvider()): Promise<string> {
  if (!provider) throw new Error("Aucun service de sauvegarde sur cet appareil.");
  const { at } = await provider.upload(JSON.stringify(exportBackup()));
  const current = getState().settings;
  setSettings({ ...current, cloudBackup: { ...current.cloudBackup, last: dayKey(Date.now()), provider: provider.id } });
  setPending(false);
  return at;
}

/** À appeler régulièrement : sauvegarde du jour si elle est activée et pas encore faite. */
export async function runDailyBackup(now = Date.now()) {
  const { settings, ready } = getState();
  if (!ready || running || !settings.cloudBackup.enabled || settings.cloudBackup.last === dayKey(now)) return;
  const provider = currentProvider();
  if (!provider) return;
  running = true;
  try {
    if (await provider.ready()) await backupNow(provider);
    else setPending(true);
  } catch (error) {
    if (error instanceof DriveAuthError) setPending(true);
    else console.error("[nihongo] sauvegarde en ligne impossible", error);
  } finally {
    running = false;
  }
}

/** Le cloud de ce type d'appareil, pour les explications (navigateur). */
export function expectedCloud(): "iCloud" | "Google Drive" | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "iCloud";
  if (/Android/.test(ua)) return "Google Drive";
  return null;
}
