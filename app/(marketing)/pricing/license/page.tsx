import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { LicenseContent } from "@/components/sections/pricing/LicenseContent";
import { PricingSubpageLayout } from "@/components/sections/pricing/PricingSubpageLayout";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("license");
}

export default function LicensePage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingSubpageLayout page="license">
        <LicenseContent />
      </PricingSubpageLayout>
      <CtaBand />
    </>
  );
}
