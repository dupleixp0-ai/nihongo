"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFlame } from "@/lib/streak";
import { useNow } from "@/components/srs/use-now";
import { cn } from "@/lib/utils";
import { FlameIcon } from "./flame";
import { useMessages } from "@/i18n/use-lang";


/** La flamme dans la barre du haut : nombre de jours d'affilée. */
export function FlamePill() {
  const now = useNow();
  const flame = useFlame(now);
  const pathname = usePathname();
  const m = useMessages();
  const shown = flame.status === "vacille" ? flame.atStake : flame.count;
  return (
    <Link
      href="/flamme"
      aria-label={flame.ready ? `${m.nav.flameStatus[flame.status]}, ${m.common.days(shown)}` : m.nav.flame}
      aria-current={pathname === "/flamme" ? "page" : undefined}
      className={cn(
        "flex h-10 items-center gap-1.5 rounded-full border px-3 text-[15px] font-semibold tabular-nums transition-colors",
        pathname === "/flamme" ? "border-seal bg-seal-soft" : "border-line bg-sheet hover:border-seal",
        flame.status === "vacille" && "border-seal/60",
      )}
    >
      <FlameIcon status={flame.ready ? flame.status : "nouvelle"} className="h-5 w-4" />
      <span className={cn(flame.status === "allumee" ? "text-seal" : "text-muted")}>{flame.ready ? shown : "·"}</span>
    </Link>
  );
}
