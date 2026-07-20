import { StickySubnav } from "@/components/layout/StickySubnav";
import { CtaBand } from "@/components/sections/CtaBand";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { pricingSubnavLinks } from "@/lib/navigation";
import { pricingFaqFull } from "@/lib/pricing/faq";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.pricingFaq;

export default function PricingFaqPage() {
  return (
    <>
      <StickySubnav links={pricingSubnavLinks} category="Pricing" navLabel="Pricing pages" />
      <PricingHero
        title={
          <>
            The Questions Most Asked Before{" "}
            <span className="text-teal">Starting an Evaluation.</span>
          </>
        }
        subtitle={
          <p>
            Answers to the most common questions about Suricat subscription
            terms, Document Capacity, evaluation access, and commercial
            commitments.
          </p>
        }
        cta={{ label: "View Pricing", href: "/pricing" }}
      />
      <PricingFaq
        items={pricingFaqFull}
        eyebrow="Pricing FAQs"
        title="Clear answers before you evaluate."
        description="Browse the full set of published pricing and evaluation questions."
      />
      <CtaBand />
    </>
  );
}
