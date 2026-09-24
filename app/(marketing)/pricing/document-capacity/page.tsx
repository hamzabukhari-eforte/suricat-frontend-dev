import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { DocumentCapacityContent } from "@/components/sections/pricing/DocumentCapacityContent";
import { PricingSubpageLayout } from "@/components/sections/pricing/PricingSubpageLayout";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("documentCapacity");
}

export default function DocumentCapacityPage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingSubpageLayout page="documentCapacity">
        <DocumentCapacityContent />
      </PricingSubpageLayout>
      <CtaBand />
    </>
  );
}
