import { GetStartedContent } from "@/components/sections/forms/GetStartedContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("getStarted");
}

export default function GetStartedPage() {
  return <GetStartedContent />;
}
