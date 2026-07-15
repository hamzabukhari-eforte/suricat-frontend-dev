"use client";

import { FaChevronLeft, FaChevronRight } from "@/components/ui/icons";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type SubnavProps = {
  links: { label: string; href: string }[];
  /** Breadcrumb category label shown after Home (e.g. Company, Pricing). */
  category: string;
  /** Accessible name for the sibling-page nav. */
  navLabel?: string;
};

/** Designs breadcrumb + sibling subnav bar (bg-gray-50, Home › category, carousel). */
export function StickySubnav({ links, category, navLabel }: SubnavProps) {
  const pathname = usePathname();
  const linksRef = useRef<HTMLElement>(null);
  const leftBtnRef = useRef<HTMLButtonElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);

  const updateArrows = useCallback(() => {
    const linksEl = linksRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;
    if (!linksEl || !leftBtn || !rightBtn) return;

    const maxScroll = Math.max(0, linksEl.scrollWidth - linksEl.clientWidth);
    const hasOverflow = maxScroll > 2;
    const atStart = !hasOverflow || linksEl.scrollLeft <= 2;
    const atEnd = !hasOverflow || linksEl.scrollLeft >= maxScroll - 2;

    leftBtn.classList.toggle("is-visible", hasOverflow && !atStart);
    rightBtn.classList.toggle("is-visible", hasOverflow && !atEnd);
  }, []);

  useEffect(() => {
    const linksEl = linksRef.current;
    if (!linksEl) return;
    updateArrows();
    linksEl.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    const active = linksEl.querySelector(".company-subnav-link.is-active");
    if (active instanceof HTMLElement) {
      active.scrollIntoView({ inline: "center", block: "nearest" });
    }
    return () => {
      linksEl.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [pathname, links, updateArrows]);

  const scrollByDir = (dir: "left" | "right") => {
    const linksEl = linksRef.current;
    if (!linksEl) return;
    linksEl.scrollBy({
      left: dir === "right" ? linksEl.clientWidth * 0.55 : -linksEl.clientWidth * 0.55,
      behavior: "smooth",
    });
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3 text-sm sm:gap-4">
        <div className="flex shrink-0 items-center gap-2 text-gray-500">
          <Link href="/" className="transition-colors hover:text-teal">
            Home
          </Link>
          <FaChevronRight className="text-[10px]" aria-hidden="true" />
          <span className="company-breadcrumb-current">{category}</span>
        </div>
        <span className="company-subnav-divider" aria-hidden="true" />
        <div className="company-subnav-carousel min-w-0 flex-1">
          <button
            type="button"
            ref={leftBtnRef}
            className="company-subnav-arrow company-subnav-arrow-left"
            aria-label="Scroll sub pages left"
            onClick={() => scrollByDir("left")}
          >
            <FaChevronLeft className="text-sm" aria-hidden="true" />
          </button>
          <nav
            ref={linksRef}
            className="company-subnav-links flex min-w-0 flex-1 items-center gap-4 sm:gap-5"
            aria-label={navLabel ?? `${category} pages`}
          >
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`company-subnav-link${active ? " is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            ref={rightBtnRef}
            className="company-subnav-arrow company-subnav-arrow-right"
            aria-label="Scroll sub pages right"
            onClick={() => scrollByDir("right")}
          >
            <FaChevronRight className="text-sm" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
