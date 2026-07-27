"use client";

import {
  FaChevronDown,
  FaFacebookF,
  FaLinkedinIn,
  FaRegEnvelope,
  FaTwitter,
  FaYoutube,
  MdOutlineLocationOn,
} from "@/components/ui/icons";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  buildFooterCompanyLinks,
  buildFooterPlatformLinks,
  buildFooterResourceLinks,
  buildFooterTopLinks,
  buildFooterWhyLinks,
  isNavHrefActive,
} from "@/lib/navigation";
import { HOME_HASH_EVENT } from "@/components/layout/SmoothHashScroll";

type FooterLink = { label: string; href: string };

function FooterLinkList({ links }: { links: FooterLink[] }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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

  return (
    <ul className="space-y-4 pb-1.5 text-sm text-gray-400">
      {links.map((link) => {
        const active = isNavHrefActive(link.href, pathname, hash);
        return (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className={`nav-link-animated inline-block hover:text-white${
                active ? " is-active text-white" : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FooterColumn({
  id,
  title,
  links,
  open,
  onToggle,
}: {
  id: string;
  title: string;
  links: FooterLink[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 lg:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left lg:pointer-events-none lg:cursor-default lg:mb-6 lg:py-0"
        aria-expanded={open}
        aria-controls={`footer-panel-${id}`}
        onClick={onToggle}
      >
        <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
        <FaChevronDown
          className={`text-xs text-white/70 transition-transform duration-300 lg:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`footer-panel-${id}`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:max-h-none lg:overflow-visible lg:opacity-100 lg:pb-0 ${
          open
            ? "max-h-[640px] opacity-100 pb-4"
            : "max-h-0 opacity-0 lg:opacity-100"
        }`}
      >
        <FooterLinkList links={links} />
      </div>
    </div>
  );
}

export function SiteFooter() {
  const t = useTranslations();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isDesktop, setIsDesktop] = useState(false);

  const footerTopLinks = useMemo(() => buildFooterTopLinks(t), [t]);
  const footerColumns = useMemo(
    () => [
      {
        id: "company",
        title: t("footer.columns.company"),
        links: buildFooterCompanyLinks(t),
      },
      {
        id: "why",
        title: t("footer.columns.why"),
        links: buildFooterWhyLinks(t),
      },
      {
        id: "platform",
        title: t("footer.columns.platform"),
        links: buildFooterPlatformLinks(t),
      },
      {
        id: "resources",
        title: t("footer.columns.resources"),
        links: buildFooterResourceLinks(t),
      },
    ],
    [t],
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggleSection = (id: string) => {
    if (isDesktop) return;
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="footer-bg bg-navy px-6 pb-6 pt-6 text-white lg:pt-8" id="footer">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 border-b border-white/10 pb-6 lg:mb-10 lg:justify-between lg:gap-8 lg:pb-10">
          <div className="flex gap-6 text-xl">
            <a
              href="#"
              className="transition-colors hover:text-teal"
              aria-label={t("footer.social.facebook")}
            >
              <FaFacebookF aria-hidden="true" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-teal"
              aria-label={t("footer.social.twitter")}
            >
              <FaTwitter aria-hidden="true" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-teal"
              aria-label={t("footer.social.linkedin")}
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-teal"
              aria-label={t("footer.social.youtube")}
            >
              <FaYoutube aria-hidden="true" />
            </a>
          </div>
          <div className="hidden flex-wrap gap-12 text-sm font-bold uppercase tracking-wider lg:flex">
            {footerTopLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-12 lg:grid-cols-5 lg:gap-12">
          <div className="mb-4 md:col-span-2 lg:col-span-1 lg:mb-0">
            <Link
              href="/contact"
              className="mb-4 inline-flex w-full items-center justify-center rounded-full border-2 border-teal px-8 py-2.5 font-bold text-teal transition-all hover:bg-teal hover:text-navy lg:mb-10 lg:py-3"
            >
              {t("footer.contactUs")}
            </Link>
            <div className="mb-5 space-y-2.5 lg:mb-8 lg:space-y-3">
              <div className="flex items-start gap-3">
                <MdOutlineLocationOn
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-400">
                  {t("footer.addressPaloAlto")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MdOutlineLocationOn
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-400">
                  {t("footer.addressTallinn")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaRegEnvelope
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  aria-hidden="true"
                />
                <a
                  href="mailto:info@suricat.ai"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  info@suricat.ai
                </a>
              </div>
            </div>
            <div className="relative mb-2 inline-block w-full lg:mb-0">
              <LanguageSwitcher variant="footer-select" />
              <FaChevronDown
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-xs"
                aria-hidden="true"
              />
            </div>
          </div>

          {footerColumns.map((col) => (
            <FooterColumn
              key={col.id}
              id={col.id}
              title={col.title}
              links={col.links}
              open={isDesktop || Boolean(openSections[col.id])}
              onToggle={() => toggleSection(col.id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-4 text-center text-[10px] uppercase tracking-widest text-gray-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-left">
          <p>{t("footer.copyright", { year: 2026 })}</p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pb-1"
            aria-label={t("footer.legal")}
          >
            <a href="#" className="nav-link-animated inline-block hover:text-white">
              {t("footer.terms")}
            </a>
            <span aria-hidden="true" className="text-gray-500/80">
              |
            </span>
            <a href="#" className="nav-link-animated inline-block hover:text-white">
              {t("footer.privacy")}
            </a>
            <span aria-hidden="true" className="text-gray-500/80">
              |
            </span>
            <a href="#" className="nav-link-animated inline-block hover:text-white">
              {t("footer.cookieSettings")}
            </a>
            <span aria-hidden="true" className="text-gray-500/80">
              |
            </span>
            <a
              href="/sitemap"
              className="nav-link-animated inline-block hover:text-white"
            >
              {t("footer.sitemap")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
