import type {
  Project,
  BlogPost,
  ArticleStatus,
  ArticleLevel,
  Skill,
  Experience,
  Education,
  Certificate,
  Testimonial,
  Service,
  FAQ,
} from "@prisma/client";

export type {
  Project,
  BlogPost,
  Skill,
  Experience,
  Education,
  Certificate,
  Testimonial,
  Service,
  FAQ,
};

// --- Blog CMS ---------------------------------------------------------
// BlogPost (Prisma) remains the single source of truth. These are thin,
// reusable aliases for the admin/CMS layer — not a parallel data shape.

export type BlogStatus = ArticleStatus;

/** Alias for the persisted shape — kept separate from BlogPost so future
 * response-shaping (e.g. omitting contentMdx from list views) has a home
 * without touching the Prisma-generated type directly. */
export type BlogDTO = BlogPost;

export type SEOData = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  focusKeyword?: string | null;
  ogImage?: string | null;
};

/** Shape stored in BlogPost.seoMeta (a single JSON column) — robots
 * directives plus Open Graph/Twitter overrides. Everything here is optional;
 * an absent value always falls back to the equivalent General SEO field
 * (seoTitle/seoDescription/ogImage) or a sensible site-wide default. */
export type BlogSeoMeta = {
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export type BlogFormValues = SEOData & {
  title: string;
  subtitle?: string;
  slug?: string;
  excerpt: string;
  contentMdx: string;
  coverImage: string;
  category: string;
  author?: string;
  tags: string[];
  technologies: string[];
  level?: ArticleLevel;
  status: BlogStatus;
  scheduledAt?: string;
  seriesName?: string;
  seriesOrder?: number;
  featured: boolean;
  seoMeta?: BlogSeoMeta;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
};
