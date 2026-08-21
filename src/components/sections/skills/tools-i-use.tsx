import { Wrench, Code2, Server, Database, Cloud, Sparkles, Layers, Zap, Monitor, Terminal, GitBranch, Package } from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";

// Tool icons mapping based on tool name
const toolIcons: Record<string, any> = {
  "VS Code": Code2,
  "Git": GitBranch,
  "GitHub": GitBranch,
  "Docker": Package,
  "Postman": Zap,
  "Vercel": Cloud,
  "Render": Cloud,
  "Netlify": Cloud,
  "Figma": Layers,
  "Slack": Monitor,
  "Discord": Monitor,
  "Terminal": Terminal,
  "PowerShell": Terminal,
  "Oh My Posh": Sparkles,
};

// Fallback icon
const FallbackIcon = Wrench;

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function ToolsIUse() {
  let tools: { id: string; name: string; description: string | null }[] = [];
  try {
    tools = await db.skill.findMany({
      where: { category: "Tools", visible: true },
      orderBy: { order: "asc" },
    });
  } catch {
    tools = [];
  }

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
                Tools I Use
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Day-to-day
                <br />
                <span className="text-accent-indigo">toolkit</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The essential tools and software I use daily to write code, debug issues, and ship products.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {tools.length} tools
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Battle-tested
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Daily drivers
                </p>
              </div>
            </div>

            {/* Tool categories */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {[
                { label: "Editors", icon: Code2 },
                { label: "Version Control", icon: GitBranch },
                { label: "Containerization", icon: Package },
                { label: "Cloud", icon: Cloud },
                { label: "Design", icon: Layers },
                { label: "Communication", icon: Monitor },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <item.icon className="h-3 w-3 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors" strokeWidth={1.75} />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Tools Grid ══ */}
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

            {tools.length === 0 ? (
              <Reveal delay={0.08}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                  style={{ boxShadow: panelShadow }}
                >
                  <Wrench className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    Tools will appear here once published.
                  </p>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tools.map((tool, i) => {
                    const Icon = toolIcons[tool.name] || FallbackIcon;
                    return (
                      <Reveal key={tool.id} delay={0.12 + i * 0.04}>
                        <div
                          className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-1 p-4 text-center"
                          style={{ boxShadow: panelShadow }}
                        >
                          {/* hover gradient */}
                          <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.05] via-transparent to-transparent"
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

                          <div className="relative">
                            {/* Icon with glow */}
                            <div className="relative inline-block">
                              <div className="absolute inset-0 rounded-full bg-accent-indigo/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10 mx-auto">
                                <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                              </div>
                            </div>

                            {/* Tool name */}
                            <p className="mt-2.5 text-sm font-medium text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                              {tool.name}
                            </p>

                            {/* Description if available */}
                            {tool.description && (
                              <p className="mt-0.5 text-[10px] text-text-muted/60 group-hover:text-text-muted/80 transition-colors line-clamp-2">
                                {tool.description}
                              </p>
                            )}

                            {/* Index number */}
                            <span className="absolute bottom-1 right-1 font-mono text-[8px] text-accent-indigo/10 group-hover:text-accent-indigo/25 transition-colors">
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

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    TOOLS · {tools.length} DAILY DRIVERS · BATTLE-TESTED
                  </p>
                  <div className="flex gap-1">
                    {tools.slice(0, 6).map((_, i) => (
                      <span
                        key={i}
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: i === 0 ? "1.25rem" : "0.5rem",
                          backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.06)})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}