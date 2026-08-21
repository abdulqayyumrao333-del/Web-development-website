import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export function VersionInfoCard({
  createdAt,
  updatedAt,
  publishedAt,
  author,
  lastSavedAt,
}: {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author: string;
  lastSavedAt: Date | null;
}) {
  const rows: [string, string][] = [
    ["Created", formatDate(createdAt)],
    ["Last Updated", formatDate(updatedAt)],
    ["Published", formatDate(publishedAt)],
    ["Author", author],
    ["Last Saved", lastSavedAt ? lastSavedAt.toLocaleString() : "—"],
  ];

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-text-primary">Version Info</h2>
      <dl className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <dt className="text-text-muted">{label}</dt>
            <dd className="text-text-secondary">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
