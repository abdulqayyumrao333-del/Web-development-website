import type { Metadata } from "next";
import { Download } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd, ContactPageJsonLd } from "@/components/seo/json-ld";

import { ContactHero } from "@/components/sections/contact/contact-hero";
import { TimezoneWidget } from "@/components/sections/contact/timezone-widget";
import { AiAssistantCallout } from "@/components/sections/contact/ai-assistant-callout";
import { SmartContactForm } from "@/components/sections/contact/smart-contact-form";
import { ContactMethods } from "@/components/sections/contact/contact-methods";
import { WorldMap } from "@/components/features/world-map";
import { WhatsNextTimeline } from "@/components/sections/contact/whats-next-timeline";
import { ServicesQuickLinks } from "@/components/sections/contact/services-quick-links";
import { SearchableFaq } from "@/components/sections/searchable-faq";
import { ContactFinalCta } from "@/components/sections/contact/contact-final-cta";
import { Reveal } from "@/components/sections/reveal";

const PAGE_TITLE = "Contact";
const PAGE_DESCRIPTION =
  "Contact Abdul Qayyum — Full Stack Developer & AI Developer — for freelance projects, collaborations, or technical questions.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/contact" />
      <ContactPageJsonLd />

      <ContactHero />

      {/* ── Premium Background Section ── */}
      <section className="relative mx-auto max-w-6xl px-6">

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
            className="absolute inset-x-0 top-0 h-[380px]"
            style={{
              background:
                "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Timezone Widget ── */}
        <div className="py-4">
          <Reveal className="mx-auto max-w-xs">
            <TimezoneWidget />
          </Reveal>
        </div>

        {/* ── Contact Methods ── */}
        <ContactMethods />

        {/* ── Download vCard ── */}
        <div className="py-4 sm:py-6">
          <Reveal className="text-center">
            <a href="/api/vcard" download>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/30">
                <Download className="h-4 w-4" strokeWidth={1.75} />
                Save Contact (vCard)
              </button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── AI Assistant Callout ── */}
      <AiAssistantCallout />

      {/* ── Contact Form ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Full-bleed background */}
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
            className="absolute inset-x-0 top-0 h-[380px]"
            style={{
              background:
                "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-accent-indigo/60" />
                <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                  Send a Message
                </p>
              </div>
              <div className="relative mb-4">
                <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                  Let's
                  <br />
                  <span className="text-accent-indigo">talk</span>
                </h2>
              </div>
              <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
                The more detail you share, the faster a useful reply can come back.
              </p>
            </div>
          </Reveal>

          {/* Right - Form */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
              />
              <SmartContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── World Map Section ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Full-bleed background */}
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
            className="absolute inset-x-0 top-0 h-[380px]"
            style={{
              background:
                "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-accent-indigo/60" />
                <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                  Collaborations
                </p>
              </div>
              <div className="relative mb-4">
                <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                  Where work
                  <br />
                  <span className="text-accent-indigo">has happened</span>
                </h2>
              </div>
              <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
                Global collaborations with clients and partners from around the world.
              </p>
            </div>
          </Reveal>

          {/* Right - World Map */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
              />
              <WorldMap />
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsNextTimeline />
      <ServicesQuickLinks />
      <SearchableFaq eyebrow="FAQ" title="Before you reach out" />
      <ContactFinalCta />
    </>
  );
}