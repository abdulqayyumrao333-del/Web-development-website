import { EyeOff } from "lucide-react";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function UnpublishConfirmDialog({
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
      title="Unpublish this article?"
      description={`"${postTitle}" will no longer be publicly visible and moves back to Draft. Its content is kept — nothing is deleted.`}
      confirmLabel="Unpublish"
      confirmingLabel="Unpublishing..."
      icon={EyeOff}
      onConfirm={onConfirm}
      successMessage="Post unpublished."
    />
  );
}
