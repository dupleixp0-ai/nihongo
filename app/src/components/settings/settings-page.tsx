"use client";

import Link from "next/link";
import { BILLING_MODE, resetTestUnlock, usePremium } from "@/lib/billing";
import { Paywall } from "@/components/site/gate";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { exportBackup, parseBackup, replaceAll, resetAll, setSettings, useAppState } from "@/lib/store";
import { getNotifier, reminderMessage, type Permission } from "@/lib/reminders";
import { useFlame } from "@/lib/streak";
import { useNow } from "@/components/srs/use-now";
import { applyTheme, THEME_EVENT } from "@/components/site/theme-toggle";
import { FlameIcon } from "@/components/flame/flame";
import { cn } from "@/lib/utils";
import { setFeedbackPref, setHapticLevel, useFeedbackPrefs, type HapticLevel } from "@/lib/feedback";
import { onOfflineState, type OfflineState } from "@/lib/offline";
import { FLAMES, INKS, isUnlocked, type Palette } from "@/lib/palettes";
import { useSeals } from "@/lib/use-seals";
import type { LessonGroups } from "@/lib/achievements";
import { DAILY_GOALS } from "@/lib/daily-goals";
import { useLang, useMessages } from "@/i18n/use-lang";
import { LanguagePicker } from "@/components/site/language-picker";
import { availableProviders, backupNow, expectedCloud, type CloudBackupProvider } from "@/lib/cloud";

const GOALS = DAILY_GOALS;

function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
      <div className="grid gap-5 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <div>
          <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">{title}</h2>
          {intro ? <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{intro}</p> : null}
        </div>
        <div className="grid gap-3">{children}</div>
      </div>
    </section>
  );
}

function Row({ title, text, children, htmlFor }: { title: string; text?: ReactNode; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-line bg-sheet px-5 py-4">
      <label htmlFor={htmlFor} className="min-w-0 flex-1">
        <span className="block font-medium">{title}</span>
        {text ? <span className="block text-sm text-muted">{text}</span> : null}
      </label>
      {children}
    </div>
  );
}

/** Sons et retours haptiques : gardés sur l'appareil (pas dans la sauvegarde). */
function SoundAndHaptics() {
  const t = useMessages().settings.reviews;
  const prefs = useFeedbackPrefs();
  return (
    <Section id="sons" title={t.soundTitle} intro={t.soundIntro}>
      <Row title={t.sound} text={t.soundText} htmlFor="sound">
        <Switch id="sound" checked={prefs.sound} onChange={(v) => setFeedbackPref("sound", v)} />
      </Row>
      <Row title={t.haptics} text={t.hapticsText} htmlFor="haptics">
        <Switch id="haptics" checked={prefs.haptics} onChange={(v) => setFeedbackPref("haptics", v)} />
      </Row>
      <Row title={t.hapticLevel} text={t.hapticLevelText}>
        <div role="radiogroup" aria-label={t.hapticLevel} className="flex rounded-full border border-line bg-paper p-1">
          {([1, 2, 3] as HapticLevel[]).map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={prefs.level === n}
              disabled={!prefs.haptics}
              onClick={() => setHapticLevel(n)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-40",
                prefs.level === n ? "bg-indigo text-on-indigo" : "text-muted hover:text-ink",
              )}
            >
              {t.hapticLevels[n - 1]}
            </button>
          ))}
        </div>
      </Row>
    </Section>
  );
}

function Switch({ id, checked, onChange, disabled }: { id: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      disabled={disabled}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-40", checked ? "bg-indigo" : "bg-line")}
    >
      <span className={cn("absolute top-1 size-5 rounded-full bg-sheet shadow transition-[left]", checked ? "left-6" : "left-1")} />
    </button>
  );
}

export function SettingsPage({ groups }: { groups: LessonGroups }) {
  const app = useAppState();
  const { settings } = app;
  const now = useNow();
  const flame = useFlame(now);
  const m = useMessages();
  const t = m.settings;
  if (!app.ready) return <div className="h-96" aria-busy="true" />;

  return (
    <div>
      <Section id="langue" title={t.language.title} intro={t.language.intro}>
        <LanguagePicker label={t.language.title} />
      </Section>

      <Section id="flamme" title={t.goal.title} intro={t.goal.intro}>
        <div role="radiogroup" aria-label={t.goal.label} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GOALS.map((g) => {
            const on = settings.dailyGoal === g.value;
            return (
              <button
                key={g.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSettings({ ...settings, dailyGoal: g.value })}
                className={cn(
                  "flex flex-col items-start rounded-2xl border-2 px-4 py-3 text-left transition-colors",
                  on ? "border-seal bg-seal-soft" : "border-line bg-sheet hover:border-seal/50",
                )}
              >
                <span className="flex items-center gap-1.5 font-semibold">
                  <FlameIcon status={on ? "allumee" : "nouvelle"} className="h-4 w-3" />
                  {m.goals[g.value].label}
                </span>
                <span className="text-sm text-muted">{t.goal.perDay(g.value)}</span>
              </button>
            );
          })}
        </div>
        {flame.ready ? (
          <p className="text-sm text-muted">{t.goal.today(flame.points)}</p>
        ) : null}
      </Section>

      <Reminders />

      <Section id="revisions" title={t.reviews.title} intro={t.reviews.intro}>
        <Row title={t.reviews.perDay} htmlFor="new-per-day">
          <select
            id="new-per-day"
            value={settings.newPerDay}
            onChange={(e) => setSettings({ ...settings, newPerDay: Number(e.target.value) })}
            className="h-10 rounded-lg border border-line bg-paper px-3 font-semibold"
          >
            {[5, 10, 15, 20, 30, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Row>
        <Row title={t.reviews.autoAdd} text={t.reviews.autoAddText} htmlFor="auto-add">
          <Switch id="auto-add" checked={settings.autoAdd} onChange={(v) => setSettings({ ...settings, autoAdd: v })} />
        </Row>
        <Row title={t.reviews.typing} text={t.reviews.typingText} htmlFor="type-answers">
          <Switch id="type-answers" checked={settings.typeAnswers !== false} onChange={(v) => setSettings({ ...settings, typeAnswers: v })} />
        </Row>
      </Section>

      <SoundAndHaptics />

      <FullVersion />
      <Appearance groups={groups} />
      <Offline />
      <CloudBackup />
      <Data />

      <Section id="a-propos" title={t.about.title}>
        <div className="rounded-2xl border border-line bg-sheet px-5 py-4 text-[15px] leading-relaxed text-muted">
          <p>{t.about.local}</p>
          <p className="mt-2">
            <Link href="/" onClick={() => setSettings({ ...settings, onboarded: false })} className="font-medium text-indigo-deep underline-offset-2 hover:underline">
              {t.about.onboarding}
            </Link>
          </p>
          <p className="mt-2">{t.about.credits}</p>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/confidentialite" className="font-medium text-indigo-deep underline-offset-2 hover:underline">{m.legal.links.privacy}</Link>
            <Link href="/licences" className="font-medium text-indigo-deep underline-offset-2 hover:underline">{m.legal.links.licences}</Link>
          </p>
        </div>
      </Section>
    </div>
  );
}

function FullVersion() {
  const premium = usePremium();
  const m = useMessages();
  if (premium === null) return null;
  return (
    <Section id="version-complete" title={m.premium.title}>
      <div className="rounded-2xl border border-line bg-sheet px-5 py-4">
        <p className="font-semibold">{premium ? m.premium.statusFull : m.premium.statusFree}</p>
        <p className="mt-1 text-[15px] text-muted">{premium ? m.premium.settingsFull : m.premium.settingsFree}</p>
        {premium && BILLING_MODE === "test" ? (
          <button type="button" onClick={resetTestUnlock} className="mt-3 rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-indigo">{m.premium.relock}</button>
        ) : null}
      </div>
      {premium ? null : <Paywall className="mt-4" />}
    </Section>
  );
}

function Reminders() {
  const { settings } = useAppState();
  const now = useNow();
  const flame = useFlame(now);
  const notifier = getNotifier();
  const [permission, setPermission] = useState<Permission>("default");
  const [status, setStatus] = useState<string | null>(null);
  const r = useMessages().settings.reminder;

  useEffect(() => {
    // La permission se lit côté navigateur, après le premier affichage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPermission(notifier.permission());
  }, [notifier]);

  const enable = async (on: boolean) => {
    if (on && permission !== "granted") {
      const answer = await notifier.request();
      setPermission(answer);
      if (answer !== "granted") {
        setStatus(answer === "unsupported" ? r.unsupported : r.denied);
        return;
      }
    }
    setSettings({ ...settings, reminder: { ...settings.reminder, enabled: on } });
    setStatus(on ? r.enabled(settings.reminder.time) : r.disabled);
  };

  const test = async () => {
    const msg = reminderMessage({ ...flame, status: flame.status === "allumee" ? "en-attente" : flame.status }, flame.points, flame.goal);
    const shown = msg ? await notifier.show(msg.title, msg.body) : false;
    setStatus(shown ? r.sent : r.failed);
  };

  return (
    <Section
      id="rappels"
      title={r.title}
      intro={notifier.background ? r.introNative : r.introWeb}
    >
      <Row title={r.on} text={r.onText} htmlFor="reminder-on">
        <Switch id="reminder-on" checked={settings.reminder.enabled} onChange={(v) => void enable(v)} />
      </Row>
      <Row title={r.time} htmlFor="reminder-time">
        <input
          id="reminder-time"
          type="time"
          value={settings.reminder.time}
          onChange={(e) => e.target.value && setSettings({ ...settings, reminder: { ...settings.reminder, time: e.target.value } })}
          className="h-10 rounded-lg border border-line bg-paper px-3 font-semibold tabular-nums"
        />
      </Row>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void test()}
          disabled={permission !== "granted"}
          className="h-11 rounded-full border border-line bg-sheet px-4 text-sm font-semibold hover:border-indigo disabled:opacity-50"
        >
          {r.test}
        </button>
        <span className="text-sm text-muted">{r.notifications(r.permission[permission])}</span>
      </div>
      {status ? <p className="text-sm text-indigo-deep" role="status">{status}</p> : null}
    </Section>
  );
}

function Appearance({ groups }: { groups: LessonGroups }) {
  const { settings } = useAppState();
  const now = useNow();
  const { earned } = useSeals(groups, now);
  const a = useMessages().settings.appearance;
  const [choice, setChoice] = useState<"light" | "dark" | "auto">("auto");
  useEffect(() => {
    const read = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* rien */
      }
      setChoice(stored === "light" || stored === "dark" ? stored : "auto");
    };
    read();
    window.addEventListener(THEME_EVENT, read);
    return () => window.removeEventListener(THEME_EVENT, read);
  }, []);
  const options = [
    { value: "light", label: a.light },
    { value: "dark", label: a.dark },
    { value: "auto", label: a.auto },
  ] as const;
  return (
    <Section id="apparence" title={a.title} intro={a.intro(earned)}>
      <div role="radiogroup" aria-label={a.theme} className="inline-flex w-fit flex-wrap gap-1 rounded-2xl border border-line bg-sheet p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={choice === o.value}
            onClick={() => applyTheme(o.value)}
            className={cn("rounded-xl px-4 py-2 text-sm font-medium transition-colors", choice === o.value ? "bg-contrast text-on-contrast" : "text-muted hover:text-ink")}
          >
            {o.label}
          </button>
        ))}
      </div>
      <PalettePicker
        label={a.flame}
        palettes={FLAMES}
        value={settings.flameColor}
        earned={earned}
        onPick={(id) => setSettings({ ...settings, flameColor: id })}
        preview={(p) => (
          <svg viewBox="0 0 48 64" className="h-8 w-6" aria-hidden="true">
            <path d="M24 2c3 12 16 20 16 38 0 12-7.2 21-16 21S8 52 8 40c0-8 4-13 8-17 0 6 3 10 6 11-2-10 0-22 2-32Z" fill={p.swatch[0]} />
            <path d="M24 28c3 7 9.5 11 9.5 19.5 0 6.4-4.3 10.5-9.5 10.5s-9.5-4.1-9.5-10.5c0-4.2 2-7.4 4.2-9.4 0 3.2 1.8 5.3 3.2 5.6-1-5.4.2-11 2.1-15.7Z" fill={p.swatch[1]} />
          </svg>
        )}
      />
      <PalettePicker
        label={a.ink}
        palettes={INKS}
        value={settings.inkColor}
        earned={earned}
        onPick={(id) => setSettings({ ...settings, inkColor: id })}
        preview={(p) => (
          <span lang="ja" className="font-kana text-3xl leading-none">
            <span className="dark:hidden" style={{ color: p.swatch[0] }}>{p.jp}</span>
            <span className="hidden dark:inline" style={{ color: p.swatch[1] }}>{p.jp}</span>
          </span>
        )}
      />
    </Section>
  );
}

function Data() {
  const { storage, cards, reviews, streak } = useAppState();
  const [message, setMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const days = Object.values(streak.days).filter((d) => d.met).length;
  const m = useMessages();
  const d = m.settings.data;

  const download = () => {
    const blob = new Blob([JSON.stringify(exportBackup(), null, 1)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${d.fileName}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage(d.exported);
  };

  const restore = async (file: File) => {
    try {
      const backup = parseBackup(await file.text());
      await replaceAll(backup);
      setMessage(d.restored(new Date(backup.exportedAt).toLocaleDateString(m.locale), backup.cards.length));
    } catch (error) {
      setMessage(error instanceof Error && error.message.includes("Nihongo") ? d.notBackup : d.unreadable);
    }
  };

  return (
    <Section
      id="donnees"
      title={d.title}
      intro={d.intro(storage)}
    >
      <p className="text-[15px]">{d.summary(cards.length, reviews.length, days)}</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={download} className="h-11 rounded-full border border-line bg-sheet px-4 text-sm font-semibold hover:border-indigo">
          {d.export}
        </button>
        <button type="button" onClick={() => fileRef.current?.click()} className="h-11 rounded-full border border-line bg-sheet px-4 text-sm font-semibold hover:border-indigo">
          {d.import}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void restore(file);
            e.target.value = "";
          }}
        />
        {confirmReset ? (
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={async () => {
                await resetAll();
                setConfirmReset(false);
                setMessage(d.erased);
              }}
              className="h-11 rounded-full bg-seal px-4 text-sm font-semibold text-white"
            >
              {d.confirmReset}
            </button>
            <button type="button" onClick={() => setConfirmReset(false)} className="h-11 px-3 text-sm font-medium text-muted">{m.common.cancel}</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmReset(true)} className="h-11 rounded-full px-4 text-sm font-semibold text-seal hover:bg-seal-soft">
            {d.reset}
          </button>
        )}
      </div>
      {message ? <p className="text-sm text-indigo-deep" role="status">{message}</p> : null}
    </Section>
  );
}

function CloudBackup() {
  const { settings } = useAppState();
  const cloud = settings.cloudBackup;
  const [providers, setProviders] = useState<CloudBackupProvider[]>([]);
  const [device, setDevice] = useState<"iCloud" | "Google Drive" | null>(null);
  const [connected, setConnected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [restore, setRestore] = useState<{ json: string; at: string } | null>(null);
  const m = useMessages();
  const c = m.settings.cloud;

  useEffect(() => {
    // Les services dépendent de l'appareil : lus après le premier affichage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProviders(availableProviders());
    setDevice(expectedCloud());
  }, []);
  const provider = providers.find((p) => p.id === cloud.provider) ?? providers[0] ?? null;
  useEffect(() => {
    if (!provider) return;
    let alive = true;
    void provider.ready().then((r) => alive && setConnected(r));
    return () => {
      alive = false;
    };
  }, [provider]);

  const save = (patch: Partial<typeof cloud>) => setSettings({ ...settings, cloudBackup: { ...cloud, ...patch } });

  const act = async (fn: () => Promise<void>) => {
    setBusy(true);
    setMessage(null);
    try {
      await fn();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : c.failed);
    } finally {
      setBusy(false);
    }
  };

  const connect = () =>
    act(async () => {
      const { account } = await provider!.connect();
      setConnected(true);
      save({ provider: provider!.id, account: account ?? cloud.account, enabled: true });
      setMessage(c.connectedMsg(account));
    });

  const fmtDate = (iso: string) => (iso ? new Date(iso).toLocaleString(m.locale, { dateStyle: "long", timeStyle: "short" }) : c.unknownDate);

  if (!provider) {
    return (
      <Section id="cloud" title={c.title} intro={c.introNone}>
        <div className="rounded-2xl border border-line bg-sheet px-5 py-4 text-[15px] leading-relaxed text-muted">
          <p>{c.unavailable(device)}</p>
          <p className="mt-2">{c.meanwhile}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="cloud"
      title={c.title}
      intro={c.intro(provider.name)}
    >
      {providers.length > 1 ? (
        <div role="radiogroup" aria-label={c.service} className="inline-flex w-fit gap-1 rounded-2xl border border-line bg-sheet p-1">
          {providers.map((p) => (
            <button key={p.id} type="button" role="radio" aria-checked={p.id === provider.id} onClick={() => save({ provider: p.id, last: undefined })}
              className={cn("rounded-xl px-4 py-2 text-sm font-medium", p.id === provider.id ? "bg-contrast text-on-contrast" : "text-muted hover:text-ink")}>
              {p.name}
            </button>
          ))}
        </div>
      ) : null}

      <Row
        title={provider.id === "gdrive" ? c.googleAccount : "iCloud"}
        text={connected ? (cloud.account ? c.connectedAs(cloud.account) : c.connected) : cloud.account ? c.reconnect(cloud.account) : c.notConnected}
      >
        {connected ? (
          provider.id === "gdrive" ? (
            <button type="button" disabled={busy} onClick={() => act(async () => {
              await provider.disconnect();
              setConnected(false);
              save({ enabled: false, account: undefined });
              setMessage(c.disconnected);
            })} className="h-10 rounded-full border border-line bg-paper px-4 text-sm font-semibold hover:border-seal">
              {c.disconnect}
            </button>
          ) : null
        ) : (
          <button type="button" disabled={busy} onClick={() => void connect()} className="h-10 rounded-full bg-indigo px-4 text-sm font-semibold text-on-indigo disabled:opacity-60">
            {provider.id === "gdrive" ? c.connectGoogle : c.enableICloud}
          </button>
        )}
      </Row>

      <Row title={c.daily} text={cloud.last ? c.last(new Date(`${cloud.last}T12:00:00`).toLocaleDateString(m.locale)) : c.none} htmlFor="cloud-on">
        <Switch id="cloud-on" checked={cloud.enabled} onChange={(v) => (v && !connected ? void connect() : save({ enabled: v }))} />
      </Row>

      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={busy || !connected} onClick={() => void act(async () => {
          const at = await backupNow(provider);
          setMessage(c.saved(provider.name, fmtDate(at)));
        })} className="h-11 rounded-full border border-line bg-sheet px-4 text-sm font-semibold hover:border-indigo disabled:opacity-50">
          {c.now}
        </button>
        <button type="button" disabled={busy || !connected} onClick={() => void act(async () => {
          const found = await provider.download();
          if (!found) {
            setMessage(c.notFound(provider.name));
            return;
          }
          parseBackup(found.json);
          setRestore(found);
        })} className="h-11 rounded-full border border-line bg-sheet px-4 text-sm font-semibold hover:border-indigo disabled:opacity-50">
          {c.restoreFrom(provider.name)}
        </button>
      </div>

      {restore ? (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-seal/50 bg-seal-soft px-5 py-4">
          <p className="flex-1 text-[15px]">{c.found(fmtDate(restore.at))}</p>
          <button type="button" onClick={() => void act(async () => {
            await replaceAll(parseBackup(restore.json));
            setRestore(null);
            setMessage(c.restored);
          })} className="h-10 rounded-full bg-seal px-4 text-sm font-semibold text-white">{m.common.restore}</button>
          <button type="button" onClick={() => setRestore(null)} className="h-10 px-3 text-sm font-medium text-muted">{m.common.cancel}</button>
        </div>
      ) : null}
      {message ? <p className="text-sm text-indigo-deep" role="status">{message}</p> : null}
    </Section>
  );
}

function PalettePicker({ label, palettes, value, earned, onPick, preview }: {
  label: string;
  palettes: Palette[];
  value: string;
  earned: number;
  onPick: (id: string) => void;
  preview: (p: Palette) => ReactNode;
}) {
  const lang = useLang();
  const a = useMessages().settings.appearance;
  return (
    <div>
      <p className="mb-2 font-medium">{label}</p>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {palettes.map((p) => {
          const open = isUnlocked(p, earned);
          const on = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={!open}
              onClick={() => onPick(p.id)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left transition-colors",
                on ? "border-indigo bg-indigo-soft" : "border-line bg-sheet hover:border-indigo/50",
                !open && "cursor-not-allowed opacity-50 hover:border-line",
              )}
            >
              <span className={cn("grid size-10 shrink-0 place-items-center", !open && "grayscale")}>{preview(p)}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold first-letter:uppercase">{p[lang]}</span>
                <span className="block text-xs text-muted">
                  <span lang="ja" className="font-kana">{p.jp} {p.kana}</span> · {p.romaji}
                </span>
                {!open ? <span className="block text-xs text-muted">{a.seals(p.seals)}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Offline() {
  const [state, setState] = useState<OfflineState | null>(null);
  useEffect(() => onOfflineState(setState), []);
  const o = useMessages().settings.offline;
  if (!state) return null;
  const text = !state.supported
    ? o.dev
    : state.ready
      ? o.ready(state.total ?? "")
      : state.progress !== null && state.total
        ? o.progress(Math.round((state.progress / state.total) * 100))
        : o.preparing;
  return (
    <Section id="hors-ligne" title={o.title} intro={o.intro}>
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-sheet px-5 py-4">
        <span aria-hidden="true" className={cn("size-3 shrink-0 rounded-full", state.ready ? "bg-emerald-500" : state.supported ? "bg-amber-400" : "bg-line")} />
        <p className="text-[15px]">{text}</p>
      </div>
    </Section>
  );
}
