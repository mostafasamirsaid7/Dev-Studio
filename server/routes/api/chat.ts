import { Router } from "express";
import OpenAI from "openai";

const router = Router();

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

router.post("/", async (req, res) => {
  try {
    const { prompt, systemPrompt, config } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }

    const response = await getOpenAI().chat.completions.create({
      model: config?.model || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt || "You are an expert AI coding assistant." },
        { role: "user", content: prompt },
      ],
      temperature: config?.temperature ?? 0.7,
      max_completion_tokens: config?.maxTokens,
    });

    const reply = response.choices[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
