export interface ModelOption {
  id: string;
  label: string;
  provider: "openai" | "anthropic" | "google";
  thinking?: boolean;
  fast?: boolean;
}

export const MODELS: ModelOption[] = [
  { id: "gpt-5", label: "GPT-5", provider: "openai", fast: true },
  { id: "gpt-5-mini", label: "GPT-5 Mini", provider: "openai", fast: true },
  { id: "o3", label: "o3 (Thinking)", provider: "openai", thinking: true },
  { id: "o4-mini", label: "o4-mini (Thinking)", provider: "openai", thinking: true, fast: true },
  { id: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "anthropic" },
  { id: "claude-3.7-sonnet", label: "Claude 3.7 Sonnet", provider: "anthropic", thinking: true },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "google", thinking: true },
];

export const PROVIDER_BADGE: Record<ModelOption["provider"], string> = {
  openai: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  anthropic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  google: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};
