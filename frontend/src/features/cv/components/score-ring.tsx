export function ScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : score >= 40 ? "#f97316" : "#ef4444";

  return (
    <div className="relative size-24 flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle
          cx="48"
          cy="48"
          r={r}
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-muted/30"
        />
        <circle
          cx="48"
          cy="48"
          r={r}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">
          / 100
        </span>
      </div>
    </div>
  );
}
