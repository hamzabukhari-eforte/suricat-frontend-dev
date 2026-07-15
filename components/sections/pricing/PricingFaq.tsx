"use client";

import { FaArrowRight } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { FaqItem } from "@/lib/pricing/faq";

type PricingFaqProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** When set, shows a link below the accordion (pricing page teaser). */
  viewAllHref?: string;
  viewAllLabel?: string;
  /** DOM id for the section (used to scope styles / anchors). */
  sectionId?: string;
  /** Override the section wrapper classes. */
  sectionClassName?: string;
  /** Index of the item that should be open on first render. */
  defaultOpenIndex?: number | null;
};

function FaqIcon({ open }: { open: boolean }) {
  return (
    <span className="pricing-faq-icon" aria-hidden="true">
      <svg
        className={`pricing-faq-icon-svg pricing-faq-icon-svg-plus ${open ? "hidden" : "block"}`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.25v9.5M3.25 8h9.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className={`pricing-faq-icon-svg pricing-faq-icon-svg-minus ${open ? "block" : "hidden"}`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.25 8h9.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function PricingFaq({
  items,
  eyebrow = "Pricing FAQ",
  title = "The Questions Most Asked Before Starting an Evaluation.",
  description = "Answers to the most common questions about Suricat subscription terms, Document Capacity, evaluation access, and commercial commitments.",
  viewAllHref,
  viewAllLabel = "View All",
  sectionId = "pricing-faq",
  sectionClassName = "py-8 px-4 sm:px-6 bg-white",
  defaultOpenIndex = null,
}: PricingFaqProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() =>
    defaultOpenIndex != null ? new Set([defaultOpenIndex]) : new Set(),
  );

  const toggleIndex = (index: number) =>
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Mirror the Designs `setItemState`: animate max-height to the content's real
  // scrollHeight (not a fixed value) so the open/close speed matches exactly.
  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      el.style.maxHeight = openIndices.has(index) ? `${el.scrollHeight}px` : "0px";
    });
  }, [openIndices, items]);

  return (
    <section id={sectionId} className={sectionClassName}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <span className="text-teal font-bold text-sm uppercase tracking-widest mb-4 block">
            {eyebrow}
          </span>
          {title ? (
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight lg:leading-[36px] font-bold mb-4 text-navy max-w-3xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy max-w-4xl">
              {description}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 w-full">
          {items.map((item, index) => {
            const open = openIndices.has(index);
            return (
              <div
                key={item.question}
                className={`pricing-faq-item${open ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="pricing-faq-trigger w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={open}
                  onClick={() => toggleIndex(index)}
                >
                  <span className="font-semibold text-navy text-base sm:text-lg pr-2">
                    {item.question}
                  </span>
                  <FaqIcon open={open} />
                </button>
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="pricing-faq-content"
                >
                  <p className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-navy text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {viewAllHref ? (
          <div className="flex flex-col items-center text-center gap-4 mt-8 sm:mt-10">
            <Link
              href={viewAllHref}
              className="suricat-teal-btn group w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm transition-all"
            >
              {viewAllLabel}
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
