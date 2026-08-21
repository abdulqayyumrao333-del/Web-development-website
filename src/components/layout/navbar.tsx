"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav } from "@/config/nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

import {
  Sparkles,
  ChevronDown,
  Code2,
  Sparkles as SparklesIcon,
  Workflow,
  Globe,
  Server,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    label: "Full Stack Development",
    href: "/services#full-stack",
  },
  {
    icon: SparklesIcon,
    label: "AI Applications",
    href: "/services#ai",
  },
  {
    icon: Workflow,
    label: "Workflow Automation",
    href: "/services#automation",
  },
  {
    icon: Globe,
    label: "Portfolio Websites",
    href: "/services#portfolio",
  },
  {
    icon: Server,
    label: "API Integration",
    href: "/services#api",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* --------------------------------
     Scroll state
  -------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* --------------------------------
     Close desktop dropdown
     when clicking outside
  -------------------------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* --------------------------------
     Cleanup hover timeout
  -------------------------------- */

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /* --------------------------------
     Services hover
  -------------------------------- */

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
      timeoutRef.current = null;
    }, 180);
  };

  /* --------------------------------
     Mobile menu
  -------------------------------- */

  const handleMobileMenuOpen = () => {
    setOpen(true);
    setServicesOpen(false);
  };

  const handleMobileMenuClose = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  /* --------------------------------
     Active services state
  -------------------------------- */

  const isServicesActive =
    pathname === "/services" || pathname?.startsWith("/services/");

  return (
    <>
      {/* ==========================================
          MAIN NAVBAR
      ========================================== */}

      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-[1080px] -translate-x-1/2">
        <nav
          className={`
            relative flex items-center justify-between
            rounded-[18px]
            px-2 py-2
            transition-all duration-500
            overflow-visible

            ${
              scrolled
                ? `
                  border border-indigo-200/60
                  bg-white/80
                  shadow-[0_12px_45px_-18px_rgba(79,70,229,0.28)]
                  backdrop-blur-2xl
                `
                : `
                  border border-white/70
                  bg-white/55
                  shadow-[0_8px_35px_-20px_rgba(79,70,229,0.16)]
                  backdrop-blur-xl
                `
            }

            dark:border-white/[0.08]
            dark:bg-slate-950/65
          `}
        >
          {/* --------------------------------
              Ambient glow
          -------------------------------- */}

          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              -inset-[1px]
              -z-10
              rounded-[19px]
              opacity-70
              blur-[1px]
              bg-gradient-to-r
              from-indigo-300/30
              via-transparent
              to-violet-300/25
            "
          />

          {/* --------------------------------
              Inner highlight
          -------------------------------- */}

          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[18px]
              bg-gradient-to-b
              from-white/55
              via-transparent
              to-indigo-50/20
              dark:from-white/[0.05]
              dark:to-transparent
            "
          />

          {/* --------------------------------
              Logo
          -------------------------------- */}

          <Link
            href="/"
            className="
              relative z-10
              flex shrink-0 items-center
              gap-2.5
              rounded-xl
              px-2.5 py-1.5
              transition-all duration-300
              hover:bg-white/60
              dark:hover:bg-white/[0.05]
            "
          >
            {/* Icon */}

            <div
              className="
                relative
                flex h-9 w-9
                items-center justify-center
                rounded-[11px]
                border border-indigo-200/50
                bg-gradient-to-br
                from-white
                via-indigo-50/70
                to-violet-50/70
                shadow-[0_4px_14px_-6px_rgba(79,70,229,0.35)]
                transition-all duration-300
                hover:scale-[1.04]
                hover:shadow-[0_8px_20px_-8px_rgba(79,70,229,0.45)]
                dark:border-indigo-400/20
                dark:from-slate-800
                dark:via-indigo-950/50
                dark:to-slate-900
              "
            >
              <Image
                src="/icons/aq-icon-dark.svg"
                alt="Abdul Qayyum"
                width={19}
                height={19}
                className="hidden dark:block"
              />

              <Image
                src="/icons/aq-icon-light.svg"
                alt="Abdul Qayyum"
                width={19}
                height={19}
                className="dark:hidden"
              />

              {/* Online indicator */}

              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  h-2 w-2
                  rounded-full
                  border-2
                  border-white
                  bg-emerald-400
                  shadow-[0_0_8px_rgba(52,211,153,0.7)]
                  dark:border-slate-900
                "
              />
            </div>

            {/* Name */}

            <div className="hidden sm:block leading-none">
              <div
                className="
                  text-[13px]
                  font-semibold
                  tracking-[-0.02em]
                  text-slate-900
                  dark:text-white
                "
              >
                Abdul Qayyum
              </div>

              <div
                className="
                  mt-1
                  text-[7px]
                  font-mono
                  uppercase
                  tracking-[0.13em]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Full Stack Developer
              </div>
            </div>
          </Link>

          {/* --------------------------------
              Desktop Navigation
          -------------------------------- */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-0.5
              rounded-full
              border border-slate-200/50
              bg-white/35
              px-1
              py-1
              shadow-inner
              shadow-white/60
              dark:border-white/[0.06]
              dark:bg-white/[0.025]
            "
          >
            {mainNav.map((item) => {
              const active = pathname === item.href;
              const isServices = item.label === "Services";

              return (
                <div
                  key={item.href}
                  ref={isServices ? dropdownRef : null}
                  onMouseEnter={
                    isServices ? handleMouseEnter : undefined
                  }
                  onMouseLeave={
                    isServices ? handleMouseLeave : undefined
                  }
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`
                      relative
                      flex items-center
                      gap-1
                      rounded-full
                      px-3.5
                      py-1.5
                      text-[13px]
                      font-medium
                      transition-all duration-300

                      ${
                        active ||
                        (isServices && isServicesActive)
                          ? `
                            text-indigo-600
                            dark:text-indigo-400
                          `
                          : `
                            text-slate-500
                            hover:text-slate-900
                            hover:bg-white/70

                            dark:text-slate-400
                            dark:hover:text-white
                            dark:hover:bg-white/[0.05]
                          `
                      }
                    `}
                  >
                    {/* Active background */}

                    {(active ||
                      (isServices && isServicesActive)) && (
                      <motion.span
                        layoutId="navbar-active"
                        className="
                          absolute
                          inset-0
                          -z-0
                          rounded-full
                          border border-indigo-200/60
                          bg-indigo-50/80
                          shadow-[0_3px_10px_-5px_rgba(79,70,229,0.35)]
                          dark:border-indigo-400/15
                          dark:bg-indigo-500/10
                        "
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {item.label}
                    </span>

                    {isServices && (
                      <ChevronDown
                        className={`
                          relative z-10
                          h-3 w-3
                          transition-transform duration-300
                          ${
                            servicesOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                        strokeWidth={1.8}
                      />
                    )}
                  </Link>

                  {/* --------------------------------
                      Services Dropdown
                  -------------------------------- */}

                  {isServices && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                          className="
                            absolute
                            left-1/2
                            top-full
                            mt-3
                            w-[270px]
                            -translate-x-1/2
                            overflow-hidden
                            rounded-2xl
                            border border-white/70
                            bg-white/80
                            p-1.5
                            shadow-[0_25px_70px_-25px_rgba(79,70,229,0.28)]
                            backdrop-blur-2xl
                            dark:border-white/[0.08]
                            dark:bg-slate-950/85
                          "
                        >
                          {/* Dropdown glow */}

                          <div
                            aria-hidden
                            className="
                              pointer-events-none
                              absolute
                              -right-12
                              -top-12
                              h-28
                              w-28
                              rounded-full
                              bg-indigo-400/10
                              blur-3xl
                            "
                          />

                          {SERVICES.map((service) => {
                            const Icon = service.icon;

                            return (
                              <Link
                                key={service.label}
                                href={service.href}
                                onClick={() =>
                                  setServicesOpen(false)
                                }
                                className="
                                  group
                                  relative
                                  flex items-center
                                  gap-3
                                  rounded-xl
                                  px-3
                                  py-2.5
                                  transition-all duration-200
                                  hover:bg-indigo-50/80
                                  dark:hover:bg-indigo-500/[0.07]
                                "
                              >
                                <div
                                  className="
                                    flex h-8 w-8
                                    shrink-0
                                    items-center justify-center
                                    rounded-lg
                                    border border-indigo-100
                                    bg-white
                                    shadow-sm
                                    transition-all duration-300
                                    group-hover:border-indigo-200
                                    group-hover:bg-indigo-50
                                    group-hover:scale-105
                                    dark:border-white/[0.07]
                                    dark:bg-white/[0.03]
                                    dark:group-hover:border-indigo-400/20
                                    dark:group-hover:bg-indigo-500/10
                                  "
                                >
                                  <Icon
                                    className="
                                      h-3.5 w-3.5
                                      text-indigo-500/70
                                      transition-colors
                                      group-hover:text-indigo-600
                                    "
                                    strokeWidth={1.8}
                                  />
                                </div>

                                <span
                                  className="
                                    text-[13px]
                                    font-medium
                                    text-slate-600
                                    transition-colors
                                    group-hover:text-indigo-600
                                    dark:text-slate-300
                                    dark:group-hover:text-indigo-400
                                  "
                                >
                                  {service.label}
                                </span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* --------------------------------
              Right Actions
          -------------------------------- */}

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            {/* Theme */}

            <ThemeToggle />

            {/* Availability */}

            <div
              className="
                hidden
                lg:flex
                items-center
                gap-1.5
                rounded-full
                border border-emerald-200/60
                bg-emerald-50/50
                px-2.5
                py-1.5
                dark:border-emerald-400/10
                dark:bg-emerald-400/[0.05]
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5 w-1.5
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-emerald-600/80
                  dark:text-emerald-400/70
                "
              >
                Available
              </span>
            </div>

            {/* Let's Talk */}

            <Button
              size="sm"
              asChild
              className="
                hidden
                sm:inline-flex
                h-9
                rounded-xl
                border
                border-indigo-400/20
                bg-gradient-to-br
                from-indigo-500
                via-indigo-600
                to-violet-600
                px-4
                text-[13px]
                font-medium
                text-white
                shadow-[0_8px_20px_-8px_rgba(79,70,229,0.65)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_12px_28px_-8px_rgba(79,70,229,0.75)]
              "
            >
              <Link href="/contact">
                <Sparkles
                  className="mr-1.5 h-3.5 w-3.5"
                  strokeWidth={1.8}
                />

                Let's talk
              </Link>
            </Button>

            {/* --------------------------------
                Mobile Menu Button
            -------------------------------- */}

            <button
              type="button"
              className="
                flex
                h-9 w-9
                items-center justify-center
                rounded-xl
                border border-slate-200/70
                bg-white/60
                text-slate-700
                transition-all duration-300
                hover:bg-white
                hover:border-indigo-200
                md:hidden
                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-white
              "
              onClick={handleMobileMenuOpen}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 rounded-full bg-current" />
                <span className="block h-0.5 w-4 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ==========================================
          IMPORTANT:
          MobileNav MUST stay OUTSIDE the fixed header.
      ========================================== */}

      <MobileNav
        open={open}
        onClose={handleMobileMenuClose}
      />
    </>
  );
}