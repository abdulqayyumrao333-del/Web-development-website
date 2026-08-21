import { Reveal } from "@/components/sections/reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { HelpCircle, Code2, Sparkles, Briefcase, ArrowRight } from "lucide-react";

// Detailed SEO-optimized FAQs
const FAQS = [
  { 
    q: "Do you build custom software?", 
    a: "Absolutely. I specialize in building custom software solutions tailored to your specific business needs. From full-stack web applications and mobile apps to complex backend systems and API integrations, I create scalable, maintainable, and high-performance software. Every project starts with understanding your requirements, followed by a structured development process that ensures delivery on time and within budget.",
    keywords: "custom software development, bespoke applications, software engineering services"
  },
  { 
    q: "Do you build AI-powered applications?", 
    a: "Yes — I develop AI-powered applications and solutions that solve real business problems. I work with modern AI technologies including Large Language Models (LLMs), Natural Language Processing (NLP), computer vision, and generative AI. From intelligent chatbots and recommendation systems to automation pipelines and predictive analytics, I can help you leverage AI to transform your business operations and enhance user experiences.",
    keywords: "AI development, machine learning applications, NLP, generative AI, LLM integration"
  },
  { 
    q: "Are you available for freelance work?", 
    a: "Yes, I'm currently available for freelance projects and collaborations. I work with clients worldwide across various industries — from early-stage startups to established businesses. Whether you need a full-stack application, an AI-powered solution, or a complete web automation system, I'm ready to bring your ideas to life. I offer flexible engagement models including project-based, retainer, and hourly arrangements.",
    keywords: "freelance developer, remote developer, freelance software engineer, hire developer"
  },
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in a full-stack development ecosystem with a strong focus on modern technologies. My core stack includes Next.js, React, TypeScript, and Tailwind CSS for frontend development. On the backend, I work with Node.js, Python, PostgreSQL, and various cloud platforms. For AI/ML projects, I leverage LangChain, OpenAI API, Hugging Face, and other cutting-edge tools. I also have experience with DevOps practices including Docker, CI/CD pipelines, and cloud deployment.",
    keywords: "full-stack developer, Next.js, React, TypeScript, Python, Node.js, AI stack"
  },
  {
    q: "How do you ensure project quality?",
    a: "Quality is built into every stage of my development process. I follow a structured workflow that includes thorough planning, continuous testing, and regular code reviews. Each project undergoes unit testing, integration testing, and manual QA before deployment. I also prioritize clean, maintainable code with proper documentation. Post-launch, I provide ongoing monitoring and support to ensure your application continues to perform optimally and evolve with your needs.",
    keywords: "software quality assurance, testing, clean code, maintainable software"
  },
  {
    q: "What is your typical project timeline?",
    a: "Project timelines vary based on scope and complexity. For small to medium projects, I typically deliver within 2-6 weeks. Larger, more complex applications may take 2-4 months. I believe in transparent communication and provide regular updates throughout the development process. Before starting, I work with you to define clear milestones and deliverables, ensuring we stay on track and aligned with your expectations.",
    keywords: "project timeline, development process, delivery time, software development lifecycle"
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function SkillsFaq() {
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

      {/* ══ SEO JSON-LD ══ */}
      <FaqJsonLd items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

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
                Quick
                <br />
                <span className="text-accent-indigo">answers</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Common questions about my services, expertise, and how I work — answered clearly and honestly.
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

            {/* Topics covered */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {[
                { label: "Custom Software", icon: Code2 },
                { label: "AI Development", icon: Sparkles },
                { label: "Freelance Work", icon: Briefcase },
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

            {/* Still have questions CTA */}
            <div className="mt-8 hidden lg:block">
              <div className="p-4 rounded-xl border border-accent-indigo/12 bg-accent-indigo/[0.02]">
                <p className="text-xs text-text-secondary font-medium">
                  Still have questions?
                </p>
                <p className="text-[10px] text-text-muted/60 mt-1">
                  I'm here to help — reach out anytime.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-medium text-accent-indigo hover:text-accent-indigo/80 transition-colors"
                >
                  Contact Me
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── FAQ Accordion ══ */}
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

              <div className="relative divide-y divide-accent-indigo/8">
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((faq, i) => (
                    <AccordionItem key={faq.q} value={`skills-faq-${i}`} className="border-0">
                      <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline hover:bg-accent-indigo/[0.03] transition-colors duration-200 group">
                        <div className="flex items-center gap-3 w-full text-left">
                          <span className="font-mono text-[10px] text-accent-indigo/25 group-hover:text-accent-indigo/50 transition-colors duration-300 w-5 text-right shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium text-sm sm:text-base text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                            {faq.q}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          <div className="flex gap-4 pl-[3.25rem]">
                            <div className="w-0.5 shrink-0 rounded-full bg-accent-indigo/15 self-stretch" />
                            <div>
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {faq.a}
                              </p>
                              {/* SEO Keywords - hidden but present for semantic value */}
                              <span className="sr-only">{faq.keywords}</span>
                            </div>
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
                  FAQ · {FAQS.length} QUESTIONS · HONEST ANSWERS
                </p>
                <div className="flex gap-1">
                  {FAQS.map((_, i) => (
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