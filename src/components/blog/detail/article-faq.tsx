import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { HelpCircle, Sparkles, ChevronDown } from "lucide-react";

type Faq = { question: string; answer: string };

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ArticleFaq({ faqs }: { faqs: unknown }) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  const items = faqs as Faq[];

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-12 sm:py-16">

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
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
          <HelpCircle className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            Frequently Asked <span className="text-accent-indigo">Questions</span>
          </h2>
          <p className="text-xs text-text-muted/50 mt-0.5">
            {items.length} questions · Quick answers
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-text-muted/20">
          <Sparkles className="h-3 w-3" strokeWidth={1.5} />
          <span>FAQ</span>
        </div>
      </div>

      <FaqJsonLd items={items} />

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

        <div className="relative divide-y divide-accent-indigo/8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, i) => (
              <AccordionItem key={i} value={`article-faq-${i}`} className="border-0">
                <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline hover:bg-accent-indigo/[0.03] transition-colors duration-200 group">
                  <div className="flex items-center gap-3 w-full text-left">
                    <span className="font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors duration-300 w-5 text-right shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-sm sm:text-base text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span className="ml-auto shrink-0 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" strokeWidth={1.75} />
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="flex gap-4 pl-[3.25rem]">
                      <div className="w-0.5 shrink-0 rounded-full bg-accent-indigo/15 self-stretch" />
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* bottom strip */}
        <div className="flex items-center justify-between border-t border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8">
          <p className="font-mono text-[11px] text-text-muted">
            FAQ · {items.length} QUESTIONS · QUICK ANSWERS
          </p>
          <div className="flex gap-1">
            {items.map((_, i) => (
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
    </section>
  );
}