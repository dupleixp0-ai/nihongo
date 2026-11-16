import type { FlameStatus } from "@/lib/streak-rules";
import { cn } from "@/lib/utils";

const OUTER = "M24 2c3 12 16 20 16 38 0 12-7.2 21-16 21S8 52 8 40c0-8 4-13 8-17 0 6 3 10 6 11-2-10 0-22 2-32Z";
const INNER = "M24 28c3 7 9.5 11 9.5 19.5 0 6.4-4.3 10.5-9.5 10.5s-9.5-4.1-9.5-10.5c0-4.2 2-7.4 4.2-9.4 0 3.2 1.8 5.3 3.2 5.6-1-5.4.2-11 2.1-15.7Z";
const CORE = "M24 43c1.8 3.3 4.5 5 4.5 8.6 0 2.9-2 4.9-4.5 4.9s-4.5-2-4.5-4.9c0-2.2 1.2-3.6 2.4-4.5.2 1.3.9 2.2 1.5 2.4-.4-2.2.2-4.5.6-6.5Z";

/** La flamme d'apprentissage, dessinée en SVG. */
export function FlameIcon({ status, className, title }: { status: FlameStatus; className?: string; title?: string }) {
  const lit = status === "allumee";
  const waiting = status === "en-attente";
  const waver = status === "vacille";
  const out = status === "eteinte" || status === "nouvelle";

  return (
    <svg viewBox="0 0 48 64" className={cn("overflow-visible", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {out ? (
        <g fill="none" stroke="var(--color-guide)" strokeWidth="2.2" strokeLinejoin="round">
          <path d={OUTER} strokeDasharray={status === "eteinte" ? "4 4" : undefined} />
          {status === "eteinte" ? (
            <path d="M24 -2c-3-4 3-6 0-11M30 -1c-2-3 2-5 0-8" strokeLinecap="round" opacity="0.6" />
          ) : null}
        </g>
      ) : (
        <g className={lit ? "flame-lit" : waver ? "flame-waver" : undefined} opacity={waiting ? 0.55 : 1}>
          <path d={OUTER} fill="var(--flame-outer)" />
          <path d={INNER} fill={waiting ? "var(--color-seal-soft)" : "var(--flame-inner)"} />
          {lit || waver ? <path d={CORE} fill="var(--flame-core)" /> : null}
        </g>
      )}
    </svg>
  );
}
