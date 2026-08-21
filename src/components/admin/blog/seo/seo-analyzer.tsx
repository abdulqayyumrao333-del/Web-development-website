import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeSeo } from "@/lib/seo-analyzer";
import { siteConfig } from "@/config/site";
import type { SeoPanelFields, SeoPanelContext } from "@/components/admin/blog/seo/seo-panel";

const SCORE_STYLES: Record<string, string> = {
  Excellent: "border-success/30 bg-success/10 text-success",
  Good: "border-warning/30 bg-warning/10 text-warning",
  "Needs Improvement": "border-danger/30 bg-danger/10 text-danger",
};

export function SeoAnalyzer({ value, context }: { value: SeoPanelFields; context: SeoPanelContext }) {
  const analysis = analyzeSeo({
    seoTitle: value.seoTitle,
    title: context.title,
    seoDescription: value.seoDescription,
    excerpt: context.excerpt,
    focusKeyword: value.focusKeyword,
    slug: context.slug,
    contentMdx: context.contentMdx,
    canonicalUrl: value.canonicalUrl,
    siteHostname: new URL(siteConfig.url).hostname,
  });

  return (
    <div>
      <div className={cn("flex items-center justify-between rounded-md border p-3", SCORE_STYLES[analysis.score])}>
        <span className="text-sm font-semibold">{analysis.score}</span>
        <span className="text-xs">
          {analysis.passedCount}/{analysis.totalCount} checks passed
        </span>
      </div>

      <ul className="mt-3 space-y-2">
        {analysis.checks.map((check) => (
          <li key={check.label} className="flex items-start gap-2 text-xs">
            {check.passed ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
            ) : (
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
            )}
            <span>
              <span className="font-medium text-text-secondary">{check.label}:</span>{" "}
              <span className="text-text-muted">{check.message}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
