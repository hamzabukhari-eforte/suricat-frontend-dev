import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";

const EXPANSION_ROWS = [
  { range: "100 – 500", price: "$10 per Document" },
  { range: "501 – 1,000", price: "$9 per Document" },
  { range: "1,001 – 2,500", price: "$8 per Document" },
  { range: "2,501 – 5,000", price: "$7 per Document" },
  { range: "5,000+", price: "Contact Us" },
];

export function CapacityExpansionContent() {
  return (
    <>
      <section className="pt-8 px-4 sm:px-6 bg-surface-muted">
        <div className="max-w-5xl mx-auto">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            Expansion Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
            How Expansion Pricing Works
          </h2>
          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy mb-8 max-w-4xl">
            Expansion Document Capacity is billed annually at the time of
            expansion. The rate applied is determined by the total number of
            additional documents being added in a single expansion request.
          </p>
          <div className="overflow-x-auto rounded-[4px] border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm sm:text-base min-w-[320px]">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-4 sm:px-6 py-4 text-left font-bold uppercase tracking-wider text-xs sm:text-sm">
                    Additional Documents
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left font-bold uppercase tracking-wider text-xs sm:text-sm">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {EXPANSION_ROWS.map((row, i) => (
                  <tr
                    key={row.range}
                    className={
                      i < EXPANSION_ROWS.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <td className="px-4 sm:px-6 py-4 text-navy font-semibold">
                      {row.range}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-navy">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PricingInfoGrid
        muted={false}
        eyebrow="How It Works"
        title="Expand capacity on your terms — without changing tiers."
        cards={[
          {
            title: "No Tier Change Required",
            body: "Expanding Document Capacity does not require moving to a higher subscription tier. Your existing subscription, users, and workflows remain unchanged.",
          },
          {
            title: "Billed Annually",
            body: "Expansion Capacity is added for the remainder of your active subscription term and billed at the time of expansion.",
          },
          {
            title: "Available at Any Time",
            body: "Document Capacity may be expanded at any point during your subscription term as your documentation environment grows.",
          },
          {
            title: "Enterprise Rollover",
            body: "Enterprise subscriptions include Document Capacity Rollover — up to 25% of unused annual capacity carries forward into the first 90 days of your renewal term.",
          },
        ]}
      />

      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow="Expansion Without Disruption."
            body="Document Capacity expansion is designed to grow with your compliance program — not to force a tier upgrade or renegotiation of your subscription terms. Expansion pricing decreases as volume increases. The more capacity added, the lower the per-document rate. For expansions exceeding 5,000 additional documents, custom pricing is available. Contact Suricat to discuss your requirements."
          />
          <PricingBottomCta
            href="/pricing#subscription-options"
            label="View Subscription Options"
            note="See included Document Capacity at each subscription tier, from Evaluate through Enterprise."
          />
        </div>
      </section>
    </>
  );
}
