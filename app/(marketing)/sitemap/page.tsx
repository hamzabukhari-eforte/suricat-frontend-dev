import { SitemapPageContent } from "@/components/sections/sitemap/SitemapPageContent";
import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return getPageMetadata("sitemap");
}

export default function SitemapPage() {
  return <SitemapPageContent />;
}
