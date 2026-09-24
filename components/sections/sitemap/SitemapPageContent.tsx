"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { sitemapPageSections } from "@/lib/sitemap-page";
import { useTranslations } from "@/components/i18n/LocaleProvider";

export function SitemapPageContent() {
  const t = useTranslations("sitemapPage");

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-navy md:text-4xl">
          {t("title")}
        </h1>
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-navy/70">
          {t("introBefore")}{" "}
          <Link
            href="/sitemap.xml"
            className="font-medium text-navy underline underline-offset-2 hover:text-teal"
          >
            sitemap.xml
          </Link>
          {t("introAfter")}
        </p>

        <div className="columns-1 gap-10 space-y-10 md:columns-2 lg:columns-3">
          {sitemapPageSections.map((section) => {
            const sectionTitle = t(`sections.${section.titleKey}`);
            return (
              <section key={section.titleKey} className="break-inside-avoid">
                <h2 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold text-navy">
                  {sectionTitle}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => {
                    const label = t(`links.${link.labelKey}`);
                    return (
                      <li key={`${section.titleKey}-${link.href}-${link.labelKey}`}>
                        <Link
                          href={link.href}
                          className="text-navy/80 underline underline-offset-2 hover:text-teal"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
