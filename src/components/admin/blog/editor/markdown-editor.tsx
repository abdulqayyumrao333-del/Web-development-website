"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  MARKDOWN_COMMANDS as cmds,
  clearFormatting,
  findImageAtCursor,
  type EditResult,
} from "@/lib/markdown-editor-commands";
import { EditorToolbar, type ViewMode } from "@/components/admin/blog/editor/editor-toolbar";
import { MdxPreview } from "@/components/admin/blog/editor/mdx-preview";
import { ImageInsertDialog } from "@/components/admin/blog/editor/image-insert-dialog";
import { ReadingStats } from "@/components/admin/blog/editor/reading-stats";

export type MarkdownEditorHandle = {
  /** Currently selected text, or "" if nothing is selected. */
  getSelection: () => string;
  /** Applies an AI (or any external) result back into the editor. */
  applyResult: (mode: "replace-selection" | "insert-below" | "replace-all", text: string) => void;
};

export const MarkdownEditor = forwardRef<
  MarkdownEditorHandle,
  { value: string; onChange: (value: string) => void; onOpenAiAssistant?: () => void }
>(function MarkdownEditor({ value, onChange, onOpenAiAssistant }, ref) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");
  const [imageDialog, setImageDialog] = useState<{ open: boolean; start: number; end: number; url: string; alt: string }>(
    { open: false, start: 0, end: 0, url: "", alt: "" },
  );

  function applyEdit(result: EditResult) {
    onChange(result.text);
    // Restore focus + selection on the next tick, after React re-renders the textarea's value.
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  useImperativeHandle(ref, () => ({
    getSelection: () => {
      const el = textareaRef.current;
      if (!el) return "";
      return value.slice(el.selectionStart, el.selectionEnd);
    },
    applyResult: (mode, text) => {
      const el = textareaRef.current;
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;

      if (mode === "replace-all") {
        onChange(text);
        return;
      }
      if (mode === "insert-below") {
        const newText = `${value.slice(0, end)}\n\n${text}${value.slice(end)}`;
        const cursor = end + 2 + text.length;
        applyEdit({ text: newText, selectionStart: cursor, selectionEnd: cursor });
        return;
      }
      // replace-selection (default) — if nothing was actually selected, this
      // just inserts at the cursor, which is a reasonable fallback.
      const newText = value.slice(0, start) + text + value.slice(end);
      applyEdit({ text: newText, selectionStart: start, selectionEnd: start + text.length });
    },
  }));

  function runCommand(cmd: (value: string, start: number, end: number) => EditResult) {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    applyEdit(cmd(value, start, end));
  }

  function handleInsertImageClick() {
    const el = textareaRef.current;
    const cursor = el?.selectionStart ?? value.length;
    const existing = findImageAtCursor(value, cursor);
    if (existing) {
      setImageDialog({ open: true, start: existing.start, end: existing.end, url: existing.url, alt: existing.alt });
    } else {
      setImageDialog({ open: true, start: cursor, end: el?.selectionEnd ?? cursor, url: "", alt: "" });
    }
  }

  function handleImageInsert(url: string, alt: string, caption?: string) {
    const result = cmds.image(value, imageDialog.start, imageDialog.end, url, alt);
    if (!caption) {
      applyEdit(result);
      return;
    }
    // result.selectionEnd is the cursor position right after the inserted
    // image markdown — insert the caption line there.
    const insertPoint = result.selectionEnd;
    const text = `${result.text.slice(0, insertPoint)}\n*${caption}*${result.text.slice(insertPoint)}`;
    const cursor = insertPoint + caption.length + 3; // "\n*" + caption + "*"
    applyEdit({ text, selectionStart: cursor, selectionEnd: cursor });
  }

  function handleImageRemove() {
    const text = value.slice(0, imageDialog.start) + value.slice(imageDialog.end);
    onChange(text);
  }

  async function handleCopyMarkdown() {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Markdown copied to clipboard.");
    } catch {
      toast.error("Couldn't copy — your browser blocked clipboard access.");
    }
  }

  function handleClearFormatting() {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? value.length;
    applyEdit(clearFormatting(value, start, end));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const isMod = e.metaKey || e.ctrlKey;

    if (isMod && e.key.toLowerCase() === "b") {
      e.preventDefault();
      runCommand((v, s, en) => cmds.bold(v, s, en));
      return;
    }
    if (isMod && e.key.toLowerCase() === "i") {
      e.preventDefault();
      runCommand((v, s, en) => cmds.italic(v, s, en));
      return;
    }
    // Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z are intentionally left alone here so the
    // browser's native textarea undo/redo stack keeps working — reimplementing
    // it would risk breaking a feature that already works correctly.
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const text = value.slice(0, start) + "  " + value.slice(end);
      onChange(text);
      requestAnimationFrame(() => {
        el.setSelectionRange(start + 2, start + 2);
      });
    }
  }

  return (
    <div>
      <EditorToolbar
        onCommand={runCommand}
        onInsertImage={handleInsertImageClick}
        onCopyMarkdown={handleCopyMarkdown}
        onClearFormatting={handleClearFormatting}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenAiAssistant={onOpenAiAssistant}
      />

      <div
        className={cn(
          "grid gap-0 rounded-b-md border border-border",
          viewMode === "split" && "grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0",
        )}
      >
        {viewMode !== "preview" && (
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={20}
            placeholder="Write your article content in Markdown..."
            aria-label="Blog post content"
            className="rounded-none border-none font-mono focus:border-none focus:ring-0"
          />
        )}
        {viewMode !== "editor" && (
          <div className="max-h-[600px] overflow-y-auto p-5">
            <MdxPreview content={value} />
          </div>
        )}
      </div>

      <div className="mt-2">
        <ReadingStats content={value} />
      </div>

      <ImageInsertDialog
        open={imageDialog.open}
        onOpenChange={(open) => setImageDialog((prev) => ({ ...prev, open }))}
        initialUrl={imageDialog.url}
        initialAlt={imageDialog.alt}
        isReplacing={Boolean(imageDialog.url)}
        onInsert={handleImageInsert}
        onRemove={handleImageRemove}
      />
    </div>
  );
});
