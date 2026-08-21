"use client";

import { useState } from "react";
import { MessageCircle, Mail, Github, Linkedin, MapPin, Copy, Check, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig } from "@/config/site";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label="Copy to clipboard"
      className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-105"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />}
    </button>
  );
}

export function ContactMethods() {
  const methods = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+92 329 4935619",
      href: siteConfig.links.whatsapp,
      copyValue: "+923294935619",
      color: "from-emerald-50 to-emerald-50/50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
      copyValue: siteConfig.links.email,
      color: "from-blue-50 to-blue-50/50",
      iconColor: "text-blue-600",
    },
    { 
      icon: Github, 
      label: "GitHub", 
      value: "View profile", 
      href: siteConfig.links.github, 
      copyValue: siteConfig.links.github,
      color: "from-indigo-50 to-indigo-50/50",
      iconColor: "text-indigo-600",
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      value: "View profile", 
      href: siteConfig.links.linkedin, 
      copyValue: siteConfig.links.linkedin,
      color: "from-cyan-50 to-cyan-50/50",
      iconColor: "text-cyan-600",
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "Pakistan", 
      href: null, 
      copyValue: null,
      color: "from-rose-50 to-rose-50/50",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 bg-white">

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Reach Out
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Pick a
                <br />
                <span className="text-accent-indigo">channel</span>
              </h2>
            </div>

            <p className="text-base text-gray-600 leading-relaxed mt-3 max-w-[14rem]">
              Choose the channel that works best for you — I'm available across multiple platforms.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-gray-400 font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {methods.length} channels
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Quick response
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Open to all
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Contact Methods Grid ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {methods.map(({ icon: Icon, label, value, href, copyValue, color, iconColor }, i) => (
                <Reveal key={label} delay={0.12 + i * 0.05}>
                  <div
                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover gradient */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} via-transparent to-transparent`}
                    />

                    {/* bracket */}
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 h-3 w-3 border-t border-r border-gray-200 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white group-hover:bg-accent-indigo/6 transition-all duration-300 group-hover:scale-105">
                          <Icon className={`h-5 w-5 ${iconColor} group-hover:text-accent-indigo transition-colors duration-300`} strokeWidth={1.75} />
                        </div>
                        {copyValue && <CopyButton value={copyValue} />}
                      </div>

                      <p className="mt-3 font-semibold text-base text-gray-900 group-hover:text-accent-indigo transition-colors duration-300">
                        {label}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                        {value}
                      </p>

                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-accent-indigo/70 hover:text-accent-indigo transition-all duration-300 group-hover:gap-2.5"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                        </a>
                      )}
                    </div>

                    {/* bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5">
              <p className="font-mono text-[11px] text-gray-400">
                CONTACT · {methods.length} CHANNELS · QUICK RESPONSE
              </p>
              <div className="flex gap-1">
                {methods.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: i === 0 ? "rgb(99 102 241 / 0.65)" : `rgb(99 102 241 / ${Math.max(0.10, 0.40 - i * 0.06)})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}