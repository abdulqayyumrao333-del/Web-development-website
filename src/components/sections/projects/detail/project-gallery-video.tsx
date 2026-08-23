"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageOff, Play, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── ProjectScreenshotsGallery ──
export function ProjectScreenshotsGallery({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = project.gallery;
  const currentImage = openIndex !== null ? images[openIndex] : undefined;

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, images.length]);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background ── */}
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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Screenshots
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                A closer
                <br />
                <span className="text-accent-indigo">look</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Visual walkthrough of the project's interface and key features.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {images.length} screenshots
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Click to enlarge
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Keyboard accessible
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            {images.length === 0 ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <ImageOff className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Screenshots will be added soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((src, i) => (
                  <Reveal key={src} delay={0.12 + i * 0.04}>
                    <button
                      onClick={() => setOpenIndex(i)}
                      aria-label={`Open screenshot ${i + 1} of ${images.length}`}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50 transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5"
                      style={{ boxShadow: panelShadow }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface-1/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Index badge */}
                      <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/30 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded group-hover:text-white/60 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Hover zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="rounded-full bg-black/40 backdrop-blur-sm p-2.5">
                          <span className="text-white/80 text-xs font-mono">🔍</span>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* ── Lightbox ── */}
      {openIndex !== null && currentImage && (
        <div
          role="dialog"
          aria-modal
          aria-label="Screenshot lightbox"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 sm:p-6"
          onClick={() => setOpenIndex(null)}
        >
          {/* Close button */}
          <button
            aria-label="Close lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors duration-300 z-10"
            onClick={() => setOpenIndex(null)}
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.75} />
          </button>

          {/* Previous button */}
          <button
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-4 text-white/40 hover:text-white transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.75} />
          </button>

          {/* Image */}
          <div className="relative h-[70vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage}
              alt={`${project.title} screenshot ${openIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next button */}
          <button
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-4 text-white/40 hover:text-white transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
            }}
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.75} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 font-mono text-[10px] tracking-wider">
            {String(openIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}

// ── ProjectDemoVideo ──
function getVideoEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  const youtubeId = youtubeMatch?.[1];
  if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  const vimeoId = vimeoMatch?.[1];
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
  return null;
}

export function ProjectDemoVideo({ project }: { project: Project }) {
  if (!project.demoVideoUrl) return null;
  const embedUrl = getVideoEmbedUrl(project.demoVideoUrl);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background ── */}
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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Demo
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                See it
                <br />
                <span className="text-accent-indigo">in action</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Watch a video walkthrough of the project's functionality.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Video demo
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {embedUrl ? "Embedded" : "Direct"}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Full walkthrough
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture */}
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

              {/* bracket */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative p-3 sm:p-4">
                <div className="aspect-video overflow-hidden rounded-xl bg-black/90 relative">
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full bg-white/10 backdrop-blur-sm p-4">
                      <Play className="h-8 w-8 text-white/60" strokeWidth={1.5} />
                    </div>
                  </div>

                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${project.title} demo video`}
                      allowFullScreen
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <video
                      src={project.demoVideoUrl}
                      controls
                      className="h-full w-full"
                      poster="/images/video-placeholder.jpg"
                    />
                  )}
                </div>

                {/* Video info */}
                <div className="mt-3 flex items-center justify-between text-xs text-text-muted/50">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                    Watch the demo
                  </span>
                  <span className="font-mono text-[10px]">
                    {embedUrl ? "YouTube/Vimeo" : "Direct Video"}
                  </span>
                </div>
              </div>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}