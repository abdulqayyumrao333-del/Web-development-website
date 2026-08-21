import { Reveal } from "@/components/sections/reveal";
import { Check, Sparkles, Clock, Layers, Code2, FileText, Users, Target, Zap } from "lucide-react";

const ROWS: { label: string; values: string[]; icon: React.ReactNode }[] = [
  { 
    label: "Purpose", 
    values: ["Personal presence", "Business presence", "Product/platform", "Intelligent feature", "Process efficiency"],
    icon: <Target className="h-4 w-4" strokeWidth={1.75} />
  },
  { 
    label: "Audience", 
    values: ["Recruiters/clients", "Customers", "End users", "End users", "Internal team"],
    icon: <Users className="h-4 w-4" strokeWidth={1.75} />
  },
  { 
    label: "Typical Timeline", 
    values: ["1–2 weeks", "2–3 weeks", "5+ weeks", "3–5 weeks", "2–3 weeks"],
    icon: <Clock className="h-4 w-4" strokeWidth={1.75} />
  },
  { 
    label: "Typical Complexity", 
    values: ["Low–Medium", "Medium", "High", "Medium–High", "Medium"],
    icon: <Layers className="h-4 w-4" strokeWidth={1.75} />
  },
  { 
    label: "Core Tech", 
    values: ["Next.js, Tailwind", "Next.js, CMS", "Full stack + auth + billing", "AI API + backend", "Node.js, automation tools"],
    icon: <Code2 className="h-4 w-4" strokeWidth={1.75} />
  },
  { 
    label: "Deliverables", 
    values: ["Site + source", "Site + CMS + source", "App + admin + docs + source", "AI feature + integration + docs", "Scripts/workflows + docs"],
    icon: <FileText className="h-4 w-4" strokeWidth={1.75} />
  },
];

const COLUMNS = [
  { label: "Portfolio Website", color: "from-blue-500/10 to-cyan-500/10", icon: "🎨" },
  { label: "Business Website", color: "from-indigo-500/10 to-purple-500/10", icon: "🏢" },
  { label: "SaaS", color: "from-emerald-500/10 to-teal-500/10", icon: "☁️" },
  { label: "AI Application", color: "from-rose-500/10 to-pink-500/10", icon: "🧠" },
  { label: "Automation", color: "from-amber-500/10 to-orange-500/10", icon: "⚡" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ServiceComparisonTable() {
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
                Compare
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Which fits
                <br />
                <span className="text-accent-indigo">what you need</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A quick comparison to help you identify the right service for your needs.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {COLUMNS.length} services
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {ROWS.length} criteria
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Side by side
                </p>
              </div>
            </div>

            {/* Row list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {ROWS.map((row, i) => (
                <div key={row.label} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="text-accent-indigo/30 group-hover:text-accent-indigo/50 transition-colors">
                    {row.icon}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[6rem]">
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Table ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
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

              <div className="relative overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-accent-indigo/8">
                      <th className="p-4 text-left text-text-muted/40 w-[120px]">
                        <span className="font-mono text-[10px] uppercase tracking-wider">Feature</span>
                      </th>
                      {COLUMNS.map((col, i) => (
                        <th key={col.label} className="p-4 text-left">
                          <div className={`inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/15 bg-gradient-to-br ${col.color} px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70`}>
                            <span>{col.icon}</span>
                            {col.label}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-accent-indigo/8">
                    {ROWS.map((row) => (
                      <tr key={row.label} className="group hover:bg-accent-indigo/[0.02] transition-colors duration-200">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-accent-indigo/40 group-hover:text-accent-indigo/60 transition-colors">
                              {row.icon}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted/50 group-hover:text-text-muted/70 transition-colors">
                              {row.label}
                            </span>
                          </div>
                        </td>
                        {row.values.map((val, i) => (
                          <td key={i} className="p-4 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* bottom strip */}
              <div className="flex items-center justify-between border-t border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8">
                <p className="font-mono text-[11px] text-text-muted">
                  COMPARISON · {COLUMNS.length} SERVICES · {ROWS.length} CRITERIA
                </p>
                <div className="flex gap-1">
                  {COLUMNS.map((_, i) => (
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}