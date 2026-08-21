import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  Sparkles,
  Code2,
  Zap,
  CheckCircle,
  Send,
  Cpu,
  Bot,
  Layers3,
  Workflow,
  Globe2,
} from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";

const STATUS_CONFIG = {
  AVAILABLE: {
    dot: "bg-emerald-500",
    label: "Available for new projects",
  },
  LIMITED: {
    dot: "bg-amber-500",
    label: "Limited availability",
  },
  BOOKED: {
    dot: "bg-rose-500",
    label: "Fully booked",
  },
} as const;

async function getAvailability() {
  try {
    return await db.availabilityStatus.findUnique({
      where: { id: "singleton" },
    });
  } catch {
    return null;
  }
}

const FLOATING_ICONS = [
  {
    icon: Code2,
    top: "12%",
    left: "4%",
    delay: "0s",
    duration: "8s",
    size: "h-8 w-8",
  },
  {
    icon: Cpu,
    top: "72%",
    left: "3%",
    delay: "1.2s",
    duration: "10s",
    size: "h-9 w-9",
  },
  {
    icon: Bot,
    top: "14%",
    left: "93%",
    delay: "0.6s",
    duration: "9s",
    size: "h-7 w-7",
  },
  {
    icon: Zap,
    top: "76%",
    left: "91%",
    delay: "1.8s",
    duration: "7s",
    size: "h-8 w-8",
  },
];

const SERVICES = [
  {
    number: "01",
    icon: Code2,
    title: "Full Stack",
    description: "Web applications built for speed, clarity, and scale.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Solutions",
    description: "Practical AI features that solve real business problems.",
  },
  {
    number: "03",
    icon: Workflow,
    title: "Automation",
    description: "Connected workflows that remove repetitive manual work.",
  },
];

const STATS = [
  {
    value: "50+",
    label: "Projects delivered",
    icon: Rocket,
  },
  {
    value: "40+",
    label: "Clients supported",
    icon: Globe2,
  },
  {
    value: "5+",
    label: "Years building",
    icon: Layers3,
  },
];

export async function ServicesHero() {
  const availability = await getAvailability();
  const config = availability
    ? STATUS_CONFIG[availability.status]
    : STATUS_CONFIG.AVAILABLE;

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          margin: "0 calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        {/* Main surface */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, rgba(99,102,241,0.025) 30%, rgba(99,102,241,0.055) 55%, rgba(99,102,241,0.025) 100%)",
          }}
        />

        {/* Center glow */}
        <div
          className="absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(79,70,229,0.09) 0%, rgba(79,70,229,0.035) 38%, transparent 72%)",
          }}
        />

        {/* Left glow */}
        <div
          className="absolute left-0 top-0 h-[420px] w-[420px]"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(99,102,241,0.07), transparent 70%)",
          }}
        />

        {/* Top border */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99,102,241,0.18), transparent)",
          }}
        />

        {/* Bottom border */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99,102,241,0.10), transparent)",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING ICONS
      ========================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes serviceFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
              50% {
                transform: translate3d(0, -14px, 0) rotate(4deg);
              }
            }

            .service-floating-icon {
              animation: serviceFloat var(--duration) ease-in-out infinite;
              animation-delay: var(--delay);
            }

            @media (prefers-reduced-motion: reduce) {
              .service-floating-icon {
                animation: none;
              }
            }
          `,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        {FLOATING_ICONS.map(
          ({ icon: Icon, top, left, delay, duration, size }, index) => (
            <div
              key={index}
              className="service-floating-icon absolute text-accent-indigo/[0.07]"
              style={
                {
                  top,
                  left,
                  "--delay": delay,
                  "--duration": duration,
                } as React.CSSProperties
              }
            >
              <Icon className={size} strokeWidth={1.25} />
            </div>
          )
        )}
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div className="relative mx-auto max-w-6xl px-6">
        {/* =======================================================
            TOP META ROW
        ======================================================== */}

        <Reveal>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-indigo/60" />

              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-indigo/70">
                Services
              </span>

              <span className="h-px w-8 bg-accent-indigo/20" />
            </div>

            {/* Availability */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.035] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`}
                />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {config.label}
              </span>
            </div>
          </div>
        </Reveal>

        {/* =======================================================
            HERO GRID
        ======================================================== */}

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* =====================================================
              LEFT — TYPOGRAPHY
          ====================================================== */}

          <div>
            <Reveal>
              <div className="mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted/45">
                  What I can build for you
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1
                className="font-bold tracking-[-0.04em] text-text-primary"
                style={{
                  fontSize: "clamp(3.1rem, 7vw, 5.8rem)",
                  lineHeight: "0.98",
                }}
              >
                Ideas Into
                <br />
                <span className="text-accent-indigo">Working Systems.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                I design and build modern digital products, AI-powered
                experiences, and automation systems that are made to be
                useful — not just impressive.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent-indigo/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-indigo/90 hover:shadow-xl hover:shadow-accent-indigo/30"
                  >
                    <Send
                      className="h-4 w-4"
                      strokeWidth={1.75}
                    />

                    <span>Start a Project</span>

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.75}
                    />
                  </button>
                </Link>

                <Link href="/projects">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-3.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.04] hover:text-accent-indigo"
                  >
                    View Work

                    <ArrowRight
                      className="h-4 w-4"
                      strokeWidth={1.75}
                    />
                  </button>
                </Link>
              </div>
            </Reveal>

            {/* Trust */}
            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-text-muted/50">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500/50" />
                  Clear communication
                </span>

                <span className="hidden text-accent-indigo/20 sm:inline">
                  ·
                </span>

                <span>Modern stack</span>

                <span className="hidden text-accent-indigo/20 sm:inline">
                  ·
                </span>

                <span>Global clients</span>
              </div>
            </Reveal>
          </div>

          {/* =====================================================
              RIGHT — SERVICES PANEL
          ====================================================== */}

          <Reveal delay={0.12}>
            <div className="relative">
              {/* Soft ambient glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent-indigo/[0.045] blur-3xl"
              />

              <div className="relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-bg-surface-1/70 p-4 shadow-[0_20px_70px_-25px_rgba(79,70,229,0.18)] backdrop-blur-sm sm:p-5">
                {/* Panel header */}
                <div className="mb-3 flex items-center justify-between border-b border-accent-indigo/10 px-2 pb-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-indigo/50">
                      Core capabilities
                    </p>

                    <p className="mt-1 text-xs text-text-muted/60">
                      Built around your actual needs
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/50" />
                  </div>
                </div>

                {/* Service cards */}
                <div className="space-y-2">
                  {SERVICES.map((service, index) => {
                    const Icon = service.icon;

                    return (
                      <div
                        key={service.number}
                        className="group relative overflow-hidden rounded-xl border border-accent-indigo/10 bg-bg-surface-1/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.025]"
                      >
                        {/* Hover accent */}
                        <div className="absolute inset-y-0 left-0 w-px bg-accent-indigo/0 transition-colors duration-300 group-hover:bg-accent-indigo/60" />

                        <div className="flex items-center gap-4">
                          {/* Number */}
                          <span className="w-6 shrink-0 font-mono text-[10px] text-accent-indigo/30">
                            {service.number}
                          </span>

                          {/* Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.045] transition-all duration-300 group-hover:border-accent-indigo/20 group-hover:bg-accent-indigo/[0.08]">
                            <Icon
                              className="h-4 w-4 text-accent-indigo/65 transition-colors duration-300 group-hover:text-accent-indigo"
                              strokeWidth={1.6}
                            />
                          </div>

                          {/* Text */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <h2 className="text-sm font-semibold text-text-primary">
                                {service.title}
                              </h2>

                              <ArrowRight
                                className="h-3.5 w-3.5 shrink-0 text-accent-indigo/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-indigo/60"
                                strokeWidth={1.6}
                              />
                            </div>

                            <p className="mt-1 text-[11px] leading-relaxed text-text-muted/65">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom panel */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/[0.07]">
                      <CheckCircle
                        className="h-3.5 w-3.5 text-emerald-500/60"
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted/50">
                      Strategy → Build → Launch
                    </span>
                  </div>

                  <span className="font-mono text-[9px] text-accent-indigo/30">
                    03
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            STATS
        ======================================================== */}

        <Reveal delay={0.2}>
          <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-accent-indigo/10 bg-bg-surface-1/40 sm:grid-cols-3">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={[
                    "group relative flex items-center gap-4 px-6 py-5 sm:px-7",
                    index !== 0
                      ? "border-t border-accent-indigo/10 sm:border-l sm:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.035]">
                    <Icon
                      className="h-4 w-4 text-accent-indigo/55 transition-colors group-hover:text-accent-indigo"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p className="font-mono text-xl font-bold tabular-nums tracking-tight text-text-primary">
                      {stat.value}
                    </p>

                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-text-muted/45">
                      {stat.label}
                    </p>
                  </div>

                  <span className="absolute right-5 top-4 font-mono text-[8px] text-accent-indigo/15">
                    0{index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* =======================================================
            BOTTOM SIGNATURE STRIP
        ======================================================== */}

        <Reveal delay={0.24}>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.02] px-4 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted/45">
              Digital products · AI · Automation
            </p>

            <div className="flex items-center gap-1.5">
              <span className="h-1 w-8 rounded-full bg-accent-indigo/35" />
              <span className="h-1 w-4 rounded-full bg-accent-indigo/20" />
              <span className="h-1 w-2 rounded-full bg-accent-indigo/10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}