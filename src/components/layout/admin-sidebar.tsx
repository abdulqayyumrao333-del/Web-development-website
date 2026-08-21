import Link from "next/link";
import { SignOutButton } from "@/components/layout/sign-out-button";
import { MapPin } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blog Posts" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/experience", label: "Experience" }, // ✅ Already here
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/seo", label: "SEO Health" },
  { href: "/admin/redirects", label: "Redirects" },
  { href: "/admin/ai-knowledge", label: "AI Knowledge Base" },
  { href: "/admin/hero", label: "Hero Section" },
  { href: "/admin/map-locations", label: "Map Locations" },
];

export function AdminSidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col justify-between border-r border-border bg-bg-base px-4 py-8">
      <div>
        <p className="px-2 font-semibold">Admin</p>
        <nav className="mt-6 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-2 py-2 text-sm text-text-secondary hover:bg-bg-surface hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border pt-4">
        <SignOutButton />
      </div>
    </aside>
  );
}