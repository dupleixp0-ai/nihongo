"use client";

import Link from "next/link";
import { LockBadge } from "@/components/site/gate";
import { motion } from "framer-motion";
import type { GridCell } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { isMastered, useProgress } from "@/lib/progress";
import { L, T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

const MotionLink = motion.create(Link);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012 } },
};
const item = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Grille de caractères : chaque case ouvre sa leçon. */
export function CharacterGrid({ cells, columns, label, kanji = false }: { cells: GridCell[]; columns: 3 | 5; label: string; kanji?: boolean }) {
  const progress = useProgress();
  const m = useMessages();
  return (
    <motion.ul
      aria-label={label}
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "grid gap-2 sm:gap-3",
        columns === 5 ? "grid-cols-5 max-w-2xl" : "grid-cols-3 max-w-md",
      )}
    >
      {cells.map((cell, index) => {
        if (!cell) return <li key={`gap-${index}`} aria-hidden="true" />;
        const inner = (
          <>
            <span
              lang="ja"
              className={cn(
                "font-kana leading-none transition-colors",
                kanji ? "text-[clamp(1.6rem,7vw,2.6rem)]" : "text-[clamp(1.5rem,6.5vw,2.4rem)]",
              )}
            >
              {cell.character}
            </span>
            {cell.reading ? (
              <>
                <span lang="ja" className="font-kana mt-1 max-w-full truncate px-1 text-[11px] leading-tight text-indigo-deep sm:text-sm">
                  {cell.reading}
                </span>
                <span className="max-w-full truncate px-1 text-[10px] leading-tight text-muted sm:text-xs">
                  {cell.romaji}<span className="hidden sm:inline"> · <L v={{ fr: cell.label, ...cell.labelTr }} /></span>
                </span>
              </>
            ) : (
              <span className="mt-1.5 max-w-full truncate px-1 text-[11px] text-muted transition-colors group-hover:text-indigo sm:text-[13px]">
                {cell.label}
              </span>
            )}
          </>
        );
        return (
          <motion.li key={`${cell.character}-${index}`} variants={item}>
            {cell.href ? (
              <MotionLink
                href={cell.href}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn("group relative flex flex-col", kanji ? "aspect-[4/5] sm:aspect-square" : "aspect-square", " items-center justify-center overflow-hidden rounded-lg border border-line bg-sheet text-ink shadow-[0_1px_0_rgba(23,35,58,0.06)] transition-[border-color,box-shadow] hover:border-indigo hover:shadow-[0_10px_24px_-14px_rgba(44,74,140,0.55)]")}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="absolute left-1/2 top-0 h-full border-l border-dashed border-guide/40" />
                  <span className="absolute left-0 top-1/2 w-full border-t border-dashed border-guide/40" />
                </span>
                {cell.href && isMastered(progress.items[cell.href]) ? (
                  <span aria-label={m.lists.knownAria} className="absolute left-1 top-1 grid size-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white sm:size-5">✓</span>
                ) : cell.href && progress.seen[cell.href] ? (
                  <span aria-label={m.lists.seenAria} className="absolute left-1.5 top-1.5 size-2 rounded-full border-2 border-indigo sm:size-2.5" />
                ) : null}
                {cell.level && cell.level !== "N5" && cell.level !== "N4" ? (
                  <span className="absolute right-1 top-1 rounded bg-indigo/10 px-1 text-[9px] font-semibold leading-tight text-indigo sm:text-[10px]">{cell.level}</span>
                ) : null}
                <LockBadge id={cell.href} className="absolute bottom-1 right-1" />
                <span className="relative flex flex-col items-center">{inner}</span>
              </MotionLink>
            ) : (
              <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-line text-muted">
                {inner}
                <span className="sr-only"><T m={(x) => x.lists.comingSoon} /></span>
              </div>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
