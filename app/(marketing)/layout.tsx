import { CookieBanner } from "@/components/layout/CookieBanner";
import { MarketingReveal } from "@/components/layout/MarketingReveal";
import { MarqueeTopBar } from "@/components/layout/MarqueeTopBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothHashScroll } from "@/components/layout/SmoothHashScroll";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarqueeTopBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
      <ScrollToTop />
      <MarketingReveal />
      <SmoothHashScroll />
    </>
  );
}
