import type { Metadata } from "next";
import { Github as GithubIcon } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";

import { SkillsHero } from "@/components/sections/skills/skills-hero";
import { SkillsEcosystem } from "@/components/sections/skills/skills-ecosystem";
import { ExperienceLevels } from "@/components/sections/skills/experience-levels";
import { TechnologyTimeline } from "@/components/sections/skills/technology-timeline";
import { CurrentlyLearning } from "@/components/sections/about/currently-learning";
import { EngineeringPrinciplesBento } from "@/components/sections/skills/engineering-principles-bento";
import { DevelopmentWorkflow } from "@/components/sections/skills/development-workflow";
import { ToolsIUse } from "@/components/sections/skills/tools-i-use";
import { CertificationsSection } from "@/components/sections/skills/certifications-section";
import { GithubDashboard } from "@/components/features/github-dashboard";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { SkillsFaq } from "@/components/sections/skills/skills-faq";
import { SkillsCta } from "@/components/sections/skills/skills-cta";
import { Reveal } from "@/components/sections/reveal";

const PAGE_TITLE = "Skills & Technologies";
const PAGE_DESCRIPTION =
  "A verified, continuously-updated overview of Abdul Qayyum's skills as a Full Stack Developer and AI Developer — languages, frameworks, tools, and how he works.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Skills", path: "/skills" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/skills" />

      <SkillsHero />
      <SkillsEcosystem />
      <ExperienceLevels />
      <TechnologyTimeline />
      <CurrentlyLearning />
      <EngineeringPrinciplesBento />
      <DevelopmentWorkflow />
      <ToolsIUse />
      <CertificationsSection />

      {/* ── GitHub Activity Section ── */}
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

        {/* ── Larger Header ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-accent-indigo/60" />
            <p className="text-sm font-mono uppercase tracking-widest text-accent-indigo">
              GitHub Activity
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-accent-indigo/15 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-6">
            Open Source <span className="text-accent-indigo">Contributions</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-8">
            My GitHub activity, repositories, and contributions to the open source community.
          </p>
        </Reveal>

        <div className="mt-2">
          <SectionErrorBoundary label="GitHub activity">
            <GithubDashboard />
          </SectionErrorBoundary>
        </div>
      </section>

      <SkillsFaq />
      <SkillsCta />
    </>
  );
}