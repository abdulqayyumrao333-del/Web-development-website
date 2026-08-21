"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-mono text-sm text-danger">Something went wrong loading the contact form</p>
      <p className="mt-2 text-text-secondary">
        You can still reach out directly at{" "}
        <a href="mailto:abdulqayyumrao333@gmail.com" className="text-accent-indigo">abdulqayyumrao333@gmail.com</a>.
      </p>
      <button onClick={() => reset()} className="mt-6 rounded-sm bg-accent-indigo px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
