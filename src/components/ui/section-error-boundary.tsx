"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

type Props = { children: ReactNode; label: string };
type State = { hasError: boolean };

// Class components are still the only way to implement an error boundary in
// React — there's no hooks-based equivalent. Wrap any section that fetches
// from an external API (GitHub, etc.) with this so one bad render can't take
// down the whole page. Never surfaces the underlying error message to the
// visitor — logs it server/console-side only.
export class SectionErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    console.warn(`[SectionErrorBoundary:${this.props.label}]`, error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center rounded-md border border-dashed border-border py-14 text-center">
          <AlertTriangle className="h-5 w-5 text-text-muted" />
          <p className="mt-3 text-text-secondary">
            {this.props.label} couldn&apos;t load right now — the rest of the page is unaffected.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
