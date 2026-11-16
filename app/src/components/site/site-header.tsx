"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReviewBadge } from "@/components/srs/review-badge";
import { FlamePill } from "@/components/flame/flame-pill";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";

const NAV: { href: string; label: (m: Messages) => string; glyph: string }[] = [
  { href: "/hiragana", label: (m) => m.nav.hiragana, glyph: "あ" },
  { href: "/katakana", label: (m) => m.nav.katakana, glyph: "ア" },
  { href: "/kanji", label: (m) => m.nav.kanji, glyph: "日" },
  { href: "/vocabulaire", label: (m) => m.nav.words, glyph: "単" },
  { href: "/grammaire", label: (m) => m.nav.grammar, glyph: "文" },
  { href: "/verbes", label: (m) => m.nav.verbs, glyph: "動" },
  { href: "/lecture", label: (m) => m.nav.reading, glyph: "読" },
  { href: "/dialogue", label: (m) => m.nav.dialogue, glyph: "話" },
  { href: "/ecoute", label: (m) => m.nav.listening, glyph: "聞" },
];

type NavItem = (typeof NAV)[number];
const ITEM = (href: string): NavItem => NAV.find((n) => n.href === href)!;

/** Barre du bas (téléphone) : 5 onglets ; Kana, Vocabulaire et Histoires ouvrent un petit menu. */
type Tab =
  | { id: string; href: string; label: (m: Messages) => string; glyph: string }
  | { id: string; label: (m: Messages) => string; glyph: string; items: NavItem[] };
const TABS: Tab[] = [
  { id: "kana", label: (m) => m.nav.kana, glyph: "あ", items: [ITEM("/hiragana"), ITEM("/katakana"), ITEM("/kanji")] },
  { id: "vocab", label: (m) => m.nav.vocabulary, glyph: "単", items: [ITEM("/vocabulaire"), ITEM("/verbes")] },
  { id: "home", href: "/", label: (m) => m.nav.homeTab, glyph: "家" },
  { id: "grammar", href: "/grammaire", label: (m) => m.nav.grammar, glyph: "文" },
  { id: "stories", label: (m) => m.nav.stories, glyph: "話", items: [ITEM("/lecture"), ITEM("/dialogue"), ITEM("/ecoute")] },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/** Barre du haut (tous écrans) et barre d'onglets en bas (téléphone). */
export function SiteHeader() {
  const isActive = useActive();
  const m = useMessages();
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md supports-[backdrop-filter]:bg-paper/65">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3 rounded-sm" aria-label={m.nav.home}>
            <span
              aria-hidden="true"
              lang="ja"
              className="font-kana grid size-9 place-items-center rounded-[3px] bg-seal text-lg text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)] transition-transform duration-300 group-hover:-rotate-6"
            >
              語
            </span>
            <span className="text-lg font-semibold tracking-tight">Nihongo</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
          <nav aria-label={m.nav.sections} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-label={item.label(m)}
                      title={item.label(m)}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-medium transition-colors",
                        active ? "text-on-indigo" : "text-muted hover:text-ink",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-indigo"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span lang="ja" aria-hidden="true" className="font-kana relative text-lg leading-none">{item.glyph}</span>
                      <span className="relative hidden xl:inline"><T m={item.label} /></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <FlamePill />
          <ReviewBadge />
          <Link
            href="/reglages"
            aria-label={m.nav.settings}
            title={m.nav.settings}
            aria-current={isActive("/reglages") ? "page" : undefined}
            className={cn(
              "grid size-10 place-items-center rounded-full border transition-colors",
              isActive("/reglages") ? "border-indigo bg-indigo text-on-indigo" : "border-line bg-sheet text-ink hover:border-indigo hover:text-indigo",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
              <circle cx="16" cy="7" r="2.2" />
              <circle cx="10" cy="17" r="2.2" />
            </svg>
          </Link>
          </div>
        </div>
      </header>

      <BottomTabs />
    </>
  );
}

const TAB_CLASS = "relative flex w-full flex-col items-center gap-0.5 py-2.5 text-[10.5px] font-medium tracking-tight min-[430px]:text-[11px]";

function BottomTabs() {
  const pathname = usePathname();
  const isActive = useActive();
  const m = useMessages();
  // Menu ouvert : on retient la page où il s'est ouvert, il se referme tout seul dès qu'on change de page.
  const [menu, setMenu] = useState<{ id: string; path: string } | null>(null);
  const openId = menu && menu.path === pathname ? menu.id : null;
  const openTab = TABS.find((t) => t.id === openId);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <>
      <AnimatePresence>
        {openTab && "items" in openTab ? (
          <>
            <motion.button
              key="backdrop"
              type="button"
              aria-label={m.nav.closeMenu}
              onClick={() => setMenu(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[35] cursor-default bg-ink/35 md:hidden"
            />
            <motion.div
              key="sheet"
              id={`tab-menu-${openTab.id}`}
              role="group"
              aria-label={openTab.label(m)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom)+0.5rem)] z-[36] rounded-3xl border border-line bg-sheet p-3 shadow-xl md:hidden"
            >
              <ul className={cn("grid gap-2", openTab.items.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
                {openTab.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-2xl border px-2 py-4 text-sm font-medium transition-colors active:scale-[0.97]",
                          active ? "border-indigo bg-indigo-soft text-indigo-deep" : "border-line bg-paper text-ink hover:border-indigo",
                        )}
                      >
                        <span lang="ja" aria-hidden="true" className="font-kana text-3xl leading-none">{item.glyph}</span>
                        <T m={item.label} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <nav
        aria-label={m.nav.sections}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-sheet/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <ul className="grid grid-cols-5">
          {TABS.map((tab) => {
            const grouped = "items" in tab;
            const active = grouped ? tab.items.some((i) => isActive(i.href)) : tab.href === "/" ? pathname === "/" : isActive(tab.href);
            const expanded = openId === tab.id;
            const content = (
              <>
                {active ? <motion.span layoutId="tab-dot" className="absolute top-0 h-0.5 w-10 rounded-full bg-indigo" /> : null}
                <span lang="ja" aria-hidden="true" className="font-kana text-xl leading-none">{tab.glyph}</span>
                <span className="flex items-center gap-0.5">
                  <T m={tab.label} />
                  {grouped ? (
                    <svg aria-hidden="true" viewBox="0 0 10 6" className={cn("size-2 transition-transform", expanded && "rotate-180")}>
                      <path d="m1 5 4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
              </>
            );
            return (
              <li key={tab.id}>
                {grouped ? (
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`tab-menu-${tab.id}`}
                    onClick={() => setMenu(expanded ? null : { id: tab.id, path: pathname })}
                    className={cn(TAB_CLASS, active || expanded ? "text-indigo" : "text-muted")}
                  >
                    {content}
                  </button>
                ) : (
                  <Link href={tab.href} aria-current={active ? "page" : undefined} className={cn(TAB_CLASS, active ? "text-indigo" : "text-muted")}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
