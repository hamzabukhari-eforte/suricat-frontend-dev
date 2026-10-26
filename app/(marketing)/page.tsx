import { CtaBand } from "@/components/sections/CtaBand";
import {
  AlignmentGapSection,
  ComplianceCostSection,
  ExistingSystemsSection,
  HeroSection,
  RegulatedEnvironmentsSection,
  WhySuricatSection,
  WhyThisMattersNowSection,
} from "@/components/sections/home";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("home");
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ComplianceCostSection />
      <WhyThisMattersNowSection />
      <AlignmentGapSection />
      <ExistingSystemsSection />
      <RegulatedEnvironmentsSection />
      <WhySuricatSection />
      <CtaBand />
    </>
  );
}
