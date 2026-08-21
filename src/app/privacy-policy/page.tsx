import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { PrivacyContent } from "@/components/sections/privacy/privacy-content";

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION =
  "Read Abdul Qayyum's privacy policy to understand how your personal data is collected, used, and protected when you visit this website.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/privacy" />
      <PrivacyContent />
    </>
  );
}