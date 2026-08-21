"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogErrorState({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col items-center rounded-md border border-danger/30 bg-danger/5 p-12 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
      <p className="mt-4 text-sm font-medium text-text-primary">Couldn't load blog posts.</p>
      <p className="mt-1 text-sm text-text-muted">{message}</p>
      <Button variant="secondary" className="mt-5" onClick={() => router.refresh()}>
        <RotateCw className="mr-2 h-4 w-4" aria-hidden="true" />
        Retry
      </Button>
    </div>
  );
}
