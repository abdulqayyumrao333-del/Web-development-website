import { Rocket, Building, Briefcase, User, GraduationCap, Star, Check, Sparkles, Shield, Zap, Code2, Layout, Eye, GitBranch, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import Link from "next/link";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── WhoIWorkWith ──
const AUDIENCES = [
  { icon: Rocket, label: "Startups", description: "Building from the ground up", emoji: "🚀" },
  { icon: Building, label: "Small Businesses", description: "Digital presence & growth", emoji: "🏢" },
  { icon: Briefcase, label: "Agencies", description: "White-label development", emoji: "💼" },
  { icon: User, label: "Entrepreneurs", description: "Turning ideas into products", emoji: "👤" },
  { icon: GraduationCap, label: "Students", description: "Learning & building", emoji: "🎓" },
  { icon: Star, label: "Personal Brands", description: "Stand out online", emoji: "⭐" },
];

export function WhoIWorkWith() {
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

      <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* ── Label ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent-indigo/60" />
            <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
              Who I Work With
            </p>
            <span className="h-px w-8 bg-accent-indigo/60" />
          </div>
        </Reveal>

        {/* ── Heading ── */}
        <Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-text-primary">
            Built for
            <br />
            <span className="text-accent-indigo">people building</span>
            <br />
            things
          </h2>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            I work with motivated individuals and teams who want to build something great.
          </p>
        </Reveal>

        {/* ── Audience Grid ── */}
        <Reveal delay={0.12}>
          <div className="mt-10 w-full max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {AUDIENCES.map(({ icon: Icon, label, description, emoji }, i) => (
                <Reveal key={label} delay={0.12 + i * 0.05}>
                  <div
                    className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 text-center"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover gradient */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                    />

                    {/* bracket */}
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                    />

                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10 mx-auto">
                        <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="mt-3 font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {label}
                      </p>
                      <p className="mt-1 text-[10px] text-text-muted/50 group-hover:text-text-muted/70 transition-colors">
                        {description}
                      </p>
                      <span className="absolute bottom-2 right-2 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Bottom Decorative Line ── */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center gap-4 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted/20 whitespace-nowrap">
              {AUDIENCES.length} Audiences · Diverse Clients
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── WhyWorkWithMeBento ──
const STRENGTHS = [
  { label: "Modern Tech Stack", icon: Code2, description: "Cutting-edge tools & frameworks" },
  { label: "Performance Focus", icon: Zap, description: "Fast, optimized, responsive" },
  { label: "Clean Architecture", icon: Layout, description: "Scalable, maintainable structure" },
  { label: "Responsive Design", icon: Eye, description: "Works on every device" },
  { label: "SEO Awareness", icon: Sparkles, description: "Built to rank and perform" },
  { label: "Scalable Solutions", icon: Rocket, description: "Grows with your business" },
  { label: "Clear Communication", icon: Check, description: "No jargon, just clarity" },
  { label: "Long-Term Maintenance", icon: Shield, description: "Code that stays clean" },
];

export function WhyWorkWithMeBento() {
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

      <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* ── Label ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-accent-indigo/60" />
            <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
              Why Work With Me
            </p>
            <span className="h-px w-8 bg-accent-indigo/60" />
          </div>
        </Reveal>

        {/* ── Heading ── */}
        <Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-text-primary">
            What you can
            <br />
            <span className="text-accent-indigo">actually expect</span>
          </h2>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            The values and standards I bring to every project.
          </p>
        </Reveal>

        {/* ── Strength Grid ── */}
        <Reveal delay={0.12}>
          <div className="mt-10 w-full max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {STRENGTHS.map(({ label, icon: Icon, description }, i) => {
                const isFeatured = i === 0 || i === STRENGTHS.length - 1;
                const spanClass = isFeatured ? "col-span-2" : "col-span-2 sm:col-span-1";
                const heightClass = isFeatured ? "h-[180px]" : "h-[120px]";
                
                return (
                  <Reveal key={label} delay={0.12 + i * 0.04} className={spanClass}>
                    <div
                      className={`group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 flex flex-col ${heightClass}`}
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* hover gradient */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />

                      {/* bracket */}
                      <div
                        aria-hidden
                        className={`absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none ${isFeatured ? 'top-3 right-3 h-4 w-4' : ''}`}
                      />

                      <div className="relative flex-1 flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 ${isFeatured ? 'h-10 w-10' : 'h-8 w-8'}`}>
                            <Icon className={`${isFeatured ? 'h-5 w-5' : 'h-4 w-4'} text-accent-indigo`} strokeWidth={1.75} />
                          </div>
                          <p className={`font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 ${isFeatured ? 'text-base sm:text-lg' : 'text-sm'}`}>
                            {label}
                          </p>
                        </div>

                        <p className={`mt-1 text-text-muted/50 group-hover:text-text-muted/70 transition-colors ${isFeatured ? 'text-sm' : 'text-[10px]'}`}>
                          {description}
                        </p>

                        {/* index number */}
                        <span className={`absolute bottom-2 right-2 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors ${isFeatured ? 'bottom-3 right-3' : ''}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Bottom Decorative Line ── */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center gap-4 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted/20 whitespace-nowrap">
              {STRENGTHS.length} Strengths · Every Project
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}