import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingSubpageLayout } from "@/components/sections/pricing/PricingSubpageLayout";
import { StartWithEvaluateContent } from "@/components/sections/pricing/StartWithEvaluateContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("startWithEvaluate");
}

export default function StartWithEvaluatePage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingSubpageLayout page="startWithEvaluate">
        <StartWithEvaluateContent />
      </PricingSubpageLayout>
      <CtaBand />
    </>
  );
}
