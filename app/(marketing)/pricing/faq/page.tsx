import { PricingStickySubnav } from "@/components/layout/PricingStickySubnav";
import { PricingFaqPageContent } from "@/components/sections/pricing/PricingFaqPageContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("pricingFaq");
}

export default function PricingFaqPage() {
  return (
    <>
      <PricingStickySubnav />
      <PricingFaqPageContent />
    </>
  );
}
