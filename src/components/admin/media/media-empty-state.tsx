import { ImageOff } from "lucide-react";

export function MediaEmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed border-border p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg-base">
        <ImageOff className="h-6 w-6 text-text-muted" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-medium text-text-primary">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
