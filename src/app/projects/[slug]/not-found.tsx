import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-text-secondary">This project may have been renamed or removed.</p>
      <Link href="/projects" className="mt-6 inline-block rounded-sm bg-accent-indigo px-4 py-2 text-white">
        Back to projects
      </Link>
    </div>
  );
}
