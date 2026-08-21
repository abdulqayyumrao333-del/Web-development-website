"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle, Rocket, Zap } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { FeaturedProjectCard } from "@/components/sections/projects/featured-project-card";
import type { Service, Project } from "@/types";

type Answers = {
  building: string | null;
  audience: string | null;
  needsAI: boolean | null;
  needsDashboard: boolean | null;
  needsDeployment: boolean | null;
};

const QUESTIONS: { key: keyof Answers; question: string; options: { label: string; value: string | boolean; icon?: string }[] }[] = [
  { key: "building", question: "What are you building?", options: [
    { label: "Website", value: "Personal", icon: "🌐" },
    { label: "SaaS", value: "SaaS", icon: "☁️" },
    { label: "AI App", value: "AI", icon: "🧠" },
    { label: "Automation", value: "Automation", icon: "⚡" },
  ]},
  { key: "audience", question: "Who is it for?", options: [
    { label: "Business", value: "Business", icon: "🏢" },
    { label: "Startup", value: "Startup", icon: "🚀" },
    { label: "Student", value: "Student", icon: "🎓" },
    { label: "Personal", value: "Personal", icon: "👤" },
  ]},
  { key: "needsAI", question: "Do you need AI?", options: [{ label: "Yes", value: true, icon: "✅" }, { label: "No", value: false, icon: "❌" }] },
  { key: "needsDashboard", question: "Do you need an Admin Dashboard?", options: [{ label: "Yes", value: true, icon: "✅" }, { label: "No", value: false, icon: "❌" }] },
  { key: "needsDeployment", question: "Do you need Deployment?", options: [{ label: "Yes", value: true, icon: "✅" }, { label: "No", value: false, icon: "❌" }] },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

function recommendCategory(answers: Answers): string {
  if (answers.needsAI) return "AI";
  if (answers.building) return answers.building;
  return "Full Stack";
}

export function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    building: null, audience: null, needsAI: null, needsDashboard: null, needsDeployment: null,
  });
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/projects").then((r) => (r.ok ? r.json() : [])),
    ]).then(([s, p]) => {
      setServices(s);
      setProjects(p);
    }).catch(() => {
      setServices([]);
      setProjects([]);
    });
  }, []);

  const done = step >= QUESTIONS.length;
  const category = recommendCategory(answers);
  const matchedServices = services.filter((s) => s.category === category);
  const matchedProjects = projects.filter((p) => p.categories.includes(category)).slice(0, 2);

  function answer(key: keyof Answers, value: string | boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setStep(0);
    setAnswers({ building: null, audience: null, needsAI: null, needsDashboard: null, needsDeployment: null });
  }

  const progress = Math.round((step / QUESTIONS.length) * 100);

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
                Solution Finder
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Find the
                <br />
                <span className="text-accent-indigo">right fit</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Answer a few questions to get a tailored recommendation.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {QUESTIONS.length} questions
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {done ? "Completed" : `${progress}% done`}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  {done ? "See results" : "Answer to proceed"}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Finder Card ══ */}
        <Reveal delay={0.1}>
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
                {!done ? (
                  <>
                    {/* ── Progress Bar ── */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-accent-indigo/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-accent-indigo/60 to-accent-indigo transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-accent-indigo/50">
                        {step}/{QUESTIONS.length}
                      </span>
                    </div>

                    {/* ── Question ── */}
                    <p className="text-lg font-semibold text-text-primary">
                      {QUESTIONS[step].question}
                    </p>

                    {/* ── Options ── */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {QUESTIONS[step].options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => answer(QUESTIONS[step].key, opt.value)}
                          className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50 px-4 py-3.5 text-sm transition-all duration-300 hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.04] hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{opt.icon}</span>
                            <span className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                              {opt.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* ── Back Button ── */}
                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm text-text-muted/50 hover:text-text-muted transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Back
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {/* ── Results ── */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-indigo/10">
                        <Sparkles className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/60">
                          Recommended for you
                        </p>
                        <p className="font-semibold text-text-primary">
                          {category} Solutions
                        </p>
                      </div>
                    </div>

                    {/* ── Services ── */}
                    {matchedServices.length > 0 ? (
                      <div className="space-y-3">
                        {matchedServices.map((s) => (
                          <div
                            key={s.id}
                            className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50 p-4 transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-text-primary group-hover:text-accent-indigo transition-colors">
                                  {s.title}
                                </p>
                                <p className="mt-1 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors">
                                  {s.shortDescription}
                                </p>
                              </div>
                              <CheckCircle className="h-5 w-5 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" strokeWidth={2} />
                            </div>
                            {s.techStack.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {s.techStack.slice(0, 3).map((t) => (
                                  <span
                                    key={t}
                                    className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60"
                                  >
                                    <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        No exact service match yet — reach out directly and we'll figure out the right approach.
                      </p>
                    )}

                    {/* ── Related Projects ── */}
                    {matchedProjects.length > 0 && (
                      <div className="mt-6">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50 mb-3">
                          Similar Work
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {matchedProjects.map((p) => (
                            <FeaturedProjectCard key={p.id} project={p} index={0} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── Actions ── */}
                    <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-accent-indigo/8">
                      <Link href="/contact">
                        <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
                          <Rocket className="h-4 w-4" strokeWidth={1.75} />
                          Start a Project
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                        </button>
                      </Link>
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.03] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <Zap className="h-4 w-4" strokeWidth={1.75} />
                        Start Over
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}