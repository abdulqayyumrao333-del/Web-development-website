import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { UpdateNotification } from "@/components/pwa/update-notification";
import { TerminalLauncher } from "@/components/features/terminal/terminal-launcher";
import { ChatWidget } from "@/components/features/ai-assistant/chat-widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: "/icons/aq-icon-light.svg",
    shortcut: "/icons/aq-icon-light.svg",
    apple: "/icons/aq-icon-dark.svg",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent-indigo focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <PersonJsonLd />
          <WebsiteJsonLd />
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="pt-24">{children}</main>
          <Footer />
          <BackToTop />
          <TerminalLauncher />
          <ChatWidget />
          <InstallPrompt />
          <UpdateNotification />
          <RegisterServiceWorker />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
