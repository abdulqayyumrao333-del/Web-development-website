export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 py-24">
      <div className="h-10 w-1/3 rounded-sm bg-bg-surface" />
      <div className="mt-4 h-4 w-2/3 rounded-sm bg-bg-surface" />
      <div className="mt-12 h-64 w-full rounded-md bg-bg-surface" />
    </div>
  );
}
