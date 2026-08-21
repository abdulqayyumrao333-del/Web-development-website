import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: { viewCount: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        technologies: true,
        viewCount: true,
        publishedAt: true,
        updatedAt: true,
        featured: true,
        level: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Trending API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}