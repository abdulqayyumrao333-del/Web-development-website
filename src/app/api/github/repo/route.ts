import { NextResponse } from "next/server";

function parseOwnerRepo(url: string): { owner: string; repo: string } | null {
  try {
    const { pathname } = new URL(url);
    const [, owner, repo] = pathname.split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const parsed = parseOwnerRepo(url);
  if (!parsed) return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });

  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [repoRes, commitsRes, contributorsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits?per_page=1`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/contributors?per_page=100`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!repoRes.ok) throw new Error(`GitHub API responded ${repoRes.status}`);
    const repo = await repoRes.json();
    const commits = commitsRes.ok ? await commitsRes.json() : [];
    const contributors = contributorsRes.ok ? await contributorsRes.json() : [];

    return NextResponse.json({
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      license: repo.license?.name ?? null,
      language: repo.language,
      latestCommit: commits[0]
        ? { message: commits[0].commit.message.split("\n")[0], date: commits[0].commit.author.date, url: commits[0].html_url }
        : null,
      contributorCount: Array.isArray(contributors) ? contributors.length : null,
    });
  } catch (error) {
    console.warn("[github-repo]", error);
    return NextResponse.json({ error: "Repository data unavailable" }, { status: 503 });
  }
}
