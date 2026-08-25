"use client";

import { Reveal } from "@/components/sections/reveal";
import { m, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Briefcase, Globe, Users, Mail, Clock,
  MapPin, Rocket, Code2, Zap, ArrowRight,
} from "lucide-react";

const FAQS = [
  {
    q: "Are you available for freelance work?",
    a: "Absolutely! I'm currently available for freelance projects and collaborations. Whether you need a full-stack application, an AI-powered solution, or a complete web automation system, I'm ready to bring your ideas to life. I work flexibly with clients worldwide and can adapt to your project timeline and requirements.",
    icon: Briefcase,
    code: "WORK",
  },
  {
    q: "Do you work remotely?",
    a: "Yes, 100% remotely. I use modern tools like Slack, Zoom, Discord, and project platforms like Jira, Trello, or Notion to ensure seamless communication and project tracking.",
    icon: Globe,
    code: "REMOTE",
  },
  {
    q: "Are you open to international clients?",
    a: "Absolutely! I've collaborated with businesses and startups from North America, Europe, Asia, and the Middle East. I'm comfortable working across time zones and always prioritize clear communication.",
    icon: Users,
    code: "GLOBAL",
  },
  {
    q: "What's the preferred way to reach you?",
    a: "The best way is through email or WhatsApp. For urgent matters, WhatsApp is usually the fastest. I also connect professionally via LinkedIn.",
    icon: Mail,
    code: "CONTACT",
  },
  {
    q: "What's your typical response time?",
    a: "Within 24 hours — usually much faster. Often 2-4 hours during business hours. WhatsApp is best for urgent matters.",
    icon: Clock,
    code: "RESPONSE",
  },
  {
    q: "What time zone are you in?",
    a: "Pakistan Standard Time (PKT), UTC+5. I'm flexible with hours and can schedule meetings that work for your time zone.",
    icon: MapPin,
    code: "PKT",
  },
  {
    q: "Do you work with startups?",
    a: "Yes — I love it. I understand the fast-paced startup environment and bring both technical expertise and business thinking to help you build, iterate, and ship quickly.",
    icon: Rocket,
    code: "STARTUP",
  },
  {
    q: "Do you build custom software?",
    a: "Absolutely. From full-stack web apps and APIs to complex backend systems, I build scalable, maintainable software tailored to your specific business needs.",
    icon: Code2,
    code: "CUSTOM",
  },
  {
    q: "Do you build AI-powered applications?",
    a: "Yes. I work with LLMs, NLP, computer vision, and generative AI. From chatbots to automation pipelines and prediction systems — I can add AI capabilities to your project.",
    icon: Zap,
    code: "AI",
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AboutFaq() {
  const reduceMotion = useReducedMotion();

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
              "radial-gradient(45% 70% at 85% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                FAQ
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Common
                <br />
                <span className="text-accent-indigo">questions</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Everything you might want to know before reaching out.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {FAQS.length} questions
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Honest answers
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Updated regularly
                </p>
              </div>
            </div>

            {/* CTA block */}
            <div
              className="mt-8 relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-bg-surface-1/70 backdrop-blur-sm p-5"
              style={{ boxShadow: panelShadow }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />
              <p className="relative text-base font-semibold text-text-primary">
                Still have questions?
              </p>
              <p className="relative mt-0.5 text-sm text-text-muted leading-relaxed">
                {"I'm here to help — reach out anytime."}
              </p>
              <a
                href="/contact"
                className={[
                  "group relative mt-4 inline-flex items-center gap-2 rounded-lg",
                  "border border-accent-indigo/30 bg-accent-indigo/10",
                  "px-4 py-2 text-xs font-medium text-accent-indigo",
                  "transition-all duration-200 hover:bg-accent-indigo/18 hover:border-accent-indigo/45",
                ].join(" ")}
              >
                Contact Me
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — accordion */}
        <Reveal delay={0.1}>
          <div className="relative">

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
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              <m.div
                variants={reduceMotion ? undefined : containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Accordion
                  type="single"
                  collapsible
                  className="relative divide-y divide-accent-indigo/8"
                >
                  {FAQS.map((faq, i) => {
                    const Icon = faq.icon;
                    return (
                      <m.div key={faq.q} variants={itemVariants}>
                        <AccordionItem value={`faq-${i}`} className="border-0">
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
                                  "text-accent-indigo/30 group-hover:text-accent-indigo/60",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>

                              {/* icon */}
                              <span
                                className={[
                                  "shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border",
                                  "border-accent-indigo/14 bg-bg-surface-1",
                                  "group-hover:border-accent-indigo/30 group-hover:bg-accent-indigo/8",
                                  "transition-all duration-300",
                                ].join(" ")}
                              >
                                <Icon
                                  className={[
                                    "h-3.5 w-3.5 transition-colors duration-300",
                                    "text-accent-indigo/40 group-hover:text-accent-indigo",
                                  ].join(" ")}
                                  strokeWidth={1.75}
                                />
                              </span>

                              {/* question */}
                              <span
                                className={[
                                  "text-sm sm:text-base font-medium min-w-0",
                                  "text-text-secondary group-hover:text-text-primary",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {faq.q}
                              </span>

                              {/* code */}
                              <span
                                className={[
                                  "ml-auto shrink-0 font-mono text-[10px] hidden sm:block pr-2",
                                  "text-accent-indigo/25 group-hover:text-accent-indigo/50",
                                  "transition-colors duration-200",
                                ].join(" ")}
                              >
                                {faq.code}
                              </span>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="px-6 pb-5 sm:px-8 sm:pb-6">
                              <div className="flex gap-4 pl-[3.25rem]">
                                <div className="w-0.5 shrink-0 rounded-full bg-accent-indigo/20 self-stretch" />
                                <p className="text-sm text-text-secondary leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </m.div>
                    );
                  })}
                </Accordion>
              </m.div>

              {/* bottom strip */}
              <div
                className={[
                  "flex items-center justify-between border-t border-accent-indigo/10",
                  "bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8",
                ].join(" ")}
              >
                <p className="font-mono text-[11px] text-text-muted">
                  FAQ · {FAQS.length} QUESTIONS · HONEST ANSWERS
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-1 w-2 rounded-full"
                      style={{
                        backgroundColor: `rgb(99 102 241 / ${Math.max(0.08, 0.55 - i * 0.1)})`,
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