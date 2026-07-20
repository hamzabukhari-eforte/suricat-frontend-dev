import { FaArrowRight, FaShieldHalved } from "@/components/ui/icons";
import type { MaxWidth } from "@/lib/layout/measure";
import { DEFAULT_DESCRIPTION_MAX } from "@/lib/layout/measure";
import Link from "next/link";
import type { ReactNode } from "react";

type FormHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  paragraphs?: string[];
  ctaLabel: string;
  ctaHref?: string;
  /** Hero copy container width. Defaults to `max-w-4xl`. */
  measure?: MaxWidth;
  /** Title measure. Defaults to `max-w-full`. */
  titleMaxWidth?: MaxWidth;
  /** Paragraph measure. Defaults to `max-w-full`. */
  paragraphMaxWidth?: MaxWidth;
};

export function FormHero({
  eyebrow,
  title,
  paragraphs = [],
  ctaLabel,
  ctaHref = "#intake",
  measure = DEFAULT_DESCRIPTION_MAX,
  titleMaxWidth = "max-w-full",
  paragraphMaxWidth = "max-w-full",
}: FormHeroProps) {
  return (
    <section
      id="hero"
      className="w-full bg-navy relative overflow-hidden py-8 md:py-10 lg:py-12 min-h-0 lg:min-h-[500px] flex items-center justify-center text-white"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className={`w-full ${measure} mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center mt-8`}
      >
        {eyebrow ? (
          <div className="text-xs sm:text-[14px] text-teal font-bold mb-3 sm:mb-4 tracking-[0.12em] sm:tracking-[0.18em] uppercase max-w-full">
            {eyebrow}
          </div>
        ) : null}
        <h1
          className={`text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight mb-4 sm:mb-5 tracking-tight ${titleMaxWidth}`}
        >
          {title}
        </h1>
        {paragraphs.map((p) => (
          <p
            key={p}
            className={`text-white text-base sm:text-lg lg:text-[22px] font-normal leading-relaxed mb-3 ${paragraphMaxWidth} mx-auto`}
          >
            {p}
          </p>
        ))}
        <p className="text-white text-sm sm:text-[16px] leading-relaxed mb-7 sm:mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mx-auto max-w-full text-center lg:whitespace-nowrap mt-2">
          <FaShieldHalved className="text-teal/60 text-base shrink-0" aria-hidden="true" />
          <span>
            Built for Medical Device Manufacturers operating under FDA QMSR and
            ISO 13485.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-2">
          <Link
            href={ctaHref}
            className="group border-2 border-teal text-teal hover:bg-teal hover:text-navy w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm transition-all"
          >
            {ctaLabel}
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
