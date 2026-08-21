import type { Metadata } from "next";
import { db } from "@/lib/db";
import { generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd, ServiceListJsonLd } from "@/components/seo/json-ld";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { WhoIWorkWith, WhyWorkWithMeBento } from "@/components/sections/services/services-audience-strengths";
import { IndustriesSection } from "@/components/sections/services/industries-section";
import { ServicesProcess } from "@/components/sections/services/services-process";
import { TechEcosystem } from "@/components/sections/about/tech-ecosystem";
import { TechComparison } from "@/components/sections/services/tech-comparison";
import { ServiceComparisonTable } from "@/components/sections/services/service-comparison-table";
import { SolutionFinder } from "@/components/sections/services/solution-finder";
import { ProjectEstimator } from "@/components/sections/services/project-estimator";
import { PricingPhilosophy } from "@/components/sections/services/pricing-philosophy";
import { SuccessMetrics } from "@/components/sections/services/success-metrics";
import { ServicesFaq } from "@/components/sections/services/services-faq";
import { ServicesFinalCta } from "@/components/sections/services/services-final-cta";

const PAGE_TITLE = "Services";
const PAGE_DESCRIPTION =
  "Services offered by Abdul Qayyum — full stack development, AI-powered applications, and workflow automation, built with production-grade engineering practice.";

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/services",
});

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof db.service.findMany>> = [];
  try {
    services = await db.service.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    services = [];
  }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <WebPageJsonLd title={PAGE_TITLE} description={PAGE_DESCRIPTION} path="/services" />
      <ServiceListJsonLd services={services} />

      <ServicesHero />
      <ServicesGrid />
      <WhoIWorkWith />
      <IndustriesSection />
      <ServicesProcess />
      <TechEcosystem />
      <TechComparison />
      <WhyWorkWithMeBento />
      <ServiceComparisonTable />
      <SolutionFinder />
      <ProjectEstimator />
      <PricingPhilosophy />

      <SectionErrorBoundary label="Success metrics">
        <SuccessMetrics />
      </SectionErrorBoundary>

      <ServicesFaq />
      <ServicesFinalCta />
    </>
  );
}
