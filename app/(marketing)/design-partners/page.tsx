import { DesignPartnersContent } from "@/components/sections/design-partners/DesignPartnersContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("designPartners");
}

export default function DesignPartnersPage() {
  return <DesignPartnersContent />;
}
