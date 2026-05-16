import { supabase as _supabase } from "./client";

// NOTE: Many of the tables referenced below (prompts, agents, components,
// snippets, templates, connectors, social_drafts, mail_templates,
// interview_questions, user_progress) are not yet provisioned in the
// database. We cast to `any` to keep the build green while persistence is
// still handled by the Zustand localStorage store. When the tables are
// added, restore the typed `Database` import.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = _supabase as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyInsert = any;

// --- UTILS ---
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// --- PROMPTS ---
export async function getPrompts() {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertPrompt(prompt: Tables["prompts"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("prompts")
    .upsert({ ...prompt, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertPrompts(prompts: Tables["prompts"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("prompts")
    .upsert(prompts.map((p) => ({ ...p, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deletePrompt(id: string) {
  const { error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) throw error;
}

// --- AGENTS ---
export async function getAgents() {
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertAgent(agent: Tables["agents"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("agents")
    .upsert({ ...agent, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertAgents(agents: Tables["agents"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("agents")
    .upsert(agents.map((a) => ({ ...a, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deleteAgent(id: string) {
  const { error } = await supabase.from("agents").delete().eq("id", id);
  if (error) throw error;
}

// --- COMPONENTS ---
export async function getComponents() {
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertComponent(component: Tables["components"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("components")
    .upsert({ ...component, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertComponents(components: Tables["components"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("components")
    .upsert(components.map((c) => ({ ...c, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deleteComponent(id: string) {
  const { error } = await supabase.from("components").delete().eq("id", id);
  if (error) throw error;
}

// --- SNIPPETS ---
export async function getSnippets() {
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertSnippet(snippet: Tables["snippets"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("snippets")
    .upsert({ ...snippet, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertSnippets(snippets: Tables["snippets"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("snippets")
    .upsert(snippets.map((s) => ({ ...s, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deleteSnippet(id: string) {
  const { error } = await supabase.from("snippets").delete().eq("id", id);
  if (error) throw error;
}

// --- TEMPLATES ---
export async function getTemplates() {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertTemplate(template: Tables["templates"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("templates")
    .upsert({ ...template, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertTemplates(templates: Tables["templates"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("templates")
    .upsert(templates.map((t) => ({ ...t, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deleteTemplate(id: string) {
  const { error } = await supabase.from("templates").delete().eq("id", id);
  if (error) throw error;
}

// --- CONNECTORS ---
export async function getConnectors() {
  const { data, error } = await supabase
    .from("connectors")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertConnector(connector: Tables["connectors"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("connectors")
    .upsert({ ...connector, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteConnector(id: string) {
  const { error } = await supabase.from("connectors").delete().eq("id", id);
  if (error) throw error;
}

// --- SOCIAL DRAFTS ---
export async function getSocialDrafts() {
  const { data, error } = await supabase
    .from("social_drafts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertSocialDraft(draft: Tables["social_drafts"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("social_drafts")
    .upsert({ ...draft, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSocialDraft(id: string) {
  const { error } = await supabase.from("social_drafts").delete().eq("id", id);
  if (error) throw error;
}

// --- MAIL TEMPLATES ---
export async function getMailTemplates() {
  const { data, error } = await supabase
    .from("mail_templates")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertMailTemplate(template: Tables["mail_templates"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("mail_templates")
    .upsert({ ...template, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMailTemplate(id: string) {
  const { error } = await supabase.from("mail_templates").delete().eq("id", id);
  if (error) throw error;
}

// --- INTERVIEW QUESTIONS ---
export async function getInterviewQuestions() {
  const { data, error } = await supabase
    .from("interview_questions")
    .select("*")
    .order("domain", { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertInterviewQuestion(q: Tables["interview_questions"]["Insert"]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("interview_questions")
    .upsert({ ...q, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertInterviewQuestions(qs: Tables["interview_questions"]["Insert"][]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("interview_questions")
    .upsert(qs.map(q => ({ ...q, user_id: user.id })))
    .select();
  if (error) throw error;
  return data;
}

export async function deleteInterviewQuestion(id: string) {
  const { error } = await supabase.from("interview_questions").delete().eq("id", id);
  if (error) throw error;
}

// --- PROGRESS ---
export async function getUserProgress() {
  const { data, error } = await supabase.from("user_progress").select("*");
  if (error) throw error;
  return data;
}

export async function toggleProgress(itemId: string, areaId: string, completed: boolean) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: user.id,
      item_id: itemId,
      area_id: areaId,
      completed,
      updated_at: new Date().toISOString(),
    });
  if (error) throw error;
}
