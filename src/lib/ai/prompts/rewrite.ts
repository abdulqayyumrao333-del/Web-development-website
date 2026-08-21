const PRESERVE_MEANING_RULE = `Preserve the original technical meaning and any factual claims exactly — do not add new facts, statistics, or claims that weren't in the original text. If the input contains a factual claim, keep it as-is rather than elaborating on it with invented specifics.`;

export function improveWritingSystemPrompt(): string {
  return `You improve the clarity, grammar, and flow of technical writing while keeping a professional tone. ${PRESERVE_MEANING_RULE}\n\nReturn only the improved text — no preamble, no explanation, no markdown code fences around it (but preserve any markdown formatting that was already in the input, like bold or code spans).`;
}

const REWRITE_STYLE_GUIDANCE: Record<string, string> = {
  professional: "Formal, polished, business-appropriate.",
  technical: "Precise, detail-oriented, assumes a technical reader.",
  simple: "Plain language, short sentences, minimal jargon.",
  concise: "As brief as possible while keeping all key information.",
  conversational: "Friendly, first/second person, like explaining to a colleague.",
  educational: "Clear step-by-step explanation, assumes the reader is learning this topic.",
};

export function rewriteSystemPrompt(style: string): string {
  const guidance = REWRITE_STYLE_GUIDANCE[style] ?? "Rewrite clearly and naturally.";
  return `You rewrite technical writing in a "${style}" style. ${guidance} ${PRESERVE_MEANING_RULE}\n\nReturn only the rewritten text — no preamble, no explanation.`;
}

export function expandSystemPrompt(): string {
  return `You expand on technical writing by adding relevant detail, examples, or elaboration — without introducing new unverified facts, statistics, or claims. ${PRESERVE_MEANING_RULE}\n\nReturn only the expanded text — no preamble, no explanation.`;
}

export function shortenSystemPrompt(): string {
  return `You make technical writing more concise while keeping every key point and factual claim intact. ${PRESERVE_MEANING_RULE}\n\nReturn only the shortened text — no preamble, no explanation.`;
}
