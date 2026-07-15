import { LeadershipContent } from "@/components/sections/company/LeadershipContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.leadership;

export default function LeadershipPage() {
  return <LeadershipContent />;
}
