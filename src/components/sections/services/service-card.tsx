"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Sparkles,
  Workflow,
  Globe,
  Building2,
  Plug,
  ArrowRight,
  Check,
  ExternalLink,
  Rocket,
  Zap,
  Layers3,
  X,
  BriefcaseBusiness,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FeaturedProjectCard } from "@/components/sections/projects/featured-project-card";

import type { Service, Project } from "@/types";

/* =========================================================
   ICON MAP
========================================================= */

const ICONS: Record<string, typeof Code2> = {
  "full-stack-web-development": Code2,
  "ai-powered-applications": Sparkles,
  "workflow-automation": Workflow,
  "portfolio-websites": Globe,
  "business-websites": Building2,
  "api-integration-backend-development": Plug,
};

/* =========================================================
   SHADOW
========================================================= */

const panelShadow =
  "0 8px 20px rgba(15,23,42,0.04), 0 24px 60px -16px rgba(79,70,229,0.18), 0 50px 100px -28px rgba(79,70,229,0.16)";

/* =========================================================
   SERVICE CARD
========================================================= */

export function ServiceCard({
  service,
  relatedProjects,
}: {
  service: Service;
  relatedProjects: Project[];
}) {
  const [open, setOpen] = useState(false);

  const Icon = ICONS[service.slug] ?? Code2;

  return (
    <>
      {/* =====================================================
          SERVICE CARD
      ===================================================== */}

      <article
        className="
          group
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-accent-indigo/12
          bg-gradient-to-br
          from-bg-surface-1
          via-bg-surface-1/95
          to-bg-surface-1/75
          p-6
          backdrop-blur-sm
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-accent-indigo/30
          hover:shadow-2xl
          hover:shadow-accent-indigo/8
        "
        style={{ boxShadow: panelShadow }}
      >
        {/* Hover glow */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-accent-indigo/10
            blur-3xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Top texture */}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(99,102,241,0.045) 0px, rgba(99,102,241,0.045) 1px, transparent 1px, transparent 12px)",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />

        {/* Corner bracket */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            right-3
            top-3
            h-5
            w-5
            rounded-tr-md
            border-r
            border-t
            border-accent-indigo/0
            transition-all
            duration-300
            group-hover:border-accent-indigo/30
          "
        />

        <div className="relative flex h-full flex-col">
          {/* Card Header */}

          <div className="flex items-start justify-between gap-4">
            <div className="relative">
              {/* Icon glow */}

              <div
                aria-hidden
                className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-accent-indigo/20
                  blur-lg
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* Icon */}

              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-accent-indigo/15
                  bg-accent-indigo/8
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:border-accent-indigo/25
                  group-hover:bg-accent-indigo/12
                "
              >
                <Icon
                  className="h-6 w-6 text-accent-indigo"
                  strokeWidth={1.7}
                />
              </div>
            </div>

            <Badge
              className="
                border-accent-indigo/15
                bg-accent-indigo/8
                px-2.5
                py-1
                text-[8px]
                font-mono
                uppercase
                tracking-[0.16em]
                text-accent-indigo/70
                transition-all
                duration-300
                group-hover:border-accent-indigo/25
                group-hover:bg-accent-indigo/12
                group-hover:text-accent-indigo
              "
            >
              Service
            </Badge>
          </div>

          {/* Title */}

          <h3
            className="
              mt-5
              text-lg
              font-semibold
              tracking-tight
              text-text-primary
              transition-colors
              duration-300
              group-hover:text-accent-indigo
            "
          >
            {service.title}
          </h3>

          {/* Description */}

          <p
            className="
              mt-2
              flex-1
              text-sm
              leading-relaxed
              text-text-secondary/80
              transition-colors
              duration-300
              group-hover:text-text-secondary
            "
          >
            {service.shortDescription}
          </p>

          {/* Who it's for */}

          {service.whoItsFor.length > 0 && (
            <div className="mt-4 flex items-start gap-2">
              <span
                className="
                  shrink-0
                  pt-0.5
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-wider
                  text-text-muted/45
                "
              >
                For
              </span>

              <span
                className="
                  text-[10px]
                  leading-relaxed
                  text-text-muted/65
                "
              >
                {service.whoItsFor.join(", ")}
              </span>
            </div>
          )}

          {/* Tech Stack */}

          {service.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-accent-indigo/10
                    bg-accent-indigo/[0.025]
                    px-2.5
                    py-1
                    text-[9px]
                    font-mono
                    text-text-muted/60
                    transition-all
                    duration-300
                    group-hover:border-accent-indigo/15
                    group-hover:text-text-muted/80
                  "
                >
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/40" />
                  {tech}
                </span>
              ))}

              {service.techStack.length > 3 && (
                <span className="px-1 py-1 text-[9px] font-mono text-text-muted/40">
                  +{service.techStack.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Explore */}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              mt-6
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-accent-indigo/12
              bg-bg-surface-1/60
              px-4
              py-3
              text-sm
              font-medium
              text-text-secondary
              transition-all
              duration-300
              hover:border-accent-indigo/25
              hover:bg-accent-indigo/[0.04]
              hover:text-accent-indigo
            "
          >
            <span>Explore Service</span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                border
                border-accent-indigo/10
                bg-accent-indigo/[0.03]
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={1.75}
              />
            </span>
          </button>

          {/* Bottom accent */}

          <div
            aria-hidden
            className="
              absolute
              bottom-0
              left-0
              h-px
              w-0
              rounded-full
              bg-gradient-to-r
              from-accent-indigo/60
              via-accent-indigo/30
              to-transparent
              transition-all
              duration-700
              group-hover:w-full
            "
          />
        </div>
      </article>

      {/* =====================================================
          SERVICE MODAL
      ===================================================== */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          title={service.title}
          hideHeader
          className="
            !fixed
            !left-1/2
            !top-1/2
            !z-[100]
            !m-0
            !flex
            !h-[calc(100dvh-32px)]
            !max-h-[760px]
            !w-[calc(100vw-24px)]
            !max-w-[760px]
            !-translate-x-1/2
            !-translate-y-1/2
            !flex-col
            !overflow-hidden
            !rounded-[24px]
            !border
            !border-accent-indigo/15
            !bg-bg-surface-1
            !p-0
            outline-none
            sm:!h-[min(760px,calc(100dvh-48px))]
            sm:!w-[calc(100vw-48px)]
          "
          style={{
            boxShadow: panelShadow,
          }}
        >
          {/* =================================================
              MODAL ROOT
          ================================================= */}

          <div
            className="
              flex
              min-h-0
              flex-1
              flex-col
              overflow-hidden
              bg-gradient-to-br
              from-bg-surface-1
              via-bg-surface-1
              to-accent-indigo/[0.025]
            "
          >
            {/* =================================================
                HEADER — FIXED
            ================================================= */}

            <header
              className="
                relative
                z-20
                shrink-0
                border-b
                border-accent-indigo/10
                bg-bg-surface-1/95
                px-5
                py-4
                backdrop-blur-2xl
                sm:px-7
                sm:py-5
              "
            >
              {/* Top accent line */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  bg-gradient-to-r
                  from-transparent
                  via-accent-indigo/50
                  to-transparent
                "
              />

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Icon */}

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-accent-indigo/15
                    bg-accent-indigo/8
                    shadow-sm
                    shadow-accent-indigo/10
                    sm:h-12
                    sm:w-12
                  "
                >
                  <Icon
                    className="h-5 w-5 text-accent-indigo sm:h-6 sm:w-6"
                    strokeWidth={1.7}
                  />
                </div>

                {/* Title */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      className="
                        text-base
                        font-bold
                        tracking-tight
                        text-text-primary
                        sm:text-xl
                      "
                    >
                      {service.title}
                    </h2>

                    {/* Availability */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-emerald-500/20
                        bg-emerald-500/8
                        px-2
                        py-0.5
                        text-[8px]
                        font-mono
                        uppercase
                        tracking-wider
                        text-emerald-600
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Available
                    </span>
                  </div>

                  {service.whoItsFor.length > 0 && (
                    <p
                      className="
                        mt-1
                        truncate
                        text-[10px]
                        text-text-muted/65
                        sm:text-[11px]
                      "
                    >
                      For: {service.whoItsFor.join(", ")}
                    </p>
                  )}
                </div>

                {/* Close */}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close service details"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-accent-indigo/10
                    bg-bg-surface-1
                    text-text-muted/60
                    transition-all
                    duration-200
                    hover:border-accent-indigo/25
                    hover:bg-accent-indigo/[0.05]
                    hover:text-accent-indigo
                  "
                >
                  <X
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </header>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================= */}

            <div
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="
                relative
                min-h-0
                flex-1
                overflow-x-hidden
                overflow-y-auto
                overscroll-contain
                px-4
                py-5
                [scrollbar-color:rgba(99,102,241,0.25)_transparent]
                [scrollbar-width:thin]
                sm:px-7
                sm:py-6
              "
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >
              <div className="mx-auto w-full max-w-[680px] space-y-4 pb-2 sm:space-y-5">
                {/* =================================================
                    OVERVIEW
                ================================================= */}

                <section
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-accent-indigo/10
                    bg-gradient-to-br
                    from-accent-indigo/[0.045]
                    via-bg-surface-1/70
                    to-transparent
                    p-4
                    sm:p-5
                  "
                >
                  {/* Decorative glow */}

                  <div
                    aria-hidden
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      bg-accent-indigo/10
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-accent-indigo/10
                          bg-accent-indigo/8
                        "
                      >
                        <Layers3
                          className="h-3.5 w-3.5 text-accent-indigo"
                          strokeWidth={1.7}
                        />
                      </div>

                      <span
                        className="
                          text-[9px]
                          font-mono
                          uppercase
                          tracking-[0.16em]
                          text-accent-indigo
                        "
                      >
                        Overview
                      </span>
                    </div>

                    <p
                      className="
                        text-[13px]
                        leading-6
                        text-text-secondary
                        sm:text-sm
                      "
                    >
                      {service.overview}
                    </p>
                  </div>
                </section>

                {/* =================================================
                    PROBLEMS + DELIVERABLES
                ================================================= */}

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Problems */}

                  {service.problemsSolved && (
                    <section
                      className="
                        rounded-2xl
                        border
                        border-accent-indigo/10
                        bg-gradient-to-br
                        from-accent-indigo/[0.035]
                        to-transparent
                        p-4
                      "
                    >
                      <div className="mb-3 flex items-center gap-2.5">
                        <div
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-accent-indigo/10
                            bg-accent-indigo/8
                          "
                        >
                          <Zap
                            className="h-3.5 w-3.5 text-accent-indigo"
                            strokeWidth={1.7}
                          />
                        </div>

                        <span
                          className="
                            text-[9px]
                            font-mono
                            uppercase
                            tracking-[0.16em]
                            text-accent-indigo
                          "
                        >
                          Problems Solved
                        </span>
                      </div>

                      <p
                        className="
                          text-[12px]
                          leading-5
                          text-text-secondary
                        "
                      >
                        {service.problemsSolved}
                      </p>
                    </section>
                  )}

                  {/* Deliverables */}

                  {service.deliverables.length > 0 && (
                    <section
                      className="
                        rounded-2xl
                        border
                        border-emerald-500/10
                        bg-gradient-to-br
                        from-emerald-500/[0.035]
                        to-transparent
                        p-4
                      "
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-emerald-500/10
                              bg-emerald-500/8
                            "
                          >
                            <Check
                              className="h-3.5 w-3.5 text-emerald-600"
                              strokeWidth={2}
                            />
                          </div>

                          <span
                            className="
                              text-[9px]
                              font-mono
                              uppercase
                              tracking-[0.16em]
                              text-emerald-600
                            "
                          >
                            Deliverables
                          </span>
                        </div>

                        <span
                          className="
                            whitespace-nowrap
                            text-[8px]
                            font-mono
                            text-text-muted/40
                          "
                        >
                          {service.deliverables.length} included
                        </span>
                      </div>

                      <div className="space-y-2">
                        {service.deliverables.map((deliverable) => (
                          <div
                            key={deliverable}
                            className="
                              flex
                              items-center
                              gap-2.5
                              rounded-xl
                              border
                              border-emerald-500/8
                              bg-bg-surface-1/60
                              px-2.5
                              py-2
                            "
                          >
                            <span
                              className="
                                flex
                                h-5
                                w-5
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-emerald-500/10
                              "
                            >
                              <Check
                                className="h-2.5 w-2.5 text-emerald-600"
                                strokeWidth={2.5}
                              />
                            </span>

                            <span
                              className="
                                text-[11px]
                                leading-5
                                text-text-secondary
                              "
                            >
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* =================================================
                    TECHNOLOGY STACK
                ================================================= */}

                {service.techStack.length > 0 && (
                  <section
                    className="
                      rounded-2xl
                      border
                      border-accent-indigo/10
                      bg-bg-surface-1/70
                      p-4
                      sm:p-5
                    "
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-accent-indigo/10
                          bg-accent-indigo/8
                        "
                      >
                        <Code2
                          className="h-3.5 w-3.5 text-accent-indigo"
                          strokeWidth={1.7}
                        />
                      </div>

                      <span
                        className="
                          text-[9px]
                          font-mono
                          uppercase
                          tracking-[0.16em]
                          text-accent-indigo
                        "
                      >
                        Technology Stack
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-accent-indigo/10
                            bg-accent-indigo/[0.025]
                            px-3
                            py-1.5
                            text-[9px]
                            font-mono
                            text-text-secondary
                            transition-colors
                            hover:border-accent-indigo/20
                            hover:text-accent-indigo
                          "
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/40" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* =================================================
                    TIMELINE
                ================================================= */}

                {service.typicalTimeline && (
                  <section
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-accent-indigo/10
                      bg-gradient-to-r
                      from-accent-indigo/[0.035]
                      to-transparent
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-accent-indigo/10
                        bg-accent-indigo/8
                      "
                    >
                      <Rocket
                        className="h-4 w-4 text-accent-indigo"
                        strokeWidth={1.6}
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[8px]
                          font-mono
                          uppercase
                          tracking-[0.16em]
                          text-accent-indigo
                        "
                      >
                        Typical Timeline
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          font-medium
                          leading-5
                          text-text-primary
                        "
                      >
                        {service.typicalTimeline}
                      </p>
                    </div>
                  </section>
                )}

                {/* =================================================
                    RELATED WORK
                ================================================= */}

                {relatedProjects.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BriefcaseBusiness
                          className="h-3.5 w-3.5 text-accent-indigo"
                          strokeWidth={1.7}
                        />

                        <span
                          className="
                            text-[9px]
                            font-mono
                            uppercase
                            tracking-[0.16em]
                            text-accent-indigo
                          "
                        >
                          Related Work
                        </span>
                      </div>

                      <span
                        className="
                          text-[8px]
                          font-mono
                          text-text-muted/40
                        "
                      >
                        Selected projects
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {relatedProjects.slice(0, 2).map((project, index) => (
                        <FeaturedProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Bottom spacing */}

                <div className="h-2" />
              </div>
            </div>

            {/* =================================================
                FOOTER — FIXED
            ================================================= */}

            <footer
              className="
                relative
                z-20
                shrink-0
                border-t
                border-accent-indigo/10
                bg-bg-surface-1/95
                px-4
                py-3
                backdrop-blur-2xl
                sm:px-7
                sm:py-4
              "
            >
              {/* subtle top glow */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-px
                  w-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-accent-indigo/30
                  to-transparent
                "
              />

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-accent-indigo
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-accent-indigo/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-accent-indigo/90
                  hover:shadow-xl
                  hover:shadow-accent-indigo/25
                "
              >
                <span>Start a Project</span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.8}
                />

                <ExternalLink
                  className="h-3.5 w-3.5 opacity-50"
                  strokeWidth={1.5}
                />
              </Link>
            </footer>
          </div>
        </DialogContent>
      </Dialog>

      {/* =====================================================
          MODAL SCROLLBAR
      ===================================================== */}

      {open && (
        <style jsx global>{`
          [data-lenis-prevent]::-webkit-scrollbar {
            width: 6px;
          }

          [data-lenis-prevent]::-webkit-scrollbar-track {
            background: transparent;
          }

          [data-lenis-prevent]::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.22);
            border-radius: 999px;
          }

          [data-lenis-prevent]::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.38);
          }

          [data-lenis-prevent] {
            scrollbar-gutter: stable;
          }
        `}</style>
      )}
    </>
  );
}