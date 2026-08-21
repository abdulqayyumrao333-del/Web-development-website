# Design System — Abdul Qayyum Portfolio

Aurora Tech, implemented. This document is the source of truth for every token and
component in `src/`. See `BRAND_GUIDE.md` for the 3-concept comparison and logo rationale —
this file picks up where that leaves off: the fully implemented, code-backed system.

Status: **design system complete** per the build order. Page-by-page content implementation
follows this, using only the primitives documented here.

---

## 1. Color tokens

Defined as CSS custom properties in `src/app/globals.css` (light values under `:root`,
dark values under `.dark`), consumed via Tailwind in `tailwind.config.ts`.

| Token | Class | Dark value | Light value |
|---|---|---|---|
| Base background | `bg-bg-base` | `#0B0F1A` | `#FFFFFF` |
| Surface (cards) | `bg-bg-surface` | `#12172A` | `#F7F8FB` |
| Surface 2 (nested) | `bg-bg-surface2` | `#171D33` | `#EEF0F5` |
| Border | `border-border` | `#232A44` | `#E5E7EB` |
| Border hover | `border-border-hover` | `#323B5E` | `#D1D5DB` |
| Text primary | `text-text-primary` | `#F5F6FA` | `#0B0F1A` |
| Text secondary | `text-text-secondary` | `#9AA1B9` | `#4B5563` |
| Text muted | `text-text-muted` | `#6B7280` | `#6B7280` |
| Accent blue | `text-accent-blue` / `bg-accent-blue` | `#60A5FA` | `#3B82F6` |
| Accent indigo (primary) | `-accent-indigo` | `#6366F1` | `#4F46E5` |
| Accent violet | `-accent-violet` | `#A855F7` | `#9333EA` |
| Success / Warning / Danger | `-success` / `-warning` / `-danger` | `#34D399` / `#FBBF24` / `#F87171` | `#10B981` / `#F59E0B` / `#EF4444` |

**Gradient** (logo, primary CTA glow, one hero accent only — never a full-section background):
`bg-aurora` → `linear-gradient(135deg, #60A5FA 0%, #6366F1 50%, #A855F7 100%)`

**Rule:** dark mode is the default (`defaultTheme="dark"` in `ThemeProvider`). Light mode
must remain fully supported and equally polished — it is not an afterthought variant.

---

## 2. Typography scale

Font: Inter (`--font-inter`, loaded via `next/font/google` in `layout.tsx`). Mono: Geist
Mono / JetBrains Mono for code, stats, and labels (`font-mono`).

| Token | Class | Size / line-height | Use |
|---|---|---|---|
| Display | `text-display` | 72px / 76px, -0.025em | Hero headline only |
| Display sm | `text-display-sm` | 56px / 60px, -0.02em | Section hero on sub-pages |
| H1 | `text-h1` | 40px / 48px, -0.02em | Page titles |
| H2 | `text-h2` | 32px / 40px, -0.015em | Section titles |
| H3 | `text-h3` | 24px / 32px, -0.01em | Card/subsection titles |
| H4 | `text-h4` | 20px / 28px, -0.01em | Small headings |
| Body large | `text-body-lg` | 18px / 28px | Intro paragraphs |
| Body | `text-body` | 16px / 26px | Default paragraph |
| Label sm | `text-label-sm` | 13px / 18px, +0.04em, uppercase | Eyebrows, form labels |
| Caption | `text-caption` | 12px / 16px, +0.02em | Meta, timestamps |

Rule: negative tracking only on headings ≥ 24px. Body text tracking stays at `0`.
Uppercase is reserved for `label-sm` (eyebrows) — never uppercase a full sentence.

---

## 3. Spacing & layout

- Base unit: 4px. Use Tailwind's default scale (`p-4` = 16px, `p-6` = 24px, `p-8` = 32px).
- Page container: `mx-auto max-w-6xl px-6` (content pages use `max-w-4xl` / `max-w-3xl` for
  reading-width text — see `about`, `blog/[slug]`).
- Section vertical rhythm: `py-24` between major sections, `py-16` for tighter sub-sections.
- Card padding: `p-6` default, `p-5` for dense grids (project/blog cards).

---

## 4. Radius tokens

| Token | Value | Use |
|---|---|---|
| `rounded-none` | 0px | Never used by default — explicit editorial exception only |
| `rounded-xs` | 6px | Small chips, checkboxes |
| `rounded-sm` | 8px | Buttons, inputs |
| `rounded-md` | 16px | Cards, dropdowns, dialogs |
| `rounded-lg` | 24px | Hero panels, modals, large media |
| `rounded-full` | 9999px | Pills, avatars, nav, badges |

---

## 5. Shadow tokens

| Token | Use |
|---|---|
| `shadow-xs` / `shadow-sm` | Resting card elevation |
| `shadow-md` | Hover elevation, dropdowns |
| `shadow-lg` / `shadow-xl` | Modals, dialogs |
| `shadow-glow` | Primary button hover, active nav states |
| `shadow-glow-lg` | Hero signature element only |

**Glassmorphism** — used only on the navbar and command palette, not on every card:
```css
background: rgba(18,23,42,0.7); /* bg-bg-surface/70 */
backdrop-filter: blur(16px);     /* backdrop-blur-md */
border: 1px solid var(--border);
```

---

## 6. Motion tokens

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 150ms | Hover/press micro-interactions |
| `duration-base` | 200ms | Default transitions |
| `duration-slow` | 400ms | Scroll reveals |
| `duration-slower` | 600ms | Hero orchestrated entrance |
| `ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Entrances (fade-up, scale-in) |
| `ease-in-out-soft` | `cubic-bezier(0.4,0,0.2,1)` | Hover/press states |

Keyframe utilities: `animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-shimmer`
(skeleton loading only). All respect `prefers-reduced-motion` globally (see `globals.css`) —
reduced-motion collapses every animation/transition to ~0ms automatically, no per-component
opt-out needed.

**Rule:** one orchestrated entrance per page (hero stagger), not scattered per-section fades
competing for attention. Hover/press stays under 200ms. Nothing loops except the skeleton shimmer.

---

## 7. Icon guidelines

- Library: **Lucide** (`lucide-react`) exclusively — no mixing icon sets.
- Stroke width: default (1.5px equivalent at Lucide's base). Never mix filled + outline
  in the same view (status dots are the one exception — solid, tiny, non-icon).
- Sizes: `h-4 w-4` (16px) inline with text, `h-5 w-5` (20px) standalone buttons, `h-6 w-6`
  (24px) feature/empty-state illustrations only.
- Color: inherits `currentColor` — never hard-code an icon color outside the token set.

---

## 8. Component library

All primitives live in `src/components/ui/`, built on Radix UI where interaction
complexity warrants it (focus trapping, roving tabindex, portals) — hand-rolled only
where Radix would be overkill (Card, Badge, Skeleton, Avatar).

| Component | File | Notes |
|---|---|---|
| Button | `ui/button.tsx` | variants: primary/secondary/ghost · sizes: sm/md/lg · supports `asChild` (Radix Slot) |
| Card | `ui/card.tsx` | base surface container |
| Badge | `ui/badge.tsx` | pill tag, used for tech stack / categories |
| Input / Textarea | `ui/input.tsx`, `ui/textarea.tsx` | form fields, focus ring via `:focus-visible` token |
| Skeleton | `ui/skeleton.tsx` | shimmer loading placeholder |
| Avatar | `ui/avatar.tsx` | image + initials fallback |
| Alert | `ui/alert.tsx` | info/success/warning/danger variants |
| Tabs | `ui/tabs.tsx` | Radix Tabs — roving tabindex, correct ARIA |
| Accordion | `ui/accordion.tsx` | Radix Accordion — used by FAQ |
| Dialog | `ui/dialog.tsx` | Radix Dialog — portal + focus trap + `Escape`/overlay close |
| Dropdown | `ui/dropdown.tsx` | Radix DropdownMenu — full keyboard nav |

Composed section components live in `src/components/sections/`:

| Component | File | Used by |
|---|---|---|
| Hero | `sections/hero.tsx` | Homepage |
| ProjectCard / BlogCard | `sections/project-card.tsx`, `sections/blog-card.tsx` | Projects, Blog |
| SkillCard / TestimonialCard | `sections/skill-testimonial-cards.tsx` | Skills, Testimonials |
| Timeline | `sections/timeline.tsx` | Experience, Education |
| FaqAccordion | `sections/faq-accordion.tsx` | FAQ (composes `ui/accordion`) |
| SocialLinks | `sections/social-links.tsx` | Footer, Contact, About |
| ContactForm / LoginForm | `sections/contact-form.tsx`, `sections/login-form.tsx` | Contact, Login |

---

## 9. Navbar

`components/layout/navbar.tsx` — floating glass pill nav:
- Fixed, centered, `max-w-4xl`, `rounded-full`, glass background (§5).
- AQ monogram (theme-aware: dark/light icon swap) + wordmark (hidden on mobile, icon-only).
- Active route gets an animated pill background (`framer-motion` `layoutId`, spring transition)
  behind the label — not just a color change, an actual moving indicator.
- CTA button ("Let's talk" → `/contact`) always visible on desktop.
- Theme toggle inline; mobile collapses to a full-screen `MobileNav` sheet.
- Because the nav is `fixed` (not `sticky`), `<main>` in `layout.tsx` carries `pt-24` to
  clear it — don't remove that padding when editing the layout.

## 10. Footer

`components/layout/footer.tsx` — name + one-line description, social/nav links, legal
links, copyright. `BackToTop` (`layout/back-to-top.tsx`) is a separate floating button,
appears after 480px of scroll.

## 11. Reusable section template pattern

Every content page (`about`, `skills`, `services`, etc.) follows the same shell, already
scaffolded in `src/app/*/page.tsx`:
```tsx
<section className="mx-auto max-w-5xl px-6 py-24">
  <h1 className="text-h1">{title}</h1>
  <p className="mt-4 max-w-2xl text-body text-text-secondary">{description}</p>
  {/* composed section components go here */}
</section>
```
This keeps every page's title/intro rhythm identical — the content phase fills the body,
not the shell.

## 12. Accessibility checklist (applies to every component above)

- Visible focus ring via the global `:focus-visible` rule — do not suppress with `outline-none`
  unless a component supplies its own equally visible focus treatment (Radix components do).
- All interactive Radix primitives (Dialog, Dropdown, Tabs, Accordion) ship correct ARIA and
  keyboard behavior out of the box — don't hand-roll a replacement.
- Color is never the only signal (status uses icon + color in `Alert`; active nav uses a
  moving pill, not just a color swap).
- `prefers-reduced-motion` is handled globally — no per-component escape hatch needed.
- Skip-to-content link present in `layout.tsx`, targets `#main-content`.

---

## 13. What's intentionally NOT done yet

Per the build order, these are out of scope until their named phase: page copy/content,
image assets, MDX rendering, admin dashboard forms, PWA icons at all sizes, and Lighthouse
tuning. Building them now against an unfinished design system would mean redoing them —
this file is the contract everything else gets built against next.
