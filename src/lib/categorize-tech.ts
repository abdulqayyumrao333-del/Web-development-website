export type TechCategory = "Languages" | "Frontend" | "Backend" | "Database" | "AI" | "Deployment" | "Tools";

const KEYWORD_MAP: Record<string, TechCategory> = {
  typescript: "Languages", javascript: "Languages", python: "Languages", html: "Languages", css: "Languages",
  react: "Frontend", "next.js": "Frontend", "next.js 15": "Frontend", "tailwind css": "Frontend",
  "framer motion": "Frontend", "radix ui": "Frontend",
  "node.js": "Backend", express: "Backend", flask: "Backend", sqlalchemy: "Backend",
  "next.js server actions": "Backend", "rest apis": "Backend", "nextauth.js": "Backend", "nextauth v5": "Backend",
  postgresql: "Database", prisma: "Database", mysql: "Database", supabase: "Database",
  "groq api": "AI", "groq sdk": "AI", "openai api": "AI", "anthropic api": "AI", "prompt engineering": "AI",
  vercel: "Deployment", stripe: "Deployment",
  git: "Tools", github: "Tools", "vs code": "Tools", postman: "Tools", npm: "Tools",
};

export function categorizeTechStack(techStack: string[]): Partial<Record<TechCategory, string[]>> {
  const grouped: Partial<Record<TechCategory, string[]>> = {};
  for (const tech of techStack) {
    const category = KEYWORD_MAP[tech.toLowerCase()] ?? "Tools";
    (grouped[category] ??= []).push(tech);
  }
  return grouped;
}
