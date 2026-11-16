"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/store";
import { buildQueue } from "@/lib/srs";
import { cn } from "@/lib/utils";
import { useNow } from "./use-now";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

/** Bouton « Révisions » de la barre du haut, avec le nombre de cartes à revoir maintenant. */
export function ReviewBadge() {
  const { ready, cards, reviews, settings } = useAppState();
  const now = useNow();
  const pathname = usePathname();
  const m = useMessages();
  const count = ready && now ? (() => {
    const q = buildQueue(cards, reviews, settings.newPerDay, now);
    return q.due.length + q.fresh.length;
  })() : 0;
  const active = pathname === "/revisions";

  return (
    <Link
      href="/revisions"
      aria-label={count ? m.nav.reviewsDue(count) : m.nav.reviews}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-10 items-center gap-2 rounded-full border px-3 text-[15px] font-medium transition-colors",
        active ? "border-indigo bg-indigo text-on-indigo" : "border-line bg-sheet text-ink hover:border-indigo",
      )}
    >
      <span lang="ja" aria-hidden="true" className="font-kana text-lg leading-none">復</span>
      <span className="hidden 2xl:inline"><T m={(x) => x.nav.reviews} /></span>
      {count > 0 ? (
        <span className={cn("min-w-6 rounded-full px-1.5 text-center text-xs font-semibold leading-6 tabular-nums", active ? "bg-on-indigo text-indigo" : "bg-seal text-white")}>
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
