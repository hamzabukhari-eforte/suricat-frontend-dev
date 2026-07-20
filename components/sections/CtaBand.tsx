import Link from "next/link";

type CtaBandProps = {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const ctaBtnBase =
  "hero-cta-hover inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border-2 px-3 text-xs font-bold transition-all sm:h-10 sm:px-6 sm:text-sm md:h-11 md:px-8 md:text-base";

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
          <Link
            href={primaryHref}
            className={`${ctaBtnBase} border-white bg-transparent text-white hover:bg-white hover:text-navy`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className={`${ctaBtnBase} border-transparent bg-navy text-white hover:bg-white hover:text-navy`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

