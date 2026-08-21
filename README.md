# Abdul Qayyum — Portfolio (Enterprise Architecture)

Production-grade personal portfolio & CMS, built with Next.js 15 (App Router), TypeScript,
Prisma/PostgreSQL, NextAuth, Tailwind, and MDX. This repo is currently at the **architecture
scaffold** stage: every route, layout, and system file exists with real structure (metadata,
loading/error boundaries, typed props) — page-by-page content implementation follows in this order:

1. Design System  2. Brand Identity  3. Homepage  4. About  5. Skills  6. Experience
7. Education  8. Services  9. Projects  10. Project Details  11. Blog  12. Blog Details
13. Certificates  14. Resume  15. Testimonials  16. Contact  17. FAQ  18. Privacy Policy
19. Terms  20. Admin Dashboard  21. Auth  22. SEO  23. PWA  24. Performance  25. Accessibility
26. Security  27. Deployment  28. Final review

## Getting started

```bash
npm install
cp .env.example .env
npm run db:push        # create tables from prisma/schema.prisma
npm run dev
```

## Stack

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS · Prisma · PostgreSQL ·
NextAuth v5 · Cloudinary · MDX · Zod · React Hook Form · Framer Motion · GSAP ·
React Three Fiber · Upstash (rate limiting) · Resend (email)

## Folder structure

```
src/
  app/            App Router routes (pages, layouts, API routes)
  components/
    layout/       navbar, footer, command palette, scroll progress
    ui/           shadcn-style primitives (button, card, dialog, ...)
    sections/     page-level composed sections (hero, project-card, ...)
    providers/    theme / query / session context providers
    seo/          JSON-LD structured data components
  lib/            db client, auth config, seo helpers, validations, utils
  config/         site metadata, nav structure
  types/          shared TypeScript types
  hooks/          shared client hooks
content/
  blog/           MDX blog posts
prisma/
  schema.prisma   database models
```

## Environment variables

See `.env.example`. Required before first run: `DATABASE_URL`, `AUTH_SECRET`.
Everything else can be added incrementally per feature (Cloudinary before media upload,
Resend before contact form, Upstash before enabling rate limiting).

## Deployment

Target platform: Vercel. `vercel.json` and CI notes are added in the Deployment
Configuration phase (step 27) once page content is complete.
