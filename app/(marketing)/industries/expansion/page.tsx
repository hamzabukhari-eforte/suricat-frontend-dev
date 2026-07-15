import { IndustryExpansionContent } from "@/components/sections/industries/IndustryExpansionContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.industryExpansion;

export default function IndustryExpansionPage() {
  return <IndustryExpansionContent />;
}
