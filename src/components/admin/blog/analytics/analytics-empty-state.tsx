import { BarChart3 } from "lucide-react";

export function AnalyticsEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed border-border p-8 text-center">
      <BarChart3 className="h-6 w-6 text-text-muted" aria-hidden="true" />
      <p className="mt-2 text-sm text-text-muted">{message}</p>
    </div>
  );
}
