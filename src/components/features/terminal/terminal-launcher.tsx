"use client";

import { useEffect, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { Terminal } from "@/components/features/terminal/terminal";

export function TerminalLauncher() {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + \ opens the terminal from anywhere.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open interactive terminal"
        title="Open terminal (Ctrl/Cmd + \)"
        className="no-print fixed bottom-6 right-24 z-40 rounded-full border border-border bg-bg-surface p-3 text-text-secondary shadow-md transition-colors duration-base hover:text-accent-indigo hover:shadow-glow"
      >
        <TerminalSquare className="h-4 w-4" />
      </button>
      <Terminal open={open} onOpenChange={setOpen} />
    </>
  );
}
