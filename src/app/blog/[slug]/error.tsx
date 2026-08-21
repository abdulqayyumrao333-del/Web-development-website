"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="font-mono text-sm text-danger">Couldn&apos;t load this post</p>
      <button onClick={() => reset()} className="mt-6 rounded-sm bg-accent-indigo px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
