"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSeoTab } from "@/components/admin/blog/seo/general-seo-tab";
import { OpenGraphTab } from "@/components/admin/blog/seo/open-graph-tab";
import { TwitterTab } from "@/components/admin/blog/seo/twitter-tab";
import { SchemaTab } from "@/components/admin/blog/seo/schema-tab";
import { AdvancedSeoTab } from "@/components/admin/blog/seo/advanced-seo-tab";
import { PreviewTab } from "@/components/admin/blog/seo/preview-tab";

/** Full set of SEO-related form fields — composed from the existing SEOData
 * (General SEO, already-persisted top-level columns) and BlogSeoMeta
 * (Open Graph/Twitter/robots overrides, packed into the seoMeta JSON column)
 * types in types/index.ts, rather than declaring a third overlapping shape. */
export type SeoPanelFields = {
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogImage: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogType: "website" | "article" | "profile" | "";
  twitterCard: "summary" | "summary_large_image";
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
};

export type SeoPanelContext = {
  postId?: string | null;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMdx: string;
  category: string;
  tags: string[];
};

export function SeoPanel({
  value,
  onChange,
  errors,
  context,
  onInsertLink,
}: {
  value: SeoPanelFields;
  onChange: (fields: Partial<SeoPanelFields>) => void;
  errors: Record<string, string>;
  context: SeoPanelContext;
  onInsertLink: (markdown: string) => void;
}) {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-text-primary">SEO</h2>

      <Tabs defaultValue="general" className="mt-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <GeneralSeoTab value={value} onChange={onChange} errors={errors} slug={context.slug} />
        </TabsContent>
        <TabsContent value="opengraph" className="mt-4">
          <OpenGraphTab value={value} onChange={onChange} errors={errors} fallbackImage={context.coverImage} />
        </TabsContent>
        <TabsContent value="twitter" className="mt-4">
          <TwitterTab value={value} onChange={onChange} errors={errors} fallbackImage={context.coverImage} />
        </TabsContent>
        <TabsContent value="schema" className="mt-4">
          <SchemaTab context={context} />
        </TabsContent>
        <TabsContent value="advanced" className="mt-4">
          <AdvancedSeoTab context={context} />
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <PreviewTab value={value} context={context} onInsertLink={onInsertLink} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
