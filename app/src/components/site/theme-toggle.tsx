"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Theme = "light" | "dark";


/** Événement envoyé quand le thème change ailleurs (page Réglages). */
export const THEME_EVENT = "nihongo-theme";

/** Applique un choix de thème : clair, sombre, ou celui de l'appareil. */
export function applyTheme(choice: "light" | "dark" | "auto") {
  try {
    if (choice === "auto") localStorage.removeItem("theme");
    else localStorage.setItem("theme", choice);
  } catch {
    /* stockage indisponible */
  }
  const dark = choice === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches : choice === "dark";
  document.documentElement.classList.toggle("dark", dark);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Lit le thème réellement appliqué (script de démarrage, ou page Réglages).
    const read = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    read();
    window.addEventListener(THEME_EVENT, read);
    return () => window.removeEventListener(THEME_EVENT, read);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite */
    }
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={dark ? "Mode clair" : "Mode sombre"}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-sheet text-ink transition-colors hover:border-indigo hover:text-indigo"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={dark ? "moon" : "sun"}
          viewBox="0 0 24 24"
          className="size-5"
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.22 }}
          aria-hidden="true"
        >
          {dark ? (
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
          ) : (
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
            </g>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
