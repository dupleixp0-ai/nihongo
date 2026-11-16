"use client";

import { useEffect, useState } from "react";

/** L'heure actuelle, rafraîchie toutes les `every` ms (0 avant l'affichage côté client). */
export function useNow(every = 30_000) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), every);
    return () => window.clearInterval(id);
  }, [every]);
  return now;
}
