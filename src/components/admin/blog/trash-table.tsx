"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { RotateCcw, Trash2 } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { TrashBulkActionsBar } from "@/components/admin/blog/trash-bulk-actions-bar";
import { restoreBlog, permanentlyDeleteBlog } from "@/app/(admin)/admin/blogs/actions";

export function TrashTable({ posts }: { posts: BlogPost[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === posts.length ? new Set() : new Set(posts.map((p) => p.id))));
  }

  async function restoreSelected() {
    return Promise.all(Array.from(selected).map((id) => restoreBlog(id)));
  }

  async function deleteSelected() {
    return Promise.all(Array.from(selected).map((id) => permanentlyDeleteBlog(id)));
  }

  return (
    <div>
      <TrashBulkActionsBar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        onRestoreAll={restoreSelected}
        onDeleteAll={deleteSelected}
      />

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-bg-surface-2 text-left text-xs uppercase text-text-muted">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.size === posts.length && posts.length > 0}
                  onChange={toggleAll}
                  aria-label="Select all trashed posts"
                />
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Trashed</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <TrashTableRow
                key={post.id}
                post={post}
                selected={selected.has(post.id)}
                onToggle={() => toggle(post.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrashTableRow({ post, selected, onToggle }: { post: BlogPost; selected: boolean; onToggle: () => void }) {
  const router = useRouter();
  const [isRestoring, startRestoring] = useTransition();

  function handleRestore() {
    startRestoring(async () => {
      const result = await restoreBlog(post.id);
      if (result.success) {
        toast.success("Post restored.");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <tr>
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onToggle} aria-label={`Select "${post.title}"`} />
      </td>
      <td className="max-w-xs truncate px-4 py-3 font-medium" title={post.title}>
        {post.title}
      </td>
      <td className="px-4 py-3 text-text-secondary">{post.category}</td>
      <td className="px-4 py-3 text-text-secondary">{post.author || siteConfig.name}</td>
      <td className="px-4 py-3 text-text-secondary">{formatDate(post.updatedAt)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            aria-label={`Restore "${post.title}"`}
            title="Restore"
            className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <ConfirmDeleteDialog
            label={post.title}
            onConfirm={async () => {
              const result = await permanentlyDeleteBlog(post.id);
              if (!result.success) throw new Error(result.error);
              router.refresh();
            }}
            trigger={
              <button
                aria-label={`Permanently delete "${post.title}"`}
                title="Permanent Delete"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-danger/10 hover:text-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </td>
    </tr>
  );
}
