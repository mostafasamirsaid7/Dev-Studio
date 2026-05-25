import { Bookmark, ExternalLink, Loader2 } from "lucide-react";
import { SOURCE_BADGE } from "@/data/jobs/jobs";
import type { ScrapedJob } from "@/types/jobs";

export const FREELANCE_SOURCES = new Set(["mostaql", "khamsat"]);

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

interface JobCardProps {
  job: ScrapedJob;
  savingId: string | null;
  savingOfferId: string | null;
  hasOfferSave: boolean;
  onSave: (job: ScrapedJob) => void;
  onSaveAsOffer: (job: ScrapedJob) => void;
}

export function JobCard({
  job,
  savingId,
  savingOfferId,
  hasOfferSave,
  onSave,
  onSaveAsOffer,
}: JobCardProps) {
  const isFreelance = FREELANCE_SOURCES.has(job.source);

  return (
    <div className="rounded-lg border border-border bg-card p-3.5 hover:border-ring/30 transition-colors">
      <div className="flex items-start gap-3">
        {job.logo && (
          <img
            src={job.logo}
            alt={job.company}
            className="size-8 rounded-md object-contain bg-muted border border-border shrink-0"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug line-clamp-1">{job.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {job.company}
                {job.company && job.location ? " · " : ""}
                {job.location}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${SOURCE_BADGE[job.source] ?? "bg-muted text-muted-foreground"}`}
              >
                {job.source}
              </span>
              <span className="text-[10px] text-muted-foreground">{timeAgo(job.postedAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 flex-1">
                {job.tags.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            {job.salary && (
              <span className="text-[11px] text-green-400 font-medium whitespace-nowrap">
                {job.salary}
              </span>
            )}
            <div className="flex items-center gap-1 ml-auto shrink-0">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="size-6 grid place-items-center rounded border border-border hover:bg-sidebar-accent/40 text-muted-foreground hover:text-foreground transition-colors"
                title="Open listing"
              >
                <ExternalLink className="size-3" />
              </a>
              {isFreelance && hasOfferSave ? (
                <button
                  onClick={() => onSaveAsOffer(job)}
                  disabled={savingOfferId === job.id}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded transition-colors disabled:opacity-50"
                  title="Track this project as a freelance offer"
                >
                  {savingOfferId === job.id ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Bookmark className="size-3" />
                  )}
                  Add Offer
                </button>
              ) : (
                <button
                  onClick={() => onSave(job)}
                  disabled={savingId === job.id}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors disabled:opacity-50"
                >
                  {savingId === job.id ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Bookmark className="size-3" />
                  )}
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
