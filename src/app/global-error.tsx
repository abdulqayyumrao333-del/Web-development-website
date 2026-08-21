"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-base px-6 text-center text-text-primary">
        <p className="font-mono text-sm text-danger">Something went wrong</p>
        <h1 className="text-2xl font-semibold">An unexpected error occurred</h1>
        <p className="max-w-md text-text-secondary">
          This has been logged. Try again, or head back to the homepage if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="mt-2 rounded-sm bg-accent-indigo px-4 py-2 text-white hover:shadow-glow"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
