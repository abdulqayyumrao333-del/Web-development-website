"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, KeyRound, Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Incorrect username or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/98 to-bg-surface-1/90 backdrop-blur-sm p-8 sm:p-10 w-full max-w-md mx-auto" style={{ boxShadow: panelShadow }}>
      {/* ── diagonal texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* ── bracket ── */}
      <div
        aria-hidden
        className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative">
        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-indigo/15 bg-accent-indigo/8 mx-auto mb-4">
            <Lock className="h-7 w-7 text-accent-indigo" strokeWidth={1.75} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-sm text-text-muted/60">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-xs font-medium text-text-secondary block mb-1.5">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-accent-indigo/40" strokeWidth={1.75} />
                Username
              </span>
            </label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-0 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-xs font-medium text-text-secondary block mb-1.5">
              <span className="flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-accent-indigo/40" strokeWidth={1.75} />
                Password
              </span>
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-0 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2.5 text-sm text-rose-500 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-2 relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-lg shadow-accent-indigo/20 hover:shadow-xl hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" strokeWidth={1.75} />
                Sign in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </>
            )}
          </Button>
        </form>

        {/* ── Bottom decoration ── */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/10" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted/20">
            Secure Access
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/10" />
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
    </div>
  );
}