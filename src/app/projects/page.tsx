import type { Metadata } from "next";
import { Github as GithubIcon, FlaskConical } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { db } from "@/lib/db";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

import { ProjectsHero } from "@/components/sections/projects/projects-hero";
import { FeaturedProjectsShowcase } from "@/components/sections/projects/featured-projects-showcase";
import { ProjectsExplorer } from "@/components/sections/projects/projects-explorer";
import { GithubReposList } from "@/components/sections/projects/github-repos-list";
import { OpenSourceExperiments } from "@/components/sections/projects/open-source-experiments";
import { GithubDashboard } from "@/components/features/github-dashboard";
import { TechEcosystem } from "@/components/sections/about/tech-ecosystem";
import { DevelopmentWorkflow } from "@/components/sections/skills/development-workflow";
import { Roadmap } from "@/components/sections/about/roadmap";
import { ProjectsCta } from "@/components/sections/projects/projects-cta";

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "Abdul Qayyum's projects — featured work, live GitHub repositories, and the technologies behind them.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/projects",
});

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  try {
    projects = await db.project.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    projects = [];
  }
  const featuredGithubUrls = projects.map((p) => p.githubUrl).filter((u): u is string => !!u);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/projects" />

      <ProjectsHero />
      <FeaturedProjectsShowcase />
      <ProjectsExplorer projects={projects} />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="flex items-center gap-2 text-h2 font-semibold tracking-tight">
          <GithubIcon className="h-6 w-6" /> GitHub Analytics
        </h2>
        <div className="mt-10">
          <SectionErrorBoundary label="GitHub analytics">
            <GithubDashboard />
          </SectionErrorBoundary>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-h2 font-semibold tracking-tight">All GitHub Repositories</h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Synced live from GitHub — pinned repositories first, then most recently updated.
        </p>
        <div className="mt-10">
          <SectionErrorBoundary label="Repository list">
            <GithubReposList />
          </SectionErrorBoundary>
        </div>
      </section>

      <TechEcosystem />
      <DevelopmentWorkflow />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="flex items-center gap-2 text-h2 font-semibold tracking-tight">
          <FlaskConical className="h-6 w-6" /> Open Source &amp; Experiments
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Smaller repositories and experiments, beyond the featured and pinned work above.
        </p>
        <div className="mt-8">
          <SectionErrorBoundary label="Open source list">
            <OpenSourceExperiments excludeUrls={featuredGithubUrls} />
          </SectionErrorBoundary>
        </div>
      </section>

      <Roadmap />
      <ProjectsCta />
    </>
  );
}
