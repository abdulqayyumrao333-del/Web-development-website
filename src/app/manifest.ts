import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "AQ",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    icons: [
      { src: "/icons/aq-icon-dark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/aq-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/aq-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Projects", url: "/projects", description: "View selected projects" },
      { name: "Resume", url: "/resume", description: "View interactive resume" },
      { name: "Contact", url: "/contact", description: "Get in touch" },
    ],
  };
}
