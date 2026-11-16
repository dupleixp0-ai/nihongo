type PracticeSquareProps = {
  character: string;
  label: string;
};

/**
 * Carré d'entraînement inspiré du papier quadrillé japonais (genkō yōshi) :
 * les pointillés en croix servent de repères pour centrer et proportionner le caractère.
 */
export function PracticeSquare({ character, label }: PracticeSquareProps) {
  const chars = [...character];
  return (
    <div className="@container relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line bg-sheet shadow-[0_30px_60px_-34px_rgba(23,35,58,0.4)]">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-guide"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Combinaison (yōon) : le grand kana, puis le petit ゃ ゅ ょ plus bas et plus petit. */}
      {chars.length === 2 ? (
        <p
          lang="ja"
          role="img"
          aria-label={label}
          className="font-kana absolute inset-0 flex items-center justify-center gap-[2cqw] leading-none text-brush"
        >
          <span className="-translate-y-[4cqw] text-[46cqw]">{chars[0]}</span>
          <span className="translate-y-[14cqw] text-[28cqw]">{chars[1]}</span>
        </p>
      ) : (
        <p
          lang="ja"
          role="img"
          aria-label={label}
          className="font-kana absolute inset-0 flex items-center justify-center text-[68cqw] leading-none text-brush"
        >
          {character}
        </p>
      )}
    </div>
  );
}
