import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { publishedPostWhere } from "@/lib/blog";

export async function GET() {
  try {
    const [skills, experience, education, projects, posts] = await Promise.all([
      db.skill.findMany({ orderBy: { order: "asc" } }),
      db.experience.findMany({ orderBy: { order: "asc" } }),
      db.education.findMany({ orderBy: { order: "asc" } }),
      db.project.findMany({ where: { visible: true }, orderBy: { order: "asc" }, take: 10 }),
      db.blogPost.findMany({ where: publishedPostWhere, orderBy: { publishedAt: "desc" }, take: 5 }),
    ]);

    return NextResponse.json({
      name: siteConfig.name,
      title: "Full Stack & AI Developer",
      links: siteConfig.links,
      skills: skills.map((s) => ({ name: s.name, category: s.category })),
      experience: experience.map((e) => ({
        role: e.role,
        company: e.company,
        isCurrent: e.isCurrent,
      })),
      education: education.map((e) => ({ degree: e.degree, institution: e.institution })),
      projects: projects.map((p) => ({ title: p.title, slug: p.slug, summary: p.summary })),
      posts: posts.map((p) => ({ title: p.title, slug: p.slug })),
    });
  } catch (error) {
    // Database not configured yet — terminal degrades to honest empty data
    // rather than erroring out or fabricating placeholder content.
    console.warn("[terminal-data] Database unavailable:", error);
    return NextResponse.json({
      name: siteConfig.name,
      title: "Full Stack & AI Developer",
      links: siteConfig.links,
      skills: [],
      experience: [],
      education: [],
      projects: [],
      posts: [],
      unavailable: true,
    });
  }
}
