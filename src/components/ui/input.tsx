import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo",
      className
    )}
    {...props}
  />
);
