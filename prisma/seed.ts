import { PrismaClient } from "@prisma/client";
import { portfolioBuildLog } from "./content/portfolio-build-log";
import { careerJourney } from "./content/career-journey";

const prisma = new PrismaClient();

// Every entry here was explicitly confirmed by Abdul during the Homepage
// content phase. Nothing is invented. `level` and `learnedAt` are left
// unset (null) intentionally — they were never confirmed, so the site
// shows "not yet rated" / omits them from the timeline rather than guessing.
const SKILLS: { name: string; category: string; order: number }[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", order: 0 },
  { name: "CSS3", category: "Frontend", order: 1 },
  { name: "JavaScript (ES6+)", category: "Frontend", order: 2 },
  { name: "TypeScript", category: "Frontend", order: 3 },
  { name: "React", category: "Frontend", order: 4 },
  { name: "Next.js", category: "Frontend", order: 5 },
  { name: "Tailwind CSS", category: "Frontend", order: 6 },
  { name: "Framer Motion", category: "Frontend", order: 7 },

  // Backend
  { name: "Node.js", category: "Backend", order: 0 },
  { name: "Express.js", category: "Backend", order: 1 },
  { name: "Next.js Server Actions", category: "Backend", order: 2 },
  { name: "REST APIs", category: "Backend", order: 3 },
  { name: "NextAuth.js", category: "Backend", order: 4 },

  // AI & Automation
  { name: "OpenAI API", category: "AI & Automation", order: 0 },
  { name: "Anthropic API", category: "AI & Automation", order: 1 },
  { name: "Groq API", category: "AI & Automation", order: 2 },
  { name: "Prompt Engineering", category: "AI & Automation", order: 3 },
  { name: "AI Chatbots", category: "AI & Automation", order: 4 },
  { name: "Workflow Automation", category: "AI & Automation", order: 5 },

  // Databases
  { name: "PostgreSQL", category: "Databases", order: 0 },
  { name: "Prisma ORM", category: "Databases", order: 1 },
  { name: "MySQL", category: "Databases", order: 2 },
  { name: "Supabase", category: "Databases", order: 3 },

  // Tools
  { name: "Git", category: "Tools", order: 0 },
  { name: "GitHub", category: "Tools", order: 1 },
  { name: "VS Code", category: "Tools", order: 2 },
  { name: "Vercel", category: "Tools", order: 3 },
  { name: "Postman", category: "Tools", order: 4 },
  { name: "npm", category: "Tools", order: 5 },
];

type ProjectSeed = Parameters<typeof prisma.project.create>[0]["data"];

const PROJECTS: ProjectSeed[] = [
  // ------------------------------------------------------------------
  // Fully verified — this is the site being built in this very
  // conversation, so every field below is accurate and checkable,
  // not fabricated. Status reflects real, current progress.
  // ------------------------------------------------------------------
  {
    title: "Personal Portfolio Website",
    slug: "personal-portfolio-website",
    summary:
      "A premium personal portfolio built with Next.js featuring an interactive resume, AI assistant, developer terminal, PWA support, and enterprise-grade SEO.",
    description:
      "A production-grade personal portfolio and CMS built on Next.js 15's App Router, designed to hold up to enterprise engineering standards rather than a typical single-page portfolio template. It includes a fully custom design system (Aurora Tech), a Prisma/PostgreSQL-backed CMS for every content type, and several product-grade interactive features built as isolated, reusable components.",
    coverImage: "/images/projects/placeholder-cover.svg",
    techStack: [
      "Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL",
      "NextAuth v5", "Framer Motion", "Radix UI", "Groq SDK",
    ],
    categories: ["Full Stack", "Personal", "AI"],
    status: "IN_PROGRESS",
    features: [
      "Interactive resume pulling live experience/education/skills from the database",
      "AI chat assistant grounded strictly in real CMS content (Groq-powered, refuses to speculate)",
      "Developer terminal with real commands (skills, projects, experience) and command history",
      "Full PWA: offline page, install prompt, update notifications, service worker caching",
      "Enterprise SEO: dynamic JSON-LD (Person/Website/Breadcrumb/Article/FAQ), sitemap, OG images",
      "Admin-editable CMS covering projects, blog, skills, experience, testimonials, and site settings",
      "Dark/light theme with a fully tokenized design system",
    ],
    role: "Solo developer — architecture, design system, and full implementation",
    liveUrl: null,
    githubUrl: null,
    demoVideoUrl: null,
    caseStudyResearch:
      "Researched the design language of premium SaaS products (Linear, Vercel, Stripe, Raycast) to establish a distinct visual identity — resulted in the 'Aurora Tech' design system: near-navy backgrounds with a restrained indigo/violet gradient accent used only on the logo, hero, and primary CTA glow, rather than everywhere.",
    caseStudyProblem:
      "A generic portfolio template doesn't differentiate a developer looking for full-stack/AI freelance work — most portfolio sites are static, content is hardcoded, and there's no way to demonstrate real engineering practice (a working CMS, real API integrations, real content-integrity discipline) within the site itself.",
    caseStudyPlanning:
      "Planned as a phased build rather than one large generation: full architecture scaffold first (routing, Prisma schema, component library), then the design system and brand identity, then page-by-page real content (Homepage, About, Skills, then Projects), with interactive features (Terminal, AI Assistant, GitHub Dashboard, PWA, World Map) layered in as an explicit phase once the core pages existed.",
    caseStudyArchitecture:
      "Next.js App Router with server components as the default and client components used only where interactivity requires it (forms, the terminal, the chat widget). Prisma/PostgreSQL for all content, NextAuth v5 restricted to specific admin emails, and every external integration (GitHub API, Groq API) isolated behind its own API route with graceful fallbacks if unconfigured.",
    caseStudyChallenges:
      "Hit a real dependency conflict early: Next.js 15.0.0 shipped expecting a React 19 release-candidate, not stable React 19 — required pinning to patched versions of both. Two libraries (next-themes, @react-three/fiber) still only supported React 18 in their published majors and needed bumping to their React-19-compatible releases. Separately, hit two Server/Client Component boundary bugs — an inline event handler placed directly in a Server Component (the footer newsletter form, and later a print button) — both had to be extracted into small dedicated Client Components, since React does not allow passing functions as props across that boundary at all. Also had a runtime crash from next/image loading a GitHub avatar from a host that wasn't whitelisted in next.config.mjs.",
    caseStudySolution:
      "Resolved the dependency conflicts by pinning to specific patched major versions instead of latest-at-the-time, extracted every offending inline handler into isolated 'use client' components, whitelisted the required image host, and added a reusable SectionErrorBoundary so a single section's runtime failure (e.g. an external API being unreachable) can't take down an entire page again.",
    caseStudyResults:
      "Architecture, design system, and three full content pages (Home, About, Skills) are complete and verified working locally. The Projects page and detail template are in progress. No production deployment or traffic yet — this is an honest build-in-progress status, not a business outcome.",
    caseStudyLessons:
      "Confirmed real versions before pinning dependencies rather than trusting memory of 'latest' — ecosystems move fast enough that yesterday's stable pin is today's broken peer dependency. Also reinforced that any place a Server Component might pass a function prop needs a second look — the fix is always the same (extract a Client Component) but the bug is easy to reintroduce.",
    folderStructure:
      "src/\n  app/            App Router routes, layouts, API routes\n  components/\n    layout/       navbar, footer, command palette\n    ui/           button, card, dialog, accordion, tabs...\n    sections/     page-level composed sections\n    features/     terminal, AI assistant, GitHub dashboard, PWA\n  lib/            db client, auth config, seo helpers\n  config/         site metadata, nav, shared content constants\nprisma/\n  schema.prisma   all data models\n  seed.ts         confirmed real content only",
    techInsights:
      "Next.js was chosen for server components and file-based routing, which fit a content-heavy, SEO-driven site well. Prisma over a raw query builder for type-safe schema evolution as new features (case studies, map locations, learning items) were added incrementally. Groq over other providers for the chat assistant specifically for inference speed in a chat-widget context, after starting with a different provider during initial build.",
    futureRoadmap:
      "Projects detail template, Services and Blog pages, Contact form wiring, admin dashboard CRUD forms, generating the remaining PWA icon sizes, wiring up real Lighthouse CI for the Performance Dashboard, and a first production deployment.",
    featured: true,
    order: 2,
  },

  // ------------------------------------------------------------------
  // Only the summary was confirmed during the Homepage phase — every
  // other field intentionally left unset pending Abdul's answers.
  // Rendering this project's detail page right now would show honest
  // empty states for problem/solution/features/tech stack/etc.
  // ------------------------------------------------------------------
  {
    title: "AI Study Assistant",
    slug: "ai-study-assistant",
    summary:
      "An AI-powered learning assistant that helps students understand concepts, ask questions, and receive intelligent explanations using modern language models.",
    description:
      "An AI-powered learning assistant that helps students understand concepts, ask questions, and receive intelligent explanations using modern language models.",
    coverImage: "/images/projects/placeholder-cover.svg",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Groq API", "Prisma", "PostgreSQL", "Vercel"],
    categories: ["AI", "Full Stack", "University"],
    status: "COMPLETED",
    features: [],
    liveUrl: null, // "YOUR-DEMO-URL" in Abdul's answer was an unfilled template, not a real URL
    githubUrl: null, // "YOUR_USERNAME" in Abdul's answer was an unfilled template, not a real URL
    featured: true,
    order: 0,
  },
  {
    title: "Cold Email SaaS",
    slug: "cold-email-saas",
    summary:
      "A SaaS application that generates personalized cold emails using AI to help businesses improve outreach and save time.",
    description:
      "A SaaS application that generates personalized cold emails using AI to help businesses improve outreach and save time.",
    coverImage: "/images/projects/placeholder-cover.svg",
    techStack: ["Flask", "Python", "SQLAlchemy", "Groq API", "Stripe", "HTML", "CSS", "JavaScript"],
    categories: ["AI", "SaaS", "Full Stack"],
    status: "COMPLETED",
    features: [],
    liveUrl: null, // same as above — template placeholder, not a real URL
    githubUrl: null,
    featured: true,
    order: 1,
  },
];

type ServiceSeed = Parameters<typeof prisma.service.create>[0]["data"];

// Derived from the 4 services Abdul confirmed during the Homepage phase.
// "Portfolio & Business Websites" is split into two here per the Services
// page brief, and "API Integration & Backend Development" is new — both
// extend beyond the exact 4 originally confirmed, so flag these two for
// Abdul's review rather than treating them as independently verified.
const SERVICES: ServiceSeed[] = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    shortDescription: "Modern, scalable, and responsive web applications built with the latest technologies and best engineering practices.",
    overview: "End-to-end web application development — from database design through to a deployed, production-ready product. Built with the same architecture discipline used across this portfolio's own codebase.",
    whoItsFor: ["Startups", "Small Businesses", "Entrepreneurs"],
    deliverables: ["Responsive Website", "Database", "API Integration", "Deployment", "Documentation", "Source Code"],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Vercel"],
    category: "Full Stack",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 0,
  },
  {
    title: "AI-Powered Applications",
    slug: "ai-powered-applications",
    shortDescription: "Intelligent applications using modern AI models for automation, productivity, and enhanced user experiences.",
    overview: "Integrating AI models into real product workflows — not a chatbot bolted onto an existing app, but AI as a core part of how the product solves its problem.",
    whoItsFor: ["Startups", "SaaS founders", "Agencies"],
    deliverables: ["API Integration", "Admin Dashboard", "Authentication", "Documentation", "Source Code"],
    techStack: ["Groq", "OpenAI", "Prompt Engineering", "Next.js", "PostgreSQL"],
    category: "AI",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 1,
  },
  {
    title: "Workflow Automation",
    slug: "workflow-automation",
    shortDescription: "Automate repetitive business processes with custom software solutions that improve efficiency and reduce manual work.",
    overview: "Custom automation tools that remove manual, repetitive work from a real business process — built around the specific workflow rather than a generic no-code template.",
    whoItsFor: ["Small Businesses", "Agencies", "Entrepreneurs"],
    deliverables: ["API Integration", "Database", "Documentation", "Source Code", "Deployment"],
    techStack: ["Node.js", "Playwright", "Cron Jobs", "Webhooks"],
    category: "Automation",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 2,
  },
  {
    // NOTE: split out from Abdul's confirmed "Portfolio & Business Websites" — flag for review.
    title: "Portfolio Websites",
    slug: "portfolio-websites",
    shortDescription: "Premium, high-performance portfolio websites with a strong focus on performance, SEO, accessibility, and user experience.",
    overview: "A personal or professional portfolio built to be genuinely fast and discoverable, not just visually polished — the same standard this very site is held to.",
    whoItsFor: ["Students", "Personal Brands", "Entrepreneurs"],
    deliverables: ["Responsive Website", "SEO Optimization", "PWA Support", "Deployment", "Source Code"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "Personal",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 3,
  },
  {
    // NOTE: split out from Abdul's confirmed "Portfolio & Business Websites" — flag for review.
    title: "Business Websites",
    slug: "business-websites",
    shortDescription: "Premium, high-performance business websites with a strong focus on performance, SEO, accessibility, and user experience.",
    overview: "A business's web presence built with the same engineering rigor as a product, not a template — accurate content, real performance budgets, and a CMS the business can actually use.",
    whoItsFor: ["Small Businesses", "Agencies", "Startups"],
    deliverables: ["Responsive Website", "SEO Optimization", "Admin Dashboard", "Analytics Integration", "Deployment", "Documentation"],
    techStack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Vercel"],
    category: "SaaS",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 4,
  },
  {
    // NOTE: new service not in Abdul's original 4-service confirmation — flag for review.
    title: "API Integration & Backend Development",
    slug: "api-integration-backend-development",
    shortDescription: "Robust backend systems and third-party API integrations that your application can actually rely on.",
    overview: "Backend architecture, database design, authentication, and integrating external services (payments, email, AI providers) into a cohesive, well-documented API layer.",
    whoItsFor: ["Startups", "Agencies", "SaaS founders"],
    deliverables: ["API Integration", "Authentication", "Database", "Documentation", "Performance Optimization"],
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "REST APIs"],
    category: "Backend",
    typicalTimeline: "Varies by scope — discussed after requirements are understood.",
    order: 5,
  },
];

type IndustrySeed = Parameters<typeof prisma.industry.create>[0]["data"];

// Explanatory capability content only — describes how these skills generally
// apply to each industry, not a claim of having delivered projects in it.
const INDUSTRIES: IndustrySeed[] = [
  { name: "Healthcare", description: "Patient-facing portals, appointment systems, and secure data handling built with privacy in mind.", order: 0 },
  { name: "Education", description: "Learning platforms, student portals, and AI-assisted study tools — informed by direct experience as a CS student.", order: 1 },
  { name: "SaaS", description: "Full-stack SaaS applications: auth, billing integration, admin dashboards, and the API layer that ties it together.", order: 2 },
  { name: "E-commerce", description: "Storefronts and admin tooling with performance and SEO treated as core requirements, not an afterthought.", order: 3 },
  { name: "Logistics", description: "Workflow automation for scheduling, tracking, and reducing manual coordination overhead.", order: 4 },
  { name: "Marketing", description: "Lead-generation tooling, landing pages, and automation for outreach workflows.", order: 5 },
  { name: "Finance", description: "Dashboards and internal tools built with the data-integrity discipline financial data requires.", order: 6 },
  { name: "Real Estate", description: "Listing platforms and lead-capture sites with a strong focus on search visibility.", order: 7 },
  { name: "Manufacturing", description: "Internal tools and process automation to reduce repetitive manual data entry.", order: 8 },
];

type FaqSeed = Parameters<typeof prisma.fAQ.create>[0]["data"];

// Reuses answers already confirmed on the About page (remote work, custom
// software, AI capability) rather than inventing new claims.
const FAQS: FaqSeed[] = [
  { question: "How do we start?", answer: "Reach out via email or WhatsApp with a short description of what you need — we'll go from there.", category: "Process", order: 0 },
  { question: "Do you work remotely?", answer: "Yes.", category: "Process", order: 1 },
  { question: "Do you build custom software?", answer: "Yes.", category: "Technical", order: 2 },
  { question: "Can you integrate AI?", answer: "Yes — AI-powered features are one of the core services offered.", category: "Technical", order: 3 },
  { question: "Do you provide ongoing support?", answer: "Yes, support is available after launch for fixes and iteration.", category: "Process", order: 4 },
  { question: "How can I contact you?", answer: "Email or WhatsApp — both are linked throughout the site and on the Contact page.", category: "General", order: 5 },
];

// Only 2 of the 10 planned cornerstone articles are seeded here — the ones
// that could be written with full authenticity from verified information
// (this exact build, and the About page's confirmed career facts). The other
// 8 need either no personal claims (pure technical tutorials — safe to write
// next without further input) or more real project detail than currently
// exists (the AI Study Assistant and Cold Email SaaS case studies) before an
// honest case-study article can be written about them.
type BlogPostSeed = Parameters<typeof prisma.blogPost.create>[0]["data"];
const BLOG_POSTS: BlogPostSeed[] = [portfolioBuildLog, careerJourney].map((post, i) => ({
  ...post,
  // portfolio-build-log.ts and career-journey.ts use `as const`, which makes
  // every array field a readonly tuple. Prisma's generated input types want
  // plain mutable arrays, so we copy each one here rather than editing the
  // `as const` source files (which would lose their literal string types
  // elsewhere, e.g. `level`).
  tags: [...post.tags],
  technologies: [...post.technologies],
  faqs: post.faqs ? post.faqs.map((faq) => ({ ...faq })) : post.faqs,
  coverImage: "/images/blog/placeholder-cover.svg",
  status: "PUBLISHED",
  featured: i === 0,
  publishedAt: new Date(2026, 6, 15 + i * 7), // staggered, real dates to be adjusted on actual publish
}));

async function main() {
  for (const skill of SKILLS) {
    const existing = await prisma.skill.findFirst({ where: { name: skill.name, category: skill.category } });
    if (!existing) {
      await prisma.skill.create({ data: skill });
    }
  }
  console.log(`Seeded ${SKILLS.length} confirmed skills (categories: Frontend, Backend, AI & Automation, Databases, Tools).`);
  console.log("Note: Cloud, DevOps, Testing, UI Libraries, State Management, and Deployment were");
  console.log("requested in the Skills page brief but not confirmed — no rows seeded for them.");
  console.log("Those categories simply won't render on the Skills page until real data is added.");

  for (const project of PROJECTS) {
    const { slug, ...data } = project;
    await prisma.project.upsert({
      where: { slug: slug as string },
      update: data,
      create: project,
    });
  }
  console.log(`Seeded/updated ${PROJECTS.length} confirmed featured projects.`);
  console.log("'Personal Portfolio Website' has full verified detail. 'AI Study Assistant' and");
  console.log("'Cold Email SaaS' now have confirmed categories and tech stack, but liveUrl/githubUrl");
  console.log("are still null — the URLs Abdul sent were unfilled templates (YOUR_USERNAME, etc.),");
  console.log("not real links, so GitHub/Live buttons stay hidden until the real URLs are provided.");

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug as string },
      update: service,
      create: service,
    });
  }
  console.log(`Seeded/updated ${SERVICES.length} services.`);
  console.log("IMPORTANT: only 4 services were confirmed during the Homepage phase. 'Portfolio");
  console.log("Websites' and 'Business Websites' here are split from the confirmed combined entry,");
  console.log("and 'API Integration & Backend Development' is new — review/edit these 3 via CMS.");

  for (const industry of INDUSTRIES) {
    const existing = await prisma.industry.findFirst({ where: { name: industry.name } });
    if (!existing) await prisma.industry.create({ data: industry });
  }
  console.log(`Seeded ${INDUSTRIES.length} industries (capability descriptions, not client claims).`);

  for (const faq of FAQS) {
    const existing = await prisma.fAQ.findFirst({ where: { question: faq.question as string } });
    if (!existing) await prisma.fAQ.create({ data: faq });
  }
  console.log(`Seeded ${FAQS.length} FAQs (reused from About page's already-confirmed answers).`);

  for (const post of BLOG_POSTS) {
    const { slug, ...data } = post;
    await prisma.blogPost.upsert({ where: { slug: slug as string }, update: data, create: post });
  }
  console.log(`Seeded ${BLOG_POSTS.length} cornerstone blog posts (2 of 10 planned — see prisma/content/).`);

  await prisma.availabilityStatus.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", status: "AVAILABLE" },
  });
  console.log("Availability status defaulted to AVAILABLE — update via CMS as it changes.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });