"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable, type Column } from "@/components/admin/data-table";
import { BulkActionsBar } from "@/components/admin/bulk-actions-bar";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { deleteSkill, bulkDeleteSkills } from "@/app/(admin)/admin/skills/actions";
import type { Skill } from "@/types";

export function SkillsTable({ skills }: { skills: Skill[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const columns: Column<Skill>[] = [
    { key: "name", label: "Name", render: (s) => <span className="font-medium">{s.name}</span>, sortValue: (s) => s.name },
    { key: "category", label: "Category", render: (s) => s.category, sortValue: (s) => s.category },
    { key: "level", label: "Level", render: (s) => (s.level ? <Badge>{s.level}</Badge> : <span className="text-text-muted">Not rated</span>) },
    { key: "order", label: "Order", render: (s) => s.order, sortValue: (s) => s.order },
    { key: "visible", label: "Status", render: (s) => <StatusBadge status={s.visible ? "visible" : "hidden"} /> },
  ];

  return (
    <div>
      <BulkActionsBar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        onDelete={() => bulkDeleteSkills([...selected])}
      />
      <DataTable
        rows={skills}
        columns={columns}
        searchFields={(s) => [s.name, s.category]}
        emptyMessage="No skills yet — add the first one."
        selectedIds={selected}
        onSelectionChange={setSelected}
        rowActions={(s) => (
          <div className="flex items-center justify-end gap-3">
            <Link href={`/admin/skills/${s.id}/edit`} className="text-accent-indigo hover:underline">
              Edit
            </Link>
            <ConfirmDeleteDialog
              label={s.name}
              onConfirm={() => deleteSkill(s.id)}
              trigger={
                <button aria-label={`Delete ${s.name}`} className="text-text-muted hover:text-danger">
                  <Trash2 className="h-4 w-4" />
                </button>
              }
            />
          </div>
        )}
      />
    </div>
  );
}
