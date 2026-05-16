import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  PageContainer, PageSection, PageHeader, TabNav, SplitLayout,
} from "@/components/layout";
import {
  FileText, Save, User, Briefcase, GraduationCap, Code2, FolderGit2, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useForge, newId } from "@/lib/store";
import { CVSidebar } from "@/components/cv/cv-sidebar";
import { CVBuilder } from "@/components/cv/cv-builder";
import type { CVProfile, CVFocus } from "@/types/cv";
import { FOCUS_LABELS } from "@/types/cv";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [{ title: "CV Builder — Dev Studio" }],
  }),
  component: CVPage,
});

const BUILDER_TABS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "ats", label: "ATS Check", icon: Sparkles },
] as const;

type BuilderTab = typeof BUILDER_TABS[number]["id"];

function defaultCV(id: string): CVProfile {
  return {
    id,
    title: "My CV",
    focus: "frontend",
    personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "", title: "" },
    summary: "",
    experience: [],
    skills: { technical: [], soft: [], tools: [], languages: [] },
    education: [],
    projects: [],
    languages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function CVPage() {
  const { cvProfiles, upsertCVProfile, deleteCVProfile } = useForge();
  const [activeCVId, setActiveCVId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CVProfile | null>(null);
  const [activeTab, setActiveTab] = useState<BuilderTab>("personal");

  useEffect(() => {
    if (cvProfiles.length > 0 && !activeCVId) {
      setActiveCVId(cvProfiles[0].id);
    }
  }, [cvProfiles, activeCVId]);

  useEffect(() => {
    if (activeCVId) {
      const found = cvProfiles.find((cv) => cv.id === activeCVId);
      if (found) setDraft(found);
    }
  }, [activeCVId, cvProfiles]);

  const patch = <K extends keyof CVProfile>(key: K, value: CVProfile[K]) => {
    if (!draft) return;
    setDraft({ ...draft, [key]: value, updatedAt: Date.now() });
  };

  const handleNewCV = () => {
    const id = newId("cv");
    const cv = defaultCV(id);
    setActiveCVId(id);
    setDraft(cv);
    setActiveTab("personal");
  };

  const handleSave = async () => {
    if (!draft) return;
    await upsertCVProfile(draft);
    if (!cvProfiles.some((cv) => cv.id === draft.id)) {
      setActiveCVId(draft.id);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCVProfile(id);
    const remaining = cvProfiles.filter((cv) => cv.id !== id);
    if (remaining.length > 0) {
      setActiveCVId(remaining[0].id);
    } else {
      setActiveCVId(null);
      setDraft(null);
    }
  };

  return (
    <PageContainer>
      <PageSection>
        <PageHeader
          title="CV Builder"
          description="Create tailored CVs for Frontend, Backend, and Fullstack roles. Check ATS compatibility before applying."
          className="mb-4"
          actions={
            draft ? (
              <Button onClick={handleSave} size="sm" className="gap-2 shrink-0">
                <Save className="size-3.5" /> Save CV
              </Button>
            ) : undefined
          }
        />

        {/* CV-specific controls — only when a profile is selected */}
        {draft && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={draft.title}
              onChange={(e) => patch("title", e.target.value)}
              placeholder="CV title (e.g. Frontend Engineer CV)"
              className="flex-1 max-w-[260px] h-9 rounded-lg border border-input bg-muted/40 px-3 text-sm font-medium outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            <Select value={draft.focus} onValueChange={(v) => patch("focus", v as CVFocus)}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(FOCUS_LABELS) as CVFocus[]).map((f) => (
                  <SelectItem key={f} value={f}>{FOCUS_LABELS[f]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <TabNav
          tabs={BUILDER_TABS.map((t) => ({
            ...t,
            onClick: () => setActiveTab(t.id),
          }))}
          activeTab={activeTab}
        />
      </PageSection>

      <div className="flex-1 overflow-hidden pt-1">
        <SplitLayout
          sidebar={
            <CVSidebar
              cvProfiles={cvProfiles}
              activeCVId={activeCVId}
              onSelectCV={setActiveCVId}
              onNewCV={handleNewCV}
              onDeleteCV={handleDelete}
            />
          }
          sidebarWidth="lg:w-[260px]"
        >
          <div className="h-full overflow-hidden">
            {draft ? (
              <CVBuilder cv={draft} onUpdate={setDraft} activeTab={activeTab} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-4 p-8">
                <div className="size-14 rounded-full bg-muted/20 flex items-center justify-center">
                  <FileText className="size-6 opacity-40" />
                </div>
                <div>
                  <p className="text-sm font-medium">No CV selected</p>
                  <p className="text-xs mt-1 opacity-70">Create a new CV from the sidebar to get started</p>
                </div>
              </div>
            )}
          </div>
        </SplitLayout>
      </div>
    </PageContainer>
  );
}
