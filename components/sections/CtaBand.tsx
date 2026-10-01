"use client";

import { Button } from "@/components/ui/Button";
import { FaArrowRight, FaHandshake } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";

type CtaBandProps = {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaBand({
  title,
  primaryHref = "/design-partners/apply",
  primaryLabel,
  secondaryHref = "/get-started",
  secondaryLabel,
}: CtaBandProps) {
  const t = useTranslations("cta");
  const resolvedTitle = title ?? t("readyTitle");
  const body = t("body");
  const resolvedPrimary = primaryLabel ?? t("becomeDesignPartner");
  const resolvedSecondary = secondaryLabel ?? t("requestFreePilot");

  return (
    <section id="cta-section" className="cta-band">
      <Container>
        <div className="cta-band-inner">
          <h2 className="cta-band-title">{resolvedTitle}</h2>
          <p className="cta-band-body">{body}</p>

          <div className="cta-band-actions">
            <Button
              variant="outline-white"
              href={primaryHref}
              className="cta-band-btn group gap-2 whitespace-nowrap"
            >
              <FaHandshake
                className="text-base shrink-0"
                aria-hidden="true"
              />
              {resolvedPrimary}
            </Button>
            <Button
              variant="navy"
              href={secondaryHref}
              className="cta-band-btn group gap-2 whitespace-nowrap"
            >
              {resolvedSecondary}
              <FaArrowRight
                className="cta-band-btn-arrow"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
