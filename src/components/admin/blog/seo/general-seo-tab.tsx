import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CharacterCounter } from "@/components/admin/blog/character-counter";
import type { SeoPanelFields } from "@/components/admin/blog/seo/seo-panel";

const SEO_TITLE_MAX = 70;
const SEO_TITLE_RECOMMENDED_MIN = 30;
const SEO_DESCRIPTION_MAX = 160;
const SEO_DESCRIPTION_RECOMMENDED_MIN = 70;

function RecommendedLength({ current, min, max }: { current: number; min: number; max: number }) {
  if (current === 0) return null;
  if (current < min) {
    return <p className="mt-1 text-xs text-warning">A bit short — aim for at least {min} characters.</p>;
  }
  if (current > max) {
    return <p className="mt-1 text-xs text-danger">Too long — Google typically truncates past {max} characters.</p>;
  }
  return <p className="mt-1 text-xs text-success">Good length.</p>;
}

export function GeneralSeoTab({
  value,
  onChange,
  errors,
  slug,
}: {
  value: SeoPanelFields;
  onChange: (fields: Partial<SeoPanelFields>) => void;
  errors: Record<string, string>;
  slug: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="seo-title" className="text-xs font-medium text-text-secondary">
            SEO Title
          </label>
          <CharacterCounter current={value.seoTitle.length} max={SEO_TITLE_MAX} />
        </div>
        <Input
          id="seo-title"
          value={value.seoTitle}
          onChange={(e) => onChange({ seoTitle: e.target.value })}
          placeholder="Falls back to the post title if left blank"
          aria-invalid={Boolean(errors.seoTitle)}
          className="mt-1.5"
        />
        <RecommendedLength current={value.seoTitle.length} min={SEO_TITLE_RECOMMENDED_MIN} max={SEO_TITLE_MAX} />
        {errors.seoTitle && <p className="mt-1 text-xs text-danger">{errors.seoTitle}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="seo-description" className="text-xs font-medium text-text-secondary">
            Meta Description
          </label>
          <CharacterCounter current={value.seoDescription.length} max={SEO_DESCRIPTION_MAX} />
        </div>
        <Textarea
          id="seo-description"
          value={value.seoDescription}
          onChange={(e) => onChange({ seoDescription: e.target.value })}
          rows={3}
          placeholder="Falls back to the excerpt if left blank"
          aria-invalid={Boolean(errors.seoDescription)}
          className="mt-1.5"
        />
        <RecommendedLength
          current={value.seoDescription.length}
          min={SEO_DESCRIPTION_RECOMMENDED_MIN}
          max={SEO_DESCRIPTION_MAX}
        />
        {errors.seoDescription && <p className="mt-1 text-xs text-danger">{errors.seoDescription}</p>}
      </div>

      <div>
        <label htmlFor="focus-keyword" className="text-xs font-medium text-text-secondary">
          Focus Keyword
        </label>
        <Input
          id="focus-keyword"
          value={value.focusKeyword}
          onChange={(e) => onChange({ focusKeyword: e.target.value })}
          placeholder="The primary term this post targets"
          aria-invalid={Boolean(errors.focusKeyword)}
          className="mt-1.5"
        />
        {errors.focusKeyword && <p className="mt-1 text-xs text-danger">{errors.focusKeyword}</p>}
      </div>

      <div>
        <label htmlFor="canonical-url" className="text-xs font-medium text-text-secondary">
          Canonical URL
        </label>
        <Input
          id="canonical-url"
          value={value.canonicalUrl}
          onChange={(e) => onChange({ canonicalUrl: e.target.value })}
          placeholder="Leave blank to use this post's own URL"
          aria-invalid={Boolean(errors.canonicalUrl)}
          className="mt-1.5"
        />
        {errors.canonicalUrl && <p className="mt-1 text-xs text-danger">{errors.canonicalUrl}</p>}
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary">SEO Slug</label>
        <p className="mt-1.5 rounded-sm border border-border bg-bg-surface-2 px-3 py-2 font-mono text-xs text-text-secondary">
          /blog/{slug || "—"}
        </p>
        <p className="mt-1 text-xs text-text-muted">Edit the slug in Basic Information above — shown here for reference.</p>
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-text-secondary">Meta Robots</p>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={value.noIndex}
              onChange={(e) => onChange({ noIndex: e.target.checked })}
            />
            NoIndex — hide this post from search engines
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={value.noFollow}
              onChange={(e) => onChange({ noFollow: e.target.checked })}
            />
            NoFollow — tell search engines not to follow links on this page
          </label>
        </div>
      </div>
    </div>
  );
}
