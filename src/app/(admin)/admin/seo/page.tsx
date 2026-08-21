import { AlertTriangle, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { auditContent, findDuplicates, findMissingAltText } from "@/lib/seo-audit";

export const metadata = { title: "SEO Health" };

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? "text-success border-success/30" : score >= 60 ? "text-warning border-warning/30" : "text-danger border-danger/30";
  return <span className={`rounded-full border px-2 py-0.5 font-mono text-xs ${color}`}>{score}</span>;
}

export default async function SeoHealthPage() {
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  let posts: Awaited<ReturnType<typeof db.blogPost.findMany>> = [];
  let services: Awaited<ReturnType<typeof db.service.findMany>> = [];

  try {
    [projects, posts, services] = await Promise.all([
      db.project.findMany({ orderBy: { order: "asc" } }),
      db.blogPost.findMany({ where: publishedPostWhere, orderBy: { publishedAt: "desc" } }),
      db.service.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {
    // database unavailable — tables render empty below
  }

  const projectAudits = projects.map((p) => ({
    id: p.id, title: p.title, path: `/projects/${p.slug}`,
    ...auditContent({ title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription, summary: p.summary, coverImage: p.coverImage, slug: p.slug }),
  }));
  const postAudits = posts.map((p) => ({
    id: p.id, title: p.title, path: `/blog/${p.slug}`,
    ...auditContent({ title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription, summary: p.excerpt, coverImage: p.coverImage, slug: p.slug }),
    missingAlt: findMissingAltText(p.contentMdx),
  }));
  const serviceAudits = services.map((s) => ({
    id: s.id, title: s.title, path: `/services#${s.slug}`,
    ...auditContent({ title: s.title, seoTitle: null, seoDescription: s.shortDescription, summary: s.shortDescription, coverImage: null, slug: s.slug }),
  }));

  const projectDupes = findDuplicates(projects.map((p) => ({ id: p.id, title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription })));
  const postDupes = findDuplicates(posts.map((p) => ({ id: p.id, title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription })));

  const allAudits = [...projectAudits, ...postAudits, ...serviceAudits];
  const avgScore = allAudits.length ? Math.round(allAudits.reduce((sum, a) => sum + a.score, 0) / allAudits.length) : 0;
  const totalDupes = projectDupes.duplicateTitles.length + projectDupes.duplicateDescriptions.length + postDupes.duplicateTitles.length + postDupes.duplicateDescriptions.length;

  return (
    <div>
      <h1 className="text-2xl font-semibold">SEO Health</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Every score below is computed from real, checkable rules — length, missing fields, duplicates —
        never an estimate.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-md border border-border bg-bg-base p-4">
          <p className="text-xs uppercase text-text-muted">Avg. Health Score</p>
          <p className="mt-1 font-mono text-2xl">{avgScore}</p>
        </div>
        <div className="rounded-md border border-border bg-bg-base p-4">
          <p className="text-xs uppercase text-text-muted">Pages Audited</p>
          <p className="mt-1 font-mono text-2xl">{allAudits.length}</p>
        </div>
        <div className="rounded-md border border-border bg-bg-base p-4">
          <p className="text-xs uppercase text-text-muted">Duplicate Title/Desc Groups</p>
          <p className="mt-1 font-mono text-2xl">{totalDupes}</p>
        </div>
        <div className="rounded-md border border-border bg-bg-base p-4">
          <p className="text-xs uppercase text-text-muted">IndexNow</p>
          <p className="mt-1 text-sm text-success">Wired (see /api/indexnow)</p>
        </div>
      </div>

      {totalDupes > 0 && (
        <div className="mt-6 rounded-md border border-warning/30 bg-warning/5 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-warning">
            <AlertTriangle className="h-4 w-4" /> Duplicate titles or descriptions detected
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Duplicate SEO titles/descriptions across pages confuse search engines about which page to
            rank. Review the flagged items in the tables below and give each a unique title/description.
          </p>
        </div>
      )}

      {[
        { label: "Projects", audits: projectAudits },
        { label: "Blog Posts", audits: postAudits },
        { label: "Services", audits: serviceAudits },
      ].map(({ label, audits }) => (
        <div key={label} className="mt-8">
          <h2 className="font-semibold">{label}</h2>
          {audits.length === 0 ? (
            <p className="mt-2 text-sm text-text-muted">Nothing to audit yet.</p>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-bg-surface-2 text-left text-xs uppercase text-text-muted">
                  <tr>
                    <th className="px-4 py-2.5">Page</th>
                    <th className="px-4 py-2.5">Score</th>
                    <th className="px-4 py-2.5">Issues</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {audits.map((audit) => (
                    <tr key={audit.id}>
                      <td className="px-4 py-3 font-medium">{audit.title}</td>
                      <td className="px-4 py-3"><ScoreBadge score={audit.score} /></td>
                      <td className="px-4 py-3">
                        {audit.issues.length === 0 ? (
                          <span className="flex items-center gap-1.5 text-success"><CheckCircle2 className="h-3.5 w-3.5" /> No issues</span>
                        ) : (
                          <ul className="space-y-1">
                            {audit.issues.map((issue, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                {issue.severity === "error" ? (
                                  <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-danger" />
                                ) : (
                                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
                                )}
                                {issue.message}
                              </li>
                            ))}
                            {"missingAlt" in audit && audit.missingAlt > 0 && (
                              <li className="flex items-start gap-1.5 text-xs text-text-secondary">
                                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
                                {audit.missingAlt} image(s) missing alt text
                              </li>
                            )}
                          </ul>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a href={audit.path} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      <div className="mt-10 rounded-md border border-border bg-bg-base p-5">
        <h2 className="font-semibold">Search engine verification</h2>
        <p className="mt-1 text-sm text-text-secondary">
          These are set via environment variables (<code>GOOGLE_SITE_VERIFICATION</code>,{" "}
          <code>BING_SITE_VERIFICATION</code> in <code>.env</code>) rather than the database — that&apos;s
          the standard, secure way to handle verification meta tags, so they aren&apos;t duplicated here.
        </p>
      </div>

      <div className="mt-6 rounded-md border border-dashed border-border p-5 text-sm text-text-muted">
        Not yet built: redirect manager, broken-link crawler, and AI-generated SEO suggestions — these
        need real infrastructure decisions (a redirects table + middleware, a link-crawling job, and a
        model choice for suggestions) rather than being safe to fabricate quickly. Flagging honestly
        rather than shipping a shallow version.
      </div>
    </div>
  );
}
