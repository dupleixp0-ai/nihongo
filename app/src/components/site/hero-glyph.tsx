"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type HeroItem = { character: string; caption: string; strokes: string[] };

const STROKE = 0.55;
const GAP = 0.35;
const HOLD = 1.6;

/** Le grand caractère de l'accueil, tracé trait par trait sur papier quadrillé. */
export function HeroGlyph({ items }: { items: HeroItem[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const item = items[index];

  useEffect(() => {
    if (reduce) return;
    const duration = (item.strokes.length * (STROKE + GAP) + HOLD) * 1000;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % items.length), duration);
    return () => clearTimeout(timer);
  }, [index, item.strokes.length, items.length, reduce]);

  return (
    <figure className="relative mx-auto w-full max-w-[26rem]">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-sheet shadow-[0_30px_60px_-30px_rgba(23,35,58,0.35)]">
        <svg aria-hidden="true" viewBox="0 0 109 109" className="absolute inset-0 h-full w-full">
          <rect x="6" y="6" width="97" height="97" fill="none" className="stroke-line" strokeWidth="0.6" />
          <line x1="54.5" y1="6" x2="54.5" y2="103" className="stroke-guide" strokeWidth="0.4" strokeDasharray="1.6 1.6" />
          <line x1="6" y1="54.5" x2="103" y2="54.5" className="stroke-guide" strokeWidth="0.4" strokeDasharray="1.6 1.6" />
        </svg>
        <AnimatePresence mode="wait">
          <motion.svg
            key={item.character}
            role="img"
            aria-label={item.caption}
            viewBox="0 0 109 109"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
          >
            {item.strokes.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                className="stroke-brush"
                strokeWidth="4.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: reduce ? 0 : i * (STROKE + GAP), duration: reduce ? 0 : STROKE, ease: "easeInOut" }}
              />
            ))}
          </motion.svg>
        </AnimatePresence>
        <span
          aria-hidden="true"
          lang="ja"
          className="font-kana absolute right-4 top-4 grid size-11 rotate-6 place-items-center rounded-[3px] bg-seal text-sm leading-tight text-white"
        >
          日本
        </span>
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-3 text-sm text-muted">
        <AnimatePresence mode="wait">
          <motion.span
            key={item.caption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {item.caption}
          </motion.span>
        </AnimatePresence>
      </figcaption>
    </figure>
  );
}
