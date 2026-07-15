import { SolutionPageContent } from "@/components/sections/solutions/SolutionPageContent";
import { solutionPages } from "@/lib/content/solutions";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.inspectionFindings;

export default function Page() {
  return <SolutionPageContent data={solutionPages["inspection-findings"]} />;
}
