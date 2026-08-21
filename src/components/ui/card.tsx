import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover", className)}
      {...props}
    />
  );
}
