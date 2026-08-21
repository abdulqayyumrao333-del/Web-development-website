"use client";

import { useState } from "react";
import { Linkedin, Twitter, Facebook, MessageCircle, Link2, Check, Printer, Share2, Sparkles } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { icon: Linkedin, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: "hover:text-[#0A66C2]" },
    { icon: Twitter, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: "hover:text-[#000000]" },
    { icon: Facebook, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: "hover:text-[#1877F2]" },
    { icon: MessageCircle, label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: "hover:text-[#25D366]" },
  ];

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-4 sm:p-5">
      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* bracket */}
      <div
        aria-hidden
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
            <Share2 className="h-3.5 w-3.5 text-accent-indigo" strokeWidth={1.75} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
            Share this article
          </p>
          <span className="ml-auto text-[8px] font-mono text-accent-indigo/15">
            {links.length + 2} options
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`group flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1.5 text-xs text-text-muted/60 transition-all duration-300 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03] hover:scale-105 ${color}`}
            >
              <Icon className="h-3.5 w-3.5 transition-colors duration-300" strokeWidth={1.75} />
              <span className="hidden sm:inline">{label.replace("Share on ", "")}</span>
            </a>
          ))}

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            aria-label="Copy link"
            className="group flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1.5 text-xs text-text-muted/60 transition-all duration-300 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03] hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                <span className="text-emerald-500 hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            aria-label="Print article"
            className="group flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1.5 text-xs text-text-muted/60 transition-all duration-300 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03] hover:scale-105"
          >
            <Printer className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-1/3 bg-gradient-to-r from-accent-indigo/30 to-transparent transition-all duration-700 rounded-b-full" />
      </div>
    </div>
  );
}