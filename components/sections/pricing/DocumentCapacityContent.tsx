import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";

export function DocumentCapacityContent() {
  return (
    <>
      <PricingInfoGrid
        eyebrow="What Document Capacity Includes"
        title="Documentation scope drives pricing — not headcount or consumption."
        cards={[
          {
            title: "Compliance Documentation",
            body: "Procedures, work instructions, policies, CAPAs, investigations, training records, quality records, and other documentation that supports your Quality Management System.",
          },
          {
            title: "Product & Design Documentation",
            body: "Design documentation, requirements, specifications, risk files, verification records, validation records, and supporting product documentation.",
          },
          {
            title: "Regulatory Evidence",
            body: "Documentation used to demonstrate compliance, maintain traceability, support inspections, and provide evidence across quality and regulatory processes.",
          },
          {
            title: "Capacity Expansion",
            body: "As new products, device programs, procedures, risk files, and supporting documentation are added, Document Capacity may be expanded without changing subscription tiers or disrupting existing workflows.",
          },
        ]}
      />
      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow="Documents. Not Consumption."
            body="Every active document may be evaluated across all six Compliance Intelligence solutions without additional consumption charges, analysis fees, monitoring fees, or AI usage costs. There are no charges based on findings generated, analyses performed, monitoring events detected, evidence relationships identified, or the number of times your teams use the platform. Pricing scales with documentation scope rather than credits, tokens, processing units, AI consumption metrics, or unpredictable usage-based pricing models."
            bullets={[
              "Quality and Regulatory teams manage documents, procedures, CAPAs, and risk files — not AI consumption metrics.",
              "Suricat pricing reflects that reality.",
            ]}
          />
          <PricingBottomCta
            href="/pricing"
            label="View Pricing & Start Your Evaluation"
            note="Explore subscription options and begin a free 90-day evaluation using your own documentation."
          />
        </div>
      </section>
    </>
  );
}
