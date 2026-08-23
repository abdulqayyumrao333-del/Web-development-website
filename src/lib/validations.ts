import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Enter a valid email"),
  company: z.string().max(150).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Message is too short").max(5000),
  projectType: z.string().max(100).optional().or(z.literal("")),
  budgetRange: z.string().max(100).optional().or(z.literal("")),
  timeline: z.string().max(100).optional().or(z.literal("")),
  contactReason: z.string().max(100).optional().or(z.literal("")),
  preferredContactMethod: z.string().max(50).optional().or(z.literal("")),
  attachment: z.string().optional().or(z.literal("")),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  coverImage: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  techStack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

// --- Blog CMS -------------------------------------------------------------
// Validates against the existing BlogPost Prisma model (extended in Sprint 1
// with canonicalUrl, focusKeyword, readingTime). No separate "Blog" model —
// BlogPost remains the single source of truth for both admin and public site.

export const blogSlugSchema = z
  .string()
  .min(3, "Slug must be at least 3 characters")
  .max(160, "Slug must be under 160 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only");

const emptyToUndefined = (v: unknown) => (v === "" || v === null || v === undefined ? undefined : v);

export const blogSeoSchema = z.object({
  seoTitle: z.string().max(70, "SEO title should be under 70 characters").optional().or(z.literal("")),
  seoDescription: z
    .string()
    .max(160, "SEO description should be under 160 characters")
    .optional()
    .or(z.literal("")),
  canonicalUrl: z.string().url("Enter a valid canonical URL").optional().or(z.literal("")),
  focusKeyword: z.string().max(80, "Focus keyword must be under 80 characters").optional().or(z.literal("")),
  ogImage: z.string().url("OG image must be a valid URL").optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  ogTitle: z.string().max(70, "OG title should be under 70 characters").optional().or(z.literal("")),
  ogDescription: z.string().max(200, "OG description should be under 200 characters").optional().or(z.literal("")),
  ogType: z.enum(["website", "article", "profile"]).optional().or(z.literal("")),
  twitterCard: z.enum(["summary", "summary_large_image"]).default("summary_large_image"),
  twitterTitle: z.string().max(70, "Twitter title should be under 70 characters").optional().or(z.literal("")),
  twitterDescription: z
    .string()
    .max(200, "Twitter description should be under 200 characters")
    .optional()
    .or(z.literal("")),
  twitterImage: z.string().url("Twitter image must be a valid URL").optional().or(z.literal("")),
});

const blogPostObjectSchema = z
  .object({
    title: z.string().min(2, "Title is too short").max(200, "Title must be under 200 characters"),
    subtitle: z.string().max(220, "Subtitle must be under 220 characters").optional().or(z.literal("")),
    slug: z.preprocess(emptyToUndefined, blogSlugSchema.optional()), // omitted → auto-generated from title
    excerpt: z.string().min(10, "Excerpt is too short").max(300, "Excerpt must be under 300 characters"),
    contentMdx: z.string().min(20, "Content is too short"),
    coverImage: z.string().url("Cover image must be a valid URL"),
    category: z.string().min(1, "Category is required").max(60, "Category must be under 60 characters"),
    author: z.string().max(120, "Author name must be under 120 characters").optional().or(z.literal("")),
    tags: z.array(z.string().max(40)).max(20, "Maximum 20 tags").default([]),
    technologies: z.array(z.string().max(40)).max(20, "Maximum 20 technologies").default([]),
    level: z.preprocess(emptyToUndefined, z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional()),
    status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED", "TRASHED"]).default("DRAFT"),
    scheduledAt: z.string().optional().or(z.literal("")),
    seriesName: z.string().max(120, "Series name must be under 120 characters").optional().or(z.literal("")),
    seriesOrder: z.preprocess(emptyToUndefined, z.coerce.number().int().positive().optional()),
    featured: z.boolean().default(false),
  })
  .merge(blogSeoSchema);

// Full-form schema — used by createBlog/updateBlog, matching how the existing
// Skills/Projects edit forms resubmit the whole form rather than a partial diff.
export const createBlogPostSchema = blogPostObjectSchema.refine(
  (data) => data.status !== "SCHEDULED" || Boolean(data.scheduledAt),
  { message: "Scheduled posts require a scheduledAt date", path: ["scheduledAt"] },
);

// Partial variant, kept available for future granular updates (e.g. a
// single-field "toggle featured" action, mirroring toggleSkillVisibility).
export const updateBlogPostSchema = blogPostObjectSchema.partial();
