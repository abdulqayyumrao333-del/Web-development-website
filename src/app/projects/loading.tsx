export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="h-10 w-1/3 animate-pulse rounded-sm bg-bg-surface" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-md bg-bg-surface" />
        ))}
      </div>
    </div>
  );
}
