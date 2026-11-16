"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { isFreeVerb } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { LockBadge, useCanOpen } from "@/components/site/gate";
import { AddManyButton, CardToggle } from "@/components/srs/card-toggle";
import { verbCardId } from "@/data/srs-items";
import { AnimatePresence, motion } from "framer-motion";
import type { Verb, VerbGroup } from "@/data/verbs";
import { SpeakButton } from "@/components/kana/speak-button";
import { cn } from "@/lib/utils";
import type { Messages } from "@/i18n/messages";
import { L, T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

const GROUP_LABEL: Record<VerbGroup, (m: Messages) => string> = { godan: (m) => m.lists.group1, ichidan: (m) => m.lists.group2, irregulier: (m) => m.lists.irregular };
const GROUP_STYLE: Record<VerbGroup, string> = {
  godan: "bg-indigo/12 text-indigo-deep",
  ichidan: "bg-emerald-500/12 text-emerald-800 dark:text-emerald-300",
  irregulier: "bg-seal/12 text-seal",
};

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-contrast text-on-contrast" : "border border-line bg-sheet text-muted hover:border-indigo hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function VerbRow({ verb }: { verb: Verb }) {
  const open = useCanOpen(verbCardId(verb.slug));
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={cn("grid gap-4 border-b border-line/70 px-4 py-5 last:border-0 sm:px-5 lg:gap-5", open && "lg:grid-cols-[9.5rem_9rem_10.5rem_minmax(0,0.7fr)_minmax(0,1.5fr)]")}
    >
      {/* Verbe */}
      <div className="flex items-start justify-between gap-3 lg:block">
        <div>
          <p lang="ja" className="font-kana text-3xl leading-tight">{verb.jp}</p>
          <p lang="ja" className="font-kana text-base text-indigo-deep">{verb.kana}</p>
          <p className="text-sm text-muted">{verb.romaji}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 lg:mt-2 lg:flex-row lg:items-center">
          <span className={cn("rounded-md px-2 py-0.5 text-xs font-semibold", GROUP_STYLE[verb.group])}><T m={GROUP_LABEL[verb.group]} /></span>
          <span className="rounded-md bg-line/40 px-2 py-0.5 text-xs font-semibold text-muted">{verb.level}</span>
          {open ? <CardToggle id={verbCardId(verb.slug)} compact className="lg:hidden" /> : <LockBadge id={verbCardId(verb.slug)} />}
        </div>
        {open ? <CardToggle id={verbCardId(verb.slug)} compact className="mt-2 hidden lg:inline-flex" /> : null}
      </div>
      {open ? (
        <>
      {/* Forme polie et forme en て */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex items-baseline gap-2 lg:block">
          <span className="text-xs font-semibold text-muted lg:hidden"><T m={(x) => x.lists.polite} /></span>
          <p lang="ja" className="font-kana text-lg">{verb.masu.jp}</p>
          <p className="text-sm text-muted">
            <span lang="ja" className="font-kana">{verb.masu.kana}</span> · {verb.masu.romaji}
          </p>
        </div>
        <div className="flex items-baseline gap-2 lg:block">
          <span className="text-xs font-semibold text-muted lg:hidden"><T m={(x) => x.lists.teForm} /></span>
          <p lang="ja" className="font-kana text-lg"><span className="hidden text-xs font-sans font-semibold text-muted lg:inline">て · </span>{verb.te.jp}</p>
          <p className="text-sm text-muted">
            <span lang="ja" className="font-kana">{verb.te.kana}</span> · {verb.te.romaji}
          </p>
        </div>
      </div>
      {/* Forme familière */}
      <div className="grid gap-1.5 text-sm">
        <span className="text-xs font-semibold text-muted lg:hidden"><T m={(x) => x.lists.plainForm} /></span>
        {([[(x: Messages) => x.lists.present, { jp: verb.jp, kana: verb.kana, romaji: verb.romaji }], [(x: Messages) => x.lists.negative, verb.plain.neg], [(x: Messages) => x.lists.past, verb.plain.past]] as const).map(([label, f], i) => (
          <div key={i} className="flex items-baseline gap-2">
            <span className="w-14 shrink-0 text-xs text-muted"><T m={label} /></span>
            <span>
              <span lang="ja" className="font-kana text-base">{f.jp}</span>
              <span className="block text-xs text-muted"><span lang="ja" className="font-kana">{f.kana}</span> · {f.romaji}</span>
            </span>
          </div>
        ))}
      </div>
      {/* Sens */}
      <p className="text-base font-medium leading-snug"><L v={{ fr: verb.meaning, ...verb.meaningTr }} /></p>
      {/* Exemple */}
      <div className="flex items-start gap-3 rounded-xl bg-sheet px-3.5 py-3 ring-1 ring-line/70">
        <div className="min-w-0 flex-1">
          <p lang="ja" className="font-kana text-lg leading-relaxed">{verb.example.jp}</p>
          <p lang="ja" className="font-kana text-sm text-indigo-deep">{verb.example.kana}</p>
          <p className="text-sm text-muted">{verb.example.romaji}</p>
          <p className="mt-1 text-[15px]"><L v={{ fr: verb.example.fr, ...verb.example.tr }} /></p>
        </div>
        {open ? <SpeakButton text={verb.example.kana} /> : null}
      </div>
        </>
      ) : null}
    </motion.li>
  );
}

/** Liste filtrable des verbes : recherche, niveau, groupe. */
export function VerbList({ verbs }: { verbs: Verb[] }) {
  const m = useMessages();
  const premium = usePremium();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"all" | "N5" | "N4">("all");
  const [group, setGroup] = useState<"all" | VerbGroup>("all");
  const deferred = useDeferredValue(query);

  useEffect(() => {
    // Lien depuis une carte de révision : /verbes?q=食べる
    const q = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(deferred.trim());
    return verbs.filter(
      (v) =>
        (level === "all" || v.level === level) &&
        (group === "all" || v.group === group) &&
        (!q || [v.jp, v.kana, v.romaji, v.masu.kana, v.masu.romaji, v.plain.neg.kana, v.plain.past.kana, v.te.kana, v.te.romaji, v.plain.neg.romaji, v.plain.past.romaji, v.meaning, v.meaningTr?.en ?? "", v.meaningTr?.de ?? ""].some((f) => normalize(f).includes(q))),
    );
  }, [verbs, deferred, level, group]);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 border-b border-line/60 bg-paper/90 px-5 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only"><T m={(x) => x.lists.searchVerb} /></span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={m.lists.verbPlaceholder}
              className="w-full rounded-full border border-line bg-sheet py-2.5 pl-10 pr-4 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-indigo"
            />
          </label>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:px-0">
            <Chip active={level === "all"} onClick={() => setLevel("all")}><T m={(x) => x.lists.all} /></Chip>
            <Chip active={level === "N5"} onClick={() => setLevel("N5")}>N5</Chip>
            <Chip active={level === "N4"} onClick={() => setLevel("N4")}>N4</Chip>
            <span className="mx-1 w-px shrink-0 bg-line" aria-hidden="true" />
            <Chip active={group === "all"} onClick={() => setGroup("all")}><T m={(x) => x.lists.allGroups} /></Chip>
            <Chip active={group === "godan"} onClick={() => setGroup("godan")}><T m={(x) => x.lists.group1} /></Chip>
            <Chip active={group === "ichidan"} onClick={() => setGroup("ichidan")}><T m={(x) => x.lists.group2} /></Chip>
            <Chip active={group === "irregulier"} onClick={() => setGroup("irregulier")}><T m={(x) => x.lists.irregulars} /></Chip>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          <T m={(x) => x.lists.verbCount(filtered.length)} />
        </p>
        <AddManyButton ids={filtered.filter((v) => premium === true || isFreeVerb(v.slug)).map((v) => verbCardId(v.slug))} label={filtered.length === verbs.length ? m.lists.reviewAllVerbs : m.lists.reviewTheseVerbs} />
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper">
        <div className="hidden grid-cols-[9.5rem_9rem_10.5rem_minmax(0,0.7fr)_minmax(0,1.5fr)] gap-5 border-b border-line bg-sheet px-5 py-3 text-sm font-semibold text-muted lg:grid">
          <span><T m={(x) => x.lists.colVerb} /></span>
          <span><T m={(x) => x.lists.colMasuTe} /></span>
          <span><T m={(x) => x.lists.colPlain} /></span>
          <span><T m={(x) => x.lists.colMeaning} /></span>
          <span><T m={(x) => x.lists.colExample} /></span>
        </div>
        {filtered.length ? (
          <ul>
            <AnimatePresence initial={false}>
              {filtered.map((v) => (
                <VerbRow key={v.slug} verb={v} />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-muted">
            <T m={(x) => x.lists.noVerb} />
          </p>
        )}
      </div>
    </div>
  );
}
