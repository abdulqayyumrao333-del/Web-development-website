"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Search, Sparkles, HelpCircle, 
  ChevronDown, X, CheckCircle 
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/config/faq";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ── Get all questions ──
  const allQuestions = useMemo(() => {
    return FAQ_DATA.categories.flatMap((category) =>
      category.questions.map((q) => ({
        ...q,
        category: category.name,
        categoryId: category.id,
      }))
    );
  }, []);

  // ── Filter questions ──
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allQuestions.filter((q) => {
      const matchesSearch = query === "" ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.keywords?.toLowerCase().includes(query);
      
      const matchesCategory = !activeCategory || q.categoryId === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allQuestions, searchQuery, activeCategory]);

  // ── Categories with counts ──
  const categoriesWithCounts = FAQ_DATA.categories.map((cat) => ({
    ...cat,
    count: allQuestions.filter((q) => q.categoryId === cat.id).length,
  }));

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
                FAQ
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Frequently
                <br />
                <span className="text-accent-indigo">Asked Questions</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Find answers to the most commonly asked questions.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {allQuestions.length} questions
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {FAQ_DATA.categories.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Searchable
                </p>
              </div>
            </div>

            {/* Category list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {categoriesWithCounts.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-accent-indigo/10 text-accent-indigo font-medium"
                      : "text-text-muted/60 hover:text-text-muted hover:bg-accent-indigo/[0.03]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12" />
                  <span className="text-base">{cat.icon}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    {cat.name}
                  </span>
                  <span className="ml-auto text-[8px] text-accent-indigo/20">
                    {cat.count}
                  </span>
                  {activeCategory === cat.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo" />
                  )}
                </button>
              ))}
            </div>

            {/* Back link */}
            <Link
              href="/"
              className="mt-8 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
              <span>Back to Home</span>
            </Link>
          </div>
        </Reveal>

        {/* ══ RIGHT ── FAQ Content ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div className="flex flex-col gap-4">
              {/* ── Search & Filter Bar ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-4 sm:p-5"
                style={{ boxShadow: panelShadow }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-16 opacity-[0.3]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  }}
                />

                <div className="relative flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-indigo/30" strokeWidth={1.75} />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 py-2.5 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted/30 focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-muted transition-colors"
                      >
                        <X className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    )}
                  </div>

                  {/* Category pills - mobile */}
                  <div className="flex flex-wrap gap-1.5 lg:hidden">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        !activeCategory
                          ? "bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20"
                          : "bg-accent-indigo/[0.03] text-text-muted/60 border border-accent-indigo/8"
                      }`}
                    >
                      All
                    </button>
                    {categoriesWithCounts.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          activeCategory === cat.id
                            ? "bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20"
                            : "bg-accent-indigo/[0.03] text-text-muted/60 border border-accent-indigo/8"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results count */}
                <div className="relative mt-2 flex items-center gap-2 text-xs text-text-muted/50">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  <span>{filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} found</span>
                  {activeCategory && (
                    <>
                      <span className="text-accent-indigo/20">·</span>
                      <span className="text-accent-indigo/40">
                        Category: {categoriesWithCounts.find(c => c.id === activeCategory)?.name}
                      </span>
                    </>
                  )}
                  {searchQuery && (
                    <>
                      <span className="text-accent-indigo/20">·</span>
                      <span className="text-accent-indigo/40">Search: "{searchQuery}"</span>
                    </>
                  )}
                </div>
              </div>

              {/* ── FAQ Accordion ── */}
              {filteredQuestions.length === 0 ? (
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                  style={{ boxShadow: panelShadow }}
                >
                  <HelpCircle className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    No questions found matching your search.
                  </p>
                  <p className="text-xs text-text-muted/50 mt-1">
                    Try adjusting your search terms or category filter
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
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                      maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                    }}
                  />

                  <Accordion
                    type="single"
                    collapsible
                    className="relative divide-y divide-accent-indigo/8"
                  >
                    {filteredQuestions.map((q, i) => (
                      <AccordionItem
                        key={q.id}
                        value={q.id}
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
                              {q.category}
                            </span>

                            {/* question */}
                            <span
                              className={[
                                "text-sm sm:text-base font-medium min-w-0",
                                "text-text-secondary group-hover:text-text-primary",
                                "transition-colors duration-200",
                              ].join(" ")}
                            >
                              {q.question}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="px-6 pb-5 sm:px-8 sm:pb-6">
                            <div className="flex gap-4 pl-[3.25rem]">
                              <div className="w-0.5 shrink-0 rounded-full bg-accent-indigo/20 self-stretch" />
                              <div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                  {q.answer}
                                </p>
                                {q.keywords && (
                                  <span className="sr-only">{q.keywords}</span>
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
                      {`FAQ \u00B7 ${filteredQuestions.length} of ${allQuestions.length} shown`}
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(filteredQuestions.length, 6) }).map(
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

              {/* ── Still have questions? ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-accent-indigo/[0.03] to-bg-surface-1/50 p-5 sm:p-6"
                style={{ boxShadow: panelShadow }}
              >
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8">
                      <HelpCircle className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Still have questions?
                      </p>
                      <p className="text-xs text-text-muted/60">
                        I'm here to help — reach out anytime.
                      </p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
                      Contact Me
                      <CheckCircle className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}