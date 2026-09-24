"use client";

import { FaArrowRight, FaBars, FaChevronDown, FaHandshake, FaTimes } from "@/components/ui/icons";
import { HOME_HASH_EVENT } from "@/components/layout/SmoothHashScroll";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { buildMegaMenus, isNavHrefActive } from "@/lib/navigation";

function closeDesktopMegaMenus() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
  document.querySelectorAll(".nav-mega-group").forEach((el) => {
    el.classList.add("nav-mega-force-closed");
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = useTranslations();
  const megaMenus = useMemo(() => buildMegaMenus(t), [t]);
  const [hash, setHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    () => new Set(),
  );

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

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenAccordions(new Set());
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onMegaLinkClick = () => {
    closeDesktopMegaMenus();
    closeMobile();
  };

  const linkIsActive = (href: string) => isNavHrefActive(href, pathname, hash);
  const isHome = pathname === "/";
  const designPartnersActive = pathname.startsWith("/design-partners");

  /** Top-level mega labels stay neutral on home, except Why Suricat after a panel pick. */
  const isMegaTriggerActive = (menu: (typeof megaMenus)[number]) => {
    const childActive =
      linkIsActive(menu.intro.ctaHref) ||
      menu.links.some((link) => linkIsActive(link.href));

    if (isHome) return menu.id === "why" && childActive;
    return childActive;
  };

  /**
   * On home, only a clicked Why Suricat mega item shows active.
   * Other menus (and home hashes from hero/platform) stay unhighlighted.
   */
  const isMegaPanelLinkActive = (href: string, menuId: string) => {
    if (!linkIsActive(href)) return false;
    if (isHome) return menuId === "why";
    return true;
  };

  return (
    <nav
      className="border-b border-gray-200 sticky top-0 bg-white z-50 overflow-x-clip overflow-y-visible"
      data-locale={locale}
    >
      <div className="nav-header-bar max-w-7xl mx-auto px-4 xl:px-0 h-16 lg:h-24 flex items-center">
        <div className="nav-brand-cluster flex items-center shrink-0">
          <Link href="/" className="shrink-0 flex items-center" onClick={closeMobile}>
            <Image
              src="/assets/images/suricat-logo-nav.png"
              alt={t("common.suricatAlt")}
              id="ig8vb"
              width={300}
              height={68}
              className="nav-logo shrink-0 object-contain object-left"
              style={{ width: "auto" }}
              priority
            />
          </Link>
        </div>

        <div className="nav-center-menu hidden xl:flex flex-1 self-stretch items-stretch justify-center min-w-0">
          {megaMenus.map((menu) => {
            const menuActive = isMegaTriggerActive(menu);

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
                  title={menu.label}
                >
                  <span className="nav-mega-trigger-label">{menu.label}</span>
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
                            isMegaPanelLinkActive(menu.intro.ctaHref, menu.id)
                              ? " is-active"
                              : ""
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
                          const active = isMegaPanelLinkActive(link.href, menu.id);
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
          <div className="nav-header-cta-group flex items-center">
            <Link
              href="/login"
              className="nav-login-link inline-flex items-center whitespace-nowrap shrink-0"
              aria-current={linkIsActive("/login") ? "page" : undefined}
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/design-partners"
              className={`nav-design-partners-btn inline-flex items-center justify-center rounded-full font-bold transition-all whitespace-nowrap shrink-0${
                designPartnersActive ? " is-active" : ""
              }`}
              title={t("nav.designPartners")}
            >
              <FaHandshake aria-hidden="true" />
              <span className="nav-design-partners-label">{t("nav.designPartners")}</span>
            </Link>
          </div>
        </div>

        <div className="flex xl:hidden items-center justify-end gap-3 ml-auto shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-600"
            type="button"
            aria-label={t("nav.toggleMenu")}
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
            alt={t("common.suricatAlt")}
            width={300}
            height={68}
            className="nav-logo shrink-0 object-contain object-left"
            style={{ width: "auto" }}
          />
          <button
            onClick={closeMobile}
            className="p-2"
            type="button"
            aria-label={t("nav.closeMenu")}
          >
            <FaTimes className="text-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-menu-body p-4 space-y-4">
          {megaMenus.map((menu) => {
            const menuActive = isMegaTriggerActive(menu);

            return (
              <div key={menu.id} className="border-b border-gray-100">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between py-3 text-lg font-semibold text-left${
                    menuActive ? " text-teal" : ""
                  }`}
                  onClick={() => toggleAccordion(menu.id)}
                >
                  {menu.label}
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      openAccordions.has(menu.id) ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openAccordions.has(menu.id) ? (
                  <div className="pb-3 space-y-1">
                    {menu.links.some(
                      (link) => link.href === menu.intro.ctaHref,
                    ) ? null : (
                      <Link
                        href={menu.intro.ctaHref}
                        className={`nav-mega-intro-cta py-2 px-2${
                          isMegaPanelLinkActive(menu.intro.ctaHref, menu.id)
                            ? " is-active"
                            : ""
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
                      const active = isMegaPanelLinkActive(link.href, menu.id);
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
        </div>

        <div className="mobile-menu-footer flex flex-col gap-3 border-t border-gray-200 bg-white p-4">
          <Link
            href="/login"
            className="nav-login-link py-2 text-center"
            aria-current={linkIsActive("/login") ? "page" : undefined}
            onClick={closeMobile}
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/design-partners"
            className={`suricat-teal-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold transition-all md:text-base${
              designPartnersActive ? " ring-2 ring-teal ring-offset-2" : ""
            }`}
            onClick={closeMobile}
          >
            <FaHandshake className="text-lg" aria-hidden="true" />
            {t("nav.designPartners")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
