import { AlertTriangle, Sparkles, Info, Construction } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

/**
 * Wraps any section whose content is a stand-in pending real information from
 * Abdul (tech stack, services, project details). Renders a visible dashed
 * border + label so this never accidentally ships as if it were real content.
 * Remove this wrapper (not just the flag) once real data replaces the stub.
 */
export function PlaceholderNotice({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-amber-500/30 bg-amber-500/[0.04] px-5 py-3.5 mb-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/[0.06]">
      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(251,191,36,0.05) 0px, rgba(251,191,36,0.05) 1px, transparent 1px, transparent 12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className="relative flex items-center gap-3 flex-wrap">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 shrink-0">
          <Construction className="h-4 w-4 text-amber-500" strokeWidth={1.75} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-amber-600">
              {label}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/15 bg-amber-500/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-amber-500">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
              Pending
            </span>
          </div>
          <p className="text-[10px] text-amber-500/60 mt-0.5">
            placeholder content — pending confirmed details.
          </p>
        </div>

        <div className="shrink-0 text-amber-500/20">
          <Info className="h-4 w-4" strokeWidth={1.75} />
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/30 to-transparent transition-all duration-700 rounded-b-full" />
    </div>
  );
}