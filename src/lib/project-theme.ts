// Category → visual theme mapping. Deliberately reuses only colors already
// defined in the design system tokens (accent-blue/indigo/violet, success,
// warning) — "different personality per category" without inventing a new
// palette outside DESIGN_SYSTEM.md.

export type ProjectTheme = {
  gradient: string; // tailwind bg-gradient classes
  glow: string; // box-shadow-ish glow color class
  label: string;
};

const THEMES: Record<string, ProjectTheme> = {
  AI: {
    gradient: "from-accent-violet/20 via-accent-indigo/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.35)]",
    label: "AI",
  },
  SaaS: {
    gradient: "from-accent-blue/20 via-accent-indigo/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(96,165,250,0.35)]",
    label: "SaaS",
  },
  "Full Stack": {
    gradient: "from-accent-indigo/15 via-bg-surface to-transparent",
    glow: "shadow-glow",
    label: "Full Stack",
  },
  Automation: {
    gradient: "from-success/15 via-accent-indigo/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)]",
    label: "Automation",
  },
  University: {
    gradient: "from-text-muted/10 via-bg-surface to-transparent",
    glow: "shadow-sm",
    label: "University",
  },
  Personal: {
    gradient: "from-accent-indigo/15 via-accent-violet/10 to-transparent",
    glow: "shadow-glow",
    label: "Personal",
  },
  "Open Source": {
    gradient: "from-warning/15 via-bg-surface to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]",
    label: "Open Source",
  },
};

const DEFAULT_THEME: ProjectTheme = {
  gradient: "from-accent-indigo/10 via-bg-surface to-transparent",
  glow: "shadow-sm",
  label: "Project",
};

export function getProjectTheme(categories: string[]): ProjectTheme {
  for (const category of categories) {
    if (THEMES[category]) return THEMES[category]!;
  }
  return DEFAULT_THEME;
}
