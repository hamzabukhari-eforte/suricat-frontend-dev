import { FaArrowRight } from "@/components/ui/icons";
import type { MaxWidth } from "@/lib/layout/measure";
import {
  DEFAULT_DESCRIPTION_MAX,
  DEFAULT_HERO_MAX,
  DEFAULT_TITLE_MAX,
} from "@/lib/layout/measure";
import Link from "next/link";
import type { ReactNode } from "react";
import { PricingHero } from "@/components/sections/pricing/PricingHero";

export type InfoCard = {
  title: string;
  body: string;
};

type PricingInfoGridProps = {
  eyebrow: string;
  title: string;
  description?: string;
  cards: InfoCard[];
  muted?: boolean;
  /** Section shell width. Defaults to `max-w-5xl`. */
  maxWidth?: MaxWidth;
  /** Title measure. Defaults to `max-w-3xl`. */
  titleMaxWidth?: MaxWidth;
  /** Description measure. Defaults to `max-w-4xl`. */
  descriptionMaxWidth?: MaxWidth;
};

export function PricingInfoGrid({
  eyebrow,
  title,
  description,
  cards,
  muted = true,
  maxWidth = DEFAULT_HERO_MAX,
  titleMaxWidth = DEFAULT_TITLE_MAX,
  descriptionMaxWidth = DEFAULT_DESCRIPTION_MAX,
}: PricingInfoGridProps) {
  return (
    <section
      className={`pt-8 px-4 sm:px-6 ${muted ? "bg-surface-muted" : "bg-white"}`}
    >
      <div className={`${maxWidth} mx-auto`}>
        <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
          {eyebrow}
        </span>
        <h2
          className={`text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy ${titleMaxWidth}`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy mb-8 ${descriptionMaxWidth}`}
          >
            {description}
          </p>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="pricing-info-card bg-white rounded-[4px] border border-gray-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full bg-teal shrink-0" />
                <h3 className="font-bold text-navy text-[22px]">{card.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-navy leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type PricingCalloutProps = {
  eyebrow: string;
  body: ReactNode;
  bullets?: string[];
};

export function PricingCallout({ eyebrow, body, bullets }: PricingCalloutProps) {
  return (
    <div className="bg-navy rounded-[4px] p-8 sm:p-10 mb-10 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
          {eyebrow}
        </span>
        <div className="text-base sm:text-lg lg:text-[22px] leading-relaxed lg:leading-[32px] text-white mb-8 max-w-4xl">
          {typeof body === "string" ? <p>{body}</p> : body}
        </div>
        {bullets?.length ? (
          <ul className="space-y-4">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm sm:text-base text-white leading-relaxed"
              >
                <span className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

type PricingBottomCtaProps = {
  href: string;
  label: string;
  note?: string;
  /** Note text size. Defaults to `text-sm sm:text-base`; some pages use `text-sm` only. */
  noteClassName?: string;
};

export function PricingBottomCta({
  href,
  label,
  note,
  noteClassName = "text-sm sm:text-base",
}: PricingBottomCtaProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <Link
        href={href}
        className="suricat-teal-btn group w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm transition-all"
      >
        {label}
        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
      </Link>
      {note ? (
        <p className={`${noteClassName} text-navy leading-relaxed max-w-lg`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

export { PricingHero };
