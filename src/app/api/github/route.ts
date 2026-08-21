import { NextResponse } from "next/server";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "abdulqayyumrao333-del";

type GithubDashboardData = {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  featuredRepos: {
    name: string;
    description: string | null;
    stars: number;
    url: string;
    language: string | null;
  }[];
  contributionsLastYear: number | null; // null if GITHUB_TOKEN isn't configured
};

export async function GET() {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API responded ${profileRes.status}/${reposRes.status}`);
    }

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0);

    const languageCounts = new Map<string, number>();
    for (const r of repos) {
      if (r.language) languageCounts.set(r.language, (languageCounts.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...languageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    const featuredRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        url: r.html_url,
        language: r.language,
      }));

    let contributionsLastYear: number | null = null;
    if (process.env.GITHUB_TOKEN) {
      try {
        const gqlRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query($login: String!) {
              user(login: $login) {
                contributionsCollection {
                  contributionCalendar { totalContributions }
                }
              }
            }`,
            variables: { login: USERNAME },
          }),
          next: { revalidate: 3600 },
        });
        const gqlJson = await gqlRes.json();
        contributionsLastYear = gqlJson?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
      } catch {
        contributionsLastYear = null; // graph just won't render; rest of the dashboard still works
      }
    }

    const data: GithubDashboardData = {
      username: USERNAME,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars,
      topLanguages,
      featuredRepos,
      contributionsLastYear,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.warn("[github-dashboard] Failed to fetch GitHub data:", error);
    return NextResponse.json({ error: "GitHub data is temporarily unavailable." }, { status: 503 });
  }
}
