"use client";

/**
 * iCloud (iPhone, iPad) : passe par le module natif « NihongoICloud » de l'appli Capacitor
 * (voir native/ios/NihongoICloudPlugin.swift). Le fichier va dans le conteneur iCloud de l'appli,
 * sur le compte Apple déjà connecté à l'appareil : rien à saisir.
 * Dans le navigateur, ce module n'existe pas et iCloud n'est pas proposé.
 */

type ICloudPlugin = {
  status(): Promise<{ available: boolean }>;
  save(o: { json: string }): Promise<{ modified: string }>;
  load(): Promise<{ json?: string; modified?: string }>;
};

type CapacitorGlobal = { isNativePlatform?: () => boolean; getPlatform?: () => string; Plugins?: Record<string, unknown> };

export function capacitor(): CapacitorGlobal | null {
  if (typeof window === "undefined") return null;
  return ((window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor) ?? null;
}

export function icloudPlugin(): ICloudPlugin | null {
  const cap = capacitor();
  if (!cap?.isNativePlatform?.() || cap.getPlatform?.() !== "ios") return null;
  return (cap.Plugins?.NihongoICloud as ICloudPlugin | undefined) ?? null;
}
