import { CtaBand } from "@/components/sections/CtaBand";
import {
  AlignmentGapSection,
  ChangeImpactSection,
  ComplianceCostSection,
  ExistingSystemsSection,
  HeroSection,
  PractitionersSection,
  RegulatedEnvironmentsSection,
  WhySuricatSection,
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
      <AlignmentGapSection />
      <ChangeImpactSection />
      <ExistingSystemsSection />
      <PractitionersSection />
      <RegulatedEnvironmentsSection />
      <WhySuricatSection />
      <CtaBand />
    </>
  );
}
