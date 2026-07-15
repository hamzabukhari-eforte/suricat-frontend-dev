import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { CapacityExpansionContent } from "@/components/sections/pricing/CapacityExpansionContent";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.capacityExpansion;

export default function CapacityExpansionPage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            Capacity Grows With Your Documentation.{" "}
            <span className="text-teal">Pricing Scales Accordingly.</span>
          </>
        }
        subtitle={
          <p>
            Document Capacity expansion is designed to support growth without
            requiring subscription tier changes, contract renegotiation, or
            workflow disruption. Capacity may be expanded at any time during
            your subscription term as your documentation environment evolves.
          </p>
        }
        cta={{
          label: "View Pricing & Start Your Evaluation",
          href: "/pricing",
        }}
      />
      <CapacityExpansionContent />
      <CtaBand />
    </>
  );
}
