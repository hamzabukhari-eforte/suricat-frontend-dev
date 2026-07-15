import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { InteractiveSandboxContent } from "@/components/sections/pricing/InteractiveSandboxContent";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.interactiveSandbox;

export default function InteractiveSandboxPage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            See How Compliance Intelligence Works on{" "}
            <span className="text-teal">
              Medical Device Documentation. No Setup Required.
            </span>
          </>
        }
        subtitle={
          <p>
            Explore all six Compliance Intelligence solutions using
            representative Medical Device documentation — without uploading a
            single document.
          </p>
        }
        cta={{
          label: "View Pricing & Start Your Evaluation",
          href: "/pricing",
        }}
      />
      <InteractiveSandboxContent />
      <CtaBand />
    </>
  );
}
