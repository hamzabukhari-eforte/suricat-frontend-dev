import { DesignPartnerApplyContent } from "@/components/sections/design-partners/DesignPartnerApplyContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.designPartnersApply;

export default function DesignPartnerApplyPage() {
  return <DesignPartnerApplyContent />;
}
