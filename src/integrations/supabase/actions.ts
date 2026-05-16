import { supabase } from "./client";

type LocalRecord = Record<string, unknown>;

const emptyList = async (): Promise<LocalRecord[]> => [];
const passthrough = async <T extends LocalRecord>(item: T): Promise<T> => item;
const passthroughList = async <T extends LocalRecord>(items: T[]): Promise<T[]> => items;
const noop = async (..._args: unknown[]): Promise<void> => undefined;

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateProfile(profile: {
  display_name?: string | null;
  avatar_url?: string | null;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const getPrompts = emptyList;
export const upsertPrompt = passthrough;
export const upsertPrompts = passthroughList;
export const deletePrompt = noop;

export const getAgents = emptyList;
export const upsertAgent = passthrough;
export const upsertAgents = passthroughList;
export const deleteAgent = noop;

export const getComponents = emptyList;
export const upsertComponent = passthrough;
export const upsertComponents = passthroughList;
export const deleteComponent = noop;

export const getSnippets = emptyList;
export const upsertSnippet = passthrough;
export const upsertSnippets = passthroughList;
export const deleteSnippet = noop;

export const getTemplates = emptyList;
export const upsertTemplate = passthrough;
export const upsertTemplates = passthroughList;
export const deleteTemplate = noop;

export const getConnectors = emptyList;
export const upsertConnector = passthrough;
export const deleteConnector = noop;

export const getSocialDrafts = emptyList;
export const upsertSocialDraft = passthrough;
export const deleteSocialDraft = noop;

export const getMailTemplates = emptyList;
export const upsertMailTemplate = passthrough;
export const deleteMailTemplate = noop;

export const getInterviewQuestions = emptyList;
export const upsertInterviewQuestion = passthrough;
export const upsertInterviewQuestions = passthroughList;
export const deleteInterviewQuestion = noop;

export const getUserProgress = emptyList;
export async function toggleProgress(..._args: unknown[]) {
  return undefined;
}