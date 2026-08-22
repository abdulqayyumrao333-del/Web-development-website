import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (e.g., 'full-stack-web-development')"),
  shortDescription: z.string().min(1, "Short description is required").max(200, "Short description is too long"),
  overview: z.string().min(1, "Overview is required"),
  category: z.string().min(1, "Category is required"),
  whoItsFor: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  typicalTimeline: z.string().optional(),
  problemsSolved: z.string().optional(),
  order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;