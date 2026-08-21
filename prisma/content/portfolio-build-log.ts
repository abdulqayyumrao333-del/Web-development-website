export const portfolioBuildLog = {
  title: "How I Built My Portfolio with Next.js 15, TypeScript, Prisma, and a PWA",
  subtitle: "A real build log — architecture decisions, real bugs I hit, and what I'd do differently.",
  slug: "how-i-built-my-portfolio-nextjs-15-typescript-prisma-pwa",
  excerpt:
    "A detailed build log of this exact portfolio: the architecture, the real bugs I ran into (including two Server/Client Component mistakes and a dependency mismatch), and the decisions behind a fully CMS-driven personal site.",
  category: "Portfolio",
  tags: ["Next.js", "TypeScript", "Prisma", "PWA", "Portfolio"],
  technologies: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion", "NextAuth"],
  level: "INTERMEDIATE" as const,
  contentMdx: `
## Why build another portfolio site

Most developer portfolios are static — a handful of hardcoded sections, a resume PDF, done. I wanted something different: a **fully CMS-driven** site where every piece of content (projects, skills, blog posts, services) lives in a real database and can be edited without touching code, plus a few features that actually earn their place rather than existing as résumé decoration — a live GitHub dashboard, an AI assistant grounded strictly in my own real data, and a terminal easter egg that pulls real content instead of hardcoded strings.

This post is a real build log, not a highlight reel. That means it includes the bugs.

## Architecture

The stack: **Next.js 15** (App Router), **TypeScript** in strict mode, **Prisma** over **PostgreSQL**, **Tailwind CSS** for styling, **Framer Motion** for animation, and **NextAuth** for a single-admin login. Deployment target is Vercel.

The core architectural decision was: **no hardcoded content in components.** Every page — Home, About, Skills, Projects, Services, Blog — pulls from Prisma models (\`Project\`, \`Skill\`, \`Service\`, \`BlogPost\`, and so on), each with a matching admin CRUD screen. Components render whatever's actually in the database, including rendering nothing (an honest empty state) when a section hasn't been filled in yet.

That last part turned out to matter more than I expected. Early on, several components had example/placeholder data baked in "just for now" — and more than once, that placeholder almost shipped as if it were real content. The fix became a running principle for the whole build: **if real data doesn't exist yet, show an explicit empty state, never a stand-in that looks real.**

## The database schema

The schema grew organically as features were added, but the shape settled around a few patterns:

\`\`\`prisma
model Project {
  id            String   @id @default(cuid())
  title         String
  slug          String   @unique
  summary       String
  description   String   @db.Text
  techStack     String[]
  categories    String[]
  status        ProjectStatus @default(COMPLETED)
  liveUrl       String?
  githubUrl     String?
  featured      Boolean  @default(false)
  order         Int      @default(0)
  // Case-study fields — all optional, all independently nullable
  caseStudyProblem    String? @db.Text
  caseStudySolution   String? @db.Text
  caseStudyChallenges String? @db.Text
  caseStudyLessons    String? @db.Text
}
\`\`\`

Every optional field follows the same rule: if it's null, the corresponding UI section either shows an honest "not yet documented" message or doesn't render at all. Nothing gets padded with filler text to look complete.

## Three real bugs worth writing down

### 1. The Server Component that tried to hold client state

Early in the build, a Footer component had an inline \`onSubmit\` handler on a newsletter form — but the Footer was a Server Component (no \`"use client"\` directive). Next.js correctly refused to render it:

\`\`\`
Error: Event handlers cannot be passed to Client Component props.
\`<form className=... onSubmit={function onSubmit} children=...>
\`\`\`

The fix wasn't to slap \`"use client"\` on the whole Footer — that would make an otherwise-static component re-render unnecessarily. Instead, the newsletter form got extracted into its own small Client Component, and the Footer stayed a Server Component. This came up again later with a "Print Resume" button for the same reason: **isolate the interactive sliver, don't convert the whole tree.**

### 2. A missing service worker feature and a broken image host

The GitHub Dashboard feature pulls a user's avatar via \`next/image\`, sourced from \`avatars.githubusercontent.com\`. Next.js's Image component refuses to load from any host that isn't explicitly whitelisted in \`next.config.mjs\` — a real security feature, not a bug in Next.js. The fix was one line:

\`\`\`js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "avatars.githubusercontent.com" },
  ],
},
\`\`\`

The lesson: every new external data source (GitHub's API, Cloudinary, etc.) needs its image host added explicitly — it won't fail at build time, only at render time when that specific image tries to load.

### 3. A dependency version mismatch that looked like a code bug

Partway through, \`npm install\` started failing with an ERESOLVE conflict: Next.js 15.0.0's initial release expected a React 19 *release-candidate* build, not the stable \`19.0.0\` release. Later, a second round of the same class of error came from \`next-themes\` and \`@react-three/fiber\` — both still pinned to React-18-only major versions. None of this was a code bug; it was the ecosystem catching up to a very recent React major version. The fix each time was the same: identify which package's peer dependency range was stale, and bump to the first version that actually supported React 19.

## Features worth explaining

**The AI assistant** is grounded strictly in real database content — skills, projects, services, published blog posts — injected into the system prompt at request time. It's explicitly instructed to say "I don't have that information" rather than guess, and it will not comment on anything not present in that context. This is a harder constraint to build well than a general-purpose chatbot, because the interesting failure mode isn't "gives a bad answer" — it's "sounds confident about something untrue."

**The interactive terminal** supports real commands (\`skills\`, \`projects\`, \`experience\`, \`blog\`, and so on) that query the same database as the rest of the site — so it can never drift out of sync with what's actually published.

**The PWA layer** — service worker, offline page, install prompt, update notification — is deliberately unglamorous. It's infrastructure, not a feature anyone notices unless it's missing.

## What I'd do differently

Building this taught me to treat "no hardcoded content" as a testable constraint, not just a design goal — several of the bugs above only existed because a placeholder value quietly stood in for real data long enough to almost ship. If I started over, I'd add a lint rule or a build-time check that flags any component rendering a literal string where a database field should be, rather than relying on catching it by review.
`,
  faqs: [
    {
      question: "Is this portfolio open source?",
      answer:
        "Not currently — but the architecture patterns here (CMS-driven content, empty-state-first design, a grounded AI assistant) are the same principles worth applying to any project.",
    },
    {
      question: "Why Prisma over a raw SQL layer or a headless CMS SaaS?",
      answer:
        "Type-safe queries end-to-end, a schema that lives in version control, and no per-seat pricing for a solo project. The tradeoff is more upfront modeling work — worth it here since the content shape is genuinely relational.",
    },
    {
      question: "Why build a custom admin dashboard instead of using an existing CMS?",
      answer:
        "Full control over the exact data shape each page needs, and no vendor content model to work around. For a larger team or client project, an existing headless CMS would often be the better call.",
    },
  ],
} as const;
