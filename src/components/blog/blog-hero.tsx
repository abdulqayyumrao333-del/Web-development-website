import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { BookOpen, PenLine, Sparkles, ArrowRight, Code2, Layers, Zap } from "lucide-react";
import Link from "next/link";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function BlogHero() {
  let totalArticles = 0;
  let topicsCovered = 0;

  try {
    const [count, categories] = await Promise.all([
      db.blogPost.count({ where: { status: "PUBLISHED" } }),
      db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { category: true }, distinct: ["category"] }),
    ]);
    totalArticles = count;
    topicsCovered = categories.length;
  } catch {
    totalArticles = 0;
    topicsCovered = 0;
  }

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
              "radial-gradient(50% 70% at 50% 0%, rgba(79,70,229,0.09) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Decorative floating elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-accent-indigo/5 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border border-accent-indigo/5 animate-[spin_15s_linear_infinite]" />
        <div className="absolute top-1/3 right-5 w-16 h-16 rounded-full border border-accent-indigo/5 animate-[spin_25s_linear_infinite]" />
        <div className="absolute top-2/3 left-5 w-12 h-12 rounded-full border border-accent-indigo/5 animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center text-center">

        {/* ── Top Decorative Line ── */}
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-indigo/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent-indigo/40">
              Blog
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-indigo/20" />
          </div>
        </Reveal>

        {/* ── Heading ── */}
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-text-primary">
            Writing on
            <br />
            <span className="text-accent-indigo">building real software</span>
          </h1>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            Notes on full-stack development, AI-integrated features, and the engineering
            decisions behind them — from Abdul Qayyum.
          </p>
        </Reveal>

        {/* ── Stats Row ── */}
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-12">
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5 text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors" strokeWidth={1.75} />
                <span className="text-3xl sm:text-4xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors">
                  {totalArticles}
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 mt-1 group-hover:text-text-muted/60 transition-colors">
                Articles
              </p>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2">
                <Layers className="h-5 w-5 text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors" strokeWidth={1.75} />
                <span className="text-3xl sm:text-4xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors">
                  {topicsCovered}
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 mt-1 group-hover:text-text-muted/60 transition-colors">
                Topics Covered
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Topic Tags ── */}
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Full Stack", "AI Development", "Web Performance", "Engineering"].map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-3.5 py-1.5 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/25 transition-all duration-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30" />
                {topic}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#articles">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-base shadow-lg shadow-accent-indigo/25 hover:shadow-xl hover:shadow-accent-indigo/40 transition-all duration-300 hover:-translate-y-1">
                <PenLine className="h-5 w-5" strokeWidth={1.75} />
                <span>Read Latest Articles</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
              </button>
            </a>

            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5">
                <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                Browse All
              </button>
            </Link>
          </div>
        </Reveal>

        {/* ── Trust Indicators ── */}
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-text-muted/40">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
              {totalArticles} articles
            </span>
            <span className="text-accent-indigo/20">|</span>
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
              Real engineering
            </span>
            <span className="text-accent-indigo/20">|</span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
              Practical insights
            </span>
          </div>
        </Reveal>

        {/* ── Bottom Decorative Line ── */}
        <Reveal delay={0.28}>
          <div className="mt-10 flex items-center gap-4 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted/20 whitespace-nowrap">
              Learn · Build · Ship
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}