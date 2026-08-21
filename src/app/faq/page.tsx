import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { FaqContent } from "@/components/sections/faq/faq-content";
import { FAQ_DATA } from "@/config/faq";

export const metadata: Metadata = generatePageMetadata({
  title: "Frequently Asked Questions - Abdul Qayyum",
  description:
    "Find answers to commonly asked questions about Abdul Qayyum's services, process, expertise, and how to get started with your project.",
  path: "/faq",
  keywords: "faq, frequently asked questions, abdul qayyum, services, process, development, web development, ai development",
});

export default function FaqPage() {
  // ── Get all questions for JSON-LD ──
  const allQuestions = FAQ_DATA.categories.flatMap((category) =>
    category.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    }))
  );

  return (
    <>
      {/* ── JSON-LD Schema ── */}
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <WebPageJsonLd
        title="Frequently Asked Questions - Abdul Qayyum"
        description="Find answers to commonly asked questions about Abdul Qayyum's services, process, expertise, and how to get started with your project."
        path="/faq"
      />

      {/* ── Main Content ── */}
      <FaqContent />
    </>
  );
}