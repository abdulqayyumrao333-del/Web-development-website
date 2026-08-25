"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// Loads only the "domAnimation" feature set (drag/layout animations are NOT
// included — this project doesn't use those) instead of the full
// framer-motion bundle. Paired with `m.*` components (instead of `motion.*`)
// throughout the app, this cuts shipped animation JS from ~34kb to ~6kb.
//
// Not using `strict` mode here on purpose: if a `motion.*` component is ever
// used inside this tree instead of `m.*`, framer-motion just falls back to
// loading the full bundle for that usage rather than throwing — safer for a
// large, incremental migration across many files.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}