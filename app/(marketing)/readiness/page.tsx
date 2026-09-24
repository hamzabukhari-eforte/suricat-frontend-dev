import { ReadinessContent } from "@/components/sections/forms/ReadinessContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("readiness");
}

export default function ReadinessPage() {
  return <ReadinessContent />;
}
