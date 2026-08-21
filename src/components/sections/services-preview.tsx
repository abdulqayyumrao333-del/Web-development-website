import { Code2, Sparkles, Workflow, Globe, ArrowRight, Zap } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import Link from "next/link";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Confirmed by Abdul — 4 services, client-focused copy.
const SERVICES = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    value: "Modern, scalable, and responsive web applications built with the latest technologies and best engineering practices.",
    tag: "Web Apps",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Applications",
    value: "Intelligent applications using modern AI models for automation, productivity, and enhanced user experiences.",
    tag: "AI/ML",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    value: "Automate repetitive business processes with custom software solutions that improve efficiency and reduce manual work.",
    tag: "Automation",
  },
  {
    icon: Globe,
    title: "Portfolio & Business Websites",
    value: "Premium, high-performance portfolio and business websites with a strong focus on performance, SEO, accessibility, and user experience.",
    tag: "Websites",
  },
];

export function ServicesPreview() {
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
                Services
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How I can
                <br />
                <span className="text-accent-indigo">help</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              From full-stack development to AI-powered solutions — I build software that solves real problems.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {SERVICES.length} services
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Custom solutions
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  End-to-end
                </p>
              </div>
            </div>

            {/* Service tags list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {SERVICES.map((service, i) => (
                <div key={service.title} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="text-[8px] font-mono uppercase tracking-wider text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                    {service.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* View all link */}
            <Link
              href="/services"
              className="mt-8 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
            >
              <span>View all services</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Services Grid ══ */}
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

            <div className="grid gap-3.5 sm:grid-cols-2">
              {SERVICES.map(({ icon: Icon, title, value, tag }, i) => (
                <Reveal key={title} delay={0.12 + i * 0.06}>
                  <div
                    className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 h-full flex flex-col"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover gradient */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                    />

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

                    <div className="relative flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 shrink-0">
                            <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                              {title}
                            </h3>
                            <span className="text-[8px] font-mono uppercase tracking-wider text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                              {tag}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 flex-1 leading-relaxed">
                        {value}
                      </p>

                      {/* bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                SERVICES · {SERVICES.length} OFFERINGS · CUSTOM SOLUTIONS
              </p>
              <div className="flex gap-1">
                {SERVICES.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.08)})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}