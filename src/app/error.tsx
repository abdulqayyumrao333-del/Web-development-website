"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-danger">Something went wrong</p>
      <button onClick={() => reset()} className="rounded-sm bg-accent-indigo px-4 py-2 text-white hover:shadow-glow">
        Try again
      </button>
    </div>
  );
}
