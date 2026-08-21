import { Trash2 } from "lucide-react";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function TrashConfirmDialog({
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
      title="Move to Trash?"
      description={`"${postTitle}" will be moved to Trash and hidden from the public site. You can restore it anytime from the Trash view.`}
      confirmLabel="Move to Trash"
      confirmingLabel="Moving..."
      icon={Trash2}
      destructive
      onConfirm={onConfirm}
      successMessage="Moved to Trash."
    />
  );
}
