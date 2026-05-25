import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlannerTask } from "@/types/planner";
import { DAY_NAMES, MONTH_NAMES } from "@/constants";
import { toDateStr, addDays } from "@/lib/utils/planner";

interface WeekCalendarProps {
  weekStart: Date;
  selectedDate: string;
  tasks: PlannerTask[];
  onSelectDate: (date: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export function WeekCalendar({
  weekStart,
  selectedDate,
  tasks,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToday,
}: WeekCalendarProps) {
  const today = toDateStr(new Date());
  const weekEnd = addDays(weekStart, 6);

  const weekLabel = `${MONTH_NAMES[weekStart.getMonth()]} ${weekStart.getDate()} – ${
    weekStart.getMonth() !== weekEnd.getMonth() ? MONTH_NAMES[weekEnd.getMonth()] + " " : ""
  }${weekEnd.getDate()}`;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(weekStart, i);
    const str = toDateStr(d);
    const dayTasks = tasks.filter((t) => t.date === str);
    return {
      str,
      dayName: DAY_NAMES[i],
      dayNum: d.getDate(),
      total: dayTasks.length,
      done: dayTasks.filter((t) => t.status === "done").length,
      isToday: str === today,
      isSelected: str === selectedDate,
      isWeekend: i === 0 || i === 1,
    };
  });

  return (
    <div className="px-2.5 pt-2 pb-1 shrink-0">
      <div className="flex items-center gap-1.5 mb-2.5">
        <button
          onClick={onToday}
          className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          Today
        </button>
        <span className="flex-1 text-center text-[11px] font-semibold text-foreground/70">
          {weekLabel}
        </span>
        <div className="flex gap-0.5">
          <button
            onClick={onPrevWeek}
            className="size-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={onNextWeek}
            className="size-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {weekDays.map((d) => (
          <button
            key={d.str}
            onClick={() => onSelectDate(d.str)}
            className={cn(
              "flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-all text-center",
              d.isSelected
                ? "bg-primary text-primary-foreground shadow-sm"
                : d.isToday
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : d.isWeekend
                    ? "text-muted-foreground/60 hover:bg-muted/60"
                    : "text-foreground hover:bg-muted/60",
            )}
          >
            <span
              className={cn(
                "text-[9px] font-medium uppercase tracking-wide",
                d.isSelected ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {d.dayName}
            </span>
            <span className="text-[13px] font-bold leading-none">{d.dayNum}</span>
            {d.total > 0 && (
              <span
                className={cn(
                  "size-1.5 rounded-full mt-0.5",
                  d.done === d.total
                    ? d.isSelected
                      ? "bg-primary-foreground/60"
                      : "bg-emerald-500"
                    : d.isSelected
                      ? "bg-primary-foreground/40"
                      : "bg-muted-foreground/40",
                )}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
