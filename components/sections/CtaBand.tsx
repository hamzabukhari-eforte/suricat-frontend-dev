"use client";

import { Button } from "@/components/ui/Button";
import { FaHandshake } from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";

type CtaBandProps = {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CtaBand({
  title,
  primaryHref = "/design-partners/apply",
  primaryLabel,
}: CtaBandProps) {
  const t = useTranslations("cta");
  const resolvedTitle = title ?? t("readyTitle");
  const body = t("body");
  const resolvedPrimary = primaryLabel ?? t("becomeDesignPartner");

  return (
    <section id="cta-section" className="cta-band">
      <Container>
        <div className="cta-band-inner">
          <p className="cta-band-eyebrow">{t("eyebrow")}</p>

          <h2 className="cta-band-title">{resolvedTitle}</h2>
          <p className="cta-band-body">{body}</p>

          <div className="cta-band-actions">
            <Button
              variant="navy"
              href={primaryHref}
              className="cta-band-btn group gap-2 whitespace-nowrap"
            >
              <FaHandshake
                className="text-base shrink-0 text-white"
                aria-hidden="true"
              />
              {resolvedPrimary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
