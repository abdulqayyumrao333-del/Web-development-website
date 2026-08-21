"use client";

import { useRef, useState } from "react";
import { Check, Copy, Code, Sparkles } from "lucide-react";

export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = ref.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Detect language from className
  const className = props.className || "";
  const languageMatch = className.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : "";

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/98 to-bg-surface-1/90 backdrop-blur-sm shadow-lg">
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-accent-indigo/8 bg-accent-indigo/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Dot indicators */}
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          {language && (
            <div className="flex items-center gap-1.5 ml-2">
              <Code className="h-3 w-3 text-accent-indigo/40" strokeWidth={1.75} />
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40">
                {language}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-[10px] font-mono text-text-muted/40 transition-all duration-300 hover:border-accent-indigo/30 hover:text-accent-indigo hover:bg-accent-indigo/[0.03] hover:scale-105"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Code ── */}
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto p-5 text-sm leading-relaxed font-mono [&_[data-highlighted-line]]:border-l-2 [&_[data-highlighted-line]]:border-accent-indigo [&_[data-highlighted-line]]:bg-accent-indigo/10 [&_.line]:block [&_.line]:px-3 [&_.line]:py-0.5"
      />

      {/* ── Footer ── */}
      <div className="flex items-center justify-between border-t border-accent-indigo/8 bg-accent-indigo/[0.02] px-4 py-1.5">
        <div className="flex items-center gap-2 text-[8px] font-mono text-text-muted/20">
          <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
          <span>Code snippet</span>
        </div>
        <span className="text-[7px] font-mono text-text-muted/10">
          {language || "text"}
        </span>
      </div>

      {/* ── Decorative bracket ── */}
      <div
        aria-hidden
        className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/15 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />
    </div>
  );
}