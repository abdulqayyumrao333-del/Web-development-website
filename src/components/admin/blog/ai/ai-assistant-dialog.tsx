"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2, Copy, RotateCcw, Check, Link2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  aiGenerateIdeas,
  aiGenerateOutline,
  aiGenerateDraft,
  aiImproveWriting,
  aiRewriteText,
  aiExpandText,
  aiShortenText,
  aiSummarizeText,
  aiGenerateTitles,
  aiGenerateExcerpt,
  aiGenerateSeoMetadata,
  aiSuggestInternalLinks,
} from "@/app/(admin)/admin/blogs/ai-actions";
import type { RewriteStyle } from "@/lib/ai/blog-ai";

export type AiApplyMode = "replace-selection" | "insert-below" | "replace-all";

export type AiAssistantContext = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  focusKeyword: string;
  postId?: string;
};

export function AiAssistantDialog({
  open,
  onOpenChange,
  context,
  selectedText,
  onApplyToEditor,
  onApplyTitle,
  onApplyExcerpt,
  onApplySeo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: AiAssistantContext;
  selectedText: string;
  onApplyToEditor: (mode: AiApplyMode, text: string) => void;
  onApplyTitle: (title: string) => void;
  onApplyExcerpt: (excerpt: string) => void;
  onApplySeo: (seo: { seoTitle?: string; seoDescription?: string; focusKeyword?: string }) => void;
}) {
  if (!open) return null;

  function articleContext(): string {
    return `Title: ${context.title}\nExcerpt: ${context.excerpt}\n\n${context.content}`;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="AI Assistant" className="max-w-2xl">
        <p className="text-xs text-text-muted">
          Suggestions only — nothing here is saved or published until you explicitly apply it.
        </p>

        <Tabs defaultValue="ideas" className="mt-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="rewrite">Rewrite</TabsTrigger>
            <TabsTrigger value="titles">Titles &amp; Excerpt</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>

          <div className="mt-4 max-h-[55vh] overflow-y-auto pr-1">
            <TabsContent value="ideas">
              <IdeasTab onApplyTitle={onApplyTitle} onOpenChange={onOpenChange} />
            </TabsContent>
            <TabsContent value="outline">
              <OutlineTab title={context.title} onApplyToEditor={onApplyToEditor} />
            </TabsContent>
            <TabsContent value="draft">
              <DraftTab title={context.title} focusKeyword={context.focusKeyword} onApplyToEditor={onApplyToEditor} />
            </TabsContent>
            <TabsContent value="rewrite">
              <RewriteTab selectedText={selectedText} onApplyToEditor={onApplyToEditor} />
            </TabsContent>
            <TabsContent value="titles">
              <TitlesExcerptTab
                articleContext={articleContext()}
                onApplyTitle={onApplyTitle}
                onApplyExcerpt={onApplyExcerpt}
              />
            </TabsContent>
            <TabsContent value="seo">
              <SeoTab context={context} onApplySeo={onApplySeo} />
            </TabsContent>
            <TabsContent value="links">
              <LinksTab context={context} onApplyToEditor={onApplyToEditor} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// --- Shared bits -----------------------------------------------------------

function ResultActions({
  onCopy,
  onRegenerate,
  isPending,
  children,
}: {
  onCopy: () => void;
  onRegenerate: () => void;
  isPending: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {children}
      <Button variant="secondary" size="sm" onClick={onCopy}>
        <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
      </Button>
      <Button variant="ghost" size="sm" onClick={onRegenerate} disabled={isPending}>
        <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Regenerate
      </Button>
    </div>
  );
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard.");
  } catch {
    toast.error("Couldn't copy — your browser blocked clipboard access.");
  }
}

function GenerateButton({ onClick, isPending, label = "Generate" }: { onClick: () => void; isPending: boolean; label?: string }) {
  return (
    <Button onClick={onClick} disabled={isPending}>
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      {isPending ? "Generating..." : label}
    </Button>
  );
}

// --- Ideas ------------------------------------------------------------------

function IdeasTab({ onApplyTitle, onOpenChange }: { onApplyTitle: (title: string) => void; onOpenChange: (open: boolean) => void }) {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [ideas, setIdeas] = useState<{ title: string; description: string; angle: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("Enter a topic first.");
      return;
    }
    setError(null);
    setIsPending(true);
    const result = await aiGenerateIdeas({ topic, audience: audience || undefined, keywords: keywords || undefined });
    setIsPending(false);
    if (result.success) setIdeas(result.data);
    else setError(result.error);
  }

  return (
    <div className="space-y-3">
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (required)" />
      <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Audience (optional)" />
      <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (optional)" />
      <GenerateButton onClick={handleGenerate} isPending={isPending} label="Generate Ideas" />
      {error && <p className="text-xs text-danger">{error}</p>}

      {ideas && (
        <ul className="space-y-2">
          {ideas.map((idea, i) => (
            <li key={i} className="rounded-sm border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-text-primary">{idea.title}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onApplyTitle(idea.title);
                    toast.success("Title applied — switch to Basic Info to see it.");
                    onOpenChange(false);
                  }}
                >
                  Use Title
                </Button>
              </div>
              <p className="mt-1 text-xs text-text-secondary">{idea.description}</p>
              <p className="mt-1 text-xs text-text-muted">Angle: {idea.angle}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Outline -----------------------------------------------------------------

function OutlineTab({ title, onApplyToEditor }: { title: string; onApplyToEditor: (mode: AiApplyMode, text: string) => void }) {
  const [description, setDescription] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!title.trim()) {
      setError("Add a title in Basic Information first.");
      return;
    }
    setError(null);
    setIsPending(true);
    const result = await aiGenerateOutline({ title, description: description || undefined });
    setIsPending(false);
    if (result.success) setMarkdown(result.data.markdown);
    else setError(result.error);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted">Using title: "{title || "(none set yet)"}"</p>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional description or angle"
        rows={2}
      />
      <GenerateButton onClick={handleGenerate} isPending={isPending} label="Generate Outline" />
      {error && <p className="text-xs text-danger">{error}</p>}

      {markdown && (
        <div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-bg-surface-2 p-3 text-xs text-text-secondary">
            {markdown}
          </pre>
          <ResultActions onCopy={() => copyToClipboard(markdown)} onRegenerate={handleGenerate} isPending={isPending}>
            <Button size="sm" onClick={() => onApplyToEditor("insert-below", markdown)}>
              <Check className="mr-1.5 h-3.5 w-3.5" /> Insert into Content
            </Button>
          </ResultActions>
        </div>
      )}
    </div>
  );
}

// --- Draft ---------------------------------------------------------------

function DraftTab({
  title,
  focusKeyword,
  onApplyToEditor,
}: {
  title: string;
  focusKeyword: string;
  onApplyToEditor: (mode: AiApplyMode, text: string) => void;
}) {
  const [outline, setOutline] = useState("");
  const [tone, setTone] = useState("professional");
  const [instructions, setInstructions] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!title.trim()) {
      setError("Add a title in Basic Information first.");
      return;
    }
    setError(null);
    setIsPending(true);
    const result = await aiGenerateDraft({
      title,
      outline: outline || undefined,
      focusKeyword: focusKeyword || undefined,
      tone,
      instructions: instructions || undefined,
    });
    setIsPending(false);
    if (result.success) setContent(result.data.content);
    else setError(result.error);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted">Using title: "{title || "(none set yet)"}"</p>
      <Textarea
        value={outline}
        onChange={(e) => setOutline(e.target.value)}
        placeholder="Paste an outline to follow (optional — from the Outline tab or your own)"
        rows={3}
      />
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
      >
        {["professional", "technical", "simple", "concise", "conversational", "educational"].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <Textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Additional instructions (optional)"
        rows={2}
      />
      <GenerateButton onClick={handleGenerate} isPending={isPending} label="Generate Draft" />
      {error && <p className="text-xs text-danger">{error}</p>}

      {content && (
        <div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-bg-surface-2 p-3 text-xs text-text-secondary">
            {content}
          </pre>
          <ResultActions onCopy={() => copyToClipboard(content)} onRegenerate={handleGenerate} isPending={isPending}>
            <Button size="sm" onClick={() => onApplyToEditor("replace-all", content)}>
              <Check className="mr-1.5 h-3.5 w-3.5" /> Replace Draft
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onApplyToEditor("insert-below", content)}>
              Insert Below
            </Button>
          </ResultActions>
        </div>
      )}
    </div>
  );
}

// --- Rewrite (selection-based) --------------------------------------------

const REWRITE_STYLES: RewriteStyle[] = ["professional", "technical", "simple", "concise", "conversational", "educational"];
type RewriteAction = "improve" | RewriteStyle | "expand" | "shorten" | "summarize";

function RewriteTab({ selectedText, onApplyToEditor }: { selectedText: string; onApplyToEditor: (mode: AiApplyMode, text: string) => void }) {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [summaryPoints, setSummaryPoints] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<RewriteAction | null>(null);

  async function run(action: RewriteAction) {
    if (!selectedText.trim()) {
      setError("Select some text in the editor first, then reopen the AI Assistant.");
      return;
    }
    setError(null);
    setIsPending(true);
    setLastAction(action);
    setSummaryPoints(null);

    const res =
      action === "improve"
        ? await aiImproveWriting(selectedText)
        : action === "expand"
          ? await aiExpandText(selectedText)
          : action === "shorten"
            ? await aiShortenText(selectedText)
            : action === "summarize"
              ? await aiSummarizeText(selectedText)
              : await aiRewriteText(selectedText, action);

    setIsPending(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    if (action === "summarize" && "summary" in res.data) {
      setResult(res.data.summary);
      setSummaryPoints(res.data.keyPoints);
    } else if ("result" in res.data) {
      setResult(res.data.result);
    }
  }

  return (
    <div className="space-y-3">
      {selectedText.trim() ? (
        <div>
          <p className="text-xs font-medium text-text-secondary">Selected text</p>
          <p className="mt-1 max-h-24 overflow-y-auto rounded-sm border border-border bg-bg-surface-2 p-2 text-xs text-text-secondary">
            {selectedText}
          </p>
        </div>
      ) : (
        <p className="text-xs text-warning">
          No text selected. Select a passage in the Content editor, then reopen the AI Assistant to use these actions.
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="secondary" onClick={() => run("improve")} disabled={isPending}>
          Improve
        </Button>
        <Button size="sm" variant="secondary" onClick={() => run("expand")} disabled={isPending}>
          Expand
        </Button>
        <Button size="sm" variant="secondary" onClick={() => run("shorten")} disabled={isPending}>
          Shorten
        </Button>
        <Button size="sm" variant="secondary" onClick={() => run("summarize")} disabled={isPending}>
          Summarize
        </Button>
        {REWRITE_STYLES.map((style) => (
          <Button key={style} size="sm" variant="secondary" onClick={() => run(style)} disabled={isPending}>
            {style}
          </Button>
        ))}
      </div>

      {isPending && (
        <p className="flex items-center gap-1.5 text-xs text-text-muted">
          <Loader2 className="h-3 w-3 animate-spin" /> {lastAction === "summarize" ? "Summarizing..." : "Rewriting..."}
        </p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}

      {result && (
        <div>
          <p className="text-xs font-medium text-text-secondary">Result</p>
          <p className="mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-sm border border-border bg-bg-surface-2 p-2 text-xs text-text-secondary">
            {result}
          </p>
          {summaryPoints && summaryPoints.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-xs text-text-secondary">
              {summaryPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
          {lastAction !== "summarize" && (
            <ResultActions
              onCopy={() => copyToClipboard(result)}
              onRegenerate={() => lastAction && run(lastAction)}
              isPending={isPending}
            >
              <Button size="sm" onClick={() => onApplyToEditor("replace-selection", result)}>
                <Check className="mr-1.5 h-3.5 w-3.5" /> Replace Selection
              </Button>
            </ResultActions>
          )}
        </div>
      )}
    </div>
  );
}

// --- Titles & Excerpt ------------------------------------------------------

function TitlesExcerptTab({
  articleContext,
  onApplyTitle,
  onApplyExcerpt,
}: {
  articleContext: string;
  onApplyTitle: (title: string) => void;
  onApplyExcerpt: (excerpt: string) => void;
}) {
  const [isPendingTitles, setIsPendingTitles] = useState(false);
  const [titles, setTitles] = useState<string[] | null>(null);
  const [isPendingExcerpt, setIsPendingExcerpt] = useState(false);
  const [excerpt, setExcerpt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleTitles() {
    setError(null);
    setIsPendingTitles(true);
    const res = await aiGenerateTitles(articleContext);
    setIsPendingTitles(false);
    if (res.success) setTitles(res.data.titles);
    else setError(res.error);
  }

  async function handleExcerpt() {
    setError(null);
    setIsPendingExcerpt(true);
    const res = await aiGenerateExcerpt(articleContext);
    setIsPendingExcerpt(false);
    if (res.success) setExcerpt(res.data.excerpt);
    else setError(res.error);
  }

  return (
    <div className="space-y-5">
      {error && <p className="text-xs text-danger">{error}</p>}

      <div>
        <GenerateButton onClick={handleTitles} isPending={isPendingTitles} label="Generate Title Options" />
        {titles && (
          <ul className="mt-2 space-y-1.5">
            {titles.map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-2 rounded-sm border border-border p-2">
                <span className="text-xs text-text-secondary">{t}</span>
                <Button size="sm" variant="secondary" onClick={() => onApplyTitle(t)}>
                  Use
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <GenerateButton onClick={handleExcerpt} isPending={isPendingExcerpt} label="Generate Excerpt" />
        {excerpt && (
          <div className="mt-2 rounded-sm border border-border p-2">
            <p className="text-xs text-text-secondary">{excerpt}</p>
            <Button size="sm" className="mt-2" onClick={() => onApplyExcerpt(excerpt)}>
              <Check className="mr-1.5 h-3.5 w-3.5" /> Use This Excerpt
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SEO -----------------------------------------------------------------

function SeoTab({
  context,
  onApplySeo,
}: {
  context: AiAssistantContext;
  onApplySeo: (seo: { seoTitle?: string; seoDescription?: string; focusKeyword?: string }) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<{
    seoTitle: string;
    metaDescription: string;
    focusKeyword: string;
    secondaryKeywords: string[];
    slug: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!context.title.trim() || !context.content.trim()) {
      setError("Add a title and some content first.");
      return;
    }
    setError(null);
    setIsPending(true);
    const res = await aiGenerateSeoMetadata({
      title: context.title,
      excerpt: context.excerpt,
      content: context.content,
      category: context.category,
    });
    setIsPending(false);
    if (res.success) setData(res.data);
    else setError(res.error);
  }

  return (
    <div className="space-y-3">
      <GenerateButton onClick={handleGenerate} isPending={isPending} label="Generate SEO Suggestions" />
      {error && <p className="text-xs text-danger">{error}</p>}

      {data && (
        <div className="space-y-3">
          <SeoField label="SEO Title" value={data.seoTitle} onApply={() => onApplySeo({ seoTitle: data.seoTitle })} />
          <SeoField
            label="Meta Description"
            value={data.metaDescription}
            onApply={() => onApplySeo({ seoDescription: data.metaDescription })}
          />
          <SeoField
            label="Focus Keyword"
            value={data.focusKeyword}
            onApply={() => onApplySeo({ focusKeyword: data.focusKeyword })}
          />
          <div className="rounded-sm border border-border p-2.5">
            <p className="text-xs font-medium text-text-secondary">Secondary Keywords (suggestions only)</p>
            <p className="mt-1 text-xs text-text-secondary">{data.secondaryKeywords.join(", ")}</p>
          </div>
          <div className="rounded-sm border border-border p-2.5">
            <p className="text-xs font-medium text-text-secondary">Suggested Slug</p>
            <p className="mt-1 font-mono text-xs text-text-secondary">/blog/{data.slug}</p>
            <p className="mt-1 text-xs text-text-muted">Edit the slug directly in Basic Information if you want to use this.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={isPending}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Regenerate
          </Button>
        </div>
      )}
    </div>
  );
}

function SeoField({ label, value, onApply }: { label: string; value: string; onApply: () => void }) {
  return (
    <div className="rounded-sm border border-border p-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-text-secondary">{label}</p>
          <p className="mt-1 text-xs text-text-secondary">{value}</p>
        </div>
        <Button size="sm" variant="secondary" onClick={onApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}

// --- Internal Links ---------------------------------------------------------

function LinksTab({ context, onApplyToEditor }: { context: AiAssistantContext; onApplyToEditor: (mode: AiApplyMode, text: string) => void }) {
  const [isPending, setIsPending] = useState(false);
  const [suggestions, setSuggestions] = useState<{ slug: string; title: string; reason: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!context.content.trim()) {
      setError("Add some content first.");
      return;
    }
    setError(null);
    setIsPending(true);
    const res = await aiSuggestInternalLinks({
      currentTitle: context.title,
      currentContent: context.content,
      excludePostId: context.postId,
    });
    setIsPending(false);
    if (res.success) setSuggestions(res.data);
    else setError(res.error);
  }

  return (
    <div className="space-y-3">
      <GenerateButton onClick={handleGenerate} isPending={isPending} label="Suggest Internal Links" />
      {error && <p className="text-xs text-danger">{error}</p>}

      {suggestions && suggestions.length === 0 && (
        <p className="text-xs text-text-muted">No relevant existing articles found to link to.</p>
      )}

      {suggestions && suggestions.length > 0 && (
        <ul className="space-y-2">
          {suggestions.map((s) => (
            <li key={s.slug} className="rounded-sm border border-border p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="flex items-center gap-1.5 text-sm text-text-primary">
                    <Link2 className="h-3.5 w-3.5 text-text-muted" /> {s.title}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">{s.reason}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => onApplyToEditor("insert-below", `[${s.title}](/blog/${s.slug})`)}
                >
                  Insert
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
