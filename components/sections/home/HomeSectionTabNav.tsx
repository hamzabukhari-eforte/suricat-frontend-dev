"use client";

import { FaChevronDown, FaChevronLeft, FaChevronRight } from "@/components/ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";

type HomeSectionTabNavProps = {
  tabs: string[];
  active: number;
  onSelect: (index: number) => void;
  carouselId: string;
  prevBtnId: string;
  nextBtnId: string;
  indicatorId: string;
  dropdownTriggerId: string;
  dropdownMenuId: string;
  tabBtnClass?: string;
  arrowClass?: string;
};

export function HomeSectionTabNav({
  tabs,
  active,
  onSelect,
  carouselId,
  prevBtnId,
  nextBtnId,
  indicatorId,
  dropdownTriggerId,
  dropdownMenuId,
  tabBtnClass = "tab-btn",
  arrowClass = "text-[#413cc3] hover:text-[#2f2aa0]",
}: HomeSectionTabNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[active];
    const indicator = indicatorRef.current;
    if (!btn || !indicator) return;
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.left = `${btn.offsetLeft}px`;
  }, [active]);

  const updateCarouselButtons = useCallback(() => {
    const carousel = carouselRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!carousel) return;

    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const hasOverflow = maxScroll > 2;
    const canScrollLeft = hasOverflow && carousel.scrollLeft > 2;
    const canScrollRight = hasOverflow && carousel.scrollLeft < maxScroll - 2;

    if (prevBtn) prevBtn.disabled = !canScrollLeft;
    if (nextBtn) nextBtn.disabled = !canScrollRight;
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const btn = tabRefs.current[active];
    const carousel = carouselRef.current;
    if (!btn || !carousel) return;

    const frame = window.requestAnimationFrame(() => {
      const targetLeft =
        btn.offsetLeft - (carousel.clientWidth - btn.offsetWidth) / 2;
      const maxLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      carousel.scrollTo({
        left: Math.max(0, Math.min(maxLeft, targetLeft)),
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    updateCarouselButtons();
    carousel.addEventListener("scroll", updateCarouselButtons, { passive: true });
    window.addEventListener("resize", updateCarouselButtons);
    return () => {
      carousel.removeEventListener("scroll", updateCarouselButtons);
      window.removeEventListener("resize", updateCarouselButtons);
    };
  }, [updateCarouselButtons]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [dropdownOpen]);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const delta = carousel.clientWidth * 0.6;
    carousel.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  const selectTab = (index: number) => {
    onSelect(index);
    setDropdownOpen(false);
    const btn = tabRefs.current[index];
    const carousel = carouselRef.current;
    if (!btn || !carousel) return;

    const targetLeft =
      btn.offsetLeft - (carousel.clientWidth - btn.offsetWidth) / 2;
    const maxLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    carousel.scrollTo({
      left: Math.max(0, Math.min(maxLeft, targetLeft)),
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={dropdownRef} className="relative mb-6 lg:hidden">
        <button
          type="button"
          id={dropdownTriggerId}
          className="flex w-full items-center justify-between rounded-[4px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy shadow-sm"
          aria-expanded={dropdownOpen}
          aria-controls={dropdownMenuId}
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <span className="truncate pr-3 text-left font-medium">{tabs[active]}</span>
          <FaChevronDown
            className={`shrink-0 text-xs text-gray-600 transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        {dropdownOpen ? (
          <div
            id={dropdownMenuId}
            className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[50vh] overflow-y-auto rounded-[4px] border border-gray-200 bg-white py-2 shadow-lg"
          >
            {tabs.map((label, index) => (
              <button
                key={label}
                type="button"
                className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                  index === active
                    ? "bg-gray-50 font-medium text-teal"
                    : "text-gray-700 hover:bg-gray-50 hover:text-teal"
                }`}
                onClick={() => selectTab(index)}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative mb-6 hidden items-center lg:flex">
        <button
          type="button"
          id={prevBtnId}
          ref={prevBtnRef}
          aria-label="Scroll tabs left"
          className={`absolute -left-10 z-10 flex cursor-pointer items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 ${arrowClass}`}
          onClick={() => scrollCarousel("left")}
        >
          <FaChevronLeft className="text-3xl" aria-hidden="true" />
        </button>
        <button
          type="button"
          id={nextBtnId}
          ref={nextBtnRef}
          aria-label="Scroll tabs right"
          className={`absolute -right-10 z-10 flex cursor-pointer items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 ${arrowClass}`}
          onClick={() => scrollCarousel("right")}
        >
          <FaChevronRight className="text-3xl" aria-hidden="true" />
        </button>
        <div
          id={carouselId}
          ref={carouselRef}
          className="tabs-carousel w-full overflow-x-auto"
        >
          <div className="relative flex w-max min-w-full flex-nowrap gap-[60px] border-b-4 border-gray-200 text-sm font-normal uppercase tracking-wider">
            <div
              id={indicatorId}
              ref={indicatorRef}
              className="absolute bottom-[-4px] left-0 h-[4px] bg-teal transition-all duration-300 ease-in-out"
            />
            {tabs.map((label, index) => (
              <button
                key={label}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                className={`${tabBtnClass} relative cursor-pointer whitespace-nowrap pb-3 text-left text-xl font-semibold leading-tight tracking-normal ${
                  index === active ? "is-active text-navy" : "text-navy"
                }`}
                onClick={() => selectTab(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
