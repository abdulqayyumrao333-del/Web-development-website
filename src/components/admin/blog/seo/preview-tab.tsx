import { GooglePreview } from "@/components/admin/blog/seo/google-preview";
import { SocialPreview } from "@/components/admin/blog/seo/social-preview";
import { SeoAnalyzer } from "@/components/admin/blog/seo/seo-analyzer";
import { InternalLinkSuggestions } from "@/components/admin/blog/seo/internal-link-suggestions";
import type { SeoPanelFields, SeoPanelContext } from "@/components/admin/blog/seo/seo-panel";

export function PreviewTab({
  value,
  context,
  onInsertLink,
}: {
  value: SeoPanelFields;
  context: SeoPanelContext;
  onInsertLink: (markdown: string) => void;
}) {
  const ogTitle = value.ogTitle || value.seoTitle || context.title;
  const ogDescription = value.ogDescription || value.seoDescription || context.excerpt;
  const ogImage = value.ogImage || context.coverImage;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">Google Search Preview</p>
        <GooglePreview
          title={value.seoTitle || context.title}
          slug={context.slug}
          description={value.seoDescription || context.excerpt}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">Social Preview</p>
        <div className="flex flex-wrap gap-4">
          <SocialPreview platform="facebook" title={ogTitle} description={ogDescription} image={ogImage} />
          <SocialPreview platform="linkedin" title={ogTitle} description={ogDescription} image={ogImage} />
          <SocialPreview
            platform="x"
            title={value.twitterTitle || ogTitle}
            description={value.twitterDescription || ogDescription}
            image={value.twitterImage || ogImage}
          />
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <p className="mb-2 text-xs font-medium text-text-secondary">SEO Score</p>
        <SeoAnalyzer value={value} context={context} />
      </div>

      <div className="border-t border-border pt-4">
        <InternalLinkSuggestions context={context} onInsertLink={onInsertLink} />
      </div>
    </div>
  );
}
