import { siteConfig } from "@/config/site";

export function GooglePreview({
  title,
  slug,
  description,
}: {
  title: string;
  slug: string;
  description: string;
}) {
  const url = `${siteConfig.url.replace(/^https?:\/\//, "")}/blog/${slug || "..."}`;

  return (
    <div className="max-w-xl rounded-md border border-border bg-white p-4">
      <p className="truncate text-sm text-[#202124]">{url}</p>
      <p className="mt-1 truncate text-lg text-[#1a0dab]">{title || "Untitled post"}</p>
      <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{description || "No description set yet."}</p>
    </div>
  );
}
