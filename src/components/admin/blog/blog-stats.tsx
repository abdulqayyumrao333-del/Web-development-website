import { FileText, CheckCircle2, FileEdit, Archive, Star } from "lucide-react";

export function BlogStats({
  total,
  published,
  drafts,
  archived,
  featured,
}: {
  total: number;
  published: number;
  drafts: number;
  archived: number;
  featured: number;
}) {
  const stats = [
    { icon: FileText, label: "Total Posts", value: total },
    { icon: CheckCircle2, label: "Published", value: published },
    { icon: FileEdit, label: "Drafts", value: drafts },
    { icon: Archive, label: "Archived", value: archived },
    { icon: Star, label: "Featured Posts", value: featured },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-md border border-border bg-bg-base p-4">
          <Icon className="h-4 w-4 text-accent-indigo" aria-hidden="true" />
          <p className="mt-2 font-mono text-2xl">{value}</p>
          <p className="mt-1 text-xs text-text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
