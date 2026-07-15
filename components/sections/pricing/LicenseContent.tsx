import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";

export function LicenseContent() {
  return (
    <>
      <PricingInfoGrid
        muted={false}
        eyebrow="What the Platform License Provides"
        title="Everything you need to maintain compliance, streamline operations, and stay audit-ready."
        cards={[
          {
            title: "Compliance Intelligence Layer",
            body: "Access to all six Compliance Intelligence solutions that help Quality and Regulatory teams evaluate documentation alignment, understand change impact, strengthen inspection readiness, and maintain confidence in compliance-critical documentation.",
          },
          {
            title: "Continuous Evaluation & Monitoring",
            body: "Continuously evaluates your documentation as it evolves. Findings, evidence relationships, and analysis history are maintained and updated throughout your subscription term.",
          },
          {
            title: "Secure SaaS Environment",
            body: "Hosted on Microsoft Azure. Trusted by leading Life Sciences organizations. Your documentation is isolated, protected, and accessible only to your organization.",
          },
          {
            title: "Platform Operations & Support",
            body: "Includes platform administration, software maintenance, platform updates, security monitoring, and support services based on your subscription tier.",
          },
        ]}
      />
      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow="One Platform License. One Annual Fee."
            body="A single annual subscription fee. The Platform License does not increase based on the number of findings generated, analyses performed, monitoring events detected, or evidence relationships evaluated."
            bullets={[
              "Document Capacity determines the volume of documentation maintained within the platform.",
              "The Annual Platform License provides access to the Compliance Intelligence Layer itself.",
            ]}
          />
          <PricingBottomCta
            href="/pricing"
            label="View Pricing & Start Your Evaluation"
            note="Explore subscription options, document capacity, support levels, and begin a free 90-day evaluation."
            noteClassName="text-sm"
          />
        </div>
      </section>
    </>
  );
}
