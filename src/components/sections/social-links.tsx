import { Github, Linkedin, Mail, MessageCircle, Briefcase, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const links = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github, color: "hover:text-[#333]" },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin, color: "hover:text-[#0A66C2]" },
  { href: siteConfig.links.fiverr, label: "Fiverr", icon: Briefcase, color: "hover:text-[#1DBF73]" },
  { href: siteConfig.links.whatsapp, label: "WhatsApp", icon: MessageCircle, color: "hover:text-[#25D366]" },
  { href: `mailto:${siteConfig.links.email}`, label: "Email", icon: Mail, color: "hover:text-[#EA4335]" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex items-center gap-2.5"}>
      {links.map(({ href, label, icon: Icon, color }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className={`
            group relative flex h-10 w-10 items-center justify-center rounded-full 
            border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/90 to-bg-surface-1/70 
            backdrop-blur-sm text-text-muted/50 
            transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5
            ${color}
          `}
          style={{ boxShadow: panelShadow }}
        >
          {/* hover gradient */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
          />

          <Icon className="h-4 w-4 transition-colors duration-300 group-hover:scale-110" strokeWidth={1.75} />

          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] font-mono uppercase tracking-wider text-text-muted/40 whitespace-nowrap pointer-events-none">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}