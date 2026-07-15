import { FormHero } from "@/components/sections/forms/FormHero";
import { ReadinessForm } from "@/components/sections/forms/ReadinessForm";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.readiness;

export default function ReadinessPage() {
  return (
    <>
      <FormHero
        eyebrow="FDA QMSR & ISO 13485 Inspection Readiness"
        title={
          <>
            Explore Your <span className="text-teal">Inspection Readiness</span>
          </>
        }
        paragraphs={[
          "Answer a few questions about your documentation environment, inspection timeline, and compliance priorities.",
          "Your responses help Suricat prepare for a focused readiness discussion tailored to your environment and priorities.",
        ]}
        ctaLabel="Begin Readiness Discussion"
        ctaHref="#intake"
      />
      <ReadinessForm />
    </>
  );
}
