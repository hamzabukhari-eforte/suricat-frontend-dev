import { ComingSoonContent } from "@/components/sections/coming-soon/ComingSoonContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Coming Soon",
  description:
    "Suricat is preparing to launch. The Compliance Intelligence Platform for highly regulated industries.",
  path: "/coming-soon",
});

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
