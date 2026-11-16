"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { markSeen } from "@/lib/progress";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { L, T } from "@/i18n/t";
import { useLang, useMessages } from "@/i18n/use-lang";
import { pick, type Tr } from "@/i18n/meanings";

type Neighbour = { href: string; character: string; label: string; labelTr?: Tr } | null;

type LessonPagerProps = {
  backHref: string;
  backLabel: string;
  previous: Neighbour;
  next: Neighbour;
  position: number;
  total: number;
  children: React.ReactNode;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4">
      <path d={dir === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MotionLink = motion.create(Link);

/**
 * Cadre d'une leçon : retour à l'index, position, leçon précédente et suivante.
 * Flèches ← → du clavier et balayage horizontal (hors zone de dessin) pour passer d'une leçon à l'autre.
 */
export function LessonPager({ backHref, backLabel, previous, next, position, total, children }: LessonPagerProps) {
  const router = useRouter();
  const m = useMessages();
  const lang = useLang();
  const pathname = usePathname();

  useEffect(() => {
    markSeen(pathname);
  }, [pathname]);
  const touch = useRef<{ x: number; y: number; ignore: boolean } | null>(null);

  useEffect(() => {
    if (previous) router.prefetch(previous.href);
    if (next) router.prefetch(next.href);
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]") || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowLeft" && previous) router.push(previous.href);
      if (event.key === "ArrowRight" && next) router.push(next.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previous, next, router]);

  return (
    <div
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY, ignore: Boolean((e.target as HTMLElement).closest("[data-no-swipe]")) };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start || start.ignore) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        if (dx < 0 && next) router.push(next.href);
        if (dx > 0 && previous) router.push(previous.href);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href={backHref} className="inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3 text-[15px] font-medium text-indigo hover:text-indigo-deep">
          <Chevron dir="left" />
          {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-sm tabular-nums text-muted">
            {position} / {total}
          </span>
          {[{ n: previous, dir: "left" as const, text: m.lesson.prevLesson }, { n: next, dir: "right" as const, text: m.lesson.nextLesson }].map(({ n, dir, text }) =>
            n ? (
              <MotionLink
                key={dir}
                href={n.href}
                whileTap={{ scale: 0.9 }}
                aria-label={`${text} : ${n.character} (${pick(n.label, n.labelTr, lang)})`}
                className="grid size-10 place-items-center rounded-full border border-line bg-sheet text-ink transition-colors hover:border-indigo hover:text-indigo"
              >
                <Chevron dir={dir} />
              </MotionLink>
            ) : (
              <span key={dir} aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-line/60 text-line">
                <Chevron dir={dir} />
              </span>
            ),
          )}
        </div>
      </div>

      <div className="mt-8">{children}</div>

      <nav aria-label={m.lesson.otherLessons} className="mt-16 grid grid-cols-2 gap-3 border-t border-line pt-8">
        {[{ n: previous, dir: "left" as const, text: <T key="p" m={(x) => x.lesson.previous} /> }, { n: next, dir: "right" as const, text: <T key="n" m={(x) => x.lesson.next} /> }].map(({ n, dir, text }) =>
          n ? (
            <MotionLink
              key={dir}
              href={n.href}
              whileHover={{ x: dir === "left" ? -3 : 3 }}
              whileTap={{ scale: 0.97 }}
              className={`group flex items-center gap-4 rounded-xl border border-line bg-sheet p-4 transition-colors hover:border-indigo ${dir === "right" ? "flex-row-reverse text-right" : ""}`}
            >
              <span lang="ja" className="font-kana text-4xl leading-none text-ink sm:text-5xl">{n.character}</span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">{text}</span>
                <span className="block truncate font-semibold text-indigo"><L v={{ fr: n.label, ...n.labelTr }} /></span>
              </span>
            </MotionLink>
          ) : (
            <span key={dir} />
          ),
        )}
      </nav>
    </div>
  );
}
