import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { publishedPostWhere } from "@/lib/blog";
import type { BlogSeoMeta } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // ── Static Routes ──
  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "weekly" as const },
    { route: "about", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "skills", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "projects", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "services", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "blog", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "contact", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "faq", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "terms", priority: 0.5, changeFrequency: "monthly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // ── Dynamic: Projects ──
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await db.project.findMany({
      where: { visible: true },
      select: { slug: true, updatedAt: true },
    });
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Database unavailable — skip project routes
    projectRoutes = [];
  }

  // ── Dynamic: Blog Posts ──
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.blogPost.findMany({
      where: publishedPostWhere,
      select: { slug: true, updatedAt: true, seoMeta: true },
    });
    blogRoutes = posts
      .filter((p) => !(p.seoMeta as BlogSeoMeta | null)?.noIndex)
      .map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // Database unavailable — skip blog routes
    blogRoutes = [];
  }

  // ── Combine all routes ──
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}