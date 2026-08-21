"use client";

import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { MarkdownEditor, type MarkdownEditorHandle } from "@/components/admin/blog/editor/markdown-editor";

export const ContentSection = forwardRef<
  MarkdownEditorHandle,
  { value: string; onChange: (content: string) => void; onOpenAiAssistant?: () => void }
>(function ContentSection({ value, onChange, onOpenAiAssistant }, ref) {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-text-primary">Content</h2>
      <div className="mt-3">
        <MarkdownEditor ref={ref} value={value} onChange={onChange} onOpenAiAssistant={onOpenAiAssistant} />
      </div>
    </Card>
  );
});
