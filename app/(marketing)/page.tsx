import { CtaBand } from "@/components/sections/CtaBand";
import {
  ComplianceCostSection,
  HeroSection,
  IndustriesSection,
  PlatformIntelligenceSection,
  PricingComparisonSection,
  PricingPlansSection,
  SolutionsSection,
  WhySuricatSection,
} from "@/components/sections/home";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.home;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ComplianceCostSection />
      <WhySuricatSection />
      <PlatformIntelligenceSection />
      <SolutionsSection />
      <IndustriesSection />
      <PricingPlansSection />
      <PricingComparisonSection />
      <CtaBand />
    </>
  );
}
