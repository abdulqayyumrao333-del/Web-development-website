import { Copy } from "lucide-react";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function DuplicateConfirmDialog({
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
      title="Duplicate this post?"
      description={`A new draft copy of "${postTitle}" will be created, titled "${postTitle} (Copy)".`}
      confirmLabel="Duplicate"
      confirmingLabel="Duplicating..."
      icon={Copy}
      onConfirm={onConfirm}
      successMessage="Draft copy created."
    />
  );
}
