"use client";

import Link from "next/link";
import { 
  ArrowLeft, Shield, Lock, Cookie, Server, 
  Eye, UserCheck, AlertCircle, Users, Mail, 
  Sparkles, FileText, Scale 
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { PRIVACY_DATA } from "@/config/privacy";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

const SECTION_ICONS: Record<string, any> = {
  "Introduction": Shield,
  "Information We Collect": Eye,
  "How We Use Your Information": UserCheck,
  "Cookies": Cookie,
  "Third-Party Services": Server,
  "Data Security": Lock,
  "Data Retention": AlertCircle,
  "Your Rights": Scale,
  "Children's Privacy": Users,
  "Changes to Privacy Policy": Sparkles,
  "Contact Us": Mail,
};

export function PrivacyContent() {
  const { effectiveDate, lastUpdated, sections } = PRIVACY_DATA;

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

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Privacy
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Privacy
                <br />
                <span className="text-accent-indigo">Policy</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Your privacy matters. Learn how we handle your data.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {sections.length} sections
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Effective: {effectiveDate}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Updated: {lastUpdated}
                </p>
              </div>
            </div>

            {/* Section list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {sections.map((section, i) => {
                const Icon = SECTION_ICONS[section.title] || FileText;
                return (
                  <div key={section.id} className="flex items-center gap-2 group cursor-default">
                    <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                    <Icon className="h-3 w-3 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors" strokeWidth={1.75} />
                    <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[7rem]">
                      {section.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Back link */}
            <Link
              href="/"
              className="mt-8 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
              <span>Back to Home</span>
            </Link>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Privacy Content ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div className="flex flex-col gap-4">
              {/* ── Header Card ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
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

                <div
                  aria-hidden
                  className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8">
                      <Shield className="h-6 w-6 text-accent-indigo" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/60">
                        Privacy Policy
                      </p>
                      <p className="text-sm text-text-muted/40">
                        Effective: {effectiveDate} · Last Updated: {lastUpdated}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary/80 leading-relaxed">
                    Your privacy is important to us. This privacy policy explains how we collect, 
                    use, and protect your personal information when you visit our website.
                  </p>
                </div>
              </div>

              {/* ── Sections ── */}
              {sections.map((section, i) => {
                const Icon = SECTION_ICONS[section.title] || FileText;
                return (
                  <Reveal key={section.id} delay={0.12 + i * 0.04}>
                    <div
                      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 p-5"
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* hover gradient */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />

                      {/* bracket */}
                      <div
                        aria-hidden
                        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                      />

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 shrink-0">
                            <Icon className="h-4.5 w-4.5 text-accent-indigo" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {section.title}
                              </h3>
                              <span className="font-mono text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {section.content.split('\n\n').map((paragraph, pIdx) => (
                            <p 
                              key={pIdx} 
                              className={`text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 leading-relaxed ${pIdx > 0 ? 'mt-3' : ''}`}
                            >
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>

                        {/* bottom accent line */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              {/* ── Bottom strip ── */}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                <p className="font-mono text-[11px] text-text-muted">
                  PRIVACY · {sections.length} SECTIONS · SECURE
                </p>
                <div className="flex gap-1">
                  {sections.map((_, i) => (
                    <span
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === 0 ? "1.25rem" : "0.5rem",
                        backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.04)})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}