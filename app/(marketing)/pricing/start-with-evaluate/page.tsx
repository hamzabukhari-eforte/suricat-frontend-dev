import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { StartWithEvaluateContent } from "@/components/sections/pricing/StartWithEvaluateContent";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.startWithEvaluate;

export default function StartWithEvaluatePage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            Validate Suricat Using Your Own{" "}
            <span className="text-teal">
              Documentation Before Making a Purchasing Decision.
            </span>
          </>
        }
        subtitle={
          <p>
            The Evaluate subscription is designed to help Quality and Regulatory
            teams determine whether Suricat can support their documentation
            environment, compliance processes, and inspection readiness
            objectives before committing to a broader deployment.
          </p>
        }
        cta={{
          label: "View Pricing & Start Your Evaluation",
          href: "/pricing",
        }}
      />
      <StartWithEvaluateContent />
      <CtaBand />
    </>
  );
}
