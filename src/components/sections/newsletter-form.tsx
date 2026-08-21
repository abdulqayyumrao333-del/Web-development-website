"use client";

import { useState } from "react";
import { Mail, Sparkles, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setEmail("");
        toast.success("🎉 You're subscribed! Check your email.");
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle className="h-6 w-6 text-emerald-500" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-semibold text-text-primary">You're Subscribed! 🎉</p>
          <p className="text-xs text-text-muted/60">Check your email for confirmation.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs text-accent-indigo hover:underline transition-colors mt-1"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2 p-1 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 focus-within:border-accent-indigo/30 focus-within:ring-2 focus-within:ring-accent-indigo/10 transition-all duration-300">
          <div className="flex items-center gap-1.5 pl-3 text-text-muted/30">
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-[10px] font-mono hidden sm:inline">→</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            disabled={isLoading}
            className="flex-1 border-0 bg-transparent px-2 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 outline-none focus:ring-0 disabled:opacity-60 disabled:cursor-not-allowed"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-sm shadow-accent-indigo/20 transition-all duration-300 hover:shadow-md hover:shadow-accent-indigo/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>Join</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Trust badge */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-accent-indigo/30" strokeWidth={1.5} />
        <span className="text-[8px] font-mono uppercase tracking-wider text-text-muted/30">
          No spam · Unsubscribe anytime
        </span>
      </div>
    </div>
  );
}