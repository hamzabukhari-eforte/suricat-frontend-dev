import { MissionVisionContent } from "@/components/sections/company/MissionVisionContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("missionVision");
}

export default function MissionVisionPage() {
  return <MissionVisionContent />;
}
