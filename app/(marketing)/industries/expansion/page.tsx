import { IndustryExpansionContent } from "@/components/sections/industries/IndustryExpansionContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("industryExpansion");
}

export default function IndustryExpansionPage() {
  return <IndustryExpansionContent />;
}
