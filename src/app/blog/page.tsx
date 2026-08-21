import type { Metadata } from "next";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";

import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { PopularArticles, RecentlyUpdated } from "@/components/blog/popular-recent-trending";
import { TrendingArticles } from "@/components/blog/trending-articles";
import { ContinueReading } from "@/components/blog/continue-reading";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { CategoriesTagsCloud, BlogNewsletter } from "@/components/blog/newsletter-categories";

const PAGE_TITLE = "Blog";
const PAGE_DESCRIPTION =
  "Writing by Abdul Qayyum on full-stack development, AI-integrated features, and the engineering decisions behind real projects.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: "/blog",
  }),
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: { "application/rss+xml": `${siteConfig.url}/blog/rss.xml` },
  },
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof db.blogPost.findMany>> = [];
  try {
    posts = await db.blogPost.findMany({
      where: publishedPostWhere,
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  let trendingPosts: Awaited<ReturnType<typeof db.blogPost.findMany>> = [];
  try {
    trendingPosts = await db.blogPost.findMany({
      where: { ...publishedPostWhere, viewCount: { gt: 0 } },
      orderBy: { viewCount: "desc" },
      take: 6,
    });
  } catch {
    trendingPosts = [];
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
      />
      <WebPageJsonLd
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/blog"
      />

      {/* ── Page-level background — fills white gaps between sections ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.025) 35%, rgba(99,102,241,0.040) 65%, rgba(99,102,241,0.025) 100%)",
        }}
      />

      <BlogHero />
      <ContinueReading />
      <FeaturedArticle />
      <PopularArticles />
      <RecentlyUpdated />
      <TrendingArticles initialPosts={trendingPosts} />
      <BlogExplorer posts={posts} />
      <CategoriesTagsCloud />
      <BlogNewsletter />
    </>
  );
}