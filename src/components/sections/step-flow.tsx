import { ArrowDown, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

export type FlowStep = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

/**
 * Renders a connected sequence of steps — horizontal with arrow connectors on
 * desktop, vertical on mobile. Used for "How I Work" and the goals Roadmap so
 * neither section reimplements the same layout independently.
 */
export function StepFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="relative flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-0">
      {/* ── Background line ── */}
      <div
        aria-hidden
        className="absolute top-6 left-5 right-5 h-px bg-gradient-to-r from-accent-indigo/20 via-accent-indigo/10 to-transparent lg:top-1/2 lg:left-10 lg:right-10 lg:h-px lg:w-auto"
      />

      {steps.map((step, i) => (
        <div key={step.title} className="relative flex flex-col items-center lg:flex-1">
          <Reveal delay={i * 0.06} className="flex w-full flex-col items-center text-center">
            {/* ── Step Number ── */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent-indigo/20 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm font-mono text-sm font-bold text-accent-indigo transition-all duration-300 group-hover:border-accent-indigo/40 group-hover:shadow-lg group-hover:shadow-accent-indigo/10">
              {step.icon ? (
                <span className="text-accent-indigo">{step.icon}</span>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
              {/* Pulse ring for first step */}
              {i === 0 && (
                <span className="absolute -inset-1 rounded-full border-2 border-accent-indigo/20 animate-ping" />
              )}
              {/* Checkmark for last step */}
              {i === steps.length - 1 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[8px] text-white">
                  <CheckCircle className="h-3 w-3" strokeWidth={2} />
                </span>
              )}
            </div>

            {/* ── Content ── */}
            <div className="mt-3 max-w-[14rem]">
              <p className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs sm:text-sm text-text-muted/60 group-hover:text-text-muted/80 transition-colors duration-300 leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </Reveal>

          {/* ── Connector ── */}
          {i < steps.length - 1 && (
            <div className="my-2 text-accent-indigo/20 lg:mx-2 lg:my-0 lg:flex lg:flex-1 lg:items-center lg:justify-center">
              <ArrowDown className="h-4 w-4 lg:hidden" strokeWidth={1.5} aria-hidden />
              <ArrowRight className="hidden h-4 w-4 lg:block" strokeWidth={1.5} aria-hidden />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}