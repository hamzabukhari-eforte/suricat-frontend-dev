import {
  PricingBottomCta,
  PricingCallout,
  PricingInfoGrid,
} from "@/components/sections/pricing/PricingSubpageBlocks";

export function StartWithEvaluateContent() {
  return (
    <>
      <PricingInfoGrid
        eyebrow="What the Evaluate Subscription Includes"
        title="A focused 90-day evaluation using your own documentation."
        cards={[
          {
            title: "Real Documentation Evaluation",
            body: "Use your own compliance-critical documentation to evaluate how Suricat identifies relationships, analyzes alignment, and supports inspection readiness activities.",
          },
          {
            title: "All Six Compliance Intelligence Solutions",
            body: "Access all six Compliance Intelligence solutions available within the Compliance Intelligence Layer during the evaluation period.",
          },
          {
            title: "Focused Scope",
            body: "Evaluate a single product family using up to 100 active documents and one named user to determine organizational fit and potential value.",
          },
          {
            title: "Guided Onboarding",
            body: "Guided onboarding resources help your team become familiar with the Compliance Intelligence Layer and understand how findings, evidence relationships, and documentation analysis are presented.",
          },
        ]}
      />
      <section className="pt-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingCallout
            eyebrow="Validate Before You Expand."
            body="The Evaluate subscription is designed to answer the most important question before broader deployment: Will Suricat provide value within our documentation environment?"
            bullets={[
              "Use your own documentation.",
              "Evaluate all six Compliance Intelligence solutions.",
              "Confirm alignment findings and evidence relationships.",
              "Assess inspection readiness visibility.",
              "Determine organizational fit before expanding capacity.",
            ]}
          />
        </div>
      </section>
      <section className="pb-8 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <PricingBottomCta
            href="/pricing/interactive-sandbox"
            label="Explore the Interactive Sandbox"
            note="See how the Compliance Intelligence Layer works using representative Medical Device documentation before uploading your own."
            noteClassName="text-sm"
          />
        </div>
      </section>
    </>
  );
}
