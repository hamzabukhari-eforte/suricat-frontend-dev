import { SitemapPageContent } from "@/components/sections/sitemap/SitemapPageContent";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.sitemap;

export default function SitemapPage() {
  return <SitemapPageContent />;
}
