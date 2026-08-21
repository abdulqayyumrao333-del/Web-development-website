# Content Strategy — Abdul Qayyum Portfolio Blog

## Philosophy

Four content types, working together (per Abdul's own framing — this is the right call):

| Type | Purpose | Examples |
|---|---|---|
| **Technical Tutorials** | SEO traffic — people searching for solutions | Next.js, React, AI, Prisma, TypeScript guides |
| **Build Logs / Case Studies** | Authority — proof of real, shipped work | Portfolio build, AI Study Assistant, Cold Email SaaS |
| **Career & Learning** | Personal brand — the human behind the code | Journey posts, yearly learning reflections |
| **Reference Guides** | Evergreen — linked-to for years, rank slowly but permanently | Best-practices guides, roadmaps |

Every cluster below should contain a mix of these types over time — not just tutorials.

---

## Cluster 1 — Next.js
**Pillar page:** "The Complete Next.js 15 Guide" (reference guide, long-form, updated yearly)
Future articles:
- Next.js App Router vs Pages Router — migration guide
- Server Components vs Client Components — when to use which
- Next.js caching explained (fetch cache, full route cache, router cache)
- Building a CMS-driven site with Next.js + Prisma (build log, links to Article 1)
- Next.js Middleware patterns (auth, redirects, i18n)

**Internal linking:** every post links to the pillar guide; pillar guide links out to each.

## Cluster 2 — React
**Pillar page:** "React Patterns That Actually Scale"
Future articles:
- Server state vs client state — when you actually need Redux/Zustand
- Compound components pattern, explained with real examples
- React 19's new hooks in practice
- Why I chose Framer Motion over React Spring for this portfolio (build log)

## Cluster 3 — TypeScript
**Pillar page:** "TypeScript for Full Stack Developers"
Future articles:
- Typing Prisma queries end-to-end without `any`
- Discriminated unions for API response handling
- Zod + TypeScript: validation that generates your types
- Common TypeScript mistakes that break at runtime anyway

## Cluster 4 — AI Development
**Pillar page:** "Building Real AI Features (Not Just Chatbot Wrappers)"
Future articles:
- Groq vs OpenAI vs Anthropic APIs — latency, cost, and when each fits
- Prompt engineering for grounded, non-hallucinating assistants (links to this site's own AI assistant build)
- RAG explained simply — and when you don't actually need it
- Streaming AI responses in Next.js API routes

## Cluster 5 — Software Engineering
**Pillar page:** "Engineering Principles I Actually Follow"
Future articles:
- Why I don't fabricate metrics or fake data in my own projects (ties to this portfolio's own content-integrity approach — genuinely differentiated content)
- Code review habits that catch real bugs
- When to add a database index (and when not to)

## Cluster 6 — Full Stack Development
**Pillar page:** "Complete Guide to Building Modern Full Stack Applications" (Article 4)
Future articles:
- Choosing a stack in 2026: a decision framework, not a recommendation list
- Auth patterns compared: NextAuth Credentials vs OAuth vs magic links
- API design: REST vs Server Actions vs tRPC — for solo/small-team projects

## Cluster 7 — Career
**Pillar page:** "My Journey to Becoming a Full Stack Software Engineer" (Article 7)
Future articles:
- What I'm learning this year (recurring annual post — real, updated)
- Lessons from building production projects (recurring, tied to real shipped work)
- Freelancing while studying Computer Science — what actually works

## Cluster 8 — Portfolio Development
**Pillar page:** "How I Built My Portfolio with Next.js 15, TypeScript, Prisma and PWA" (Article 1)
Future articles:
- Designing a CMS-driven personal site (no hardcoded content)
- Building an AI assistant grounded only in your own real data
- PWA features that are actually worth building for a personal site

## Cluster 9 — Performance Optimization
**Pillar page:** "How to Improve Website Performance and Achieve 95+ Lighthouse Score" (Article 5)
Future articles:
- Image optimization in Next.js: beyond just using `next/image`
- Reducing JavaScript bundle size — real before/after from this site
- Core Web Vitals explained without the marketing fluff

## Cluster 10 — Automation
**Pillar page:** "Building AI-Powered Automation That Doesn't Break"
Future articles:
- Building the Cold Email SaaS: architecture and lessons (build log, Article 6)
- Playwright for scraping vs APIs — when each is the right call
- Cron jobs vs webhooks vs queues — automation triggers compared

---

## Publishing cadence recommendation
Sustainable pace beats a content dump: **1 article every 2–3 weeks**, rotating content types (tutorial → build log → career/reference → tutorial). All ten cornerstone articles below seed the first ~5 months at that pace; the cluster lists above cover roughly two years beyond that.
