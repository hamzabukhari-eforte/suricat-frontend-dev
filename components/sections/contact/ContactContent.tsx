"use client";

import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { useCompanySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  MdOutlineEmail,
  MdOutlineLanguage,
  MdOutlineLocationOn,
} from "@/components/ui/icons";
import type { ReactNode } from "react";

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white shadow-sm text-teal">
      {children}
    </div>
  );
}

export function ContactContent() {
  const t = useTranslations();
  const tc = useTranslations("contact");
  const companySubnavLinks = useCompanySubnavLinks();

  return (
    <>
      <StickySubnav
        links={companySubnavLinks}
        category={t("nav.menus.company.label")}
        navLabel={t("nav.menus.company.label")}
      />
      <section className="bg-gray-50 py-8">
        <Container>
          <div className="grid grid-cols-1 items-start gap-16 max-sm:gap-8 lg:grid-cols-2">
            <div className="min-w-0 space-y-8">
              <div className="space-y-4">
                <span className="inline-block rounded-full py-1.5 text-sm font-bold uppercase tracking-wider text-teal">
                  {tc("eyebrow")}
                </span>
                <h1 className="text-[28px] font-bold leading-[36px] tracking-tight text-navy lg:text-[36px] lg:leading-[44px]">
                  {tc("title")}
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-navy lg:text-[22px] lg:leading-[30px]">
                  {tc("body")}
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ContactIcon>
                    <MdOutlineLocationOn className="h-5 w-5" aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {tc("hqGlobal")}
                    </h3>
                    <p className="text-navy whitespace-pre-line">
                      {tc("hqGlobalAddr")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ContactIcon>
                    <MdOutlineLocationOn className="h-5 w-5" aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {tc("hqEurope")}
                    </h3>
                    <p className="text-navy whitespace-pre-line">
                      {tc("hqEuropeAddr")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="ml-14 text-lg font-bold text-navy">
                    {tc("contactInfo")}
                  </h3>
                  <div className="flex items-start gap-4">
                    <ContactIcon>
                      <MdOutlineEmail className="h-5 w-5" aria-hidden="true" />
                    </ContactIcon>
                    <div>
                      <h3 className="text-lg font-bold text-navy">{tc("emailLabel")}</h3>
                      <p className="text-navy">
                        <a
                          href="mailto:info@suricat.ai"
                          className="text-teal hover:underline"
                        >
                          info@suricat.ai
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ContactIcon>
                      <MdOutlineLanguage className="h-5 w-5" aria-hidden="true" />
                    </ContactIcon>
                    <div>
                      <h3 className="text-lg font-bold text-navy">{tc("webLabel")}</h3>
                      <p className="text-navy">
                        <a
                          href="https://www.suricat.ai"
                          className="text-teal hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          www.suricat.ai
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 max-w-full overflow-x-hidden rounded-[4px] border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-sm:p-4">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
