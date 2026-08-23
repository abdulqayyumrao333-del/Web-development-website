import type { Metadata } from "next";
import type { BlogPost } from "@prisma/client";
import type { BlogSeoMeta } from "@/types";
import { siteConfig } from "@/config/site";

type GenerateMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  noIndex?: boolean;
  /** Independent of noIndex when explicitly set. If omitted, matches noIndex —
   * preserving the original combined "noIndex implies noFollow" behavior for
   * every existing caller that doesn't know this option exists. */
  noFollow?: boolean;
  /** Overrides the derived `${siteConfig.url}${path}` canonical entirely. */
  canonicalOverride?: string;
  og?: { title?: string; description?: string; type?: "website" | "article" | "profile" };
  twitter?: { card?: "summary" | "summary_large_image"; title?: string; description?: string; image?: string };
};

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  noIndex = false,
  noFollow,
  canonicalOverride,
  og,
  twitter,
}: GenerateMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const canonical = canonicalOverride || url;
  const ogImage = image ?? `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}`;
  const effectiveNoFollow = noFollow ?? noIndex;

  const ogTitle = og?.title || title;
  const ogDescription = og?.description || description;
  const ogType = og?.type || type;

  const twitterTitle = twitter?.title || ogTitle;
  const twitterDescription = twitter?.description || ogDescription;
  const twitterImage = twitter?.image || ogImage;
  const twitterCard = twitter?.card || "summary_large_image";

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: !noIndex, follow: !effectiveNoFollow },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: ogType,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  };
}

/** Resolves the canonical URL for a post — an explicit override if set,
 * otherwise the standard /blog/[slug] path. */
export function resolveBlogCanonicalUrl(post: Pick<BlogPost, "slug" | "canonicalUrl">): string {
  return post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
}

/** Builds page metadata for a blog post, reusing generatePageMetadata rather
 * than duplicating its OG/Twitter/canonical logic. SEO-specific fields fall
 * back to the post's own title/excerpt/coverImage when unset; seoMeta
 * (Open Graph/Twitter overrides, robots directives) further refines it. */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const canonical = resolveBlogCanonicalUrl(post);
  const meta = (post.seoMeta ?? {}) as BlogSeoMeta;

  return generatePageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    canonicalOverride: canonical,
    image: post.ogImage || post.coverImage,
    type: "article",
    noIndex: post.status !== "PUBLISHED" || Boolean(meta.noIndex),
    noFollow: meta.noFollow,
    og: { title: meta.ogTitle, description: meta.ogDescription, type: meta.ogType },
    twitter: {
      card: meta.twitterCard,
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      image: meta.twitterImage,
    },
  });
}
