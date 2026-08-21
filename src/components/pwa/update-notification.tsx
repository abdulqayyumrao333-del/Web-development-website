"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpdateNotification() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) setWaitingWorker(registration.waiting);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
          }
        });
      });
    });
  }, []);

  if (!waitingWorker) return null;

  function handleUpdate() {
    waitingWorker?.postMessage("SKIP_WAITING");
    window.location.reload();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        role="status"
        className="fixed left-1/2 top-24 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-bg-surface px-4 py-2 text-sm shadow-lg"
      >
        <RefreshCw className="h-4 w-4 text-accent-indigo" />
        <span>A new version is available</span>
        <Button size="sm" onClick={handleUpdate}>Reload</Button>
      </motion.div>
    </AnimatePresence>
  );
}
