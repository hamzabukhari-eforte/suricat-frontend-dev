import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { CapacityExpansionContent } from "@/components/sections/pricing/CapacityExpansionContent";
import { PricingSubpageLayout } from "@/components/sections/pricing/PricingSubpageLayout";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("capacityExpansion");
}

export default function CapacityExpansionPage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingSubpageLayout page="capacityExpansion">
        <CapacityExpansionContent />
      </PricingSubpageLayout>
      <CtaBand />
    </>
  );
}
