import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { AboutPreview } from "@/components/sections/about-preview";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { TechStack } from "@/components/sections/tech-stack";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { LatestArticles } from "@/components/sections/latest-articles";
import { ContactCTA } from "@/components/sections/contact-cta";

export const metadata: Metadata = generatePageMetadata({
  title: "Abdul Qayyum — Full Stack & AI Developer",
  description:
    "Portfolio of Abdul Qayyum, a freelance full-stack and AI developer building web apps, automation tools, and AI-powered products.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <AboutPreview />
      <SkillsPreview />
      <TechStack />
      <FeaturedProjects />
      <ServicesPreview />
      <WhyWorkWithMe />
      <ProcessTimeline />
      <LatestArticles />
      <ContactCTA />
    </>
  );
}
