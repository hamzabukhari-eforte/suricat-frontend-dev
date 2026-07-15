import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingComparison } from "@/components/sections/pricing/PricingComparison";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { PricingTiers } from "@/components/sections/pricing/PricingTiers";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pricingFaqTeaser } from "@/lib/pricing/faq";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.pricing;

export default function PricingPage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            <span>The Scope Lives in the Documentation.</span>
            <br className="hidden sm:block" />
            <span className="text-teal">Not the Seat Count.</span>
          </>
        }
        subtitle={
          <>
            <p>
              Compliance complexity is reflected in documentation, not headcount.
              Every Suricat subscription combines an Annual Platform License with a
              defined Document Capacity, allowing Quality and Regulatory teams to
              collaborate without per-seat licensing constraints.
            </p>
            <p className="lg:text-[20px]">
              Documents may be evaluated across all six Compliance Intelligence
              solutions without additional consumption charges.
            </p>
          </>
        }
        cta={{ label: "Explore more", href: "/get-started" }}
        subtitleColorClass="text-white/80"
      >
        <p className="text-white/80 text-base sm:text-lg lg:text-[14px] font-normal !leading-[32px] max-w-5xl mx-auto animate-fade-up-3 mb-3">
          Not ready to upload your own documentation?
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-up-3">
          {[
            "Published Annual Pricing",
            "Twelve-Month Terms",
            "No Per-Seat Fees",
          ].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </PricingHero>
      <PricingTiers />
      <PricingComparison />
      <PricingFaq
        items={pricingFaqTeaser}
        viewAllHref="/pricing/faq"
        viewAllLabel="View All"
      />
      <CtaBand />
    </>
  );
}
