"use client";

import { Button } from "@/components/ui/Button";
import { FaArrowRight, FaHandshake } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function WhySuricatSection() {
  const t = useTranslations("home.why");

  return (
    <section id="why-suricat" className="why-suricat-section">
      <Container>
        <div className="why-suricat-layout">
          <div className="why-suricat-copy">
            <p className="why-suricat-eyebrow">{t("sectionTitle")}</p>
            <h2 className="why-suricat-title">
              <span className="why-suricat-title-white">{t("headlineLine1")}</span>
              <span className="why-suricat-title-teal">{t("headlineLine2")}</span>
            </h2>
            <p className="why-suricat-body">{t("body1")}</p>
            <p className="why-suricat-body">{t("body2")}</p>
            <p className="why-suricat-tagline">{t("tagline")}</p>
          </div>

          <aside className="why-suricat-card">
            <h3 className="why-suricat-card-title">{t("evaluateTitle")}</h3>
            <div className="why-suricat-actions">
              <div className="why-suricat-action-col">
                <Button
                  variant="teal"
                  href="/design-partners/apply"
                  className="why-suricat-cta group gap-2 whitespace-nowrap"
                >
                  <FaHandshake
                    className="text-base shrink-0 text-navy"
                    aria-hidden="true"
                  />
                  {t("ctaDesignPartner")}
                </Button>
                <Link href="/contact" className="why-suricat-questions">
                  {t("gotQuestions")}
                </Link>
              </div>
              <div className="why-suricat-action-col">
                <Button
                  variant="outline-white"
                  href="/get-started"
                  className="why-suricat-cta group gap-2 whitespace-nowrap"
                >
                  {t("ctaPilot")}
                  <FaArrowRight
                    className="why-suricat-cta-arrow"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
