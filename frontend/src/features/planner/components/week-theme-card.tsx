import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeekTheme } from "@/types/planner";
import { WEEK_THEMES } from "@/data/planner/planner";

interface WeekThemeCardProps {
  currentTheme: WeekTheme;
}

export function WeekThemeCard({ currentTheme }: WeekThemeCardProps) {
  const [showThemes, setShowThemes] = useState(false);

  return (
    <div className="px-2.5 py-1.5 shrink-0">
      <button
        onClick={() => setShowThemes((v) => !v)}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all",
          currentTheme.color,
        )}
      >
        <currentTheme.icon className="size-5 shrink-0" />
        <div className="flex-1 text-left min-w-0">
          <p className="text-[11px] font-bold leading-tight">{currentTheme.title}</p>
          <p className="text-[10px] opacity-70 leading-tight mt-0.5">{currentTheme.subtitle}</p>
        </div>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 opacity-60 transition-transform",
            showThemes && "rotate-180",
          )}
        />
      </button>

      <div className="flex flex-wrap gap-1 px-1 mt-1.5">
        {currentTheme.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "text-[9px] font-semibold px-1.5 py-0.5 rounded-md border opacity-70",
              currentTheme.color,
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {showThemes && (
        <div className="mt-2 space-y-1">
          {WEEK_THEMES.map((theme) => (
            <div
              key={theme.week}
              className={cn(
                "flex items-center gap-2 px-2.5 py-2 rounded-xl border text-[11px]",
                theme.week === currentTheme.week
                  ? cn(theme.color, "font-bold")
                  : "border-border/40 text-muted-foreground",
              )}
            >
              <theme.icon className="size-4 shrink-0" />
              <p className="font-semibold leading-tight">
                W{theme.week}: {theme.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
