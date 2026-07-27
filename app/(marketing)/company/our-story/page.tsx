import { OurStoryContent } from "@/components/sections/company/OurStoryContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("ourStory");
}

export default function OurStoryPage() {
  return <OurStoryContent />;
}
