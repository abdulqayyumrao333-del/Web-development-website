import Link from "next/link";
import { FolderGit2, FileText, Layers, Briefcase, Mail, Github, Database, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";

export const metadata = { title: "Dashboard" };

async function getOverview() {
  try {
    const [
      totalProjects, draftProjects,
      publishedPosts, draftPosts,
      skillCount, serviceCount,
      newMessages, totalMessages,
      recentMessages,
    ] = await Promise.all([
      db.project.count({ where: { visible: true } }),
      db.project.count({ where: { visible: false } }),
      db.blogPost.count({ where: publishedPostWhere }),
      db.blogPost.count({ where: { status: "DRAFT" } }),
      db.skill.count(),
      db.service.count(),
      db.contactSubmission.count({ where: { status: "NEW" } }),
      db.contactSubmission.count(),
      db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);
    return {
      dbConnected: true,
      totalProjects, draftProjects, publishedPosts, draftPosts,
      skillCount, serviceCount, newMessages, totalMessages, recentMessages,
    };
  } catch {
    return {
      dbConnected: false,
      totalProjects: 0, draftProjects: 0, publishedPosts: 0, draftPosts: 0,
      skillCount: 0, serviceCount: 0, newMessages: 0, totalMessages: 0,
      recentMessages: [] as Awaited<ReturnType<typeof db.contactSubmission.findMany>>,
    };
  }
}

const QUICK_ACTIONS = [
  { href: "/admin/projects", label: "Manage Projects" },
  { href: "/admin/blogs", label: "Manage Blog Posts" },
  { href: "/admin/messages", label: "View Messages" },
  { href: "/admin/seo", label: "Check SEO Health" },
];

export default async function AdminDashboardPage() {
  const data = await getOverview();

  const stats = [
    { icon: FolderGit2, label: "Published Projects", value: data.totalProjects },
    { icon: FolderGit2, label: "Draft Projects", value: data.draftProjects },
    { icon: FileText, label: "Published Posts", value: data.publishedPosts },
    { icon: FileText, label: "Draft Posts", value: data.draftPosts },
    { icon: Layers, label: "Skills", value: data.skillCount },
    { icon: Briefcase, label: "Services", value: data.serviceCount },
    { icon: Mail, label: "New Messages", value: data.newMessages },
    { icon: Mail, label: "Total Messages", value: data.totalMessages },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-text-secondary">Overview of the whole portfolio.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-bg-base px-3 py-1.5 text-xs">
          <Database className={`h-3.5 w-3.5 ${data.dbConnected ? "text-success" : "text-danger"}`} />
          {data.dbConnected ? "Database connected" : "Database unavailable"}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-md border border-border bg-bg-base p-4">
            <Icon className="h-4 w-4 text-accent-indigo" />
            <p className="mt-2 font-mono text-2xl">{value}</p>
            <p className="mt-1 text-xs text-text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-md border border-border bg-bg-base p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-accent-indigo hover:underline">View all</Link>
          </div>
          {data.recentMessages.length === 0 ? (
            <p className="mt-4 text-sm text-text-secondary">No messages yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {data.recentMessages.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-text-muted">{m.email} · {m.subject || "No subject"}</p>
                  </div>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">{m.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-md border border-border bg-bg-base p-5">
          <h2 className="font-semibold">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between rounded-sm border border-border px-3 py-2 text-sm hover:border-border-hover"
              >
                {action.label} <ExternalLink className="h-3.5 w-3.5 text-text-muted" />
              </Link>
            ))}
          </div>

          <h2 className="mt-6 font-semibold">GitHub Sync</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
            <Github className="h-4 w-4" /> Live-synced on every page view — no manual sync needed.
          </p>
        </div>
      </div>
    </div>
  );
}
