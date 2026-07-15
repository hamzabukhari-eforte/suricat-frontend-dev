import { FaArrowRight } from "@/components/ui/icons";
import type { MaxWidth } from "@/lib/layout/measure";
import {
  DEFAULT_DESCRIPTION_MAX,
  DEFAULT_HERO_MAX,
  DEFAULT_HERO_SUBTITLE_MAX,
} from "@/lib/layout/measure";
import Link from "next/link";
import type { ReactNode } from "react";

type PricingHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: { label: string; href: string };
  /** Extra content under the CTA (pills, secondary lines, etc.) */
  children?: ReactNode;
  className?: string;
  /** Hero copy container width. Defaults to `max-w-5xl`. */
  measure?: MaxWidth;
  /** Title measure. Defaults to `max-w-4xl`. */
  titleMaxWidth?: MaxWidth;
  /** Subtitle measure. Defaults to `max-w-5xl`. */
  subtitleMaxWidth?: MaxWidth;
  /** Subtitle text color. Sub-pages use solid white; main pricing uses `text-white/80`. */
  subtitleColorClass?: string;
};

export function PricingHero({
  title,
  subtitle,
  cta,
  children,
  className = "",
  measure = DEFAULT_HERO_MAX,
  titleMaxWidth = DEFAULT_DESCRIPTION_MAX,
  subtitleMaxWidth = DEFAULT_HERO_SUBTITLE_MAX,
  subtitleColorClass = "text-white",
}: PricingHeroProps) {
  return (
    <section
      id="hero-section"
      className={`w-full bg-navy relative overflow-hidden py-12 lg:py-12 min-h-[70vh] lg:min-h-[500px] flex items-center justify-center text-white ${className}`.trim()}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className={`w-full ${measure} mx-auto px-4 sm:px-6 py-8 lg:py-0 relative z-10 flex flex-col items-center justify-center text-center`}
      >
        <h1
          className={`text-2xl sm:text-3xl lg:text-[36px] font-bold !leading-[32px] sm:!leading-[44px] mb-3 sm:mb-4 tracking-tight ${titleMaxWidth} animate-fade-up-2`}
        >
          {title}
        </h1>
        <div className="w-16 h-1 bg-teal rounded-full mb-5 sm:mb-6" />
        {subtitle ? (
          <div
            className={`${subtitleColorClass} text-base sm:text-lg lg:text-[22px] font-normal !leading-[32px] mb-5 sm:mb-6 ${subtitleMaxWidth} mx-auto animate-fade-up-3 space-y-4`}
          >
            {subtitle}
          </div>
        ) : null}
        {cta ? (
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-3 animate-fade-up-3">
            <Link
              href={cta.href}
              className="group border-2 border-teal text-teal hover:bg-teal hover:text-navy w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm transition-all"
            >
              {cta.label}
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
