import { cn } from "@/lib/utils";

export function CharacterCounter({ current, max }: { current: number; max: number }) {
  const isOver = current > max;
  const isNear = !isOver && current >= max * 0.9;

  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        isOver ? "text-danger" : isNear ? "text-warning" : "text-text-muted",
      )}
      aria-live="polite"
    >
      {current}/{max}
    </span>
  );
}
