import { ChevronLeft, ChevronRight, CalendarDays, Plus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlannerTask } from "@/types/planner";

interface PlannerSidebarProps {
  selectedDate: string;
  weekStart: Date;
  tasks: PlannerTask[];
  onSelectDate: (date: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onAddTask: () => void;
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function PlannerSidebar({
  selectedDate,
  weekStart,
  tasks,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  onAddTask,
}: PlannerSidebarProps) {
  const today = toDateStr(new Date());
  const weekEnd = addDays(weekStart, 6);
  const weekLabel = `${MONTH_NAMES[weekStart.getMonth()]} ${weekStart.getDate()} – ${
    weekStart.getMonth() !== weekEnd.getMonth() ? MONTH_NAMES[weekEnd.getMonth()] + " " : ""
  }${weekEnd.getDate()}`;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(weekStart, i);
    const dateStr = toDateStr(d);
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const done = dayTasks.filter((t) => t.status === "done").length;
    const inProg = dayTasks.filter((t) => t.status === "in-progress").length;
    return { date: d, dateStr, dayTasks, done, inProg, name: DAY_NAMES[i] };
  });

  const weekTotal = weekDays.reduce((a, d) => a + d.dayTasks.length, 0);
  const weekDone = weekDays.reduce((a, d) => a + d.done, 0);
  const weekPct = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;

  return (
    <div className="flex flex-col h-full select-none">
      {/* Month + nav */}
      <div className="shrink-0 px-3 pt-3.5 pb-2">
        <div className="flex items-center gap-1 mb-1.5">
          <button
            onClick={onPrevWeek}
            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={onToday}
            className="flex-1 text-[11px] font-semibold text-center text-foreground hover:text-primary transition-colors py-1"
          >
            {weekLabel}, {weekEnd.getFullYear()}
          </button>
          <button
            onClick={onNextWeek}
            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <button
          onClick={onToday}
          className="w-full text-[10px] font-medium text-primary/70 hover:text-primary transition-colors py-1 hover:bg-primary/5 rounded-lg"
        >
          Jump to today →
        </button>
      </div>

      <div className="mx-3 h-px bg-border/50 shrink-0" />

      {/* Day list */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-thin">
        {weekDays.map(({ date, dateStr, dayTasks, done, inProg, name }) => {
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const total = dayTasks.length;
          const allDone = total > 0 && done === total;

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all text-left",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isToday
                  ? "bg-primary/10 text-primary"
                  : isWeekend
                  ? "text-muted-foreground/60 hover:bg-muted/40 hover:text-muted-foreground"
                  : "text-foreground hover:bg-muted/60"
              )}
            >
              {/* Day number circle */}
              <div className={cn(
                "size-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                isSelected ? "bg-white/20" : isToday ? "bg-primary text-primary-foreground" : "bg-muted/50"
              )}>
                {date.getDate()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs font-semibold",
                  isSelected ? "text-primary-foreground" : ""
                )}>{name}</p>
                <p className={cn(
                  "text-[10px]",
                  isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {total > 0 ? `${done}/${total} done` : "No tasks"}
                  {inProg > 0 && ` · ${inProg} active`}
                </p>
              </div>

              {/* Mini progress dots */}
              {total > 0 && (
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: Math.min(total, 5) }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full",
                        i < done
                          ? isSelected ? "bg-white/80" : "bg-primary"
                          : isSelected ? "bg-white/30" : "bg-border"
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mx-3 h-px bg-border/50 shrink-0" />

      {/* Week stats */}
      <div className="shrink-0 px-3 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3 text-muted-foreground" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Week
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold text-foreground">
            {weekPct}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${weekPct}%` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          {weekDone} of {weekTotal} tasks complete
        </p>
      </div>

      {/* Add task CTA */}
      <div className="px-2.5 pb-2.5 shrink-0">
        <button
          onClick={onAddTask}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] text-xs font-semibold transition-all shadow-sm"
        >
          <Plus className="size-3.5" />
          Add Task
        </button>
      </div>
    </div>
  );
}
