import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-sm border border-border bg-bg-surface px-3 py-2 text-sm outline-none focus:border-accent-indigo",
        className
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
