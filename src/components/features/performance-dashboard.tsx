import { promises as fs } from "fs";
import path from "path";
import { Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

type LighthouseReport = {
  auditedAt: string | null;
  url: string | null;
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
    pwa: number | null;
  };
};

async function getReport(): Promise<LighthouseReport> {
  try {
    const filePath = path.join(process.cwd(), "public", "lighthouse-report.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { auditedAt: null, url: null, scores: { performance: null, accessibility: null, bestPractices: null, seo: null, pwa: null } };
  }
}

function scoreColor(score: number | null) {
  if (score === null) return "text-text-muted";
  if (score >= 90) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

export async function PerformanceDashboard() {
  const report = await getReport();
  const hasData = report.auditedAt !== null;

  const entries: { label: string; value: number | null }[] = [
    { label: "Performance", value: report.scores.performance },
    { label: "Accessibility", value: report.scores.accessibility },
    { label: "Best Practices", value: report.scores.bestPractices },
    { label: "SEO", value: report.scores.seo },
    { label: "PWA", value: report.scores.pwa },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4 text-accent-indigo" />
        <p className="font-semibold">Lighthouse Scores</p>
      </div>

      {!hasData ? (
        <p className="mt-3 text-sm text-text-secondary">
          No audit has run yet — scores will appear here automatically after the site is
          deployed and the first Lighthouse CI run completes.
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-5 gap-3 text-center">
            {entries.map((e) => (
              <div key={e.label}>
                <p className={`font-mono text-h4 ${scoreColor(e.value)}`}>{e.value ?? "—"}</p>
                <p className="mt-1 text-caption text-text-muted">{e.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-caption text-text-muted">
            Last audited {new Date(report.auditedAt!).toLocaleDateString()} · {report.url}
          </p>
        </>
      )}
    </Card>
  );
}
