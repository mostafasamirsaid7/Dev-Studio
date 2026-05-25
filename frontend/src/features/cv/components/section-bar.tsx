import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SectionBar({
  label,
  score,
  feedback,
}: {
  label: string;
  score: number;
  feedback: string;
}) {
  const [open, setOpen] = useState(false);
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
        ? "bg-yellow-500"
        : score >= 40
          ? "bg-orange-500"
          : "bg-red-500";

  return (
    <div className="space-y-1">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 group">
        <span className="text-xs text-muted-foreground w-24 text-left shrink-0">{label}</span>
        <div className="flex-1 bg-muted/40 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-medium w-8 text-right">{score}</span>
        {open ? (
          <ChevronUp className="size-3 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-3 text-muted-foreground" />
        )}
      </button>
      {open && <p className="text-xs text-muted-foreground pl-[108px] pr-10">{feedback}</p>}
    </div>
  );
}
