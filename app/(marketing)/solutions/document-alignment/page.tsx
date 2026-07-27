import { SolutionPageContent } from "@/components/sections/solutions/SolutionPageContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("documentAlignment");
}

export default function Page() {
  return <SolutionPageContent slug="document-alignment" />;
}
