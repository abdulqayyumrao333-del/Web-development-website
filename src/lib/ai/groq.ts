import Groq from "groq-sdk";

/** Central model config — change GROQ_MODEL in the environment rather than
 * editing this file or scattering model strings across the app. */
export const GROQ_MODEL = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";

const REQUEST_TIMEOUT_MS = 30_000;

export class GroqConfigError extends Error {}
export class GroqRequestError extends Error {}

export function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GroqConfigError("GROQ_API_KEY is not configured.");
  }
  return new Groq({ apiKey, timeout: REQUEST_TIMEOUT_MS });
}

/**
 * Plain-text completion — used for freeform generation (drafts, outlines
 * rendered as markdown, rewrites) where the output is prose, not JSON.
 */
export async function groqComplete({
  system,
  prompt,
  maxTokens = 2048,
  temperature = 0.7,
}: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const client = getGroqClient();

  let response;
  try {
    response = await client.chat.completions.create({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    });
  } catch (err) {
    throw new GroqRequestError(err instanceof Error ? err.message : "Groq request failed.");
  }

  const text = response.choices[0]?.message?.content;
  if (!text || !text.trim()) {
    throw new GroqRequestError("Groq returned an empty response.");
  }
  return text.trim();
}

/**
 * JSON-mode completion — used for structured outputs (ideas, SEO metadata,
 * outlines-as-data, titles). Returns the raw parsed JSON; callers MUST
 * validate the shape themselves (e.g. with zod) before trusting it — this
 * function only guarantees it's valid JSON, not that it matches the
 * expected schema.
 */
export async function groqCompleteJson({
  system,
  prompt,
  maxTokens = 1500,
  temperature = 0.6,
}: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<unknown> {
  const client = getGroqClient();

  let response;
  try {
    response = await client.chat.completions.create({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: `${system}\n\nRespond with valid JSON only — no prose, no markdown fences.` },
        { role: "user", content: prompt },
      ],
    });
  } catch (err) {
    throw new GroqRequestError(err instanceof Error ? err.message : "Groq request failed.");
  }

  const text = response.choices[0]?.message?.content;
  if (!text || !text.trim()) {
    throw new GroqRequestError("Groq returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new GroqRequestError("Groq returned malformed JSON.");
  }
}

/** Maps low-level Groq/config errors to safe, user-facing messages — never
 * leaks stack traces, API keys, or raw provider error internals. */
export function toFriendlyAiError(err: unknown): string {
  if (err instanceof GroqConfigError) {
    return "The AI assistant isn't configured yet — GROQ_API_KEY is missing on the server.";
  }
  if (err instanceof GroqRequestError) {
    if (/rate.?limit/i.test(err.message)) return "The AI service is rate-limited right now — try again in a moment.";
    if (/timeout/i.test(err.message)) return "The AI request timed out — try again, or shorten the input.";
    if (/model/i.test(err.message) && /not found|decommission|unavailable/i.test(err.message)) {
      return "The configured AI model is unavailable — check GROQ_MODEL in your environment.";
    }
    return "The AI assistant couldn't complete that request. Try again.";
  }
  return "Something went wrong with the AI assistant.";
}
