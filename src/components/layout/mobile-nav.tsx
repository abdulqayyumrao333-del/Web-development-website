"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const panelShadow =
  "0 30px 90px -35px rgba(15,23,42,0.30), 0 15px 45px -20px rgba(79,70,229,0.18)";

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  /* Lock page scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape key */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              fixed inset-0 z-[90]
              bg-slate-950/25
              backdrop-blur-[6px]
              md:hidden
            "
          />

          {/* Mobile Menu */}
          <motion.aside
            initial={{
              opacity: 0,
              y: -14,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              fixed
              inset-x-3
              top-3
              bottom-3
              z-[100]
              overflow-hidden
              rounded-[24px]
              border
              border-white/70
              bg-white/[0.97]
              shadow-2xl
              backdrop-blur-2xl
              md:hidden
              dark:border-white/[0.08]
              dark:bg-slate-950/[0.97]
            "
            style={{
              boxShadow: panelShadow,
            }}
          >
            {/* Background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              {/* Top glow */}
              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-72
                  w-[520px]
                  -translate-x-1/2
                  opacity-70
                "
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(79,70,229,0.10), transparent 68%)",
                }}
              />

              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, transparent 75%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, transparent 75%)",
                }}
              />
            </div>

            <div className="relative flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-indigo-500/[0.08] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-xl
                      border border-indigo-200/60
                      bg-indigo-50
                      text-indigo-600
                      dark:border-indigo-400/15
                      dark:bg-indigo-500/10
                      dark:text-indigo-400
                    "
                  >
                    <Code2
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="leading-none">
                    <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                      Navigation
                    </p>

                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Abdul Qayyum
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    border border-slate-200
                    bg-white/70
                    text-slate-500
                    transition-all duration-300
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:text-slate-400
                  "
                >
                  <X
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mb-4 flex items-center justify-between px-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-400/70 dark:text-slate-500">
                    Explore
                  </span>

                  <span className="font-mono text-[9px] text-indigo-500/40">
                    {String(mainNav.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {mainNav.map((item, index) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/" &&
                        pathname.startsWith(`${item.href}/`));

                    return (
                      <motion.div
                        key={item.href}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.04 + index * 0.045,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`
                            group
                            relative
                            flex
                            min-h-[58px]
                            items-center
                            rounded-xl
                            border
                            px-4
                            transition-all duration-300
                            ${
                              active
                                ? `
                                  border-indigo-200/60
                                  bg-indigo-50/80
                                  dark:border-indigo-400/15
                                  dark:bg-indigo-500/10
                                `
                                : `
                                  border-transparent
                                  hover:border-indigo-100
                                  hover:bg-indigo-50/50
                                  dark:hover:border-white/[0.06]
                                  dark:hover:bg-white/[0.03]
                                `
                            }
                          `}
                        >
                          {/* Number */}
                          <span
                            className={`
                              w-8
                              shrink-0
                              font-mono
                              text-[9px]
                              ${
                                active
                                  ? "text-indigo-500/70"
                                  : "text-slate-400/40 group-hover:text-indigo-500/50"
                              }
                            `}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Label */}
                          <span
                            className={`
                              text-[17px]
                              font-medium
                              tracking-tight
                              transition-colors
                              ${
                                active
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-slate-600 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white"
                              }
                            `}
                          >
                            {item.label}
                          </span>

                          {/* Active indicator */}
                          {active && (
                            <motion.span
                              layoutId="mobile-active-line"
                              className="
                                absolute
                                left-0
                                top-1/2
                                h-6
                                w-0.5
                                -translate-y-1/2
                                rounded-full
                                bg-indigo-500
                              "
                            />
                          )}

                          {/* Arrow */}
                          <ArrowRight
                            className={`
                              ml-auto
                              h-4
                              w-4
                              transition-all
                              duration-300
                              ${
                                active
                                  ? "text-indigo-500"
                                  : "text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-400"
                              }
                            `}
                            strokeWidth={1.6}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Current Page */}
                <div
                  className="
                    mt-8
                    rounded-xl
                    border border-indigo-100
                    bg-indigo-50/40
                    px-4 py-3.5
                    dark:border-white/[0.06]
                    dark:bg-white/[0.025]
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/70" />

                    <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-500/60">
                      Current page
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs capitalize text-slate-500 dark:text-slate-400">
                    {pathname === "/"
                      ? "Home"
                      : pathname
                          .split("/")
                          .filter(Boolean)
                          .pop()
                          ?.replace(/-/g, " ")}
                  </p>
                </div>
              </nav>

              {/* Bottom */}
              <div className="border-t border-indigo-500/[0.08] px-5 pb-5 pt-4">
                {/* Social */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400/70">
                    Connect
                  </span>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        border border-slate-200
                        text-slate-400
                        transition-all
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        dark:border-white/[0.08]
                        dark:text-slate-500
                      "
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        border border-slate-200
                        text-slate-400
                        transition-all
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        dark:border-white/[0.08]
                        dark:text-slate-500
                      "
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={`mailto:${siteConfig.links.email}`}
                      aria-label="Email"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        border border-slate-200
                        text-slate-400
                        transition-all
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        dark:border-white/[0.08]
                        dark:text-slate-500
                      "
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="
                    group
                    flex w-full
                    items-center
                    justify-between
                    rounded-xl
                    bg-indigo-600
                    px-4 py-3.5
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-indigo-500
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                      <Mail className="h-3.5 w-3.5" />
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        Start a conversation
                      </p>

                      <p className="mt-0.5 text-[9px] text-white/55">
                        Let&apos;s build something useful
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400/30">
                    Full Stack · AI
                  </span>

                  <span className="font-mono text-[8px] text-slate-400/30">
                    © 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}