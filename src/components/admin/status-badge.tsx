import { Eye, EyeOff, FileEdit, CheckCircle2, Clock, Archive, Star, Trash2 } from "lucide-react";

type Status = "visible" | "hidden" | "draft" | "published" | "scheduled" | "archived" | "trashed";

const CONFIG: Record<Status, { label: string; icon: typeof Eye; className: string }> = {
  visible: { label: "Visible", icon: Eye, className: "border-success/30 text-success" },
  hidden: { label: "Hidden", icon: EyeOff, className: "border-text-muted/30 text-text-muted" },
  draft: { label: "Draft", icon: FileEdit, className: "border-warning/30 text-warning" },
  published: { label: "Published", icon: CheckCircle2, className: "border-success/30 text-success" },
  scheduled: { label: "Scheduled", icon: Clock, className: "border-accent-blue/30 text-accent-blue" },
  archived: { label: "Archived", icon: Archive, className: "border-danger/30 text-danger" },
  trashed: { label: "Trashed", icon: Trash2, className: "border-text-muted/30 text-text-muted" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, icon: Icon, className } = CONFIG[status];
  return (
    <span className={`flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

/** Purple "Featured" indicator — a flag, not a lifecycle status, so it's a
 * separate component rather than another StatusBadge variant. */
export function FeaturedBadge() {
  return (
    <span className="flex w-fit items-center gap-1 rounded-full border border-accent-violet/30 px-2 py-0.5 text-xs text-accent-violet">
      <Star className="h-3 w-3" />
      Featured
    </span>
  );
}
