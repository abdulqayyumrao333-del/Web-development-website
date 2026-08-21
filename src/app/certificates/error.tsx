"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="font-mono text-sm text-danger">Error loading Certificates</p>
      <p className="mt-2 text-text-secondary">Something went wrong rendering this page.</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-sm bg-accent-indigo px-4 py-2 text-white hover:shadow-glow"
      >
        Try again
      </button>
    </div>
  );
}
