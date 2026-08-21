import Link from "next/link";
import { ArrowRight, Sparkles, Rocket, Send, FileText } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function SkillsCta() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
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
          className="absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(40% 70% at 50% 0%, rgba(79,70,229,0.07) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Let's Build
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Let's Build
                <br />
                <span className="text-accent-indigo">Something Amazing</span>
                <br />
                Together
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Ready to bring your ideas to life? Let's collaborate and create something extraordinary.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Available for work
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Quick response
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Let's talk
                </p>
              </div>
            </div>

            {/* CTA buttons in sidebar */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-medium text-accent-indigo hover:text-accent-indigo/80 transition-colors">
                <span className="h-px w-4 bg-accent-indigo/30 group-hover:w-6 transition-all" />
                Hire Me
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </Link>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
                <span className="h-px w-4 bg-border group-hover:w-6 transition-all" />
                View Projects
              </Link>
              <Link href="/resume" className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
                <span className="h-px w-4 bg-border group-hover:w-6 transition-all" />
                Download Resume
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── CTA Card ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/4 h-40 w-40 rounded-full bg-accent-indigo/5 blur-2xl"
            />

            <div
              className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-500 hover:border-accent-indigo/30 hover:shadow-2xl hover:shadow-accent-indigo/10 p-8 sm:p-12 text-center"
              style={{ boxShadow: panelShadow }}
            >
              {/* Animated gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-indigo/[0.05] via-transparent to-transparent"
              />

              {/* diagonal texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* Glow orb */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent-indigo/5 blur-3xl group-hover:bg-accent-indigo/10 transition-all duration-700"
              />

              {/* bracket - animated */}
              <div
                aria-hidden
                className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
              />
              <div
                aria-hidden
                className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-bl-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
              />

              {/* Icon */}
              <div className="relative mb-6 inline-flex">
                <div className="absolute inset-0 rounded-full bg-accent-indigo/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 transition-all duration-300 group-hover:scale-110">
                  <Rocket className="h-7 w-7 text-accent-indigo" strokeWidth={1.75} />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                  Ready to Build Something
                  <br />
                  <span className="text-accent-indigo">Amazing Together?</span>
                </h3>

                <p className="mt-4 text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
                  I'm available for freelance projects, collaborations, and full-time opportunities.
                  Let's turn your ideas into reality.
                </p>

                {/* Stats */}
                <div className="mt-6 flex justify-center gap-6 text-xs text-text-muted/60">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
                    24h response
                  </span>
                  <span className="text-accent-indigo/20">|</span>
                  <span className="flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
                    Global clients
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-lg shadow-accent-indigo/20 hover:shadow-xl hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
                      <Send className="h-4 w-4" strokeWidth={1.75} />
                      Hire Me
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
                    </button>
                  </Link>

                  <Link href="/projects">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/30">
                      View Projects
                    </button>
                  </Link>

                  <Link href="/resume">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent-indigo/10 bg-transparent text-text-muted hover:text-text-primary font-medium text-sm transition-all duration-300 hover:border-accent-indigo/20 hover:bg-accent-indigo/[0.03] hover:-translate-y-0.5">
                      <FileText className="h-4 w-4" strokeWidth={1.75} />
                      Resume
                    </button>
                  </Link>
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="h-px w-12 rounded-full bg-accent-indigo/15 group-hover:w-16 transition-all duration-700" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted/30">
                    Let's Connect
                  </span>
                  <div className="h-px w-12 rounded-full bg-accent-indigo/15 group-hover:w-16 transition-all duration-700" />
                </div>
              </div>

              {/* bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}