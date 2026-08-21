import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-text-muted">404</p>
      <h1 className="text-3xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="max-w-md text-text-secondary">
        The page you&apos;re looking for was moved, renamed, or never existed. Head back to the
        homepage or check out the projects instead.
      </p>
      <div className="mt-4 flex gap-3">
        <Link href="/" className="rounded-sm bg-accent-indigo px-4 py-2 text-white hover:shadow-glow">
          Back home
        </Link>
        <Link href="/projects" className="rounded-sm border border-border px-4 py-2 hover:border-border-hover">
          View projects
        </Link>
      </div>
    </div>
  );
}
