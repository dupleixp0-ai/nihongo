"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { isFreeId } from "@/data/access";
import { BILLING_MODE, localizedPrice, purchase, restore, resetTestUnlock, useCanPay, usePremium, type PurchaseResult } from "@/lib/billing";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";

/** Vrai quand la version complète est débloquée ; `null` pendant la lecture au premier affichage. */
export const useAccess = usePremium;

/** Cet élément est-il ouvert ? (gratuit, ou version complète débloquée). Pendant la lecture : on suppose gratuit seulement s'il l'est vraiment. */
export function useCanOpen(id: string): boolean {
  const premium = usePremium();
  return isFreeId(id) || premium === true;
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={cn("size-4", className)}>
      <rect x="4.5" y="9" width="11" height="8" rx="2" fill="currentColor" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Petit cadenas, affiché sur ce qui demande la version complète. N'apparaît pas une fois débloquée. */
export function LockBadge({ id, className }: { id: string; className?: string }) {
  const premium = usePremium();
  const m = useMessages();
  if (premium !== false || isFreeId(id)) return null;
  return (
    <span role="img" aria-label={m.premium.lockedAria} title={m.premium.lockedAria} className={cn("inline-grid size-5 place-items-center rounded-full bg-contrast/85 text-on-contrast", className)}>
      <LockIcon className="size-3" />
    </span>
  );
}

const MESSAGE_OF: Partial<Record<PurchaseResult, "done" | "cancelled" | "error" | "none" | "needApp">> = {
  ok: "done", cancelled: "cancelled", error: "error", none: "none", unavailable: "needApp",
};

/** Présentation de la version complète, avec le bouton d'achat et « Restaurer mon achat ». */
export function Paywall({ className }: { className?: string }) {
  const m = useMessages();
  const canPay = useCanPay();
  const [price, setPrice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PurchaseResult | null>(null);

  useEffect(() => {
    let live = true;
    localizedPrice().then((p) => { if (live) setPrice(p); });
    return () => { live = false; };
  }, []);

  async function run(action: () => Promise<PurchaseResult>) {
    setBusy(true);
    setResult(null);
    setResult(await action());
    setBusy(false);
  }

  const key = result ? MESSAGE_OF[result] : undefined;
  return (
    <section aria-labelledby="paywall-title" className={cn("rounded-3xl border border-line bg-sheet p-6 sm:p-8", className)}>
      <h2 id="paywall-title" className="text-2xl font-semibold tracking-tight"><T m={(x) => x.premium.pitchTitle} /></h2>
      <p className="mt-2 text-lg text-muted"><T m={(x) => x.premium.pitchLead} /></p>
      <ul className="mt-4 grid gap-2">
        {m.premium.includes.map((_, i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">✓</span>
            <span><T m={(x) => x.premium.includes[i]} /></span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[15px] leading-relaxed text-muted">
        <strong className="font-semibold text-ink"><T m={(x) => x.premium.freeTitle} /> · </strong>
        <T m={(x) => x.premium.freeText} />
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={busy || !canPay}
          onClick={() => run(purchase)}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-indigo px-6 text-base font-semibold text-on-indigo transition-transform active:scale-[0.97] disabled:opacity-50"
        >
          <LockIcon className="size-4" />
          {busy ? m.premium.working : price ? m.premium.buyPrice(price) : m.premium.buy}
        </button>
        <button
          type="button"
          disabled={busy || !canPay}
          onClick={() => run(restore)}
          className="inline-flex h-12 items-center rounded-full border border-line px-5 text-base font-medium text-ink transition-colors hover:border-indigo disabled:opacity-50"
        >
          <T m={(x) => x.premium.restore} />
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-[15px] text-muted">
        {key ? m.premium[key] : !canPay ? m.premium.needApp : ""}
      </p>
      {BILLING_MODE === "test" ? <p className="mt-1 text-sm text-seal"><T m={(x) => x.premium.testNote} /></p> : null}
    </section>
  );
}

/**
 * Entoure le contenu d'une leçon ou d'une page. Gratuit ou débloqué : le contenu s'affiche.
 * Sinon : un aperçu (grand caractère et titre) et l'offre d'achat. Le contenu n'est pas monté,
 * donc rien n'est ajouté à la progression ni aux révisions.
 */
export function Gate({ id, glyph, title, sub, subHeading = false, children }: { id: string; glyph: ReactNode; title: ReactNode; sub?: ReactNode; /** vrai si la page a déjà son titre principal */ subHeading?: boolean; children: ReactNode }) {
  const premium = usePremium();
  const m = useMessages();
  if (isFreeId(id) || premium === true) return <>{children}</>;
  return (
    <div>
      <div className="flex flex-col items-center rounded-3xl border border-line bg-sheet px-6 py-10 text-center">
        <span lang="ja" className="font-kana bg-genko relative grid min-w-32 place-items-center rounded-2xl border border-line px-6 py-4 text-7xl leading-none text-ink/80 sm:text-8xl">
          {glyph}
          <span className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full bg-contrast text-on-contrast shadow"><LockIcon className="size-5" /></span>
        </span>
        {subHeading ? <p className="mt-6 text-3xl font-semibold tracking-tight">{title}</p> : <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>}
        {sub ? <p className="mt-1 text-muted">{sub}</p> : null}
        {premium === false ? <p className="mt-4 text-muted"><T m={(x) => x.premium.lockedPage} /></p> : <span className="sr-only">{m.premium.lockedAria}</span>}
      </div>
      {premium === false ? <Paywall className="mt-6" /> : null}
    </div>
  );
}

/** Bandeau d'invitation (accueil, réglages) tant que la version complète n'est pas débloquée. */
export function UnlockBanner({ className }: { className?: string }) {
  const premium = usePremium();
  if (premium !== false) return null;
  return (
    <Link href="/reglages#version-complete" className={cn("flex items-center justify-between gap-4 rounded-2xl border border-line bg-sheet p-5 transition-colors hover:border-indigo", className)}>
      <span>
        <span className="block font-semibold"><T m={(x) => x.premium.banner} /></span>
        <span className="block text-[15px] text-muted"><T m={(x) => x.premium.bannerText} /></span>
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-contrast text-on-contrast"><LockIcon className="size-5" /></span>
    </Link>
  );
}

export { resetTestUnlock };
