import Link from "next/link";
import { Button } from "@/components/ui/Button";

type CtaBandProps = {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaBand({
  title = "Ready to Get Started?",
  primaryHref = "/design-partners/apply",
  primaryLabel = "Become a Design Partner",
  secondaryHref = "/readiness",
  secondaryLabel = "Schedule a Discussion",
}: CtaBandProps) {
  return (
    <section id="cta-section" className="px-4 py-4 text-center text-white sm:px-6 md:py-5 lg:py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 md:flex-row md:flex-nowrap md:gap-6 lg:gap-8">
        <h2 className="shrink-0 text-xl font-semibold whitespace-nowrap sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4">
          <Button
            variant="outline-white"
            size="xl"
            href={primaryHref}
            className="!px-3 !py-1.5 !text-xs whitespace-nowrap sm:!px-6 sm:!py-2 sm:!text-sm md:!px-8 md:!py-2.5 md:!text-base"
          >
            {primaryLabel}
          </Button>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-transparent bg-navy px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-white hover:text-navy sm:px-6 sm:py-2 sm:text-sm md:px-8 md:py-2.5 md:text-base"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
