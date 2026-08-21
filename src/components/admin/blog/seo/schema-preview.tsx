export function SchemaPreview({ title, data }: { title: string; data: object }) {
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary">{title}</p>
      <pre className="mt-1.5 max-h-64 overflow-auto rounded-sm border border-border bg-bg-surface-2 p-3 text-xs text-text-secondary">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
