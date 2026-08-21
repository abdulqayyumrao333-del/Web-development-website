"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// BeforeInstallPromptEvent isn't in the standard lib.dom.d.ts yet.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  // Never render if the browser hasn't fired the event (unsupported browser,
  // already installed, or criteria not yet met) or the user dismissed it.
  if (!deferredPrompt || dismissed) return null;

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDismissed(true);
    setDeferredPrompt(null);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        role="dialog"
        aria-label="Install this app"
        className="fixed bottom-6 left-6 z-[70] flex max-w-xs items-center gap-3 rounded-md border border-border bg-bg-surface p-4 shadow-lg"
      >
        <Download className="h-5 w-5 shrink-0 text-accent-indigo" />
        <div className="flex-1 text-sm">
          <p className="font-medium">Install this site</p>
          <p className="text-text-secondary">Add it to your device for quick, offline-ready access.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Button size="sm" onClick={handleInstall}>Install</Button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss install prompt"
            className="text-text-muted hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
