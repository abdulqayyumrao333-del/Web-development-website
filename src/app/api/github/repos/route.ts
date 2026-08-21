import { NextResponse } from "next/server";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "abdulqayyumrao333-del";

export type RepoSummary = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  sizeKb: number;
  license: string | null;
  updatedAt: string;
  isPinned: boolean;
};

async function getPinnedRepoNames(headers: Record<string, string>): Promise<Set<string>> {
  if (!process.env.GITHUB_TOKEN) return new Set();
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes { ... on Repository { name } }
            }
          }
        }`,
        variables: { login: USERNAME },
      }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const names = json?.data?.user?.pinnedItems?.nodes?.map((n: { name: string }) => n.name) ?? [];
    return new Set(names);
  } catch {
    return new Set();
  }
}

export async function GET() {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [reposRes, pinnedNames] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
      getPinnedRepoNames(headers),
    ]);

    if (!reposRes.ok) throw new Error(`GitHub API responded ${reposRes.status}`);
    const repos = await reposRes.json();

    const summaries: RepoSummary[] = repos
      .filter((r: { fork: boolean; archived: boolean }) => !r.fork && !r.archived) // exclude forks and archived — only active original work
      .map((r: {
        name: string; description: string | null; html_url: string; homepage: string | null;
        language: string | null; topics: string[]; stargazers_count: number; forks_count: number;
        open_issues_count: number; size: number; license: { name: string } | null; updated_at: string;
      }) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        topics: r.topics ?? [],
        stars: r.stargazers_count,
        forks: r.forks_count,
        openIssues: r.open_issues_count,
        sizeKb: r.size,
        license: r.license?.name ?? null,
        updatedAt: r.updated_at,
        isPinned: pinnedNames.has(r.name),
      }));

    summaries.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json({ repos: summaries, total: summaries.length });
  } catch (error) {
    console.warn("[github-repos] Failed to fetch repository list:", error);
    return NextResponse.json({ error: "Repository data is temporarily unavailable." }, { status: 503 });
  }
}
