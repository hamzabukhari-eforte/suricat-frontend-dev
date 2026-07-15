import { FormHero } from "@/components/sections/forms/FormHero";
import { GetStartedForm } from "@/components/sections/forms/GetStartedForm";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.getStarted;

export default function GetStartedPage() {
  return (
    <>
      <FormHero
        title={
          <>
            Start the <span className="text-teal">Conversation</span>
          </>
        }
        paragraphs={[
          "Share a little about your environment and priorities.",
          "Suricat will use your responses to prepare for a focused introductory discussion tailored to your organization.",
        ]}
        ctaLabel="Begin"
        ctaHref="#intake"
      />
      <GetStartedForm />
    </>
  );
}
