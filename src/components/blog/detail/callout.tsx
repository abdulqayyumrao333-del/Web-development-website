import { Info, AlertTriangle, Lightbulb, Sparkles, Shield, Zap } from "lucide-react";

const CONFIG = {
  note: { 
    icon: Info, 
    className: "border-accent-indigo/20 bg-accent-indigo/[0.04]",
    iconClass: "text-accent-indigo",
    label: "Note"
  },
  warning: { 
    icon: AlertTriangle, 
    className: "border-amber-500/20 bg-amber-500/[0.04]",
    iconClass: "text-amber-500",
    label: "Warning"
  },
  tip: { 
    icon: Lightbulb, 
    className: "border-emerald-500/20 bg-emerald-500/[0.04]",
    iconClass: "text-emerald-500",
    label: "Tip"
  },
} as const;

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function Callout({ type, children }: { type: keyof typeof CONFIG; children: React.ReactNode }) {
  const { icon: Icon, className, iconClass, label } = CONFIG[type];

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-5 my-6 transition-all duration-300 hover:shadow-md ${className}`}
      style={{ boxShadow: panelShadow }}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.02] via-transparent to-transparent"
      />

      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.2]"
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
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/15 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative flex gap-4">
        {/* Icon with background */}
        <div className="shrink-0">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${className} ${iconClass}`}>
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${iconClass}`}>
              {label}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-accent-indigo/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="text-sm text-text-secondary leading-relaxed [&>p]:m-0 [&>p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-1/3 bg-gradient-to-r from-accent-indigo/30 to-transparent transition-all duration-700 rounded-b-full" />
    </div>
  );
}