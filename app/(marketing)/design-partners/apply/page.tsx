import { DesignPartnerApplyContent } from "@/components/sections/design-partners/DesignPartnerApplyContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("designPartnersApply");
}

export default function DesignPartnerApplyPage() {
  return <DesignPartnerApplyContent />;
}
