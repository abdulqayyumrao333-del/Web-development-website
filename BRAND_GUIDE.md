# Abdul Qayyum — Brand & Design System

## 1. Three concepts (comparison)

### Concept A — Midnight Gold (Luxury)
- **Feel:** executive, established, "old money tech" — consultancy/agency energy.
- **Backgrounds:** `#0E0E10` / `#161616`
- **Accent:** `#C9A24B` (warm gold), `#E8C874` (light gold hover)
- **Typography:** Serif display (e.g. Fraunces / Canela) + Inter body — signals authority over speed.
- **Risk:** gold can tip into "template luxury real-estate site" if overused; needs restraint (thin strokes, no heavy foil gradients).
- **Best for:** consulting/agency positioning, older-money clients, less "startup founder."

### Concept B — Aurora Tech (Recommended)
- **Feel:** modern SaaS, technically credible, calm-confident — Linear/Vercel/Raycast register.
- **Backgrounds:** `#0B0F1A` (near-black navy) → `#12172A` (surface)
- **Accent:** electric blue `#60A5FA` → indigo `#6366F1` → violet `#A855F7` gradient, used sparingly (glow on hover/focus, not everywhere).
- **Typography:** Inter or Geist for both display and body, tight tracking on headlines, tabular numerals for stats.
- **Risk:** gradients can look generic if used everywhere; mitigated by using the gradient *only* on the logo mark, hover glows, and one hero accent — everything else stays monochrome navy/white.
- **Best for:** recruiter appeal, AI/full-stack positioning, founder image, ages well.

### Concept C — Minimal Monochrome
- **Feel:** editorial, Apple/Notion-calm, content-first.
- **Backgrounds:** `#FFFFFF` / `#0A0A0A` (true light/dark, no navy tint)
- **Accent:** none — hierarchy from type weight and spacing only.
- **Typography:** a single grotesk (Inter/Söhne) at multiple weights.
- **Risk:** without an accent color, weaker instant brand recall in a crowded portfolio market; safest but least distinctive.
- **Best for:** writing-heavy personal sites, minimal-maintenance long-term brand.

**Recommendation:** Concept B, per your call. It has the strongest recruiter/founder signal, works cleanly with a monogram mark, and ages better than gold (A) while being more memorable than monochrome (C).

---

## 2. Design tokens — Concept B: Aurora Tech (ACTIVE)

### Color
| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#0B0F1A` | page background (dark mode default) |
| `--bg-surface` | `#12172A` | cards, panels |
| `--bg-surface-2` | `#171D33` | nested cards, code blocks |
| `--border` | `#232A44` | hairline borders |
| `--border-hover` | `#323B5E` | hover state borders |
| `--text-primary` | `#F5F6FA` | headings, body |
| `--text-secondary` | `#9AA1B9` | supporting text |
| `--text-muted` | `#6B7280` | captions, meta |
| `--accent-blue` | `#60A5FA` | gradient stop 1, links |
| `--accent-indigo` | `#6366F1` | gradient stop 2, primary CTA |
| `--accent-violet` | `#A855F7` | gradient stop 3, highlights |
| `--success` | `#34D399` | status |
| `--warning` | `#FBBF24` | status |
| `--danger` | `#F87171` | status/errors |

Light mode mirrors this with `--bg-base:#FFFFFF`, `--bg-surface:#F7F8FB`, `--text-primary:#0B0F1A`, same accent hues at slightly deeper saturation for contrast.

Gradient (use only on logo, primary CTA hover glow, and hero signature element):
```css
background: linear-gradient(135deg, #60A5FA 0%, #6366F1 50%, #A855F7 100%);
```

### Typography
- **Primary (display + body):** Inter (or Geist Sans if using Vercel's font) — variable weight 400–700.
- **Mono (code, stats, labels):** Geist Mono / JetBrains Mono.
- **Scale:** 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72, line-height 1.1 for display, 1.6 for body.
- **Tracking:** -0.02em on headings ≥32px, 0 on body, +0.08em uppercase on eyebrows/labels.

### Surfaces & elevation
- **Radius:** 8px (inputs/buttons), 16px (cards), 24px (modals/hero panels).
- **Glassmorphism:** `background: rgba(18,23,42,0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);` — used only on navbar-on-scroll and command palette, not on every card.
- **Shadow system:**
  - `sm`: `0 1px 2px rgba(0,0,0,0.4)`
  - `md`: `0 4px 16px rgba(0,0,0,0.35)`
  - `glow`: `0 0 24px rgba(99,102,241,0.35)` (hover only, on primary actions)

### Buttons
- Primary: solid `--accent-indigo`, white text, `glow` shadow on hover, 8px radius.
- Secondary: 1px border `--border`, transparent bg, `--border-hover` + subtle bg tint on hover.
- Ghost: text only, underline-on-hover for inline links.

### Motion
- Page-load: single orchestrated hero reveal (stagger 60–80ms per element), not per-section scattered fades.
- Scroll reveals: subtle 12px translate + opacity, 400ms ease-out, triggered once.
- Micro-interactions: 150–200ms ease for hover/press states.
- Respect `prefers-reduced-motion`: disable translate/parallax, keep opacity-only fades.

### Icon style
- Outline icons, 1.5px stroke (Lucide), no filled icons except status dots.

---

## 3. Logo rationale

The mark is an original geometric monogram, not a template AI/circuit icon:
- A **circle** forms the loop of the **Q**, with a short diagonal **tail** breaking its bottom-right edge — reading unmistakably as "Q" at any size.
- A **geometric A** (two strokes + crossbar) is inscribed inside the circle, sharing the same stroke weight — so the two letters read as one continuous mark, not two logos glued together.
- Single stroke weight, no fills, no gradients in the base version — this is what makes it work as a 16px favicon, a GitHub avatar, and a business card foil-stamp equally well. The Aurora gradient is reserved for the hero/loading-screen variant only.

Files delivered (SVG, all editable/scalable):
- `aq-icon-dark.svg` — navy squircle badge, white mark → default navbar icon, GitHub/LinkedIn avatar
- `aq-icon-light.svg` — white badge, navy mark → light-mode favicon, print
- `aq-icon-mono-transparent.svg` — mark only, `currentColor` → stamp on any surface
- `aq-icon-aurora.svg` — gradient + glow version → hero section, PWA splash/loading screen
- `aq-wordmark-dark-bg.svg` / `aq-wordmark-light-bg.svg` — icon + "Abdul Qayyum" + role line, for footer/README/email signature
