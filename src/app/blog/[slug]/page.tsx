import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { generatePageMetadata, generateBlogPostMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { ArticleHero } from "@/components/blog/detail/article-hero";
import { TableOfContents } from "@/components/blog/detail/table-of-contents";
import { CompiledMdx } from "@/lib/mdx";
import { extractTableOfContents } from "@/lib/toc";
import { AuthorCard } from "@/components/blog/detail/author-card";
import { ArticleFaq } from "@/components/blog/detail/article-faq";
import { ShareButtons } from "@/components/blog/detail/share-buttons";
import { ViewCountTracker } from "@/components/blog/detail/view-count-tracker";
import { RecordReadingHistory } from "@/components/blog/detail/record-reading-history";
import { RelatedArticles, SeriesNavigation } from "@/components/blog/detail/related-series";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findFirst({ where: { slug, ...publishedPostWhere } });
  if (!post) return generatePageMetadata({ title: "Post not found", description: "", path: `/blog/${slug}`, noIndex: true });

  return generateBlogPostMetadata(post);
}

export async function generateStaticParams() {
  try {
    const posts = await db.blogPost.findMany({ where: publishedPostWhere, select: { slug: true } });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.blogPost.findFirst({ where: { slug, ...publishedPostWhere } });
  if (!post) notFound();

  const headings = extractTableOfContents(post.contentMdx);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <ViewCountTracker slug={post.slug} />
      <RecordReadingHistory slug={post.slug} title={post.title} coverImage={post.coverImage} category={post.category} />

      <ArticleHero post={post} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[200px_1fr]">
        <TableOfContents headings={headings} />

        <div className="min-w-0">
          {post.seriesName && <SeriesNavigation seriesName={post.seriesName} currentOrder={post.seriesOrder} />}

          <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-accent-indigo prose-img:rounded-md prose-img:border prose-img:border-border">
            <CompiledMdx source={post.contentMdx} />
          </div>

          <ArticleFaq faqs={post.faqs} />

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <p className="text-sm text-text-secondary">Share this article</p>
            <ShareButtons title={post.title} url={url} />
          </div>

          <div className="mt-8">
            <AuthorCard />
          </div>

          <RelatedArticles currentSlug={post.slug} category={post.category} tags={post.tags} />
        </div>
      </div>
    </article>
  );
}
