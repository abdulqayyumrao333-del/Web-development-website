import type { Project } from "@/types";
import { Reveal } from "@/components/sections/reveal";
import { Lightbulb, BookOpen, Code2, Rocket, Sparkles } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

interface TextSectionProps {
  eyebrow: string;
  title: string;
  content: string | null;
  icon?: React.ReactNode;
  delay?: number;
}

function TextSection({ 
  eyebrow, 
  title, 
  content, 
  icon,
  delay = 0 
}: TextSectionProps) {
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
                {eyebrow}
              </p>
            </div>

            <div className="relative mb-4">
              <div className="flex items-center gap-3">
                {icon && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 text-accent-indigo">
                    {icon}
                  </span>
                )}
                <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                  {title.split(" ").map((word, i, arr) => {
                    // Make last 2 words blue
                    if (i >= arr.length - 2) {
                      return <span key={i} className="text-accent-indigo">{word} </span>;
                    }
                    return <span key={i}>{word} </span>;
                  })}
                </h2>
              </div>
            </div>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Key insight
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {content ? "Available" : "Coming soon"}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Read below
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Content ─═ */}
        <Reveal delay={delay}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
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
                {content ? (
                  <div className="space-y-4">
                    {/* Split content into paragraphs */}
                    {content.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={`text-base sm:text-lg text-text-secondary leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/12 bg-accent-indigo/6 mb-4">
                      <Sparkles className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm text-text-secondary">
                      Detailed documentation will be added soon.
                    </p>
                    <p className="text-xs text-text-muted/50 mt-1">
                      This section is being prepared
                    </p>
                  </div>
                )}

                {/* bottom accent line */}
                {content && (
                  <div className="mt-6 h-px w-12 rounded-full bg-accent-indigo/20 group-hover:w-24 transition-all duration-700" />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Export Components ──

export function ProjectChallenges({ project }: { project: Project }) {
  return (
    <TextSection 
      eyebrow="Challenges" 
      title="What was hard" 
      content={project.caseStudyChallenges}
      icon={<Lightbulb className="h-4 w-4" strokeWidth={1.75} />}
      delay={0.1}
    />
  );
}

export function ProjectLessons({ project }: { project: Project }) {
  return (
    <TextSection 
      eyebrow="Lessons Learned" 
      title="What this taught me" 
      content={project.caseStudyLessons}
      icon={<BookOpen className="h-4 w-4" strokeWidth={1.75} />}
      delay={0.15}
    />
  );
}

export function ProjectTechInsights({ project }: { project: Project }) {
  if (!project.techInsights) return null;
  return (
    <TextSection 
      eyebrow="Tech Insights" 
      title="Why these choices" 
      content={project.techInsights}
      icon={<Code2 className="h-4 w-4" strokeWidth={1.75} />}
      delay={0.2}
    />
  );
}

export function ProjectFutureRoadmap({ project }: { project: Project }) {
  if (!project.futureRoadmap) return null;
  return (
    <TextSection 
      eyebrow="Future Roadmap" 
      title="What's next for this project" 
      content={project.futureRoadmap}
      icon={<Rocket className="h-4 w-4" strokeWidth={1.75} />}
      delay={0.25}
    />
  );
}