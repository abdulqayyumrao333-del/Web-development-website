"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, HelpCircle, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords?: string;
};

// SEO-optimized FAQ data with detailed answers
const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "1",
    question: "How do we start a project?",
    category: "Process",
    keywords: "project start, development process, onboarding, kickoff",
    answer: "Starting a project is simple and straightforward. First, you send me a message through the contact form or reach out via email or WhatsApp. We'll schedule a discovery call to discuss your project requirements, timeline, and budget in detail. During this call, I'll ask clarifying questions to fully understand your vision and needs. Based on our discussion, I'll prepare a detailed proposal with a clear scope, timeline, and cost estimate. Once you approve the proposal, we'll kick off the project with a structured plan, milestones, and regular check-ins to ensure everything stays on track. I believe in transparent communication throughout the entire process, so you'll always know exactly what's happening and when.",
  },
  {
    id: "2",
    question: "Do you work remotely?",
    category: "Process",
    keywords: "remote work, distributed team, virtual collaboration, remote developer",
    answer: "Yes, I work 100% remotely. I've been working remotely for several years and have mastered the art of effective virtual collaboration. I use a modern tech stack for communication and project management including Slack, Zoom, Discord, and Microsoft Teams for real-time communication. For project tracking, I use tools like Jira, Trello, Notion, and Asana to keep everything organized and transparent. I'm experienced in working across different time zones and cultures, and I always prioritize clear, timely communication to ensure project success. Whether you're in North America, Europe, Asia, or the Middle East, I can seamlessly integrate with your team and workflow.",
  },
  {
    id: "3",
    question: "Do you build custom software?",
    category: "Technical",
    keywords: "custom software development, bespoke applications, tailored solutions, enterprise software",
    answer: "Absolutely. I specialize in building custom software solutions tailored to your specific business needs. Whether you need a full-stack web application, a mobile app, a complex backend system, API integrations, or an internal tool, I create scalable, maintainable, and high-performance software that solves real problems. I follow a systematic approach — from requirement analysis and architecture design to development, testing, and deployment. Every project is built with clean code, proper documentation, and modern best practices. I also consider future scalability, security, and performance right from the start, ensuring your software grows with your business.",
  },
  {
    id: "4",
    question: "Can you integrate AI into my application?",
    category: "Technical",
    keywords: "AI integration, artificial intelligence, machine learning, LLM integration, NLP",
    answer: "Yes! I develop AI-powered applications and solutions using cutting-edge technologies. I work with Large Language Models (LLMs) like GPT-4, Claude, and open-source models, Natural Language Processing (NLP) for text analysis, computer vision for image processing, and generative AI for content creation. Whether you need an intelligent chatbot, a recommendation system, an automation pipeline, predictive analytics, or a document processing system, I can help you leverage AI to transform your business operations. I focus on building practical, production-ready AI solutions that deliver real value — not just demos.",
  },
  {
    id: "5",
    question: "Do you provide ongoing support and maintenance?",
    category: "General",
    keywords: "ongoing support, maintenance, bug fixes, updates, retainer",
    answer: "Yes, I provide comprehensive ongoing support and maintenance after project delivery. This includes bug fixes, performance optimization, security updates, feature enhancements, and regular monitoring. I offer flexible support packages tailored to your needs — from ad-hoc assistance when you need it, to dedicated monthly retainers with guaranteed response times. I understand that software needs to evolve with your business, so I'm committed to being a long-term partner who helps you iterate and improve your product over time. All support is provided with the same quality and attention to detail as the initial development.",
  },
  {
    id: "6",
    question: "How can I contact you?",
    category: "General",
    keywords: "contact, reach out, email, WhatsApp, communication",
    answer: "You can reach me through multiple convenient channels. The fastest way is to use the contact form on this page — it goes directly to my inbox. You can also email me directly at the address listed on this page, or send me a message on WhatsApp for quick responses. I typically respond within 24 hours, often much faster during business hours. For urgent matters, WhatsApp is usually the quickest channel. I'm also available on LinkedIn for professional networking and collaboration discussions.",
  },
  {
    id: "7",
    question: "What technologies do you specialize in?",
    category: "Technical",
    keywords: "tech stack, technologies, programming languages, frameworks",
    answer: "I specialize in a modern full-stack development ecosystem. My core frontend stack includes Next.js, React, TypeScript, and Tailwind CSS. For backend development, I work with Node.js, Python, and serverless architectures. I have extensive experience with databases including PostgreSQL, MongoDB, and Redis. For AI/ML projects, I leverage LangChain, OpenAI API, Hugging Face, and various machine learning frameworks. I also work with cloud platforms like Vercel, AWS, and Google Cloud, and use Docker and CI/CD pipelines for DevOps. I'm constantly learning and adding new technologies to my toolkit to stay current with industry trends.",
  },
  {
    id: "8",
    question: "What is your typical project timeline?",
    category: "Process",
    keywords: "timeline, project duration, delivery time, development schedule",
    answer: "Project timelines vary based on scope and complexity. Small to medium projects typically take 2-6 weeks, while larger, more complex applications may require 2-4 months. I believe in transparent communication and provide regular updates throughout the development process with weekly or bi-weekly progress reports. Before starting, I work with you to define clear milestones and deliverables, ensuring we stay on track and aligned with your expectations. I also build in buffer time for testing and revisions to ensure the final product meets your quality standards.",
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function SearchableFaq({
  eyebrow = "FAQ",
  title = "Common questions",
}: {
  eyebrow?: string;
  title?: string;
}) {
  const [faqs, setFaqs] = useState<FaqItem[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      })
      .catch(() => setFaqs(DEFAULT_FAQS));
  }, []);

  const categories = useMemo(() => {
    if (!faqs) return ["All"];
    return ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  }, [faqs]);

  const filtered = useMemo(() => {
    if (!faqs) return [];
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory =
        activeCategory === "All" || f.category === activeCategory;
      const matchesQuery =
        q === "" ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [faqs, query, activeCategory]);

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
          className="absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(40% 70% at 65% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* LEFT — sticky label */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                {eyebrow}
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                {title.split(" ").map((word, i, arr) => {
                  // Make last word blue
                  if (i === arr.length - 1) {
                    return <span key={i} className="text-accent-indigo">{word}</span>;
                  }
                  return <span key={i}>{word} </span>;
                })}
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Search or browse by category to find what you need.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {faqs ? `${faqs.length} questions` : "Loading..."}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {faqs ? `${categories.length - 1} categories` : "..."}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Searchable
                </p>
              </div>
            </div>

            {/* category index — desktop */}
            {faqs && categories.length > 1 && (
              <div className="mt-8 hidden lg:flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className="flex items-center gap-2 group text-left"
                  >
                    <span
                      className={[
                        "font-mono text-[10px] w-4 text-right transition-colors duration-200",
                        activeCategory === cat
                          ? "text-accent-indigo"
                          : "text-accent-indigo/25 group-hover:text-accent-indigo/50",
                      ].join(" ")}
                    >
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="h-px w-3 bg-accent-indigo/20" />
                    <span
                      className={[
                        "font-mono text-[10px] uppercase tracking-wider transition-colors duration-200",
                        activeCategory === cat
                          ? "text-accent-indigo"
                          : "text-text-muted/50 group-hover:text-text-muted/80",
                      ].join(" ")}
                    >
                      {cat}
                    </span>
                    {activeCategory === cat && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-indigo" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* RIGHT — content */}
        <div className="relative">

          {/* ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
          />

          {/* LOADING STATE */}
          {faqs === null && (
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-14 w-full rounded-xl"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {faqs !== null && faqs.length === 0 && (
            <Reveal delay={0.06}>
              <div
                className={[
                  "relative overflow-hidden rounded-2xl border border-accent-indigo/12",
                  "bg-bg-surface-1/70 backdrop-blur-sm",
                  "flex flex-col items-center py-16 text-center",
                ].join(" ")}
                style={{ boxShadow: panelShadow }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 mb-4">
                  <HelpCircle className="h-5 w-5 text-accent-indigo/50" strokeWidth={1.75} />
                </div>
                <p className="font-mono text-sm text-text-muted">
                  FAQs will appear here once published.
                </p>
              </div>
            </Reveal>
          )}

          {/* POPULATED STATE */}
          {faqs !== null && faqs.length > 0 && (
            <>
              {/* Search + category filter row */}
              <Reveal delay={0.06}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">

                  {/* search input */}
                  <div className="relative w-full sm:w-64">
                    <Search
                      className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-accent-indigo/40"
                      strokeWidth={2}
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search questions..."
                      aria-label="Search FAQs"
                      className={[
                        "w-full rounded-xl border border-accent-indigo/12",
                        "bg-bg-surface-1/70 backdrop-blur-sm",
                        "py-2.5 pl-9 pr-4 text-sm text-text-secondary",
                        "placeholder:text-text-muted/50",
                        "outline-none transition-all duration-200",
                        "focus:border-accent-indigo/35 focus:bg-bg-surface-1",
                        "focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]",
                      ].join(" ")}
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted/40 hover:text-text-muted transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* category pills — mobile/tablet */}
                  <div className="flex flex-wrap gap-1.5 lg:hidden">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActiveCategory(c)}
                        aria-pressed={activeCategory === c}
                        className={[
                          "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider",
                          "transition-all duration-200",
                          activeCategory === c
                            ? "border-accent-indigo bg-accent-indigo text-white"
                            : "border-accent-indigo/15 text-text-muted/60 hover:border-accent-indigo/30 hover:text-accent-indigo",
                        ].join(" ")}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Results count */}
              <Reveal delay={0.08}>
                <div className="flex items-center gap-2 mb-3 text-xs text-text-muted/50">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</span>
                </div>
              </Reveal>

              {/* Accordion card */}
              <Reveal delay={0.1}>
                {filtered.length === 0 ? (
                  <div
                    className={[
                      "relative overflow-hidden rounded-2xl border border-accent-indigo/12",
                      "bg-bg-surface-1/70 backdrop-blur-sm px-8 py-12 text-center",
                    ].join(" ")}
                    style={{ boxShadow: panelShadow }}
                  >
                    <HelpCircle className="h-8 w-8 text-accent-indigo/30 mx-auto mb-2" strokeWidth={1.5} />
                    <p className="font-mono text-sm text-text-muted">
                      No questions match that search.
                    </p>
                    <p className="text-xs text-text-muted/40 mt-1">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  <div
                    className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* diagonal texture */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.35]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                        maskImage:
                          "linear-gradient(to bottom, black 0%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 0%, transparent 100%)",
                      }}
                    />

                    <Accordion
                      type="single"
                      collapsible
                      className="relative divide-y divide-accent-indigo/8"
                    >
                      {filtered.map((faq, i) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border-0"
                        >
                          <AccordionTrigger
                            className={[
                              "group px-6 py-4 sm:px-8 sm:py-5",
                              "hover:no-underline hover:bg-accent-indigo/[0.03]",
                              "transition-colors duration-200 w-full text-left",
                            ].join(" ")}
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              {/* index */}
                              <span
                                className={[
                                  "shrink-0 font-mono text-[11px] w-5 text-right select-none",
                                  "text-accent-indigo/25 group-hover:text-accent-indigo/55",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>

                              {/* category badge */}
                              <span
                                className={[
                                  "hidden sm:inline-block shrink-0 font-mono text-[9px]",
                                  "uppercase tracking-widest px-2 py-0.5 rounded-full",
                                  "border border-accent-indigo/12 text-accent-indigo/40",
                                  "group-hover:border-accent-indigo/25 group-hover:text-accent-indigo/65",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {faq.category}
                              </span>

                              {/* question */}
                              <span
                                className={[
                                  "text-sm sm:text-base font-medium min-w-0",
                                  "text-text-secondary group-hover:text-text-primary",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="px-6 pb-5 sm:px-8 sm:pb-6">
                              <div className="flex gap-4 pl-[3.25rem]">
                                <div className="w-0.5 shrink-0 rounded-full bg-accent-indigo/20 self-stretch" />
                                <div>
                                  <p className="text-sm text-text-secondary leading-relaxed">
                                    {faq.answer}
                                  </p>
                                  {/* Hidden SEO keywords */}
                                  {faq.keywords && (
                                    <span className="sr-only">{faq.keywords}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* bottom strip */}
                    <div
                      className={[
                        "flex items-center justify-between border-t border-accent-indigo/10",
                        "bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8",
                      ].join(" ")}
                    >
                      <p className="font-mono text-[11px] text-text-muted">
                        {`FAQ \u00B7 ${filtered.length} of ${faqs.length} shown`}
                      </p>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(filtered.length, 6) }).map(
                          (_, i) => (
                            <span
                              key={i}
                              className="h-1 w-2 rounded-full"
                              style={{
                                backgroundColor: `rgb(99 102 241 / ${Math.max(
                                  0.08,
                                  0.55 - i * 0.08
                                )})`,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  );
}