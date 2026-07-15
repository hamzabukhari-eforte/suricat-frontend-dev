import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import type { MaxWidth } from "@/lib/layout/measure";
import {
  DEFAULT_HERO_MAX,
  DEFAULT_TITLE_MAX,
} from "@/lib/layout/measure";

type PageHeroProps = {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  eyebrow?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
  children?: ReactNode;
  /** Hero copy container width. Defaults to `max-w-5xl`. */
  measure?: MaxWidth;
  /** Subtitle measure. Defaults to `max-w-3xl`. */
  subtitleMaxWidth?: MaxWidth;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  primaryCta,
  secondaryCta,
  className = "",
  children,
  measure = DEFAULT_HERO_MAX,
  subtitleMaxWidth = DEFAULT_TITLE_MAX,
}: PageHeroProps) {
  return (
    <section
      className={`w-full bg-navy text-white relative overflow-hidden py-12 lg:py-12 min-h-[70vh] lg:min-h-[500px] flex items-center justify-center ${className}`.trim()}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className={`w-full ${measure} mx-auto px-4 sm:px-6 py-8 lg:py-0 relative z-10 flex flex-col items-center justify-center text-center`}
      >
        {eyebrow ? (
          <p className="animate-fade-up text-sm uppercase tracking-widest text-teal font-semibold mb-4">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="animate-fade-up text-2xl sm:text-3xl lg:text-[36px] font-bold !leading-[32px] sm:!leading-[44px] mb-4 sm:mb-6 tracking-tight">
          {title}
        </h1>
        <div className="h-1 w-16 bg-teal rounded-full mb-5 sm:mb-6 animate-fade-up-2" />
        {subtitle ? (
          <div
            className={`animate-fade-up-2 text-base lg:text-[22px] leading-[32px] text-white mx-auto ${subtitleMaxWidth}`}
          >
            {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
          </div>
        ) : null}
        {(primaryCta || secondaryCta) && (
          <div className="animate-fade-up-3 mt-8 flex flex-wrap gap-4 justify-center">
            {primaryCta ? (
              <Button
                variant="teal"
                size="lg"
                href={primaryCta.href}
                className="hero-cta-hover"
              >
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="hero-cta-hover border-2 border-teal text-teal px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-teal hover:text-navy transition-all inline-flex items-center"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
