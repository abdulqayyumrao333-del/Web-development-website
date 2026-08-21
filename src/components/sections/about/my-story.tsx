import { Lightbulb, GraduationCap, Puzzle, Sparkles, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const STORY_CARDS = [
  {
    icon: Lightbulb,
    code: "ORIGIN",
    title: "How I Got Into Software",
    text: "My interest in software development grew during my Computer Science studies. As I started learning programming, I realized that software is not just about writing code — it is about solving real-world problems. What truly motivated me was seeing an idea turn into a working application. Building projects, experimenting with new technologies, and continuously improving them made me realize that software engineering is the field I want to dedicate my career to.",
    featured: true,
    quote: "Code is just a tool. The real value is in solving problems.",
    highlightPhrases: [
      "not just about writing code — it is about solving real-world problems",
      "idea turn into a working application",
      "field I want to dedicate my career to",
    ],
  },
  {
    icon: GraduationCap,
    code: "CS",
    title: "Why Computer Science",
    text: "I chose Computer Science because it combines creativity, logical thinking, and problem-solving. I enjoy breaking complex problems into smaller pieces and building practical solutions that people can actually use.",
    featured: false,
    badge: "Creativity + Logic",
  },
  {
    icon: Puzzle,
    code: "CRAFT",
    title: "What Engages Me About Problem Solving",
    text: "The most rewarding part is taking an idea from nothing to a working product. Whether designing a website, automating a workflow, or building an AI-powered application, I enjoy understanding the problem first, planning carefully, then improving through iteration.",
    featured: false,
    badge: "Ideas to Products",
  },
  {
    icon: Sparkles,
    code: "AI",
    title: "Why AI",
    text: "Artificial Intelligence represents one of the biggest shifts in software development. I am particularly interested in using AI to automate repetitive tasks, improve productivity, and build practical tools that solve real business problems rather than experimenting with AI for its own sake.",
    featured: false,
    badge: "Practical AI",
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Bold-highlight certain phrases inside a paragraph
function HighlightedText({
  text,
  phrases,
}: {
  text: string;
  phrases?: string[];
}) {
  if (!phrases || phrases.length === 0) {
    return <>{text}</>;
  }

  const escaped = phrases.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <span key={i} className="font-semibold text-accent-indigo">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function MyStory() {
  const featured = STORY_CARDS[0];
  const FeaturedIcon = featured.icon;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
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
          className="absolute inset-x-0 top-0 h-[400px]"
          style={{
            background:
              "radial-gradient(50% 80% at 15% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* LEFT */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                My Story
              </p>
            </div>

            <div className="relative mb-4">
              
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How I
                <br />
                <span className="text-accent-indigo">got here</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Four honest answers to the questions I get asked most.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                {STORY_CARDS.map(({ code, title }) => (
                  <p key={code} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/35" />
                    <span className="text-accent-indigo/50">{code}</span>
                    <span className="truncate max-w-[8rem] text-text-muted/60">
                      {title.split(" ").slice(0, 3).join(" ")}
                      {"…"}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/3 h-40 w-40 rounded-full bg-accent-indigo/5 blur-2xl"
            />

            <div className="flex flex-col gap-3.5">

              {/* FEATURED CARD */}
              <Reveal delay={0.12}>
                <div
                  className={[
                    "group relative overflow-hidden rounded-2xl border backdrop-blur-sm",
                    "border-accent-indigo/15 bg-bg-surface-1/80",
                    "transition-all duration-500 hover:border-accent-indigo/30",
                  ].join(" ")}
                  style={{ boxShadow: panelShadow }}
                >
                  {/* hover wash */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-indigo/[0.06] via-transparent to-accent-indigo/[0.03] pointer-events-none"
                  />

                  {/* diagonal texture */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                      maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                    }}
                  />

                  {/* top-right bracket */}
                  <div
                    aria-hidden
                    className="absolute top-4 right-4 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                  />

                  <div className="relative grid md:grid-cols-[auto_1fr] gap-0">

                    {/* left accent strip */}
                    <div className="hidden md:flex flex-col items-center justify-between gap-4 px-6 py-8 border-r border-accent-indigo/10 bg-accent-indigo/[0.02]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/20 bg-accent-indigo/10 group-hover:bg-accent-indigo/16 transition-colors duration-300">
                        <FeaturedIcon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <span
                        className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent-indigo/35 group-hover:text-accent-indigo/60 transition-colors duration-300"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {featured.code}
                      </span>
                      <div className="w-px h-8 bg-gradient-to-b from-accent-indigo/20 to-transparent" />
                    </div>

                    {/* mobile icon */}
                    <div className="md:hidden flex items-center gap-3 px-6 pt-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-indigo/20 bg-accent-indigo/10">
                        <FeaturedIcon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent-indigo/50">
                        {featured.code}
                      </span>
                    </div>

                    {/* content */}
                    <div className="px-6 py-7 sm:px-9 sm:py-9">
                      <h3 className="font-bold text-xl sm:text-2xl leading-snug mb-3 tracking-tight">
                        {featured.title}
                      </h3>

                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        <HighlightedText
                          text={featured.text}
                          phrases={featured.highlightPhrases}
                        />
                      </p>

                      {/* pull quote */}
                      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.04] p-3.5">
                        <Quote
                          className="h-4 w-4 text-accent-indigo/40 shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <p className="text-xs text-text-muted italic leading-relaxed">
                          {featured.quote}
                        </p>
                      </div>

                      {/* bottom row */}
                      <div className="mt-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-accent-indigo/30 to-transparent" />
                        <ArrowRight
                          className="h-4 w-4 text-accent-indigo/30 group-hover:text-accent-indigo/70 group-hover:translate-x-1 transition-all duration-300"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* SMALLER CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {STORY_CARDS.slice(1).map(({ icon: Icon, code, title, text, badge }, i) => (
                  <Reveal key={code} delay={0.18 + i * 0.07}>
                    <div
                      className={[
                        "group relative overflow-hidden rounded-2xl border backdrop-blur-sm",
                        "border-accent-indigo/12 bg-bg-surface-1/70",
                        "transition-all duration-300 hover:border-accent-indigo/28 h-full",
                      ].join(" ")}
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* hover wash */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-indigo/[0.05] to-transparent"
                      />

                      {/* diagonal texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.35]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                      />

                      {/* code top-right */}
                      <span className="absolute top-4 right-4 font-mono text-[10px] text-accent-indigo/25 group-hover:text-accent-indigo/55 transition-colors duration-300 select-none">
                        {code}
                      </span>

                      <div className="relative flex flex-col gap-3 p-5 sm:p-6 h-full">
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-colors duration-300">
                            <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                          </div>
                          {badge && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-accent-indigo/30 group-hover:text-accent-indigo/60 transition-colors duration-300 px-2 py-0.5 rounded-full border border-accent-indigo/8 bg-accent-indigo/[0.03]">
                              {badge}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-sm leading-snug mb-2">
                            {title}
                          </h3>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {text}
                          </p>
                        </div>

                        {/* expanding bottom line */}
                        <div className="h-px w-0 group-hover:w-full rounded-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-500" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                STORY · BACKGROUND · 4 CHAPTERS
              </p>
              <div className="flex gap-1">
                {STORY_CARDS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full"
                    style={{
                      width: i === 0 ? "1.5rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.08, 0.20 - i * 0.04)})`,
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