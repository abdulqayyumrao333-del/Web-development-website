// Shared constant used by both a Server Component (admin/blogs/page.tsx,
// admin/blogs/trash/page.tsx) and a Client Component (blog-pagination.tsx).
// Deliberately NOT in blog-pagination.tsx (a "use client" file) — importing
// a plain value like this from a Server Component into a "use client"
// module wraps it in React's client-reference machinery meant for
// components, breaking normal array usage (e.g. .includes()) at runtime.
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
