import { useState } from "react";
import { Dumbbell, Utensils, BookOpen, Briefcase, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { usePlannerPresets } from "@/hooks/use-planner-presets";
import { INNER_TABS } from "@/data/planner/activities";
import type { ActivitySuggestion } from "@/data/planner/activities";
import { ActivityPanel } from "./components/activity-panel";
import { PrayerPanel } from "./components/prayer-panel";
import { getPrayerSuggestions, ICON_MAP } from "./utils/suggestions";
import type { InnerTab } from "@/data/planner/activities";

export function ActivitiesTab() {
  const [innerTab, setInnerTab] = useState<InnerTab>("prayer");
  const { prayers } = usePrayerTimes();
  const { data, loading } = usePlannerPresets();

  const suggestions = getPrayerSuggestions(prayers, data?.suggestions.prayerTemplates);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sportsPresets = data?.presets.sports || [];
  const carePresets = data?.presets.care || [];
  const foodPresets = data?.presets.food || [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 px-4 sm:px-5 pt-3.5 pb-0 border-b border-border/50">
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-3">
          {INNER_TABS.map((t) => {
            const Icon = t.icon;
            const active = innerTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setInnerTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0",
                  active
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                )}
              >
                <Icon className={cn("size-3.5", active && t.color)} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {innerTab === "prayer" && <PrayerPanel />}

        {innerTab === "sports" && (
          <ActivityPanel
            storeKey="sports"
            icon={Dumbbell}
            title="Training & Sports"
            color="text-blue-600"
            bgColor="bg-blue-500/5"
            borderColor="border-blue-500/20"
            suggestions={suggestions.sports}
            presets={sportsPresets}
          />
        )}

        {innerTab === "care" && (
          <ActivityPanel
            storeKey="care"
            icon={Utensils}
            title="Self-Care & Hygiene"
            color="text-rose-600"
            bgColor="bg-rose-500/5"
            borderColor="border-rose-500/20"
            suggestions={suggestions.care}
            presets={carePresets}
          />
        )}

        {innerTab === "food" && (
          <ActivityPanel
            storeKey="food"
            icon={Utensils}
            title="Food & Nutrition"
            color="text-amber-600"
            bgColor="bg-amber-500/5"
            borderColor="border-amber-500/20"
            suggestions={suggestions.food}
            presets={foodPresets}
          />
        )}
      </div>
    </div>
  );
}

export function WorkingTab() {
  const { data, loading } = usePlannerPresets();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const presets = data?.presets.working || [];
  const suggestions: ActivitySuggestion[] = (data?.suggestions.working || []).map((s: any) => ({
    Icon: ICON_MAP[s.iconName] || Briefcase,
    label: s.label,
    bestTime: s.bestTime,
    reason: s.reason,
  }));

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <ActivityPanel
        storeKey="working"
        icon={Briefcase}
        title="Working Sessions"
        color="text-violet-600"
        bgColor="bg-violet-500/5"
        borderColor="border-violet-500/20"
        suggestions={suggestions}
        presets={presets}
      />
    </div>
  );
}

export function LearningTab() {
  const { data, loading } = usePlannerPresets();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const presets = data?.presets.learning || [];
  const suggestions: ActivitySuggestion[] = (data?.suggestions.learning || []).map((s: any) => ({
    Icon: ICON_MAP[s.iconName] || BookOpen,
    label: s.label,
    bestTime: s.bestTime,
    reason: s.reason,
  }));

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <ActivityPanel
        storeKey="learning"
        icon={BookOpen}
        title="Learning & Study"
        color="text-emerald-600"
        bgColor="bg-emerald-500/5"
        borderColor="border-emerald-500/20"
        suggestions={suggestions}
        presets={presets}
      />
    </div>
  );
}
