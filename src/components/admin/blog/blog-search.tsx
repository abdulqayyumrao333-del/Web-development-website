"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DEBOUNCE_MS = 350;

/** Searches by title, slug, category, author, or tags (matched client-side
 * against the already-fetched post list — see page.tsx for why). Debounces
 * before updating the URL so typing doesn't trigger a navigation per keystroke. */
export function BlogSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const handle = setTimeout(() => {
      // Read the live URL at fire-time rather than the searchParams snapshot
      // captured when this effect was created — avoids overwriting a filter
      // change (status/category/etc.) made while this debounce was pending.
      const params = new URLSearchParams(window.location.search);
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      params.set("page", "1"); // reset to first page on every new search
      router.replace(`${pathname}?${params.toString()}`);
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search title, slug, category, tags..."
        aria-label="Search blog posts"
        className="pl-9"
      />
    </div>
  );
}
