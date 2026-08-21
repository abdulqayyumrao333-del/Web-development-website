import { Code, Layers, BookOpen, Users, Gem, Gauge, TrendingUp, Target, type LucideIcon } from "lucide-react";

export type EngineeringPrinciple = { icon: LucideIcon; title: string };

// Confirmed by Abdul — do not add or remove without confirmation.
export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  { icon: Code, title: "Clean Code" },
  { icon: Layers, title: "Maintainable Architecture" },
  { icon: BookOpen, title: "Continuous Learning" },
  { icon: Users, title: "User-Centered Design" },
  { icon: Gem, title: "Quality Over Shortcuts" },
  { icon: Gauge, title: "Performance Awareness" },
  { icon: TrendingUp, title: "Scalability Mindset" },
  { icon: Target, title: "Problem-First Thinking" },
];
