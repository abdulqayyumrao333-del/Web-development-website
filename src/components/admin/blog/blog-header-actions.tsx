"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, RefreshCw, Trash2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogHeaderActions({ trashedCount = 0 }: { trashedCount?: number }) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    // Server Component refetch has no completion callback — a short, honest
    // pulse rather than a fabricated "done" state tied to nothing real.
    setTimeout(() => setRefreshing(false), 600);
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="md" asChild aria-label="Blog analytics">
        <Link href="/admin/blogs/analytics">
          <BarChart3 className="mr-2 h-4 w-4" aria-hidden="true" />
          Analytics
        </Link>
      </Button>
      <Button variant="ghost" size="md" asChild aria-label={`Trash, ${trashedCount} posts`}>
        <Link href="/admin/blogs/trash">
          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
          Trash{trashedCount > 0 ? ` (${trashedCount})` : ""}
        </Link>
      </Button>
      <Button
        variant="secondary"
        size="md"
        onClick={handleRefresh}
        disabled={refreshing}
        aria-label="Refresh blog posts"
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
        Refresh
      </Button>
      <Button asChild aria-label="Create a new blog post">
        <Link href="/admin/blogs/new">
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          New Blog
        </Link>
      </Button>
    </div>
  );
}
