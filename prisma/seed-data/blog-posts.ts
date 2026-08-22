// Cornerstone blog content, seeded separately from prisma/seed.ts to keep
// that file manageable. Imported and inserted by the main seed script.
//
// IMPORTANT — content integrity notes for whoever edits this file next:
// - Article 1 and Article 7 are written from 100% verified, first-hand detail
//   (the actual build process of this project, and Abdul's confirmed About-page
//   bio). Nothing in them is invented.
// - Articles 3, 4, 5, 8, 9, 10 are general technical/educational content —
//   they teach concepts, not personal claims, so there's no fabrication risk.
//   Article 5 specifically does NOT claim a specific Lighthouse score for
//   Abdul's own site, since no verified audit exists yet (see PerformanceDashboard).
// - Two requested articles (AI Study Assistant deep-dive, Cold Email SaaS
//   deep-dive) are intentionally NOT included here — writing a detailed
//   "how I built this" story requires real problems/decisions/challenges
//   that were never provided, and inventing them would violate the
//   no-fabrication rule that's been followed throughout this project.

export type BlogSeed = {
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  contentMdx: string;
  coverImage: string;
  category: string;
  tags: string[];
  technologies: string[];
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "PUBLISHED";
  featured?: boolean;
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

const PLACEHOLDER_COVER = "/images/blog/placeholder-cover.svg";

export const BLOG_POSTS: BlogSeed[] = [
  {
    title: "How I Built My Portfolio with Next.js 15, TypeScript, Prisma, and PWA Support",
    subtitle: "A real build log — the architecture, the CMS, the AI assistant, and the bugs I actually hit along the way",
    slug: "how-i-built-my-portfolio-nextjs-15-typescript-prisma-pwa",
    excerpt:
      "An honest build log of this exact portfolio: the enterprise-style architecture, a fully CMS-driven content layer, an AI assistant grounded strictly in real data, PWA support, and the specific bugs I ran into while shipping it.",
    category: "Build Logs",
    tags: ["portfolio", "case-study", "nextjs", "architecture"],
    technologies: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Groq API", "PWA"],
    level: "INTERMEDIATE",
    status: "PUBLISHED",
    featured: true,
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "How Abdul Qayyum Built His Portfolio — Next.js 15, Prisma, AI Assistant",
    seoDescription:
      "A real build log of Abdul Qayyum's portfolio: Next.js 15 architecture, a CMS-driven content layer, an AI assistant grounded in real data, and the actual bugs hit while shipping it.",
    faqs: [
      {
        question: "Why build a custom CMS instead of using a headless CMS like Sanity or Contentful?",
        answer:
          "The content model (projects, skills, blog posts, services, FAQs) needed tight coupling with Prisma-typed data already used across the site — pages, the AI assistant, and the SEO audit tool all read from the same source. A third-party headless CMS would have meant syncing two systems instead of one.",
      },
      {
        question: "Is the admin dashboard secured?",
        answer:
          "Yes — a single-admin credentials login with bcrypt-hashed passwords, per-IP rate limiting on login attempts, and middleware that blocks any request to /admin without a valid session.",
      },
      {
        question: "Does the AI assistant ever make things up about the site owner?",
        answer:
          "No — its system prompt is built at request time from the live database (skills, projects, services, blog posts) and it's explicitly instructed to say it doesn't know rather than guess.",
      },
    ],
    contentMdx: `
Most "how I built my portfolio" posts describe the finished result. This one describes the actual process — including the parts that broke.

## Why not just use a template

A portfolio template gets you a page fast. It doesn't get you a system that can grow — a CMS you can actually use without touching code, an AI assistant that answers real questions instead of a canned FAQ, or infrastructure that scales past a handful of static pages. The goal here was closer to a small internal product than a brochure site.

That meant deciding on real architecture before writing a single component.

## The stack, and why each piece is there

- **Next.js 15 (App Router)** — Server Components by default keep the client bundle small; route-level \`loading.tsx\`/\`error.tsx\` boundaries isolate failures per page instead of crashing the whole app.
- **TypeScript, strict mode** — non-negotiable once the content model has this many optional fields (a project might have a case study, or might not; a blog post might be part of a series, or might not).
- **Prisma + PostgreSQL** — one schema, one source of truth, shared by the public site, the admin dashboard, and the AI assistant's knowledge base.
- **Tailwind + a small design-token layer** — CSS variables for color/spacing/motion so dark/light mode and any future rebrand don't mean touching every component.
- **Framer Motion** — used deliberately sparingly: one orchestrated entrance per page, scroll-triggered reveals, nothing that fights \`prefers-reduced-motion\`.
- **Groq API** — powers the site's own AI assistant (more on that below).

## The content model had to serve three audiences at once

Every content type — projects, skills, blog posts, services — gets read by three different consumers:

1. The public page (a project detail page, a blog article)
2. The admin dashboard (for editing)
3. The AI assistant's system prompt (for answering visitor questions)

That constraint shaped the schema more than anything else. A field like a project's \`caseStudyChallenges\` isn't just display copy — it's also something the AI assistant might quote back to a visitor who asks "what was hard about this project?" So every optional field needed an honest empty state, not a placeholder string, because "empty" needed to mean something specific to the AI assistant too (skip it, don't invent a challenge that wasn't documented).

\`\`\`ts
// A representative slice of the Project model — every optional field here
// has a specific reason to be nullable rather than defaulted.
model Project {
  title              String
  slug               String   @unique
  summary            String
  techStack          String[]
  categories         String[]
  status             ProjectStatus @default(PLANNED)
  caseStudyProblem   String?  // null until the write-up actually exists
  caseStudyChallenges String?
  liveUrl            String?  // null hides the button, never a dead link
  githubUrl          String?
}
\`\`\`

## Building an AI assistant that can't lie about you

The most interesting engineering constraint on this project wasn't a UI problem — it was making sure the site's own AI assistant never invents something about its owner.

The system prompt is assembled fresh on every request, pulling live from the database:

\`\`\`ts
async function buildSystemPrompt(): Promise<string> {
  const [skills, experience, projects, services, posts] = await Promise.all([
    db.skill.findMany({ select: { name: true, category: true } }),
    db.experience.findMany({ /* ... */ }),
    db.project.findMany({ /* ... */ }),
    db.service.findMany({ /* ... */ }),
    db.blogPost.findMany({ where: publishedPostWhere, /* ... */ }),
  ]);

  return \`Your ONLY source of truth is the verified information below.
Do not invent, guess, or embellish anything. If a visitor asks something
this data doesn't cover, say plainly that you don't have that information.

=== SKILLS ===
\${skills.map(s => \`- \${s.name} (\${s.category})\`).join("\\n")}
...\`;
}
\`\`\`

This mattered enough to migrate providers mid-project: the assistant originally called Anthropic's API, then moved to Groq's OpenAI-compatible chat completions endpoint. The provider swap touched the streaming logic (Groq's chunk format is different from Anthropic's event-based stream) but the grounding behavior — and the instruction to say "I don't know" rather than fabricate — stayed identical.

## Real bugs, not hypothetical ones

A few specific things actually went wrong during the build, worth naming because they're easy to hit in any similar project:

**Server Component + event handler crash.** A newsletter form and a print button both initially had inline \`onClick\` handlers sitting inside otherwise-async Server Components. Next.js throws \`Event handlers cannot be passed to Client Component props\` — the fix in both cases was extracting the interactive bit into its own small \`"use client"\` component rather than trying to make the whole page client-rendered.

**A fabricated default that shouldn't have existed.** An early version of the \`Skill\` model had \`level Int @default(80)\` — meaning every skill would silently show 80% proficiency unless someone changed it. That's a real content-integrity bug, not just a style issue: it would have displayed a specific, false claim about the site owner's expertise. The fix was a nullable \`SkillLevel\` enum (\`LEARNING | BEGINNER | INTERMEDIATE | ADVANCED\`) that only renders once someone actually sets it.

**A global rate-limit key.** The contact form's spam protection originally rate-limited on a single hardcoded key (\`"contact-form"\`) rather than per-visitor. That means one person submitting the form five times in a minute would lock out *every other visitor* for that minute — an availability bug on the site's primary conversion page. Scoping the key to the request's IP address fixed it.

**A missing service worker host.** The GitHub Dashboard widget pulls a user's avatar from \`avatars.githubusercontent.com\` — which crashed at runtime because Next's \`<Image>\` component refuses to load from a host that isn't explicitly whitelisted in \`next.config.mjs\`. That's Next.js protecting against arbitrary remote image loading by default, not a framework bug; the fix was a one-line addition to \`remotePatterns\`.

**Draft content leaking publicly.** Blog posts have a \`DRAFT / SCHEDULED / PUBLISHED\` status, but several places that queried posts — the sitemap, the homepage's "Latest Articles" section, an internal terminal easter-egg, even the AI assistant's own knowledge base — had no status filter at all. A draft post would have been publicly visible and, worse, submitted to search engines via the sitemap. The fix was a single shared \`publishedPostWhere\` filter applied everywhere posts are queried outside the admin dashboard, rather than trusting each call site to remember to filter correctly.

None of these are exotic — they're the ordinary cost of building something with real content-management surface area instead of a static template. Naming them here is more useful than pretending the build was clean.

## What PWA support actually meant

"Add a manifest" is the easy 10% of PWA support. The rest was a real service worker with a network-first strategy for page navigations (so content stays fresh while online) falling back to cache, then to an explicit offline page if nothing cached exists — plus a custom install-prompt banner that only renders when the browser actually fires \`beforeinstallprompt\` (never a fake "install our app!" nag on unsupported browsers), and an update-notification banner that only appears when a new service worker version is genuinely waiting to activate.

## What's next

This project is still being built in phases — the admin dashboard's CRUD modules, a redirect manager, and a proper SEO health-score system are in progress alongside the public-facing pages. The build log continues.

If you're building something with a similarly content-heavy architecture, the one piece of advice that generalizes: decide early which fields are allowed to be empty, and make sure every consumer of that data — not just the page you're looking at — treats "empty" as a real, valid state instead of something to paper over with a placeholder.
`,
  },
  {
    title: "My Journey to Becoming a Full Stack Software Engineer",
    subtitle: "A Computer Science student's honest account of how the interest started and where it's headed",
    slug: "my-journey-to-becoming-a-full-stack-software-engineer",
    excerpt:
      "How a Computer Science degree turned into freelance full-stack and AI work — the real timeline, without inflated milestones or invented years of experience.",
    category: "Career & Learning",
    tags: ["career", "computer-science", "student", "freelance"],
    technologies: [],
    level: "BEGINNER",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "Abdul Qayyum's Journey to Becoming a Full Stack Software Engineer",
    seoDescription:
      "An honest account of Abdul Qayyum's path from starting a Computer Science degree to freelance full-stack and AI development work.",
    faqs: [
      { question: "Is Abdul Qayyum a professional software engineer with years of industry experience?", answer: "No — he's a Computer Science student who has been building real freelance and personal projects since 2024. This article is intentionally honest about that timeline rather than inflating it." },
      { question: "What is Abdul currently focused on?", answer: "Full-stack development, AI-powered applications, and workflow automation — see the Skills and Current Focus sections of the About page for the full, current list." },
    ],
      contentMdx: `
There's a version of this post that would be easy to write and dishonest: a "10 years of experience" origin story with invented milestones. This isn't that post.

## Where it started

The interest in software grew during Computer Science studies at the University of Education, starting in 2024. Like most people's early experience with programming, it didn't begin with a grand plan — it began with learning modern web development and JavaScript, and noticing that software isn't just about writing code, it's about solving problems that actually exist for someone.

What kept it interesting wasn't the syntax. It was the moment an idea turned into something that worked — a page rendering, a form submitting, a small script doing something useful. That specific feedback loop is why Computer Science felt like the right degree rather than an adjacent field: it combines logical thinking with something closer to craft.

## Why Computer Science specifically

Computer Science appealed for a fairly practical reason: it rewards breaking a large, vague problem into small, testable pieces. That skill transfers directly into the kind of work that followed — freelance projects where a client's request ("I need a way to follow up with leads automatically") has to be turned into an actual architecture decision.

## The freelance chapter

Through 2025, the focus shifted toward building real-world portfolio projects rather than only coursework — and toward exploring AI application development and automation specifically, because that intersection (using AI to remove repetitive work rather than as a novelty) was the most practically interesting part of the field.

This is also when freelance-oriented work started under the Qaynova name — full-stack web development, automation tooling, and AI-integrated features for clients, alongside building a professional portfolio to support that work.

Separately, there was a contribution to **Dev Weekends' DSOC program**, working on the Pathment open-source mentorship platform — claiming a real GitHub issue, shipping a Tailwind sidebar spacing fix, and getting a pull request merged. Small, verifiable, and a useful reminder that contributing to an existing codebase is a different skill than building one from scratch.

## What "full stack" has actually meant in practice

Not a single fixed stack, but a consistent set of tools reached for repeatedly: Next.js and React on the frontend, Node.js/Express (and increasingly Next.js Server Actions) on the backend, PostgreSQL with Prisma for data, and — more recently — AI APIs (Groq, OpenAI, Anthropic) integrated as actual application features rather than demos.

The 2026 chapter of this has been building a production-grade personal portfolio with the same rigor as a client project: enterprise-style architecture, a real CMS, PWA support, and an AI assistant grounded strictly in real data — documented in a separate build-log article on this blog.

## Where this is headed

The honest, current-stage version of the long-term direction: become a stronger full-stack engineer, build genuinely useful AI-powered products, grow Qaynova, and — much further out — contribute to and eventually build software at a larger scale. These are goals being worked toward, not a résumé of what's already been achieved.

If there's a single takeaway for someone earlier in a similar path: the projects that taught the most weren't the ones with the cleanest planning — they were the ones that got finished, shipped, and occasionally broke in production in front of someone.
	`,
  },
  {
    title: "React vs Next.js in 2026: Which One Should You Choose?",
    subtitle: "They're not actually competitors — here's the real decision framework",
    slug: "react-vs-nextjs-2026-which-should-you-choose",
    excerpt:
      "React and Next.js get compared as if they're alternatives, but Next.js is built on React. Here's a practical framework for when you need the extra layer and when you don't.",
    category: "Technical Tutorials",
    tags: ["react", "nextjs", "frontend"],
    technologies: ["React", "Next.js"],
    level: "BEGINNER",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "React vs Next.js in 2026: Which One Should You Choose?",
    seoDescription:
      "A practical, non-hype comparison of React and Next.js in 2026 — what each one actually is, and a real framework for choosing between them.",
    faqs: [
      { question: "Is Next.js a replacement for React?", answer: "No. Next.js is a framework built on top of React — it adds routing, rendering strategies, and server-side capabilities. You can't use Next.js without React underneath it." },
      { question: "Is Next.js always the better choice?", answer: "No. A component library, a browser extension, or an app embedded in someone else's page often has no use for Next.js's routing and server layer — plain React (or Vite + React) is simpler there." },
      { question: "Does Next.js hurt performance compared to plain React?", answer: "Generally the opposite — Server Components reduce client-side JavaScript, and built-in image/font optimization improve real-world load times versus a typical client-only React setup." },
    ],
    contentMdx: `
"React vs Next.js" is a slightly misleading question, because Next.js *is* React — plus routing, rendering strategy, and a server layer. The real question is: do you need what Next.js adds on top?

## What React actually is

React is a UI library. It gives you components, state, and a rendering model — nothing about routing, data fetching conventions, or how your app gets to the browser. Historically that meant reaching for Create React App or Vite plus a router (React Router) plus whatever data-fetching pattern you picked yourself.

React alone is the right call when:

- You're building a component embedded in someone else's page (a widget, a browser extension popup)
- You're building a highly interactive client-only tool where SEO and initial load time barely matter (an internal admin tool, a design tool)
- You want maximum control over your build setup and don't want a framework's opinions

## What Next.js adds

Next.js is a framework, not a library — it makes decisions for you so you don't have to assemble them from scratch:

- **File-based routing** — a file in \`app/blog/[slug]/page.tsx\` is a route, no router configuration
- **Server Components by default** — components render on the server and ship zero JavaScript to the client unless you opt into \`"use client"\`
- **Built-in rendering strategies** — static generation, server rendering, and incremental static regeneration, chosen per-route
- **Image, font, and metadata optimization** baked in, not bolted on

## The actual decision framework

Ask these, roughly in order:

**1. Does this need to be found by search engines, or load fast on a slow connection?**
If yes — a marketing site, a blog, an e-commerce storefront, a portfolio — Next.js's server rendering and Server Components give you a real, measurable advantage. A client-only React app has to download and execute JavaScript before showing meaningful content; a Next.js Server Component can render HTML immediately.

**2. Is this a multi-page application, or a single interactive surface?**
Next.js's file-based routing pays for itself the moment you have more than a couple of routes. If your "app" is really one screen (a calculator, an embedded widget), the router adds nothing.

**3. Do you need a backend, or do you already have one?**
Next.js's API routes and Server Actions mean you can write backend logic in the same codebase and same language as your frontend — genuinely useful for small-to-medium projects. If you already have a separate backend (a Django API, a Go service) and React is purely the frontend consuming it, that advantage disappears.

**4. Does your team want a framework's opinions, or your own?**
Next.js makes real architectural decisions for you — where routes live, how rendering works, how metadata is generated. That's a feature if you want to move fast without re-deciding these things per-project, and a constraint if you have specific requirements Next.js's conventions don't fit.

## A concrete example

\`\`\`tsx
// Plain React — you assemble routing, data fetching, and rendering yourself
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

// Next.js App Router — the file location *is* the route,
// and this component runs on the server unless marked otherwise
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } });
  return <article>{post.title}</article>;
}
\`\`\`

The Next.js version fetches data directly in a server-rendered component — no \`useEffect\`, no loading spinner for the initial render, no separate API call round-trip from the browser.

## The practical answer for most projects in 2026

For anything public-facing — a portfolio, a blog, a SaaS marketing site, most e-commerce — Next.js's defaults solve real problems (SEO, initial load performance, having a place to put backend logic) that you'd otherwise solve yourself, usually worse. For an internal tool, a widget, or a project where none of that matters, plain React with Vite is simpler and has less to learn.

The question isn't "which is better" — it's "does this project need the things Next.js adds." Most public-facing products do.
`,
  },
  {
    title: "Complete Guide to Building Modern Full Stack Applications",
    subtitle: "The real layers, in the order decisions actually need to be made",
    slug: "complete-guide-building-modern-full-stack-applications",
    excerpt:
      "A practical walkthrough of every layer in a modern full-stack app — frontend, backend, database, auth, and deployment — and the order in which those decisions actually get made.",
    category: "Technical Tutorials",
    tags: ["full-stack", "architecture", "web-development"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "NextAuth.js"],
    level: "INTERMEDIATE",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "Complete Guide to Building Modern Full Stack Applications",
    seoDescription:
      "A practical, layer-by-layer guide to building a modern full-stack application — frontend, backend, database, authentication, and deployment.",
    faqs: [
      { question: "What's the difference between full stack and frontend + backend?", answer: "Full stack usually implies one person or team is comfortable making decisions at every layer — not necessarily that every layer lives in one codebase." },
      { question: "Do I need a separate backend if I use Next.js?", answer: "Not necessarily. Next.js API routes and Server Actions can serve as your backend for small-to-medium applications. A separate backend service makes more sense once you need independent scaling, a different language for specific workloads, or multiple frontends sharing one API." },
      { question: "Which database should I start with?", answer: "PostgreSQL is a reasonable default for most applications — relational, well-documented, and works well with an ORM like Prisma. Reach for something else when you have a specific reason (a document-shaped data model, a need for a managed serverless database)." },
    ],
    contentMdx: `
"Full stack" gets treated like a single skill. It's really five or six separate decisions, each with real trade-offs. Here's the order they actually get made in, with the reasoning at each step.

## 1. What is this application actually for?

Before any technology decision: is this content-heavy (a blog, a marketing site) or interaction-heavy (a dashboard, a tool)? Content-heavy apps benefit enormously from server rendering and SEO; interaction-heavy apps care more about client-side state management and real-time updates. This single question filters out a lot of framework debates before they start.

## 2. Frontend: component model and rendering strategy

For most modern web applications, React (via Next.js or a similar meta-framework) remains the practical default — not because it's technically superior to every alternative, but because of ecosystem depth: component libraries, hiring pool, and documentation.

The decision that matters more than "which framework" is **rendering strategy**:

- **Static generation** — pages built at deploy time, served from a CDN. Fastest possible, but content can't change without a rebuild.
- **Server rendering** — pages built per-request on the server. Fresh data every time, at the cost of server compute.
- **Client rendering** — the browser fetches data after the page loads. Necessary for highly interactive, personalized surfaces, but worst for initial load and SEO.

Most real applications mix all three at the route level, not the app level.

## 3. Backend: where does business logic live?

Three real options, in increasing order of operational complexity:

\`\`\`
Option A: Framework-integrated (Next.js Server Actions / API routes)
Option B: Separate API service (Express, Fastify, a Python framework)
Option C: Backend-as-a-service (Supabase, Firebase)
\`\`\`

Option A is underrated for small-to-medium applications — no separate deployment, no CORS configuration, and the type safety can extend from database to UI without crossing a network boundary. It stops making sense once you need independent scaling of API traffic versus page traffic, or a second frontend (a mobile app) consuming the same backend.

## 4. Database and ORM

A relational database (PostgreSQL, MySQL) is the right default unless you have a specific reason otherwise — most application data is genuinely relational (users have projects, projects have tags), even when it's tempting to reach for a document store because it feels more flexible.

An ORM like Prisma trades a small amount of raw SQL control for:

- End-to-end type safety (your database schema generates TypeScript types)
- Migration management as code
- Meaningfully faster iteration during early development

The trade-off shows up at scale — very complex queries sometimes need raw SQL anyway, and an ORM adds a layer between you and query performance. For the large majority of applications, that trade-off is worth it.

## 5. Authentication

The single most common mistake here: building your own auth system for a project that doesn't need one. If you need social login, OAuth, or multiple providers, a library (NextAuth.js/Auth.js) handles the genuinely hard, security-sensitive parts — session management, CSRF protection, token refresh — correctly, by default.

Build your own only when you have a specific reason: a single hardcoded admin account with no sign-up flow is a case where a full OAuth setup is more machinery than the problem needs, and a simple credentials-based login (with properly hashed passwords and rate-limited attempts) is more appropriate.

## 6. Deployment

For most Next.js applications, a platform like Vercel removes an entire category of decisions (server provisioning, CDN configuration, SSL) at the cost of vendor-specific conventions. That trade is usually worth it until you have a specific reason to self-host — cost at very large scale, or a compliance requirement.

## The order matters more than the choices

The mistake that costs the most time isn't picking the "wrong" framework — frameworks in this space are all capable of building most applications. It's making decision #5 (auth) or #6 (deployment) before deciding #1 (what the application actually needs to do well). A content-heavy site optimized like an interaction-heavy dashboard — or vice versa — is the most common architecture mistake in full-stack projects, and it's invisible until performance or SEO becomes a problem months later.
`,
  },
  {
    title: "How to Improve Website Performance and Achieve a 95+ Lighthouse Score",
    subtitle: "The specific, checkable things that move each Lighthouse category — no vague advice",
    slug: "improve-website-performance-95-lighthouse-score",
    excerpt:
      "A practical checklist for Lighthouse's four categories — Performance, Accessibility, Best Practices, and SEO — with specific, verifiable changes rather than generic advice.",
    category: "Reference Guides",
    tags: ["performance", "lighthouse", "web-vitals", "seo"],
    technologies: ["Next.js", "Core Web Vitals"],
    level: "INTERMEDIATE",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "How to Improve Website Performance and Achieve a 95+ Lighthouse Score",
    seoDescription:
      "A practical, specific guide to improving your Lighthouse score across Performance, Accessibility, Best Practices, and SEO.",
    faqs: [
      { question: "Is a 95+ Lighthouse score guaranteed by following a checklist?", answer: "No single checklist guarantees a score, since Lighthouse also measures real conditions like network speed and device CPU during the test run. These are the specific, high-leverage changes that most commonly move the score, not a guarantee." },
      { question: "Does image optimization actually matter that much?", answer: "Usually more than any other single change — unoptimized images are the most common cause of a poor Largest Contentful Paint (LCP) score, which is one of Google's Core Web Vitals." },
      { question: "Do animations hurt Lighthouse performance scores?", answer: "Only if they cause layout shift or block the main thread. CSS transforms and opacity-based animations run on the compositor thread and generally don't affect Lighthighthouse's Cumulative Layout Shift or Total Blocking Time metrics." },
    ],
    contentMdx: `
Lighthouse scores get treated as a mysterious black box. They're not — each category measures specific, checkable things. Here's what actually moves each one.

## Performance: the category most people struggle with

Lighthouse's performance score is a weighted combination of a few specific metrics. Not all of them matter equally:

- **Largest Contentful Paint (LCP)** — how long until the biggest visible element renders. Usually the single highest-weighted metric.
- **Total Blocking Time (TBT)** — how long the main thread is blocked by JavaScript, preventing the page from responding to input.
- **Cumulative Layout Shift (CLS)** — how much visible content shifts around after it first renders.

**What actually moves LCP:**

\`\`\`tsx
// Unoptimized — browser doesn't know the image's importance or dimensions upfront
<img src="/hero.jpg" alt="Hero" />

// Optimized — Next.js Image component: automatic format selection (WebP/AVIF),
// responsive sizing, and priority loading for above-the-fold images
<Image src="/hero.jpg" alt="Hero" width={1200} height={630} priority />
\`\`\`

The \`priority\` prop matters specifically for whatever image is the LCP element — without it, the image loads lazily by default, which is correct for below-the-fold images but actively hurts LCP for the hero image.

**What actually moves TBT:** shipping less JavaScript to the client. This is where Server Components earn their keep — a component that never needs interactivity (a footer, a static hero) should never ship its JavaScript to the browser at all. Code-splitting heavy client-only libraries (a chart library, a rich text editor) behind \`next/dynamic\` so they don't block the initial page load is the other highest-leverage change.

**What actually moves CLS:** reserving space for content before it loads — explicit \`width\`/\`height\` on every image, and avoiding content that injects itself above existing content (a banner that pushes the page down after load).

## Accessibility: mostly mechanical, genuinely important

Lighthouse's accessibility category checks specific, automatable things: color contrast ratios, whether images have alt text, whether form inputs have associated labels, whether interactive elements are keyboard-reachable. None of this is subjective — it's pass/fail against WCAG criteria.

The highest-leverage fixes:

- Every \`<img>\` needs meaningful \`alt\` text (or \`alt=""\` if genuinely decorative)
- Every form input needs a \`<label>\`, not just a placeholder
- Interactive elements need visible focus states — \`outline: none\` without a replacement focus style is a common, easy-to-miss failure
- Color contrast between text and background needs to meet a 4.5:1 ratio for normal text

## Best Practices: mostly about not doing things wrong

This category checks for things like: using HTTPS, not having console errors, using modern image formats, and not having known security vulnerabilities in exposed libraries. Most of a good score here comes from a clean build with no runtime errors and proper HTTPS configuration — not a series of individual optimizations.

## SEO: technical, not content

Lighthouse's SEO category checks technical prerequisites, not content quality: a page title exists, a meta description exists, links have descriptive text (not "click here"), the page is crawlable (no accidental \`noindex\`), and the viewport meta tag is present for mobile.

\`\`\`ts
// The technical minimum Lighthouse checks for, per page
export const metadata: Metadata = {
  title: "Specific, descriptive page title",
  description: "A real description, not empty or duplicated across pages",
  robots: { index: true, follow: true },
};
\`\`\`

## The realistic path to a high score

Run Lighthouse early and often — in Chrome DevTools, not just at the end of a project — and fix issues in this order: layout shift and image optimization first (usually the biggest performance wins for the least effort), then accessibility basics (alt text, labels, contrast), then the remaining performance work (code splitting, reducing JavaScript). Best Practices and SEO tend to fall into place automatically once the first three are handled properly, since they mostly reward not making mistakes rather than requiring separate work.
`,
  },
  {
    title: "Prisma ORM Best Practices for Modern Applications",
    subtitle: "Patterns that hold up as a schema grows past a handful of models",
    slug: "prisma-orm-best-practices-modern-applications",
    excerpt:
      "Practical Prisma patterns — schema design, query performance, and migration discipline — for applications that need to keep working as the schema grows.",
    category: "Reference Guides",
    tags: ["prisma", "postgresql", "database", "orm"],
    technologies: ["Prisma", "PostgreSQL", "TypeScript"],
    level: "INTERMEDIATE",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "Prisma ORM Best Practices for Modern Applications",
    seoDescription:
      "Practical Prisma ORM patterns for schema design, query performance, and migrations that hold up as your application grows.",
    faqs: [
      { question: "Should every field be required in a Prisma schema?", answer: "No — a field should only be required if it's genuinely always known at creation time. Making optional information required forces fake placeholder values into real data." },
      { question: "Is Prisma slower than raw SQL?", answer: "For the majority of queries, the difference is negligible. Complex aggregate queries or bulk operations sometimes benefit from raw SQL via Prisma's $queryRaw, used as an exception rather than a default." },
      { question: "What's the safest way to change a production schema?", answer: "Prisma Migrate, not db push. db push is convenient for prototyping but doesn't generate a reviewable migration history — Migrate creates versioned SQL migration files you can review before applying." },
    ],
    contentMdx: `
Prisma is easy to start with and easy to use badly at scale. These are the patterns that hold up as a schema grows past a handful of models.

## Model optional fields honestly

The most common Prisma anti-pattern: making a field required and filling it with a placeholder value because "it should always have something." A project's case study, a blog post's featured image override, a skill's proficiency level — these are things that are frequently *not yet known*, and a nullable field that's actually null is more honest (and more useful downstream) than a required field defaulting to a fake value.

\`\`\`prisma
// Anti-pattern: a fabricated default that silently misrepresents real data
model Skill {
  level Int @default(80) // every skill claims 80% proficiency until edited
}

// Better: null means "not yet rated," and every consumer of this field
// has to handle that state explicitly instead of trusting a fake number
model Skill {
  level SkillLevel? // LEARNING | BEGINNER | INTERMEDIATE | ADVANCED
}
\`\`\`

This isn't just a style preference — a required field with a fabricated default actively lies to anything reading that data, including your own UI.

## Use \`select\` for anything that isn't a full page load

\`findMany()\` without a \`select\` clause returns every column, every time — fine for a single detail page, wasteful for a list view or an API route that only needs three fields.

\`\`\`ts
// Fetches every column, including large text fields you don't need here
const posts = await db.blogPost.findMany();

// Fetches exactly what the list view actually renders
const posts = await db.blogPost.findMany({
  select: { title: true, slug: true, excerpt: true, coverImage: true },
});
\`\`\`

This matters more than it looks like it should — a blog post's \`contentMdx\` field alone can be tens of kilobytes; fetching it for a list of 20 posts you're not rendering the content of is pure waste.

## Migrate, don't just push, once you're past prototyping

\`prisma db push\` is genuinely useful early on — it syncs your schema to the database with no migration history, which is fast while a schema is still changing shape daily. The trade-off: no record of *how* the schema changed, and no safe way to review a change before it hits a shared database.

\`\`\`bash
# Fast, no history — right for early prototyping
npx prisma db push

# Generates a reviewable SQL migration file — right once real data exists
npx prisma migrate dev --name add_skill_level_enum
\`\`\`

Switch from the first to the second the moment a database has data you can't casually lose.

## Index the columns you actually filter and sort by

Prisma's schema syntax makes it easy to forget indexes exist, because there's no separate "index management" step in the workflow — but a query filtering on a non-indexed column in a table with real row counts degrades exactly like it would in raw SQL.

\`\`\`prisma
model BlogPost {
  slug        String   @unique // unique constraints are indexed automatically
  status      ArticleStatus
  publishedAt DateTime

  @@index([status, publishedAt]) // matches the actual query shape used everywhere
}
\`\`\`

The rule of thumb: if a \`where\` clause or \`orderBy\` uses a column repeatedly across your codebase, it should probably be indexed — especially combinations, like status filtering combined with a date sort, which is the shape most content-driven applications actually query by.

## Don't let the ORM hide a genuinely slow query

Prisma's fluent API makes it easy to write a query that looks simple but generates something expensive — nested \`include\`s three levels deep, for instance, can produce a query plan that's much heavier than it appears in the TypeScript. \`prisma.$queryRaw\` exists specifically for the cases where you need to see and control the actual SQL — using it for a genuinely complex aggregate query is not a failure of the ORM, it's the correct escape hatch.

## The pattern underneath all of these

Every one of these practices comes down to the same thing: don't let Prisma's convenience hide a decision you'd make deliberately in raw SQL. Nullable fields, selective queries, reviewable migrations, and deliberate indexes are all just "do the same disciplined thing you'd do without an ORM" — Prisma removes the boilerplate, not the responsibility.
`,
  },
  {
    title: "Building SEO-Friendly Next.js Applications",
    subtitle: "What the App Router actually gives you for free, and what you still have to do yourself",
    slug: "building-seo-friendly-nextjs-applications",
    excerpt:
      "A practical guide to Next.js SEO — dynamic metadata, structured data, sitemaps, and the specific App Router APIs that make each of them straightforward.",
    category: "Reference Guides",
    tags: ["nextjs", "seo", "metadata", "json-ld"],
    technologies: ["Next.js", "TypeScript"],
    level: "INTERMEDIATE",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "Building SEO-Friendly Next.js Applications — A Practical Guide",
    seoDescription:
      "A practical guide to technical SEO in Next.js's App Router — dynamic metadata, JSON-LD structured data, sitemaps, and canonical URLs.",
    faqs: [
      { question: "Does Next.js handle SEO automatically?", answer: "Partially. The App Router provides the APIs (generateMetadata, sitemap.ts, robots.ts) to do SEO correctly with much less boilerplate than before — but you still have to use them deliberately per page." },
      { question: "Do I need JSON-LD structured data if I already have good metadata?", answer: "They serve different purposes. Metadata controls how a page looks in search results and social shares; JSON-LD helps search engines understand entities and relationships (a person, an article, an organization) and can enable rich results." },
      { question: "Should every page have the same meta description?", answer: "No — duplicate meta descriptions across pages is a common, checkable SEO issue. Each page's description should be specific to that page's actual content." },
    ],
    contentMdx: `
Next.js's App Router gives you real SEO primitives — not magic, but genuine APIs that remove most of the boilerplate. Here's how to actually use them.

## Dynamic metadata, generated per page

The App Router's \`generateMetadata\` function runs per-request for dynamic routes, which means a blog post or product page can have metadata generated from its actual database record instead of a static, generic fallback.

\`\`\`ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Not found", robots: { index: false } };

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: \\\`https://example.com/blog/\\\${post.slug}\\\` },
    openGraph: { images: [post.ogImage ?? post.coverImage] },
  };
}
\`\`\`

The specific detail that matters: falling back to a real field (\`post.excerpt\`) rather than a generic site-wide description when a page-specific one hasn't been set. A missing SEO description is a real, checkable issue — a duplicated one across every page is arguably worse, since it signals to search engines that the pages are interchangeable.

## Canonical URLs prevent duplicate-content issues

Any page reachable at more than one URL (with or without a trailing slash, with a tracking parameter, via both \`/blog/post\` and a category-prefixed path) needs a canonical tag pointing to the one true URL — otherwise search engines may split ranking signal across what they see as duplicate pages.

## JSON-LD: telling search engines what something *is*, not just what it says

Metadata controls the search snippet. Structured data (JSON-LD) tells search engines what kind of entity a page represents — a \`Person\`, an \`Article\`, a \`BreadcrumbList\`, a \`FAQPage\`. This is what can unlock rich results (star ratings, FAQ dropdowns, breadcrumb trails) directly in search results.

\`\`\`tsx
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: "Author Name" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
\`\`\`

A \`Person\` schema on an About page, referencing consistent social profile URLs via \`sameAs\`, is one of the more effective things an individual's site can do — it helps search engines associate a name with a specific, verifiable entity rather than treating a page as anonymous content.

## Sitemap and robots.txt as code, not static files

The App Router lets \`sitemap.ts\` and \`robots.ts\` be dynamic functions instead of static files — meaning a sitemap can be generated from your actual published content at request time.

\`\`\`ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db.blogPost.findMany({ where: publishedPostWhere, select: { slug: true, updatedAt: true } });
  return posts.map((p) => ({ url: \\\`https://example.com/blog/\\\${p.slug}\\\`, lastModified: p.updatedAt }));
}
\`\`\`

The specific thing worth double-checking here: whatever filter your public pages use to hide drafts needs to be the *same* filter your sitemap uses. A sitemap that includes unpublished content actively invites search engines to index pages you didn't intend to be public.

## Semantic HTML still matters more than any meta tag

One \`<h1>\` per page, a logical heading hierarchy (no skipping from \`<h2>\` to \`<h4>\`), and real \`<nav>\`/\`<main>\`/\`<article>\` landmarks help both search engines and screen readers understand a page's structure. No amount of metadata compensates for a page that's structurally a pile of \`<div>\`s.

## The practical checklist

Per page: a unique title and description, a canonical URL, relevant JSON-LD for what the page actually represents, one \`<h1>\`. Site-wide: a sitemap that matches your actual published/draft filter, a robots.txt that doesn't accidentally block real content, and internal links between related pages using descriptive anchor text rather than "click here." None of this is exotic — it's mostly about not skipping steps that Next.js has already made easy.
`,
  },
  {
    title: "Top Mistakes Beginner Developers Make and How to Avoid Them",
    subtitle: "The recurring ones, not the obvious syntax errors",
    slug: "top-mistakes-beginner-developers-make",
    excerpt:
      "The mistakes that show up repeatedly in early-career code — not typos, but architectural and habit-level patterns that are easy to fix once you can see them.",
    category: "Career & Learning",
    tags: ["beginners", "best-practices", "career"],
    technologies: [],
    level: "BEGINNER",
    status: "PUBLISHED",
    coverImage: PLACEHOLDER_COVER,
    seoTitle: "Top Mistakes Beginner Developers Make and How to Avoid Them",
    seoDescription:
      "The recurring architectural and habit-level mistakes beginner developers make, and practical ways to avoid each one.",
    faqs: [
      { question: "Is copying code from Stack Overflow or an AI tool a bad habit?", answer: "Not inherently — the mistake is copying without understanding why it works, which means you can't debug it when your specific case differs even slightly." },
      { question: "Should beginners learn a framework or plain fundamentals first?", answer: "Fundamentals first is generally more durable — frameworks change every few years, but understanding how HTTP requests, the DOM, and basic data structures work transfers across every framework you'll ever use." },
      { question: "Is it a mistake to not write tests as a beginner?", answer: "It's understandable, not ideal — the bigger mistake is never learning *how* to test at all, since that skill compounds in value as projects grow past a size you can manually re-check by hand." },
    ],
    contentMdx: `
Not typos — those get caught immediately. These are the patterns that survive long enough to become habits.

## Mistake 1: Treating errors as the enemy instead of information

A stack trace or a red error message feels like failure. It's actually the most specific information you'll get about what went wrong and exactly where. The habit worth building early: read the *first* line of an error message and the *first* file/line reference that's your own code (not a library's internals) before doing anything else — most of the time, that's the actual answer.

## Mistake 2: Copying code without understanding why it works

Copying a solution from a tutorial, Stack Overflow, or an AI assistant isn't the mistake — every developer does this constantly. The mistake is moving on without understanding *why* it solved the problem. That gap doesn't show up immediately; it shows up the next time a similar-but-not-identical bug appears and the copied fix doesn't apply, and there's no understanding to fall back on.

## Mistake 3: Not reading documentation, only tutorials

Tutorials show one path through a tool, usually a common one. Documentation shows the actual shape of the tool — every option, every edge case, every constraint. Beginners who only ever learn from tutorials tend to hit a ceiling: they can follow patterns they've seen before, but can't reason about a tool from first principles when they hit something a tutorial didn't cover.

## Mistake 4: Premature architecture

Building an elaborate folder structure, a generic abstraction layer, or a "flexible" plugin system for a project that's still three files and one feature. This one goes the *other* direction from the stereotype of "beginners write messy code" — it's just as common to over-engineer a simple project because a course said "always structure your code this way," without the judgment yet to know when that structure earns its complexity.

\`\`\`
# Premature: three files of business logic wrapped in five layers of abstraction
src/
  core/
    interfaces/
    factories/
    strategies/
    adapters/

# Right-sized for the actual project size
src/
  utils.ts
  api.ts
  components/
\`\`\`

Structure should grow with genuine need, not get imposed upfront because it looked professional in a course.

## Mistake 5: Not committing to version control often enough

Writing for hours before a single \`git commit\`, then losing work to an editor crash or an accidental file deletion. Small, frequent commits aren't a "best practice" in an abstract sense — they're the actual safety net that makes fearless experimentation possible, because any change can be undone.

## Mistake 6: Ignoring the browser's/runtime's own dev tools

Console logging everything instead of using breakpoints and the debugger; guessing at a layout problem instead of inspecting the actual computed styles. The tools built into every browser (and most runtimes) are more precise than print-statement debugging, and learning them early saves enormous time later — this is one of the highest-leverage skills that's rarely taught directly.

## Mistake 7: Comparing your beginning to someone else's middle

Seeing a polished portfolio or a popular open-source project and measuring your first few months of code against it. Everything public is filtered — nobody publishes their first attempt at a for-loop. The only useful comparison is your own code six months ago.

## The pattern underneath all of these

Almost every one of these is really the same mistake wearing a different outfit: optimizing for looking like you know what you're doing, instead of building the specific, sometimes-uncomfortable habits (reading errors carefully, reading docs, committing often, debugging properly) that actually produce the skill over time. None of them are about intelligence — they're about which habits get built early.
`,
  },
];
