import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: { base: "var(--bg-base)", surface: "var(--bg-surface)", "surface-2": "var(--bg-surface-2)" },
        border: { DEFAULT: "var(--border)", hover: "var(--border-hover)" },
        text: { primary: "var(--text-primary)", secondary: "var(--text-secondary)", muted: "var(--text-muted)" },
        accent: { blue: "var(--accent-blue)", indigo: "var(--accent-indigo)", violet: "var(--accent-violet)" },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },

      // --- Radius tokens ---------------------------------------------------
      borderRadius: {
        none: "0px",
        xs: "6px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        full: "9999px",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      // --- Typography scale (name, [size, {lineHeight, letterSpacing}]) ----
      // Mirrors DESIGN_SYSTEM.md §2. Use text-caption/body/h4../h1/display.
      fontSize: {
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.02em" }],
        "label-sm": ["13px", { lineHeight: "18px", letterSpacing: "0.04em" }],
        body: ["16px", { lineHeight: "26px", letterSpacing: "0em" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0em" }],
        h4: ["20px", { lineHeight: "28px", letterSpacing: "-0.01em" }],
        h3: ["24px", { lineHeight: "32px", letterSpacing: "-0.01em" }],
        h2: ["32px", { lineHeight: "40px", letterSpacing: "-0.015em" }],
        h1: ["40px", { lineHeight: "48px", letterSpacing: "-0.02em" }],
        "display-sm": ["56px", { lineHeight: "60px", letterSpacing: "-0.02em" }],
        display: ["72px", { lineHeight: "76px", letterSpacing: "-0.025em" }],
      },

      // --- Shadow tokens -----------------------------------------------------
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.3)",
        sm: "0 1px 2px rgba(0,0,0,0.4)",
        md: "0 4px 16px rgba(0,0,0,0.35)",
        lg: "0 12px 32px rgba(0,0,0,0.4)",
        xl: "0 24px 64px rgba(0,0,0,0.45)",
        glow: "0 0 24px rgba(99,102,241,0.35)",
        "glow-lg": "0 0 48px rgba(99,102,241,0.4)",
        "inner-border": "inset 0 0 0 1px rgba(255,255,255,0.06)",
      },

      backgroundImage: {
        aurora: "linear-gradient(135deg, #60A5FA 0%, #6366F1 50%, #A855F7 100%)",
        "aurora-radial": "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.25), transparent 60%)",
      },

      // --- Motion tokens -----------------------------------------------------
      // Durations: fast (micro-interactions), base (default), slow (reveals), slower (hero)
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "400ms",
        slower: "600ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(0.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        "fade-up": "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;

