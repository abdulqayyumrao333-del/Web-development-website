"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ExternalLink, Pencil, Copy, Archive, RotateCcw, Trash2, Send, CalendarClock, EyeOff, CalendarX } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { StatusBadge, FeaturedBadge } from "@/components/admin/status-badge";
import { TrashConfirmDialog } from "@/components/admin/blog/trash-confirm-dialog";
import { ArchiveConfirmDialog } from "@/components/admin/blog/archive-confirm-dialog";
import { DuplicateConfirmDialog } from "@/components/admin/blog/duplicate-confirm-dialog";
import { PublishConfirmDialog } from "@/components/admin/blog/publishing/publish-confirm-dialog";
import { UnpublishConfirmDialog } from "@/components/admin/blog/publishing/unpublish-confirm-dialog";
import { ScheduleDialog } from "@/components/admin/blog/publishing/schedule-dialog";
import { CancelScheduleConfirmDialog } from "@/components/admin/blog/publishing/cancel-schedule-confirm-dialog";
import { deleteBlog, archiveBlog, duplicateBlog, restoreBlog } from "@/app/(admin)/admin/blogs/actions";
import {
  publishBlogPost,
  unpublishBlogPost,
  scheduleBlogPost,
  rescheduleBlogPost,
  cancelScheduledBlogPost,
} from "@/app/(admin)/admin/blogs/publishing-actions";

const STATUS_TO_BADGE = {
  DRAFT: "draft",
  PUBLISHED: "published",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  TRASHED: "trashed", // shouldn't normally reach this table — getBlogs() excludes TRASHED — mapped defensively
} as const;

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-bg-surface-2 text-left text-xs uppercase text-text-muted">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Author</th>
            <th className="px-4 py-3">Reading Time</th>
            <th className="px-4 py-3">Published</th>
            <th className="px-4 py-3">Last Updated</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {posts.map((post) => (
            <BlogTableRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlogTableRow({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [isRestoring, startRestoring] = useTransition();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const canView = post.status === "PUBLISHED" || post.status === "SCHEDULED";

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
      <td className="max-w-xs truncate px-4 py-3 font-medium" title={post.title}>
        {post.title}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={STATUS_TO_BADGE[post.status]} />
        {post.status === "SCHEDULED" && post.scheduledAt && (
          <p className="mt-1 text-xs text-text-muted">Scheduled for: {formatDate(post.scheduledAt)}</p>
        )}
        {post.status === "PUBLISHED" && (
          <p className="mt-1 text-xs text-text-muted">Published: {formatDate(post.publishedAt)}</p>
        )}
      </td>
      <td className="px-4 py-3 text-text-secondary">{post.category}</td>
      <td className="px-4 py-3 text-text-secondary">{post.author || siteConfig.name}</td>
      <td className="px-4 py-3 text-text-secondary">
        {post.readingTime ? `${post.readingTime} min` : "—"}
      </td>
      <td className="px-4 py-3 text-text-secondary">{formatDate(post.publishedAt)}</td>
      <td className="px-4 py-3 text-text-secondary">{formatDate(post.updatedAt)}</td>
      <td className="px-4 py-3">{post.featured ? <FeaturedBadge /> : <span className="text-text-muted">—</span>}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          {/* View — only meaningful when the post is actually publicly reachable */}
          {canView ? (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View "${post.title}" on the public site`}
              title="View on site"
              className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <span aria-hidden="true" title="Not publicly visible" className="rounded-sm p-1.5 text-text-muted opacity-40">
              <ExternalLink className="h-4 w-4" />
            </span>
          )}

          {/* Edit + Duplicate — available everywhere except Archived, matching Sprint 7's explicit per-status action list */}
          {post.status !== "ARCHIVED" && (
            <>
              <Link
                href={`/admin/blogs/${post.id}/edit`}
                aria-label={`Edit "${post.title}"`}
                title="Edit"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DuplicateConfirmDialog
                postTitle={post.title}
                onConfirm={() => duplicateBlog(post.id)}
                trigger={
                  <button
                    aria-label={`Duplicate "${post.title}"`}
                    title="Duplicate"
                    className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                }
              />
            </>
          )}

          {/* Draft: Publish Now, Schedule */}
          {post.status === "DRAFT" && (
            <>
              <button
                onClick={() => setPublishDialogOpen(true)}
                aria-label={`Publish "${post.title}" now`}
                title="Publish Now"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-success/10 hover:text-success"
              >
                <Send className="h-4 w-4" />
              </button>
              <button
                onClick={() => setScheduleDialogOpen(true)}
                aria-label={`Schedule "${post.title}"`}
                title="Schedule"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              >
                <CalendarClock className="h-4 w-4" />
              </button>
              <PublishConfirmDialog
                open={publishDialogOpen}
                onOpenChange={setPublishDialogOpen}
                post={post}
                onPublish={() => publishBlogPost(post.id)}
              />
              <ScheduleDialog
                open={scheduleDialogOpen}
                onOpenChange={setScheduleDialogOpen}
                postTitle={post.title}
                mode="schedule"
                onSchedule={(iso) => scheduleBlogPost(post.id, iso)}
              />
            </>
          )}

          {/* Scheduled: Reschedule, Publish Now, Cancel Schedule */}
          {post.status === "SCHEDULED" && (
            <>
              <button
                onClick={() => setScheduleDialogOpen(true)}
                aria-label={`Reschedule "${post.title}"`}
                title="Reschedule"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              >
                <CalendarClock className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPublishDialogOpen(true)}
                aria-label={`Publish "${post.title}" now`}
                title="Publish Now"
                className="rounded-sm p-1.5 text-text-secondary hover:bg-success/10 hover:text-success"
              >
                <Send className="h-4 w-4" />
              </button>
              <CancelScheduleConfirmDialog
                postTitle={post.title}
                onConfirm={() => cancelScheduledBlogPost(post.id)}
                trigger={
                  <button
                    aria-label={`Cancel schedule for "${post.title}"`}
                    title="Cancel Schedule"
                    className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
                  >
                    <CalendarX className="h-4 w-4" />
                  </button>
                }
              />
              <PublishConfirmDialog
                open={publishDialogOpen}
                onOpenChange={setPublishDialogOpen}
                post={post}
                onPublish={() => publishBlogPost(post.id)}
              />
              <ScheduleDialog
                open={scheduleDialogOpen}
                onOpenChange={setScheduleDialogOpen}
                postTitle={post.title}
                mode="reschedule"
                initialDate={post.scheduledAt}
                onSchedule={(iso) => rescheduleBlogPost(post.id, iso)}
              />
            </>
          )}

          {/* Published: Unpublish, Archive — deliberately no direct Delete here, matching Sprint 7's explicit list; unpublish or archive first */}
          {post.status === "PUBLISHED" && (
            <>
              <UnpublishConfirmDialog
                postTitle={post.title}
                onConfirm={() => unpublishBlogPost(post.id)}
                trigger={
                  <button
                    aria-label={`Unpublish "${post.title}"`}
                    title="Unpublish"
                    className="rounded-sm p-1.5 text-text-secondary hover:bg-warning/10 hover:text-warning"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                }
              />
              <ArchiveConfirmDialog
                postTitle={post.title}
                onConfirm={() => archiveBlog(post.id)}
                trigger={
                  <button
                    aria-label={`Archive "${post.title}"`}
                    title="Archive"
                    className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
                  >
                    <Archive className="h-4 w-4" />
                  </button>
                }
              />
            </>
          )}

          {/* Archived: Restore, Delete only — matching Sprint 7's explicit list */}
          {post.status === "ARCHIVED" && (
            <button
              onClick={handleRestore}
              disabled={isRestoring}
              aria-label={`Restore "${post.title}"`}
              title="Restore"
              className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {/* Delete (move to Trash) — available for every status except Published (see above) */}
          {post.status !== "PUBLISHED" && (
            <TrashConfirmDialog
              postTitle={post.title}
              onConfirm={() => deleteBlog(post.id)}
              trigger={
                <button
                  aria-label={`Move "${post.title}" to Trash`}
                  title="Delete"
                  className="rounded-sm p-1.5 text-text-secondary hover:bg-danger/10 hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              }
            />
          )}
        </div>
      </td>
    </tr>
  );
}
