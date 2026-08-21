import type { Metadata } from "next";
import Link from "next/link";
import { Download, Github as GithubIcon, Gauge } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ResumeTabs } from "@/components/features/resume/resume-tabs";
import { PrintButton } from "@/components/features/resume/print-button";
import { GithubDashboard } from "@/components/features/github-dashboard";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { PerformanceDashboard } from "@/components/features/performance-dashboard";
import type { Experience, Education, Skill, Certificate, Project } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Resume",
  description: "Interactive resume — experience, education, skills, projects, and certificates.",
  path: "/resume",
});

async function getResumeData() {
  try {
    const [experience, education, skills, certificates, projects] = await Promise.all([
      db.experience.findMany({ orderBy: { order: "asc" } }),
      db.education.findMany({ orderBy: { order: "asc" } }),
      db.skill.findMany({ orderBy: { order: "asc" } }),
      db.certificate.findMany({ orderBy: { order: "asc" } }),
      db.project.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    ]);
    return { experience, education, skills, certificates, projects };
  } catch (error) {
    console.warn("[resume] Database unavailable — rendering empty states.", error);
    return {
      experience: [] as Experience[],
      education: [] as Education[],
      skills: [] as Skill[],
      certificates: [] as Certificate[],
      projects: [] as Project[],
    };
  }
}

export default async function ResumePage() {
  const { experience, education, skills, certificates, projects } = await getResumeData();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-h1 font-semibold tracking-tight">Resume</h1>
          <p className="mt-2 max-w-xl text-text-secondary">
            An interactive view of experience, education, skills, and projects.
          </p>
        </div>
        <div className="no-print flex gap-2">
          {/* TODO: point to an actual uploaded PDF once available */}
          <Button variant="secondary" asChild>
            <Link href="/resume.pdf" target="_blank">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Link>
          </Button>
          <PrintButton />
        </div>
      </div>

      <ResumeTabs
        experience={experience}
        education={education}
        skills={skills}
        certificates={certificates}
        projects={projects}
      />

      <div className="no-print mt-16">
        <h2 className="flex items-center gap-2 text-h3 font-semibold">
          <GithubIcon className="h-5 w-5" /> GitHub Activity
        </h2>
        <div className="mt-6">
          <SectionErrorBoundary label="GitHub activity">
            <GithubDashboard />
          </SectionErrorBoundary>
        </div>
      </div>

      <div className="no-print mt-16">
        <h2 className="flex items-center gap-2 text-h3 font-semibold">
          <Gauge className="h-5 w-5" /> Site Performance
        </h2>
        <div className="mt-6">
          <PerformanceDashboard />
        </div>
      </div>
    </section>
  );
}
