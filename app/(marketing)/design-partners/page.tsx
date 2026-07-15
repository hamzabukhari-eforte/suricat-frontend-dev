import { DesignPartnersContent } from "@/components/sections/design-partners/DesignPartnersContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.designPartners;

export default function DesignPartnersPage() {
  return <DesignPartnersContent />;
}
