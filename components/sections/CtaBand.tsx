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
    <section id="cta-section" className="px-6 py-4 text-center text-white md:py-5 lg:py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 md:flex-row md:gap-6 lg:gap-8">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            variant="outline-white"
            size="xl"
            href={primaryHref}
            className="w-full sm:w-auto"
          >
            {primaryLabel}
          </Button>
          <Link
            href={secondaryHref}
            className="w-full sm:w-auto bg-navy text-white border-2 border-transparent text-base px-8 py-2.5 rounded-full font-bold hover:bg-white hover:text-navy transition-all inline-flex items-center justify-center"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
