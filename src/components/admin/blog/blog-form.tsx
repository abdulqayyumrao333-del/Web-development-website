"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { BlogPost, BlogSeoMeta } from "@/types";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { createBlogPostSchema } from "@/lib/validations";
import { createBlog, updateBlog } from "@/app/(admin)/admin/blogs/actions";
import { BasicInfoSection, type BasicInfoFields } from "@/components/admin/blog/basic-info-section";
import { CoverImageSection } from "@/components/admin/blog/cover-image-section";
import { ContentSection } from "@/components/admin/blog/content-section";
import { SeoPanel, type SeoPanelFields } from "@/components/admin/blog/seo/seo-panel";
import { AutoSaveIndicator, type AutoSaveStatus } from "@/components/admin/blog/auto-save-indicator";
import { DraftRecoveryDialog } from "@/components/admin/blog/draft-recovery-dialog";
import { VersionInfoCard } from "@/components/admin/blog/version-info-card";
import { VersionHistoryCard } from "@/components/admin/blog/publishing/version-history-card";
import { AiAssistantDialog } from "@/components/admin/blog/ai/ai-assistant-dialog";
import type { MarkdownEditorHandle } from "@/components/admin/blog/editor/markdown-editor";

type FormState = BasicInfoFields & SeoPanelFields & { coverImage: string; contentMdx: string };

const AUTOSAVE_INTERVAL_MS = 30_000;
const AUTOSAVE_PAUSE_MS = 3_000;

function stateFromPost(post: BlogPost): FormState {
  const meta = (post.seoMeta ?? {}) as BlogSeoMeta;
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    author: post.author || siteConfig.name,
    featured: post.featured,
    status: post.status === "SCHEDULED" ? "DRAFT" : (post.status as FormState["status"]), // this form doesn't expose Scheduled
    coverImage: post.coverImage,
    contentMdx: post.contentMdx,
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    focusKeyword: post.focusKeyword ?? "",
    canonicalUrl: post.canonicalUrl ?? "",
    ogImage: post.ogImage ?? "",
    noIndex: meta.noIndex ?? false,
    noFollow: meta.noFollow ?? false,
    ogTitle: meta.ogTitle ?? "",
    ogDescription: meta.ogDescription ?? "",
    ogType: meta.ogType ?? "",
    twitterCard: meta.twitterCard ?? "summary_large_image",
    twitterTitle: meta.twitterTitle ?? "",
    twitterDescription: meta.twitterDescription ?? "",
    twitterImage: meta.twitterImage ?? "",
  };
}

function emptyState(): FormState {
  return {
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    tags: [],
    author: siteConfig.name,
    featured: false,
    status: "DRAFT",
    coverImage: "",
    contentMdx: "",
    seoTitle: "",
    seoDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogImage: "",
    noIndex: false,
    noFollow: false,
    ogTitle: "",
    ogDescription: "",
    ogType: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  };
}

function buildFormData(state: FormState, status: FormState["status"]): FormData {
  const fd = new FormData();
  fd.set("title", state.title);
  fd.set("slug", state.slug);
  fd.set("excerpt", state.excerpt);
  fd.set("contentMdx", state.contentMdx);
  fd.set("coverImage", state.coverImage);
  fd.set("category", state.category);
  fd.set("author", state.author);
  fd.set("tags", state.tags.join(","));
  fd.set("status", status);
  fd.set("featured", state.featured ? "on" : "");
  fd.set("seoTitle", state.seoTitle);
  fd.set("seoDescription", state.seoDescription);
  fd.set("focusKeyword", state.focusKeyword);
  fd.set("canonicalUrl", state.canonicalUrl);
  fd.set("ogImage", state.ogImage);
  fd.set("noIndex", state.noIndex ? "on" : "");
  fd.set("noFollow", state.noFollow ? "on" : "");
  fd.set("ogTitle", state.ogTitle);
  fd.set("ogDescription", state.ogDescription);
  fd.set("ogType", state.ogType);
  fd.set("twitterCard", state.twitterCard);
  fd.set("twitterTitle", state.twitterTitle);
  fd.set("twitterDescription", state.twitterDescription);
  fd.set("twitterImage", state.twitterImage);
  return fd;
}

export function BlogForm({ categories, post }: { categories: string[]; post?: BlogPost }) {
  const router = useRouter();
  const mode: "create" | "edit" = post ? "edit" : "create";
  const draftKey = `blog-draft:${post?.id ?? "new"}`;

  const [state, setState] = useState<FormState>(post ? stateFromPost(post) : emptyState());
  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === "edit");
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<"draft" | "publish" | null>(null);
  const editorRef = useRef<MarkdownEditorHandle>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiSelectedText, setAiSelectedText] = useState("");

  const [autosaveStatus, setAutosaveStatus] = useState<AutoSaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [recovery, setRecovery] = useState<{ open: boolean; state: FormState | null; savedAt: Date | null }>({
    open: false,
    state: null,
    savedAt: null,
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;
  const postIdRef = useRef(postId);
  postIdRef.current = postId;
  const autosavingRef = useRef(false);
  // Tracks the most recent updatedAt this tab knows about, so explicit saves
  // can detect if the post changed elsewhere since — updated after every
  // successful save (auto or manual), not just on load.
  const lastKnownUpdatedAtRef = useRef<string | null>(post?.updatedAt.toISOString() ?? null);

  // --- Draft recovery: check localStorage once on mount ------------------
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { state: FormState; savedAt: string };
      // Only worth prompting if the snapshot actually differs from what's
      // currently loaded (avoids nagging about an identical, already-saved draft).
      const isDifferent = JSON.stringify(parsed.state) !== JSON.stringify(post ? stateFromPost(post) : emptyState());
      if (isDifferent) {
        setRecovery({ open: true, state: parsed.state, savedAt: new Date(parsed.savedAt) });
      }
    } catch {
      // Corrupt/unreadable snapshot — nothing to recover, nothing to warn about.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Unsaved-changes browser warning ------------------------------------
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const performAutosave = useCallback(async () => {
    if (autosavingRef.current || !isDirtyRef.current) return;
    const current = stateRef.current;
    if (!current.title.trim()) return; // nothing meaningful to save yet

    autosavingRef.current = true;
    setAutosaveStatus("saving");

    try {
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({ state: current, savedAt: new Date().toISOString() }),
      );
    } catch {
      // localStorage can fail (quota, private browsing) — non-fatal, server autosave still runs below.
    }

    // Autosave never publishes on its own — for a brand-new post it always
    // saves as Draft; for an existing post it keeps whatever status is
    // already set rather than silently reverting a live Published post to
    // Draft (a literal "Save as Draft only" reading would do that, which
    // would be a real, harmful bug, not a faithful implementation).
    const autosaveStatusValue = postIdRef.current ? current.status : "DRAFT";
    const fd = buildFormData(current, autosaveStatusValue);

    try {
      const res = postIdRef.current
        ? await updateBlog(postIdRef.current, fd, { skipRevision: true })
        : await createBlog(fd);
      if (res.success) {
        if (!postIdRef.current) setPostId(res.data.id);
        if ("updatedAt" in res.data) lastKnownUpdatedAtRef.current = res.data.updatedAt;
        setLastSavedAt(new Date());
        setAutosaveStatus("saved");
      } else {
        setAutosaveStatus("idle"); // silent failure — no toast, don't interrupt typing
      }
    } catch {
      setAutosaveStatus("idle");
    } finally {
      autosavingRef.current = false;
    }
  }, [draftKey]);

  // Pause-triggered autosave.
  useEffect(() => {
    if (!isDirty) return;
    const handle = setTimeout(() => void performAutosave(), AUTOSAVE_PAUSE_MS);
    return () => clearTimeout(handle);
  }, [state, isDirty, performAutosave]);

  // Interval-triggered autosave (backstop for continuous typing that never pauses).
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirtyRef.current) void performAutosave();
    }, AUTOSAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [performAutosave]);

  function markDirty() {
    setIsDirty(true);
  }

  function updateBasicInfo(fields: Partial<BasicInfoFields>) {
    setState((prev) => ({ ...prev, ...fields }));
    markDirty();
  }

  function updateSeo(fields: Partial<SeoPanelFields>) {
    setState((prev) => ({ ...prev, ...fields }));
    markDirty();
  }

  function updateContent(contentMdx: string) {
    setState((prev) => ({ ...prev, contentMdx }));
    markDirty();
  }

  function handleOpenAiAssistant() {
    setAiSelectedText(editorRef.current?.getSelection() ?? "");
    setAiDialogOpen(true);
  }

  function handleAiApplyToEditor(mode: "replace-selection" | "insert-below" | "replace-all", text: string) {
    editorRef.current?.applyResult(mode, text);
    markDirty();
  }

  function handleAiApplyExcerpt(excerpt: string) {
    updateBasicInfo({ excerpt });
  }

  function handleAiApplySeo(seo: { seoTitle?: string; seoDescription?: string; focusKeyword?: string }) {
    updateSeo(seo);
  }

  function updateCoverImage(coverImage: string) {
    setState((prev) => ({ ...prev, coverImage }));
    markDirty();
  }

  function handleTitleChange(title: string) {
    setState((prev) => ({ ...prev, title, slug: slugManuallyEdited ? prev.slug : slugify(title) }));
    markDirty();
  }

  function handleSlugManualEdit() {
    setSlugManuallyEdited(true);
  }

  function handleRestoreDraft() {
    if (recovery.state) {
      setState(recovery.state);
      setIsDirty(true);
    }
    setRecovery({ open: false, state: null, savedAt: null });
  }

  function handleDiscardDraft() {
    try {
      window.localStorage.removeItem(draftKey);
    } catch {
      // ignore
    }
    setRecovery({ open: false, state: null, savedAt: null });
  }

  function handleContinueEditing() {
    // Dismiss without deciding — the snapshot stays in place in case they
    // want it later this session (it'll simply be overwritten by the next autosave).
    setRecovery({ open: false, state: null, savedAt: null });
  }

  function handleSubmit(status: FormState["status"], action: "draft" | "publish") {
    setFormError(null);

    const candidate = { ...state, status };
    const result = createBlogPostSchema.safeParse(candidate);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }
    setErrors({});

    setPendingAction(action);
    startTransition(async () => {
      const fd = buildFormData(state, status);
      const res = postId
        ? await updateBlog(postId, fd, { expectedUpdatedAt: lastKnownUpdatedAtRef.current ?? undefined })
        : await createBlog(fd);
      if (res.success) {
        setIsDirty(false);
        setLastSavedAt(new Date());
        if ("updatedAt" in res.data) lastKnownUpdatedAtRef.current = res.data.updatedAt;
        try {
          window.localStorage.removeItem(draftKey);
        } catch {
          // ignore
        }
        toast.success(status === "PUBLISHED" ? "Post published." : "Draft saved.");
        router.push("/admin/blogs");
      } else {
        setFormError(res.error);
        toast.error(res.error);
      }
      setPendingAction(null);
    });
  }

  function handleCancel() {
    if (isDirty && !window.confirm("You have unsaved changes. Discard them and leave this page?")) {
      return;
    }
    router.push("/admin/blogs");
  }

  function handleInsertLink(markdown: string) {
    setState((prev) => ({
      ...prev,
      contentMdx: prev.contentMdx.trimEnd() ? `${prev.contentMdx.trimEnd()}\n\n${markdown}\n` : `${markdown}\n`,
    }));
    markDirty();
  }

  const seoFields: SeoPanelFields = {
    seoTitle: state.seoTitle,
    seoDescription: state.seoDescription,
    focusKeyword: state.focusKeyword,
    canonicalUrl: state.canonicalUrl,
    ogImage: state.ogImage,
    noIndex: state.noIndex,
    noFollow: state.noFollow,
    ogTitle: state.ogTitle,
    ogDescription: state.ogDescription,
    ogType: state.ogType,
    twitterCard: state.twitterCard,
    twitterTitle: state.twitterTitle,
    twitterDescription: state.twitterDescription,
    twitterImage: state.twitterImage,
  };

  return (
    <div>
      <DraftRecoveryDialog
        open={recovery.open}
        savedAt={recovery.savedAt}
        onRestore={handleRestoreDraft}
        onDiscard={handleDiscardDraft}
        onContinueEditing={handleContinueEditing}
      />

      <AiAssistantDialog
        open={aiDialogOpen}
        onOpenChange={setAiDialogOpen}
        context={{
          title: state.title,
          excerpt: state.excerpt,
          content: state.contentMdx,
          category: state.category,
          focusKeyword: state.focusKeyword,
          postId: postId ?? undefined,
        }}
        selectedText={aiSelectedText}
        onApplyToEditor={handleAiApplyToEditor}
        onApplyTitle={handleTitleChange}
        onApplyExcerpt={handleAiApplyExcerpt}
        onApplySeo={handleAiApplySeo}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Write, optimize and publish high-quality technical articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AutoSaveIndicator status={autosaveStatus} lastSavedAt={lastSavedAt} />
          <Button variant="ghost" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSubmit("DRAFT", "draft")}
            disabled={isPending}
            aria-label="Save as draft"
          >
            {isPending && pendingAction === "draft" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("PUBLISHED", "publish")} disabled={isPending} aria-label="Publish post">
            {isPending && pendingAction === "publish" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish
          </Button>
        </div>
      </div>

      {formError && (
        <div className="mt-4 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {formError}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BasicInfoSection
            value={state}
            onChange={updateBasicInfo}
            onTitleChange={handleTitleChange}
            onSlugManualEdit={handleSlugManualEdit}
            categories={categories}
            errors={errors}
          />
          <ContentSection
            ref={editorRef}
            value={state.contentMdx}
            onChange={updateContent}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        </div>

        <div className="space-y-6">
          {post && (
            <>
              <VersionInfoCard
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                publishedAt={post.publishedAt}
                author={state.author || siteConfig.name}
                lastSavedAt={lastSavedAt}
              />
              <VersionHistoryCard postId={post.id} />
            </>
          )}
          <CoverImageSection value={state.coverImage} onChange={updateCoverImage} error={errors.coverImage} />
          <SeoPanel
            value={seoFields}
            onChange={updateSeo}
            errors={errors}
            onInsertLink={handleInsertLink}
            context={{
              postId,
              title: state.title,
              slug: state.slug,
              excerpt: state.excerpt,
              coverImage: state.coverImage,
              contentMdx: state.contentMdx,
              category: state.category,
              tags: state.tags,
            }}
          />
        </div>
      </div>
    </div>
  );
}
