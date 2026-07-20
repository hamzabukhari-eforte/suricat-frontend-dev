"use client";

import { FaArrowRight, FaBars, FaChevronDown, FaGlobe, FaHandshake, FaTimes } from "@/components/ui/icons";
import { HOME_HASH_EVENT } from "@/components/layout/SmoothHashScroll";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES, megaMenus, isNavHrefActive } from "@/lib/navigation";

function closeDesktopMegaMenus() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
  document.querySelectorAll(".nav-mega-group").forEach((el) => {
    el.classList.add("nav-mega-force-closed");
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncHash = (next?: string) => {
      setHash(next ?? window.location.hash);
    };
    syncHash();

    const onHashChange = () => syncHash();
    const onHomeHash = (event: Event) => {
      const detail = (event as CustomEvent<{ hash?: string }>).detail;
      syncHash(detail?.hash ?? window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener(HOME_HASH_EVENT, onHomeHash);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener(HOME_HASH_EVENT, onHomeHash);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileLangOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const root = mobileLangRef.current;
      if (!root || root.contains(event.target as Node)) return;
      setMobileLangOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [mobileLangOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenAccordion(null);
    setMobileLangOpen(false);
  };

  const onMegaLinkClick = () => {
    closeDesktopMegaMenus();
    closeMobile();
  };

  const linkIsActive = (href: string) => isNavHrefActive(href, pathname, hash);

  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 overflow-x-clip overflow-y-visible">
      <div className="nav-header-bar max-w-7xl mx-auto px-4 xl:px-0 h-16 lg:h-24 flex items-center">
        <div className="nav-brand-cluster flex items-center shrink-0">
          <Link href="/" className="shrink-0 flex items-center" onClick={closeMobile}>
            <Image
              src="/assets/images/suricat-logo-nav.png"
              alt="Suricat"
              id="ig8vb"
              width={2048}
              height={470}
              className="nav-logo shrink-0 object-contain object-left"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <Link
            href="/design-partners"
            className={`nav-design-partners-btn hidden xl:inline-flex items-center rounded-full font-semibold transition-all whitespace-nowrap shrink-0${
              pathname.startsWith("/design-partners") ? " is-active" : ""
            }`}
          >
            <FaHandshake aria-hidden="true" />
            Design Partners
          </Link>
        </div>

        <div className="nav-center-menu hidden xl:flex flex-1 self-stretch items-stretch justify-center min-w-0 font-semibold">
          {megaMenus.map((menu) => {
            const menuActive =
              linkIsActive(menu.intro.ctaHref) ||
              menu.links.some((link) => linkIsActive(link.href));

            return (
              <div
                key={menu.id}
                className="nav-mega-group flex items-center"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.remove("nav-mega-force-closed");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("nav-mega-force-closed");
                }}
              >
                <button
                  type="button"
                  className={`nav-mega-trigger nav-link-animated${
                    menuActive ? " is-active" : ""
                  }`}
                  aria-expanded="false"
                  aria-current={menuActive ? "true" : undefined}
                >
                  {menu.label}
                  <FaChevronDown className="nav-mega-chevron" aria-hidden="true" />
                </button>
                <div className="nav-mega-panel">
                  <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                    <div className="grid grid-cols-12 gap-10">
                      <div className="col-span-4 border-r border-gray-300 pr-8">
                        <p className="nav-mega-intro-title">{menu.intro.title}</p>
                        <p className="nav-mega-intro-text">{menu.intro.text}</p>
                        <Link
                          href={menu.intro.ctaHref}
                          className={`nav-mega-intro-cta${
                            linkIsActive(menu.intro.ctaHref) ? " is-active" : ""
                          }`}
                          onClick={onMegaLinkClick}
                        >
                          <span className="nav-mega-intro-cta-text">
                            {menu.intro.ctaLabel}
                          </span>
                          <FaArrowRight className="text-xs" aria-hidden="true" />
                        </Link>
                      </div>
                      <div
                        className={`col-span-8 grid gap-x-6 gap-y-1 ${
                          menu.linkColumns === 3 ? "grid-cols-3" : "grid-cols-2"
                        }`}
                      >
                        {menu.links.map((link) => {
                          const active = linkIsActive(link.href);
                          return (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              className={`nav-mega-link${active ? " is-active" : ""}`}
                              aria-current={active ? "page" : undefined}
                              onClick={onMegaLinkClick}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="nav-header-actions hidden xl:flex items-center justify-end shrink-0">
          <div className="relative group text-gray-600">
            <button
              type="button"
              className="nav-language-trigger"
              aria-label="Choose language"
            >
              <FaGlobe className="text-lg" aria-hidden="true" />
              <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
            </button>
            <div className="nav-language-dropdown absolute right-0 top-full pt-3 w-44 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-opacity duration-200 z-50">
              <div className="nav-language-panel">
                {LANGUAGES.map((lang) => (
                  <a key={lang} href="#" className="nav-language-link">
                    {lang}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="nav-header-cta-group flex items-center">
            <Link
              href="/login"
              className="nav-login-link nav-link-animated font-bold text-navy hover:text-navy/90 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/get-started"
              className="nav-cta-btn cursor-pointer rounded-full border-2 border-navy bg-navy font-bold text-white transition-colors hover:bg-navy/90"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex xl:hidden items-center justify-end gap-3 ml-auto shrink-0">
          <div className="relative" ref={mobileLangRef}>
            <button
              className="p-2 text-gray-600 flex items-center gap-1"
              type="button"
              onClick={() => setMobileLangOpen((v) => !v)}
              aria-expanded={mobileLangOpen}
              aria-label="Choose language"
            >
              <FaGlobe className="text-lg" aria-hidden="true" />
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  mobileLangOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {mobileLangOpen ? (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-[4px] shadow-lg py-2 z-[60]">
                {LANGUAGES.map((lang) => (
                  <a
                    key={lang}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#413cc3] transition-colors"
                    onClick={() => setMobileLangOpen(false)}
                  >
                    {lang}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-600"
            type="button"
            aria-label="Toggle navigation menu"
          >
            <FaBars className="text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu fixed inset-0 bg-white z-50 xl:hidden ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="mobile-menu-header p-4 border-b border-gray-200 flex items-center justify-between">
          <Image
            src="/assets/images/suricat-logo-nav.png"
            alt="Suricat"
            width={2048}
            height={470}
            className="nav-logo shrink-0 object-contain object-left"
            style={{ width: "auto" }}
          />
          <button
            onClick={closeMobile}
            className="p-2"
            type="button"
            aria-label="Close menu"
          >
            <FaTimes className="text-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-menu-body p-4 space-y-4">
          {megaMenus.map((menu) => {
            const menuActive =
              linkIsActive(menu.intro.ctaHref) ||
              menu.links.some((link) => linkIsActive(link.href));

            return (
              <div key={menu.id} className="border-b border-gray-100">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between py-3 text-lg font-semibold text-left${
                    menuActive ? " text-teal" : ""
                  }`}
                  onClick={() =>
                    setOpenAccordion((id) => (id === menu.id ? null : menu.id))
                  }
                >
                  {menu.label}
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      openAccordion === menu.id ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openAccordion === menu.id ? (
                  <div className="pb-3 space-y-1">
                    {menu.links.some(
                      (link) => link.href === menu.intro.ctaHref,
                    ) ? null : (
                      <Link
                        href={menu.intro.ctaHref}
                        className={`nav-mega-intro-cta py-2 px-2${
                          linkIsActive(menu.intro.ctaHref) ? " is-active" : ""
                        }`}
                        onClick={closeMobile}
                      >
                        <span className="nav-mega-intro-cta-text">
                          {menu.intro.ctaLabel}
                        </span>
                        <FaArrowRight className="text-xs" aria-hidden="true" />
                      </Link>
                    )}
                    {menu.links.map((link) => {
                      const active = linkIsActive(link.href);
                      return (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className={`block py-2 px-2 text-base transition-colors ${
                            active
                              ? "font-semibold text-teal"
                              : "text-gray-600 hover:text-teal"
                          }`}
                          aria-current={active ? "page" : undefined}
                          onClick={closeMobile}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/login"
              className="cursor-pointer rounded-full border-2 border-navy bg-white px-6 py-3 text-center font-bold text-navy"
              onClick={closeMobile}
            >
              Login
            </Link>
            <Link
              href="/get-started"
              className="nav-cta-btn cursor-pointer rounded-full border-2 border-navy bg-navy px-6 py-3 text-center font-bold text-white"
              onClick={closeMobile}
            >
              Get Started
            </Link>
            <Link
              href="/design-partners"
              className={`suricat-teal-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-base font-bold transition-all${
                pathname.startsWith("/design-partners")
                  ? " ring-2 ring-teal ring-offset-2"
                  : ""
              }`}
              onClick={closeMobile}
            >
              <FaHandshake className="text-lg" aria-hidden="true" />
              Design Partners
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
