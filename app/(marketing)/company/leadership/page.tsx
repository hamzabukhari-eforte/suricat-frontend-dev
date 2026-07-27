import { LeadershipContent } from "@/components/sections/company/LeadershipContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("leadership");
}

export default function LeadershipPage() {
  return <LeadershipContent />;
}
