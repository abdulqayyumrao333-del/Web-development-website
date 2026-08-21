import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { AboutHero } from "@/components/sections/about/about-hero";
import { MyStory } from "@/components/sections/about/my-story";
import { JourneyTimeline } from "@/components/sections/about/journey-timeline";
import { MissionVision } from "@/components/sections/about/mission-vision";
import { EngineeringPrinciples } from "@/components/sections/about/engineering-principles";
import { CoreValues } from "@/components/sections/about/core-values";
import { Education } from "@/components/sections/about/education";
import { CurrentFocus } from "@/components/sections/about/current-focus";
import { TechnologyPhilosophy } from "@/components/sections/about/technology-philosophy";
import { TechEcosystem } from "@/components/sections/about/tech-ecosystem";
import { Workstation } from "@/components/sections/about/workstation";
import { CurrentlyLearning } from "@/components/sections/about/currently-learning";
import { BeyondCoding } from "@/components/sections/about/beyond-coding";
import { FunFacts } from "@/components/sections/about/fun-facts";
import { AboutStats } from "@/components/sections/about/about-stats";
import { FeatureHighlights } from "@/components/sections/about/feature-highlights";
import { WorkflowTimeline } from "@/components/sections/about/workflow-timeline";
import { Roadmap } from "@/components/sections/about/roadmap";
import { AboutFaq } from "@/components/sections/about/about-faq";
import { AboutCta } from "@/components/sections/about/about-cta";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "The story, background, and engineering philosophy behind Abdul Qayyum's work as a full-stack and AI developer — mission, principles, education, and how he works.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <AboutHero />
      <MyStory />
      <JourneyTimeline />
      <MissionVision />
      <EngineeringPrinciples />
      <CoreValues />
      <Education />
      <CurrentFocus />
      <TechnologyPhilosophy />
      <TechEcosystem />
      <Workstation />
      <CurrentlyLearning />
      <BeyondCoding />
      <FunFacts />
      <AboutStats />
      <FeatureHighlights />
      <WorkflowTimeline />
      <Roadmap />
      <AboutFaq />
      <AboutCta />
    </>
  );
}