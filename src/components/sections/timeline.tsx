import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Sparkles, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export type TimelineEntry = {
  id: string;
  title: string;
  subtitle: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* ── Background line ── */}
      <div
        aria-hidden
        className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-accent-indigo/20 via-accent-indigo/10 to-transparent"
      />

      <ol className="relative space-y-4">
        {entries.map((entry, i) => {
          const isLast = i === entries.length - 1;
          const isPresent = !entry.endDate;
          const duration = entry.endDate 
            ? Math.ceil((new Date(entry.endDate).getTime() - new Date(entry.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
            : Math.ceil((new Date().getTime() - new Date(entry.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30));

          return (
            <Reveal key={entry.id} delay={i * 0.06}>
              <li className="relative pl-10">
                {/* ── Dot ── */}
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center">
                  <div className={`h-3 w-3 rounded-full ${isPresent ? 'bg-emerald-500' : 'bg-accent-indigo'} ring-2 ring-accent-indigo/20`} />
                  {isPresent && (
                    <span className="absolute -inset-1 rounded-full border-2 border-emerald-500/30 animate-ping" />
                  )}
                </div>

                {/* ── Content ── */}
                <div
                  className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5"
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
                    {/* Header with dates */}
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors">
                          {entry.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider ${isPresent ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' : 'border-accent-indigo/15 bg-accent-indigo/10 text-accent-indigo/60'}`}>
                          {isPresent ? (
                            <>
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              </span>
                              Present
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-2.5 w-2.5" strokeWidth={2} />
                              Done
                            </>
                          )}
                        </span>
                        <span className="text-[8px] font-mono text-text-muted/30">
                          {duration}m
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                      <Calendar className="h-3 w-3" strokeWidth={1.5} />
                      <span>{formatDate(entry.startDate)}</span>
                      <span className="text-accent-indigo/15">—</span>
                      <span>{entry.endDate ? formatDate(entry.endDate) : "Present"}</span>
                    </div>

                    {/* Description */}
                    {entry.description && (
                      <p className="mt-2 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors leading-relaxed">
                        {entry.description}
                      </p>
                    )}

                    {/* Duration bar */}
                    <div className="mt-3 h-0.5 w-full rounded-full bg-accent-indigo/8 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-accent-indigo/40 to-accent-indigo transition-all duration-700 group-hover:opacity-100"
                        style={{ 
                          width: `${Math.min(100, (duration / 60) * 100)}%` 
                        }}
                      />
                    </div>

                    {/* index number */}
                    <span className="absolute bottom-2 right-2 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}