import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { InteractiveSandboxContent } from "@/components/sections/pricing/InteractiveSandboxContent";
import { PricingSubpageLayout } from "@/components/sections/pricing/PricingSubpageLayout";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("interactiveSandbox");
}

export default function InteractiveSandboxPage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingSubpageLayout page="interactiveSandbox">
        <InteractiveSandboxContent />
      </PricingSubpageLayout>
      <CtaBand />
    </>
  );
}
