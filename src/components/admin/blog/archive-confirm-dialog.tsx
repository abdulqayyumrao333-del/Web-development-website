import { Archive } from "lucide-react";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function ArchiveConfirmDialog({
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
      title="Archive this post?"
      description={`"${postTitle}" will be hidden from the public site but kept in the database. You can restore it anytime.`}
      confirmLabel="Archive"
      confirmingLabel="Archiving..."
      icon={Archive}
      onConfirm={onConfirm}
      successMessage="Post archived."
    />
  );
}
