import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Zap, CheckCircle, User, Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function AboutPreview() {
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
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                About
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                A bit about
                <br />
                <span className="text-accent-indigo">how I work</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Software developer passionate about building modern web applications, AI-powered tools, and workflow automation.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Full Stack
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  AI Integration
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Automation
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02]">
                <GraduationCap className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                <span className="text-[10px] font-mono text-text-muted/40">CS Student</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02]">
                <Briefcase className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                <span className="text-[10px] font-mono text-text-muted/40">5+ Years Building</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02]">
                <User className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                <span className="text-[10px] font-mono text-text-muted/40">40+ Happy Clients</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Content ══ */}
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
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* bracket */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                {/* ── Profile Image ── */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-accent-indigo/20 shadow-lg">
                    <Image
                      src="/images/profile.jpg"
                      alt="Abdul Qayyum"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-text-primary">Abdul Qayyum</p>
                    <p className="text-sm text-text-secondary">Computer Science Student · Developer</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-text-muted/40">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500/40" strokeWidth={2} />
                        Available
                      </span>
                      <span className="text-accent-indigo/20">|</span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-accent-indigo/30" strokeWidth={1.5} />
                        5+ Years
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Description ── */}
                <div className="space-y-4 text-sm text-text-secondary/80 leading-relaxed">
                  <p>
                    Hi, I'm Abdul Qayyum, a Computer Science student and software developer
                    passionate about building modern web applications, AI-powered tools, and
                    workflow automation systems.
                  </p>
                  <p>
                    I enjoy solving real-world problems through technology while continuously
                    learning new frameworks, improving my engineering skills, and creating products
                    that are practical, scalable, and user-focused.
                  </p>
                  <p>
                    Currently, I'm focused on Full Stack Development, Artificial Intelligence,
                    and building production-quality software.
                  </p>
                </div>

                {/* ── Focus Areas ── */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.02] p-3 text-center">
                    <Code2 className="h-5 w-5 text-accent-indigo/60" strokeWidth={1.75} />
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-muted/50">Full Stack</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.02] p-3 text-center">
                    <Sparkles className="h-5 w-5 text-accent-indigo/60" strokeWidth={1.75} />
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-muted/50">AI/ML</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.02] p-3 text-center">
                    <Zap className="h-5 w-5 text-accent-indigo/60" strokeWidth={1.75} />
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-muted/50">Automation</p>
                  </div>
                </div>

                {/* ── CTA ── */}
                <Link href="/about">
                  <button className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/30">
                    Read Full Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </button>
                </Link>

                {/* bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-1/3 bg-gradient-to-r from-accent-indigo/30 to-transparent transition-all duration-700 rounded-b-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}