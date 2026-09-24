import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { PricingMainContent } from "@/components/sections/pricing/PricingMainContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("pricing");
}

export default function PricingPage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingMainContent />
    </>
  );
}
