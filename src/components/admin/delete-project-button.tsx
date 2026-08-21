"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/(admin)/admin/projects/actions";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-xs">
        Delete &quot;{title}&quot;?
        <button
          onClick={() => startTransition(() => deleteProject(id))}
          disabled={isPending}
          className="font-medium text-danger hover:underline"
        >
          {isPending ? "Deleting..." : "Confirm"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-text-muted hover:underline">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${title}`}
      className="text-text-muted hover:text-danger"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
