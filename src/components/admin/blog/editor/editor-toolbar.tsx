"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  ListTodo,
  Table as TableIcon,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  FileCode,
  Eraser,
  Copy,
  Columns2,
  Rows3,
  Eye,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKDOWN_COMMANDS as cmds, type EditResult } from "@/lib/markdown-editor-commands";

export type ViewMode = "editor" | "split" | "preview";

const CODE_LANGUAGES = ["ts", "tsx", "js", "jsx", "python", "bash", "html", "css", "json", "sql"];

function ToolbarButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo",
        active && "bg-accent-indigo/10 text-accent-indigo",
      )}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({
  onCommand,
  onInsertImage,
  onCopyMarkdown,
  onClearFormatting,
  viewMode,
  onViewModeChange,
  onOpenAiAssistant,
}: {
  onCommand: (cmd: (value: string, start: number, end: number) => EditResult) => void;
  onInsertImage: () => void;
  onCopyMarkdown: () => void;
  onClearFormatting: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenAiAssistant?: () => void;
}) {
  const [codeLangOpen, setCodeLangOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-md border border-b-0 border-border bg-bg-surface-2 p-1.5">
      <div className="flex items-center gap-0.5">
        {([1, 2, 3] as const).map((level) => (
          <ToolbarButton
            key={level}
            label={`Heading ${level}`}
            onClick={() => onCommand((v, s, e) => cmds.heading(v, s, e, level))}
          >
            <span className="text-xs font-semibold">H{level}</span>
          </ToolbarButton>
        ))}
      </div>

      <Divider />

      <ToolbarButton label="Bold (Ctrl+B)" onClick={() => onCommand((v, s, e) => cmds.bold(v, s, e))}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic (Ctrl+I)" onClick={() => onCommand((v, s, e) => cmds.italic(v, s, e))}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Underline" onClick={() => onCommand((v, s, e) => cmds.underline(v, s, e))}>
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" onClick={() => onCommand((v, s, e) => cmds.strikethrough(v, s, e))}>
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Inline code" onClick={() => onCommand((v, s, e) => cmds.inlineCode(v, s, e))}>
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Quote" onClick={() => onCommand((v, s, e) => cmds.quote(v, s, e))}>
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Bulleted list" onClick={() => onCommand((v, s, e) => cmds.unorderedList(v, s, e))}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" onClick={() => onCommand((v, s, e) => cmds.orderedList(v, s, e))}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Task list" onClick={() => onCommand((v, s, e) => cmds.taskList(v, s, e))}>
        <ListTodo className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <div className="relative">
        <ToolbarButton label="Code block" onClick={() => setCodeLangOpen((o) => !o)}>
          <FileCode className="h-4 w-4" />
        </ToolbarButton>
        {codeLangOpen && (
          <div className="absolute left-0 top-9 z-10 grid w-32 grid-cols-2 gap-0.5 rounded-md border border-border bg-bg-surface p-1.5 shadow-xl">
            {CODE_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  onCommand((v, s, e) => cmds.codeBlock(v, s, e, lang));
                  setCodeLangOpen(false);
                }}
                className="rounded-sm px-2 py-1 text-left text-xs text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
      <ToolbarButton label="Table" onClick={() => onCommand((v, s, e) => cmds.table(v, s, e))}>
        <TableIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Horizontal rule" onClick={() => onCommand((v, s, e) => cmds.horizontalRule(v, s, e))}>
        <Minus className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Link" onClick={() => onCommand((v, s, e) => cmds.link(v, s, e))}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Image" onClick={onInsertImage}>
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="Copy Markdown" onClick={onCopyMarkdown}>
        <Copy className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Clear formatting" onClick={onClearFormatting}>
        <Eraser className="h-4 w-4" />
      </ToolbarButton>

      {onOpenAiAssistant && (
        <button
          type="button"
          onClick={onOpenAiAssistant}
          className="ml-auto flex items-center gap-1.5 rounded-sm border border-accent-violet/30 bg-accent-violet/10 px-2.5 py-1.5 text-xs font-medium text-accent-violet hover:bg-accent-violet/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          AI Assistant
        </button>
      )}

      <div className={cn("flex items-center gap-0.5", !onOpenAiAssistant && "ml-auto")}>
        <ToolbarButton label="Editor only" active={viewMode === "editor"} onClick={() => onViewModeChange("editor")}>
          <Rows3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Split view" active={viewMode === "split"} onClick={() => onViewModeChange("split")}>
          <Columns2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Preview only" active={viewMode === "preview"} onClick={() => onViewModeChange("preview")}>
          <Eye className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />;
}
