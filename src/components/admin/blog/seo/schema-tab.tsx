import { CheckCircle2 } from "lucide-react";
import {
  buildArticleJsonLdData,
  buildBreadcrumbJsonLdData,
  buildWebsiteJsonLdData,
  buildPersonJsonLdData,
} from "@/components/seo/json-ld";
import { SchemaPreview } from "@/components/admin/blog/seo/schema-preview";
import type { SeoPanelContext } from "@/components/admin/blog/seo/seo-panel";

export function SchemaTab({ context }: { context: SeoPanelContext }) {
  // These builders expect a persisted BlogPost's publishedAt/updatedAt; for
  // an unsaved draft there's nothing real to show yet, so dates are today's
  // date as a preview placeholder — the actual saved post will use the real
  // ones. Everything else here is genuine, taken directly from the draft.
  const draftPost = {
    title: context.title || "Untitled post",
    excerpt: context.excerpt,
    coverImage: context.coverImage,
    publishedAt: new Date(),
    updatedAt: new Date(),
  } as Parameters<typeof buildArticleJsonLdData>[0];

  const articleData = buildArticleJsonLdData(draftPost);
  const breadcrumbData = buildBreadcrumbJsonLdData([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: context.title || "Untitled post", path: `/blog/${context.slug || "..."}` },
  ]);

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 rounded-sm border border-success/30 bg-success/5 p-3 text-xs text-success">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Valid JSON-LD — these are generated automatically and don&apos;t need manual editing. Shown here for
          inspection only.
        </span>
      </div>

      <SchemaPreview title="Article Schema (this post)" data={articleData} />
      <SchemaPreview title="Breadcrumb Schema (this post)" data={breadcrumbData} />
      <SchemaPreview title="Website Schema (site-wide, unaffected by this post)" data={buildWebsiteJsonLdData()} />
      <SchemaPreview
        title="Author / Organization Schema (site-wide, unaffected by this post)"
        data={buildPersonJsonLdData()}
      />
    </div>
  );
}
