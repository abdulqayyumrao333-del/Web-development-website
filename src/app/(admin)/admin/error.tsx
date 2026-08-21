"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border p-12 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-text-primary">Something went wrong in the admin dashboard.</p>
        <p className="mt-1 text-sm text-text-muted">Your content is safe — this is a display error, not a data loss.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild>
          <Link href="/admin/blogs">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
