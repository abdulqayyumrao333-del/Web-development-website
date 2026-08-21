import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectJsonLd, SoftwareSourceCodeJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

import { ProjectHero } from "@/components/sections/projects/detail/project-hero";
import { ProjectOverview, ProjectProblem, ProjectSolution } from "@/components/sections/projects/detail/project-narrative";
import { ProjectFeatures, ProjectArchitecture, ProjectFolderStructure } from "@/components/sections/projects/detail/project-features-architecture";
import { ProjectTechStack, ProjectTimeline } from "@/components/sections/projects/detail/project-stack-timeline";
import { ProjectScreenshotsGallery, ProjectDemoVideo } from "@/components/sections/projects/detail/project-gallery-video";
import {
  ProjectChallenges,
  ProjectLessons,
  ProjectTechInsights,
  ProjectFutureRoadmap,
} from "@/components/sections/projects/detail/project-challenges-lessons";
import { ProjectPerformance, ProjectGithubStats } from "@/components/sections/projects/detail/project-performance-github";
import { RelatedProjects } from "@/components/sections/projects/detail/related-projects";
import { ProjectPrevNextNav } from "@/components/sections/projects/detail/project-prev-next-nav";
import { ProjectDetailCta } from "@/components/sections/projects/detail/project-detail-cta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findFirst({ where: { slug, visible: true } });
  if (!project) return generatePageMetadata({ title: "Project not found", description: "", path: `/projects/${slug}` });

  return generatePageMetadata({
    title: project.seoTitle ?? `${project.title} — Abdul Qayyum`,
    description: project.seoDescription ?? project.summary,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
  });
}

export async function generateStaticParams() {
  try {
    const projects = await db.project.findMany({ where: { visible: true }, select: { slug: true } });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await db.project.findFirst({ where: { slug, visible: true } });
  if (!project) notFound();

  return (
    <article>
      <ProjectJsonLd project={project} />
      <SoftwareSourceCodeJsonLd project={project} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectProblem project={project} />
      <ProjectSolution project={project} />
      <ProjectFeatures project={project} />
      <ProjectArchitecture project={project} />
      <ProjectFolderStructure project={project} />
      <ProjectTechStack project={project} />
      <ProjectTimeline project={project} />
      <ProjectScreenshotsGallery project={project} />
      <ProjectDemoVideo project={project} />
      <ProjectChallenges project={project} />
      <ProjectLessons project={project} />
      <ProjectPerformance />

      <SectionErrorBoundary label="GitHub repository stats">
        <ProjectGithubStats project={project} />
      </SectionErrorBoundary>

      <ProjectTechInsights project={project} />
      <ProjectFutureRoadmap project={project} />

      <SectionErrorBoundary label="Related projects">
        <RelatedProjects currentSlug={project.slug} categories={project.categories} />
      </SectionErrorBoundary>

      <ProjectPrevNextNav currentOrder={project.order} />
      <ProjectDetailCta githubUrl={project.githubUrl} />
    </article>
  );
}
