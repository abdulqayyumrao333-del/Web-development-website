# Blog AI Assistant — Configuration & Usage

## Important context: there was no Anthropic implementation to replace

Before building this feature, the codebase was searched for any Anthropic
usage. None was found in code — the only "Anthropic" references anywhere
are plain text content on the public Skills page, listing it as a
technology Abdul knows (accurate personal information, not something to
remove). The existing "Ask Abdul" chat assistant (`src/app/api/chat/route.ts`)
**already used Groq** (`groq-sdk`, `GROQ_API_KEY`, `llama-3.3-70b-versatile`)
before this sprint touched anything.

What this sprint actually did:
- Centralized the Groq client and model configuration into `src/lib/ai/groq.ts`
  so it's defined in exactly one place.
- Updated the existing Ask Abdul chat route to use that shared client/model
  instead of its own separate inline setup — its behavior (streaming
  responses, system prompt, everything) is unchanged.
- Built the new Blog AI Assistant described below, reusing that same
  centralized client.

## Required environment variables

```
GROQ_API_KEY=""    # already existed — required for any AI feature to work
GROQ_MODEL=""      # optional — defaults to llama-3.3-70b-versatile if unset
```

Get a key at [console.groq.com](https://console.groq.com). The key is only
ever read server-side (`src/lib/ai/groq.ts`) — it is never sent to the
browser, embedded in client bundles, or exposed via any API response.

## Changing the model

Set `GROQ_MODEL` in your environment (e.g. to a newer Groq-hosted model as
they become available) — no code changes needed. If unset, it falls back to
`llama-3.3-70b-versatile`. Every AI feature in this project (both Ask Abdul
and the Blog AI Assistant) reads this same value.

## What the Blog AI Assistant can do

Available from the "AI Assistant" button in the blog editor's toolbar:

| Tab | What it does |
|---|---|
| Ideas | Generates 5–10 article ideas from a topic (+ optional audience/keywords) |
| Outline | Generates an intro/H2/H3/conclusion/CTA structure for a title |
| Draft | Generates a full Markdown draft from a title (+ optional outline, tone, instructions) |
| Rewrite | Operates on your **current text selection** — Improve, Expand, Shorten, Summarize, or rewrite in a specific style |
| Titles & Excerpt | Generates title options and a concise excerpt from the current article |
| SEO | Suggests SEO title, meta description, focus keyword, secondary keywords, and slug |
| Links | Suggests internal links to your **actual existing published articles** |

## Nothing is ever applied automatically

Every single result requires an explicit action from you — Apply, Use,
Insert, or Replace. Generated content is always shown in a preview first.
Closing the dialog without clicking Apply/Use/Insert discards the
suggestion; nothing is saved, and no revision is created, until you save
the post yourself through the normal editor flow.

## How rewrite/selection actions work

Select text in the Content editor, then open the AI Assistant — the
selection is captured at that moment. If you didn't have anything selected,
the Rewrite tab tells you so and does nothing rather than guessing what you
meant.

## Internal linking safety

The AI is given a list of your actual published articles (slug, title,
category, tags — nothing else) and told explicitly to only reference posts
from that list. On top of that, every suggestion is filtered server-side
against the real list before being shown to you — a hallucinated slug that
doesn't exist can never appear as a clickable suggestion.

## Grounding / anti-hallucination

Every prompt in this feature instructs the model not to fabricate
statistics, citations, client names, testimonials, project metrics, awards,
or any of Abdul's personal/professional history. For factual claims that
would need verification, the model is told to flag that rather than
present them as confirmed. This is enforced through the prompt design
(`src/lib/ai/prompts/`) — like any LLM, it isn't a hard guarantee, so
generated content should still be reviewed before publishing, same as any
other AI-assisted writing.

## Rate limiting

The Blog AI Assistant shares the project's existing Upstash-backed rate
limiter (`src/lib/rate-limit.ts`), with its own bucket: 20 requests per 5
minutes. If Upstash isn't configured, rate limiting is skipped (fails
open) rather than blocking the feature — the same fallback behavior the
existing view-tracking rate limiter already used.

## Request size limits

- Selected text for Rewrite/Improve/Expand/Shorten: 6,000 characters
- Article content sent for SEO/Titles/Excerpt/Links: 12,000 characters
  (SEO specifically only needs the first 6,000 — sending less keeps
  requests fast and cheap without losing meaningful signal)
- Additional instructions: 1,000 characters

Going over a limit shows a clear message telling you to shorten your
selection — content is never silently truncated.

## What happens if Groq is unavailable

Every AI action fails independently with a clear error message. Writing,
editing, saving, previewing, publishing, and scheduling all continue to
work completely normally — the AI Assistant is fully decoupled from the
rest of the editor.

## Privacy: what gets sent to Groq

Only the minimum needed for each specific action — e.g. Rewrite sends your
selected text, not the whole article; SEO suggestions send the first 6,000
characters of content, not analytics data, not database internals, not any
other admin information. No passwords, auth secrets, or API keys are ever
included in a prompt.

## Known limitations

- No permanent history of AI generations is kept (by design, per this
  sprint's scope) — closing the dialog loses the shown result. Copy or
  Apply it before closing if you want to keep it.
- Structured outputs (JSON mode) are validated against a strict schema
  before being trusted; if the model returns something malformed, you'll
  see a graceful error rather than corrupted content — but you may
  occasionally need to click Regenerate.
- This is Groq/LLM-generated content — like any AI writing tool, it can be
  wrong, and factual claims should be checked before publishing.
