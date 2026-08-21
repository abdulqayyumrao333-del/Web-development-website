"use client";

import { useEffect } from "react";

export function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return; // graceful no-op on unsupported browsers

    // Never register in development — a cached service worker persists across
    // code changes and `.next` cache clears, serving stale pages exactly like
    // the GitHub-login bug this comment is here to prevent from recurring.
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("[PWA] Service worker registration failed:", err));
  }, []);

  return null;
}
