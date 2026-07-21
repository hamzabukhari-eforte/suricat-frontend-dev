import Link from "next/link";

type CtaBandProps = {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const ctaBtnBase =
  "hero-cta-hover inline-flex h-[42px] w-full items-center justify-center whitespace-nowrap rounded-full border-2 px-4 text-sm font-bold leading-none transition-all sm:px-6 md:px-8 md:text-base";

export function CtaBand({
  title = "Ready to Get Started?",
  primaryHref = "/design-partners/apply",
  primaryLabel = "Become a Design Partner",
  secondaryHref = "/readiness",
  secondaryLabel = "Schedule a Discussion",
}: CtaBandProps) {
  return (
    <section id="cta-section" className="px-4 py-4 text-center text-white sm:px-6 md:py-5 lg:py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 xl:flex-row xl:flex-nowrap xl:gap-8">
        <h2 className="shrink-0 text-xl font-semibold sm:text-2xl md:text-3xl xl:whitespace-nowrap">
          {title}
        </h2>
        <div className="grid w-full max-w-sm grid-cols-1 gap-3 sm:max-w-md md:w-auto md:max-w-none md:grid-cols-2 md:gap-4">
          <Link
            href={primaryHref}
            className={`${ctaBtnBase} border-white bg-transparent text-white hover:bg-white hover:text-navy md:min-w-[15rem]`}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className={`${ctaBtnBase} border-transparent bg-navy text-white hover:bg-white hover:text-navy md:min-w-[15rem]`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
