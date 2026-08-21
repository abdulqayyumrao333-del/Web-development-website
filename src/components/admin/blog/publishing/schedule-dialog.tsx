"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarClock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const timeZoneLabel = Intl.DateTimeFormat().resolvedOptions().timeZone;

function toLocalDatetimeInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  postTitle,
  initialDate,
  mode,
  onSchedule,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postTitle: string;
  initialDate?: Date | null;
  mode: "schedule" | "reschedule";
  onSchedule: (isoString: string) => Promise<{ success: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [value, setValue] = useState(() =>
    toLocalDatetimeInputValue(initialDate && initialDate > new Date() ? initialDate : new Date(Date.now() + 3600_000)),
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    setError(null);
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      setError("Enter a valid date and time.");
      return;
    }
    if (date.getTime() <= Date.now()) {
      setError("Scheduled time must be in the future.");
      return;
    }

    startTransition(async () => {
      const result = await onSchedule(date.toISOString());
      if (result.success) {
        toast.success(
          mode === "schedule"
            ? `Scheduled for ${date.toLocaleString()}.`
            : `Rescheduled to ${date.toLocaleString()}.`,
        );
        onOpenChange(false);
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={mode === "schedule" ? "Schedule Post" : "Reschedule Post"}>
        <p className="text-sm text-text-secondary">
          {mode === "schedule" ? "Schedule" : "Reschedule"} <span className="font-medium text-text-primary">"{postTitle}"</span> for
          future publication.
        </p>

        <div className="mt-4">
          <label htmlFor="schedule-datetime" className="text-xs font-medium text-text-secondary">
            Date &amp; time
          </label>
          <Input
            id="schedule-datetime"
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1.5"
          />
          <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
            <CalendarClock className="h-3 w-3" /> Your local time zone ({timeZoneLabel})
          </p>
          {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Saving..." : mode === "schedule" ? "Schedule" : "Reschedule"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
