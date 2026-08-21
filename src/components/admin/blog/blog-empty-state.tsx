import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogEmptyState() {
  return (
    <div className="mt-6 flex flex-col items-center rounded-md border border-dashed border-border p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg-base">
        <Newspaper className="h-6 w-6 text-text-muted" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-medium text-text-primary">No blog posts yet.</p>
      <p className="mt-1 text-sm text-text-muted">Once you publish your first article, it'll show up here.</p>
      <Button asChild className="mt-5">
        <Link href="/admin/blogs/new">Create your first article</Link>
      </Button>
    </div>
  );
}
