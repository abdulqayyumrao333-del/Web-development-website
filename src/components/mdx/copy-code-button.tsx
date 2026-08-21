"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — fail silently, button just won't confirm
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute right-3 top-3 rounded-sm border border-border bg-bg-surface p-1.5 text-text-muted opacity-0 transition-opacity duration-fast hover:text-text-primary group-hover:opacity-100"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
