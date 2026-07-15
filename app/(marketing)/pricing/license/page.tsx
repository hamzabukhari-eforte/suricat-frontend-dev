import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { LicenseContent } from "@/components/sections/pricing/LicenseContent";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.license;

export default function LicensePage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            Every Suricat Subscription Begins With an{" "}
            <span className="text-teal">Annual Platform License.</span>
          </>
        }
        subtitle={
          <p>
            The Annual Platform License provides access to the Compliance
            Intelligence Layer and the operational capabilities required to
            evaluate, monitor, manage, and report on compliance-critical
            documentation throughout your subscription term.
          </p>
        }
        cta={{
          label: "View Pricing & Start Your Evaluation",
          href: "/pricing",
        }}
      />
      <LicenseContent />
      <CtaBand />
    </>
  );
}
