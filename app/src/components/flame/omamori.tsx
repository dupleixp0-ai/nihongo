import { cn } from "@/lib/utils";

/** Un omamori (お守り, amulette) : protège la flamme pendant un jour manqué. */
export function OmamoriIcon({ className, empty = false }: { className?: string; empty?: boolean }) {
  return (
    <svg viewBox="0 0 40 56" className={cn("overflow-visible", className)} aria-hidden="true">
      <path d="M14 10c0-6 12-6 12 0" fill="none" stroke={empty ? "var(--color-line)" : "var(--color-indigo)"} strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M8 16c0-3 2.5-5 5.5-5h13c3 0 5.5 2 5.5 5v27c0 6-5.5 10-12 10S8 49 8 43Z"
        fill={empty ? "none" : "var(--color-seal)"}
        stroke={empty ? "var(--color-line)" : "none"}
        strokeWidth="2"
        strokeDasharray={empty ? "4 3" : undefined}
      />
      {empty ? null : (
        <>
          <path d="M8 21h24" stroke="#f3c26b" strokeWidth="2" />
          <text x="20" y="40" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="var(--font-kana)">守</text>
        </>
      )}
    </svg>
  );
}
