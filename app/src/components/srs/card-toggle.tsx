"use client";

import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/store";
import { addCards, formatDelay, removeCards, State } from "@/lib/srs";
import { cn } from "@/lib/utils";
import { useNow } from "./use-now";
import { useLang, useMessages } from "@/i18n/use-lang";

/** Indique si un élément est dans les révisions, et permet de l'ajouter ou de le retirer. */
export function CardToggle({ id, className, compact = false, onAdd }: { id: string; className?: string; compact?: boolean; onAdd?: () => void }) {
  const { ready, cardsById } = useAppState();
  const now = useNow();
  const lang = useLang();
  const c = useMessages().card;
  if (!ready) return <span className={cn("inline-block h-9", className)} aria-hidden="true" />;
  const card = cardsById[id];

  if (!card) {
    return (
      <button
        type="button"
        onClick={() => {
          addCards([id]);
          onAdd?.();
        }}
        className={cn("inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-line px-3.5 text-sm font-medium text-muted transition-colors hover:border-indigo hover:text-indigo", className)}
      >
        <span aria-hidden="true">＋</span> {compact ? c.addShort : c.add}
      </button>
    );
  }

  const when =
    card.state === State.New ? c.isNew : card.due <= now ? c.dueNow : c.next(formatDelay(card.due - now, lang));
  return (
    <span className={cn("inline-flex h-9 items-center gap-2 rounded-full bg-indigo-soft pl-3.5 pr-1 text-sm text-indigo-deep", className)}>
      <span aria-hidden="true" className="size-2 rounded-full bg-indigo" />
      <span>{compact ? c.inShort : c.inReviews(when)}</span>
      <button
        type="button"
        onClick={() => removeCards([id])}
        aria-label={c.remove}
        title={c.remove}
        className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-sheet hover:text-seal"
      >
        ×
      </button>
    </span>
  );
}

/** Ajoute d'un coup une liste d'éléments (un onglet, les verbes filtrés…). */
export function AddManyButton({ ids, label }: { ids: string[]; label: string }) {
  const { ready, cardsById } = useAppState();
  const c = useMessages().card;
  if (!ready || ids.length === 0) return null;
  const missing = ids.filter((id) => !cardsById[id]);
  if (missing.length === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-indigo" /> {c.allIn}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => addCards(missing)}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-sheet px-4 text-sm font-semibold text-ink transition-colors hover:border-indigo"
    >
      <span lang="ja" aria-hidden="true" className="font-kana text-base text-indigo">復</span>
      {label} ({missing.length})
    </button>
  );
}

/** Version pour les pages de leçon : l'identifiant de la carte est l'adresse de la page. */
export function LessonCardToggle() {
  const pathname = usePathname();
  return <CardToggle id={decodeURIComponent(pathname)} className="mt-3" />;
}
