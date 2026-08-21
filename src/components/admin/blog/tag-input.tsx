"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

export function TagInput({
  value,
  onChange,
  label = "Tags",
  placeholder = "Type a tag and press Enter...",
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    const isDuplicate = value.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (isDuplicate) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-1.5 rounded-sm border border-border bg-bg-surface px-2 py-1.5 focus-within:border-accent-indigo"
        role="group"
        aria-label={label}
      >
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="flex items-center gap-1 rounded-full border border-accent-indigo/30 bg-accent-indigo/10 px-2 py-0.5 text-xs text-accent-indigo"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              aria-label={`Remove tag ${tag}`}
              className="rounded-full hover:bg-accent-indigo/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={value.length === 0 ? placeholder : ""}
          aria-label="Add a tag"
          className="min-w-[120px] flex-1 bg-transparent py-1 text-sm outline-none"
        />
      </div>
      <p className="mt-1 text-xs text-text-muted">Press Enter or comma to add a tag.</p>
    </div>
  );
}
