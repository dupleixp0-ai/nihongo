"use client";

import { useEffect, useState } from "react";
import { registerOffline } from "@/lib/offline";

/** Active le mode hors ligne et annonce les mises à jour de l'appli. */
export function OfflineSupport() {
  const [updated, setUpdated] = useState(false);
  useEffect(() => registerOffline(() => setUpdated(true)), []);
  if (!updated) return null;
  return (
    <div className="fixed inset-x-0 top-20 z-40 flex justify-center px-4">
      <div role="status" className="flex items-center gap-3 rounded-2xl border border-line bg-sheet px-4 py-3 shadow-[0_18px_40px_-24px_rgba(23,35,58,0.7)]">
        <span className="text-[15px]">Une nouvelle version de Nihongo est installée.</span>
        <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-indigo px-4 py-2 text-sm font-semibold text-on-indigo">
          Recharger
        </button>
        <button type="button" onClick={() => setUpdated(false)} className="text-sm font-medium text-muted hover:text-ink">Plus tard</button>
      </div>
    </div>
  );
}
