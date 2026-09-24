import { SolutionPageContent } from "@/components/sections/solutions/SolutionPageContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("inspectionReadiness");
}

export default function Page() {
  return <SolutionPageContent slug="inspection-readiness" />;
}
