"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getNotifier, reminderDue, reminderMessage } from "@/lib/reminders";
import { getState, setStreak, useAppState } from "@/lib/store";
import { computeFlame, dayKey } from "@/lib/streak-rules";
import { onGoalReached, settleNow, type Flame } from "@/lib/streak";
import { backupNow, backupPending, currentProvider, onBackupPendingChange, runDailyBackup } from "@/lib/cloud";
import { FlameIcon } from "./flame";
import { useMessages } from "@/i18n/use-lang";

/** Vérifie chaque minute s'il faut envoyer le rappel du jour (tant que l'appli est ouverte). */
export function ReminderWatcher() {
  const { ready } = useAppState();
  useEffect(() => {
    if (!ready) return;
    const check = () => {
      settleNow();
      void runDailyBackup();
      const { settings, streak } = getState();
      const now = Date.now();
      const today = dayKey(now);
      if (!settings.reminder.enabled || streak.lastReminder === today || !reminderDue(settings.reminder.time, now)) return;
      const message = reminderMessage(computeFlame(streak, today), streak.days[today]?.points ?? 0, settings.dailyGoal);
      if (!message) return;
      void getNotifier().show(message.title, message.body).then((shown) => {
        if (shown) setStreak({ ...getState().streak, lastReminder: today });
      });
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, [ready]);
  return null;
}

/** Petite annonce quand l'objectif du jour est atteint. */
export function GoalToast() {
  const [flame, setFlame] = useState<Flame | null>(null);
  const e = useMessages().events;
  useEffect(() => onGoalReached(setFlame), []);
  useEffect(() => {
    if (!flame) return;
    const id = window.setTimeout(() => setFlame(null), 5000);
    return () => window.clearTimeout(id);
  }, [flame]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:bottom-6">
      <AnimatePresence>
        {flame ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex items-center gap-4 rounded-2xl bg-contrast py-3 pl-4 pr-5 text-on-contrast shadow-[0_24px_50px_-20px_rgba(23,35,58,0.8)]"
          >
            <FlameIcon status="allumee" className="h-10 w-8" />
            <div>
              <p className="font-semibold">
                {e.goalToast(flame.count)}
              </p>
              <p className="text-sm text-on-contrast/70">
                {flame.count === flame.best && flame.count > 1 ? e.record : ""}
                <Link href="/flamme" className="underline underline-offset-2">{e.seeFlame}</Link>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Navigateur : la connexion Google a expiré, la sauvegarde du jour attend un clic. */
export function BackupPrompt() {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const e = useMessages().events;
  useEffect(() => onBackupPendingChange(() => setPending(backupPending())), []);
  if (!pending && state !== "done") return null;

  const run = async () => {
    const provider = currentProvider();
    if (!provider) return;
    setState("busy");
    try {
      await provider.connect();
      await backupNow(provider);
      setState("done");
      window.setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
    }
  };

  return (
    <div className="fixed inset-x-0 top-20 z-40 flex justify-center px-4">
      <div role="status" className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-sheet px-4 py-3 shadow-[0_18px_40px_-24px_rgba(23,35,58,0.7)]">
        <span className="text-[15px]">
          {state === "done" ? e.backupDone : state === "error" ? e.backupError : e.backupReconnect}
        </span>
        {state !== "done" ? (
          <>
            <button type="button" disabled={state === "busy"} onClick={() => void run()} className="rounded-full bg-indigo px-4 py-2 text-sm font-semibold text-on-indigo disabled:opacity-60">
              {e.backup}
            </button>
            <button type="button" onClick={() => setPending(false)} className="text-sm font-medium text-muted hover:text-ink">{e.later}</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
