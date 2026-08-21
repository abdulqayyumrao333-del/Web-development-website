"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function TimezoneWidget() {
  const [time, setTime] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    }
    tick();
    const interval = setInterval(tick, 30000);

    fetch("/api/availability")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setNote(data?.note ?? null))
      .catch(() => setNote(null));

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 sm:p-5"
      style={{ boxShadow: panelShadow }}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
      />

      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* bracket */}
      <div
        aria-hidden
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative flex items-center gap-4">
        {/* Icon with glow */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-xl bg-accent-indigo/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10">
            <Clock className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
          </div>
          {/* Decorative dot */}
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/60 group-hover:text-accent-indigo/80 transition-colors">
              Pakistan Standard Time
            </p>
            <span className="flex items-center gap-1 text-[8px] text-text-muted/30">
              <MapPin className="h-2.5 w-2.5" strokeWidth={1.5} />
              <span>UTC+5</span>
            </span>
          </div>
          <p className="font-mono text-2xl sm:text-3xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 tabular-nums">
            {time ?? "—"}
          </p>
          {note && (
            <p className="mt-0.5 text-xs text-text-muted/60 group-hover:text-text-muted/80 transition-colors flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-accent-indigo/30" strokeWidth={1.5} />
              {note}
            </p>
          )}
        </div>

        {/* index number */}
        <span className="absolute bottom-2 right-2 font-mono text-[8px] text-accent-indigo/10 group-hover:text-accent-indigo/25 transition-colors duration-300">
          01
        </span>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
    </div>
  );
}