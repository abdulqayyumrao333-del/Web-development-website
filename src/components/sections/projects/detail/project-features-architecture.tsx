"use client";

import { useState } from "react";
import { Sparkles, ChevronRight, ChevronDown, Layers, FolderTree, Zap, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { categorizeTechStack } from "@/lib/categorize-tech";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── ProjectFeatures ──
export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* LEFT */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Key Features
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                What it
                <br />
                <span className="text-accent-indigo">does</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The core functionality and capabilities of this project.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {project.features.length} features
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Core functionality
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  User-focused
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            {project.features.length === 0 ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Sparkles className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Detailed documentation will be added soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-3.5 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <Reveal key={i} delay={0.12 + i * 0.04}>
                    <div
                      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5"
                      style={{ boxShadow: panelShadow }}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />
                      <div
                        aria-hidden
                        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                      />

                      <div className="relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                          <CheckCircle className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                        </div>
                        <p className="mt-3 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-relaxed">
                          {feature}
                        </p>
                        <span className="absolute bottom-2 right-2 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ProjectArchitecture ──
export function ProjectArchitecture({ project }: { project: Project }) {
  const grouped = categorizeTechStack(project.techStack);
  const layers = Object.entries(grouped);
  const hasContent = project.caseStudyArchitecture || layers.length > 0;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* LEFT */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Technical Architecture
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How it's
                <br />
                <span className="text-accent-indigo">put together</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The technical stack and architectural decisions behind this project.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {layers.length} layers
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {project.techStack.length} technologies
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Full stack
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            {!hasContent ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Layers className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Detailed documentation will be added soon.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {project.caseStudyArchitecture && (
                  <div
                    className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
                    style={{ boxShadow: panelShadow }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                        maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                      }}
                    />
                    <div className="relative">
                      <p className="text-base sm:text-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {project.caseStudyArchitecture}
                      </p>
                      <div className="mt-4 h-px w-12 rounded-full bg-accent-indigo/20" />
                    </div>
                  </div>
                )}

                {layers.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {layers.map(([layer, techs]) => (
                      <div
                        key={layer}
                        className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 px-5 py-3.5 flex items-center justify-between"
                        style={{ boxShadow: panelShadow }}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-indigo/[0.03] to-transparent"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-indigo/60 group-hover:text-accent-indigo/80 transition-colors">
                          {layer}
                        </span>
                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                          {techs!.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ProjectFolderStructure ──
export function ProjectFolderStructure({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  if (!project.folderStructure) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* LEFT */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Folder Structure
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Project
                <br />
                <span className="text-accent-indigo">layout</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The organization and structure of the codebase.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Click to view
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {open ? "Visible" : "Hidden"}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  {open ? "Click to hide" : "Click to expand"}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/30"
              style={{ boxShadow: panelShadow }}
            >
              <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 hover:bg-accent-indigo/[0.03] transition-colors duration-200 group"
                aria-expanded={open}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                    <FolderTree className="h-4.5 w-4.5 text-accent-indigo" strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                    Project layout
                  </span>
                  <span className="text-[9px] font-mono text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                    {open ? "Click to hide" : "Click to expand"}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 text-accent-indigo/40 group-hover:border-accent-indigo/25 group-hover:text-accent-indigo/70 transition-all duration-300 group-hover:scale-110">
                  {open ? (
                    <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </div>
              </button>

              {open && (
                <div className="border-t border-accent-indigo/10 px-6 py-5 sm:px-8 sm:py-6">
                  <pre className="overflow-x-auto font-mono text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {project.folderStructure}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}