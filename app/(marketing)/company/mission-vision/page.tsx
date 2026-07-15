import { MissionVisionContent } from "@/components/sections/company/MissionVisionContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.missionVision;

export default function MissionVisionPage() {
  return <MissionVisionContent />;
}
