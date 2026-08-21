import { CalendarX } from "lucide-react";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function CancelScheduleConfirmDialog({
  postTitle,
  onConfirm,
  trigger,
}: {
  postTitle: string;
  onConfirm: () => Promise<{ success: boolean; error?: string }>;
  trigger: React.ReactNode;
}) {
  return (
    <ActionConfirmDialog
      trigger={trigger}
      title="Cancel this schedule?"
      description={`"${postTitle}" will move back to Draft and won't be published automatically.`}
      confirmLabel="Cancel Schedule"
      confirmingLabel="Cancelling..."
      icon={CalendarX}
      onConfirm={onConfirm}
      successMessage="Schedule cancelled — back to Draft."
    />
  );
}
