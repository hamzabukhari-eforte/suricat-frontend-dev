import { OurStoryContent } from "@/components/sections/company/OurStoryContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.ourStory;

export default function OurStoryPage() {
  return <OurStoryContent />;
}
