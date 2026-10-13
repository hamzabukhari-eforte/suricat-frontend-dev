import { PlatformPageContent } from "@/components/sections/platform/PlatformPageContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("platform");
}

export default function PlatformPage() {
  return <PlatformPageContent />;
}
