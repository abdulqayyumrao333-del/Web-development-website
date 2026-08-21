export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 py-24">
      <div className="h-4 w-1/4 rounded-sm bg-bg-surface" />
      <div className="mt-3 h-10 w-2/3 rounded-sm bg-bg-surface" />
      <div className="mt-12 h-96 w-full rounded-md bg-bg-surface" />
    </div>
  );
}
