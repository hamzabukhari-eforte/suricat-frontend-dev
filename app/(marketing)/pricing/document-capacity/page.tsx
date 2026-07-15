import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { DocumentCapacityContent } from "@/components/sections/pricing/DocumentCapacityContent";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.documentCapacity;

export default function DocumentCapacityPage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            Pricing Should Reflect Documentation{" "}
            <span className="text-teal">Scope. Not Software Consumption.</span>
          </>
        }
        subtitle={
          <p>
            Document Capacity represents the maximum number of active
            compliance-critical documents maintained within Suricat during your
            subscription term. Pricing is based on the scope of documentation
            being evaluated because compliance complexity is driven by
            procedures, risk files, CAPAs, investigations, and supporting
            evidence — not by the number of people who need visibility into them.
          </p>
        }
        cta={{
          label: "View Pricing & Start Your Evaluation",
          href: "/pricing",
        }}
      />
      <DocumentCapacityContent />
      <CtaBand />
    </>
  );
}
