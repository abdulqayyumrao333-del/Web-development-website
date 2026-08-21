import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mainNav, footerNav } from "@/config/nav";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { Github, Linkedin, Mail, MessageCircle, Briefcase, Sparkles, Heart, Code2 } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function Footer() {
  return (
    <footer className="relative border-t border-accent-indigo/8 bg-gradient-to-b from-bg-surface-1 to-bg-surface-1/80">
      
      {/* ── Full-bleed background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[300px]"
          style={{
            background:
              "radial-gradient(40% 60% at 50% 0%, rgba(79,70,229,0.04) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-sm text-text-secondary">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          
          {/* ── Brand ── */}
          <div>
            <p className="font-semibold text-text-primary">Abdul Qayyum</p>
            <p className="mt-2 max-w-xs text-text-secondary/80 leading-relaxed">{siteConfig.description}</p>
            
            {/* Signature */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-8 bg-accent-indigo/20" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted/30">
                Built with
              </span>
              <Heart className="h-3 w-3 text-rose-500/40" strokeWidth={1.5} />
              <Code2 className="h-3 w-3 text-accent-indigo/30" strokeWidth={1.5} />
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted/20">
                by AQ
              </span>
              <div className="h-px w-8 bg-accent-indigo/20" />
            </div>
          </div>

          {/* ── Navigate ── */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">Navigate</p>
            <ul className="mt-3 space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect ── */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">Connect</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                  <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.links.fiverr} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                  <Briefcase className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Fiverr
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-2 text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Email
                </a>
              </li>
              <li>
                <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary/70 hover:text-accent-indigo transition-colors duration-300 text-sm">
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* ── Stay Updated ── */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">Stay Updated</p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-accent-indigo/8 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-text-muted/40">
            &copy; {new Date().getFullYear()} Abdul Qayyum. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            {footerNav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-xs text-text-muted/40 hover:text-accent-indigo transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Signature with heart */}
            <div className="flex items-center gap-2 ml-2">
              <span className="h-px w-4 bg-accent-indigo/10" />
              <span className="text-[8px] font-mono uppercase tracking-wider text-text-muted/20">
                Built with ❤️ by Abdul Qayyum
              </span>
              <span className="h-px w-4 bg-accent-indigo/10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}