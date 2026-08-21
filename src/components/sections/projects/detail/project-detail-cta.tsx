import Link from "next/link";
import { ArrowRight, Github, MessageCircle, Rocket, Sparkles, Send, Star, Code2, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig } from "@/config/site";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ProjectDetailCta({ githubUrl }: { githubUrl?: string | null }) {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">

      {/* ── Full-bleed background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)", width: "100vw" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              "radial-gradient(40% 70% at 50% 0%, rgba(79,70,229,0.09) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Floating decorative elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-accent-indigo/5 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-accent-indigo/5 animate-[spin_15s_linear_infinite]" />
        <div className="absolute top-1/2 right-5 w-16 h-16 rounded-full border border-accent-indigo/5 animate-[spin_25s_linear_infinite]" />
        <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full border border-accent-indigo/5 animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center text-center">

        {/* ── Label ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent-indigo/60" />
            <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
              Let's Build
            </p>
            <span className="h-px w-8 bg-accent-indigo/60" />
          </div>
        </Reveal>

        {/* ── Heading ── */}
        <Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-text-primary">
            Have a Project
            <br />
            <span className="text-accent-indigo">in Mind?</span>
          </h2>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            I turn ideas into reality with clean, scalable, and production-ready code.
            Let's build something amazing together.
          </p>
        </Reveal>

        {/* ── Stats Row ── */}
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2">
                <Code2 className="h-5 w-5 text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors" strokeWidth={1.75} />
                <span className="text-2xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors">50+</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 mt-1">Projects</p>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors" strokeWidth={1.75} />
                <span className="text-2xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors">40+</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 mt-1">Clients</p>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2">
                <Rocket className="h-5 w-5 text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors" strokeWidth={1.75} />
                <span className="text-2xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors">100%</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 mt-1">Satisfaction</p>
            </div>
          </div>
        </Reveal>

        {/* ── CTA Buttons ── */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-base shadow-lg shadow-accent-indigo/25 hover:shadow-xl hover:shadow-accent-indigo/40 transition-all duration-300 hover:-translate-y-1">
                <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
                <span>Start a Project</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </button>
            </Link>

            <a
              href={githubUrl ?? siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5">
                <Github className="h-5 w-5" strokeWidth={1.75} />
                View GitHub
              </button>
            </a>
          </div>
        </Reveal>

        {/* ── Trust Indicators ── */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-text-muted/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available now
            </span>
            <span className="text-accent-indigo/20">|</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
              24h response
            </span>
            <span className="text-accent-indigo/20">|</span>
            <span className="flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
              Global clients
            </span>
            <span className="text-accent-indigo/20">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500/30" strokeWidth={2} />
              Quality guaranteed
            </span>
          </div>
        </Reveal>

        {/* ── Bottom Decorative Line ── */}
        <Reveal delay={0.24}>
          <div className="mt-10 flex items-center gap-4 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted/20 whitespace-nowrap">
              From Idea to Production
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}