import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { TermsContent } from "@/components/sections/terms/terms-content";

const PAGE_TITLE = "Terms & Conditions";
const PAGE_DESCRIPTION =
  "Read the terms and conditions for Abdul Qayyum's portfolio website. Understand the legal terms governing the use of this website.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/terms" />
      <TermsContent />
    </>
  );
}