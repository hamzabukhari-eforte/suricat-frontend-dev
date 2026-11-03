"use client";

import {
  FaCircleCheck,
  FaShieldHalved,
  FaTriangleExclamation,
} from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useEffect, useRef, useState } from "react";

type BridgePath = {
  d: string;
  w: number;
  h: number;
};

export function WhySuricatSection() {
  const t = useTranslations("home.why");
  const tf = useTranslations("home.why.flow");
  const flowRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [bridge, setBridge] = useState<BridgePath | null>(null);

  useEffect(() => {
    const flow = flowRef.current;
    const step1 = step1Ref.current;
    const ghost = ghostRef.current;
    if (!flow || !step1 || !ghost) return;

    const update = () => {
      const flowRect = flow.getBoundingClientRect();
      const stepRect = step1.getBoundingClientRect();

      // Keep alt-row tracks identical to the card row (so ghost sits under step 3)
      const connectors = flow.querySelectorAll<HTMLElement>(
        ".why-flow-main .why-flow-connector",
      );
      const spacers = flow.querySelectorAll<HTMLElement>(
        ".why-flow-alt-spacer.is-connector",
      );
      connectors.forEach((connector, i) => {
        const spacer = spacers[i];
        if (!spacer) return;
        const width = `${connector.getBoundingClientRect().width}px`;
        spacer.style.width = width;
        spacer.style.minWidth = width;
        spacer.style.maxWidth = width;
      });

      const ghostRect = ghost.getBoundingClientRect();
      const w = flowRect.width;
      const h = flowRect.height;
      const sideBySide = ghostRect.left > stepRect.right - 24;
      if (!sideBySide || h < 40) {
        setBridge(null);
        return;
      }

      const x1 = stepRect.left - flowRect.left + stepRect.width * 0.22;
      const y1 = stepRect.bottom - flowRect.top - 1;
      // Clear gap (16) + arrow tip overrun (~8) before outer left edge
      const x2 = ghostRect.left - flowRect.left - 16 - 8;
      const y2 = ghostRect.top - flowRect.top + ghostRect.height * 0.5;
      setBridge({
        w,
        h,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x1.toFixed(1)} ${y2.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(flow);
    ro.observe(step1);
    ro.observe(ghost);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="why-suricat" className="why-suricat-section pt-24 pb-8 lg:pb-12">
      <Container>
        <div className="why-suricat-header">
          <p className="why-suricat-eyebrow">{t("sectionTitle")}</p>
          <h2 className="why-suricat-title">
            <span className="why-suricat-title-line">{t("headlineLine1")}</span>
            <span className="why-suricat-title-line">{t("headlineLine2")}</span>
          </h2>
        </div>

        <div className="why-flow" aria-label={t("sectionTitle")} ref={flowRef}>
          {bridge ? (
            <svg
              className="why-flow-bridge is-live"
              width={bridge.w}
              height={bridge.h}
              viewBox={`0 0 ${bridge.w} ${bridge.h}`}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="why-flow-bridge-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M1 1.4 L9 5 L1 8.6 Z" fill="rgba(13, 27, 62, 0.5)" />
                </marker>
              </defs>
              <path
                d={bridge.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2.5 5.5"
                strokeLinecap="round"
                markerEnd="url(#why-flow-bridge-arrow)"
              />
            </svg>
          ) : null}

          <div className="why-flow-main">
            <article className="why-flow-card is-step1" ref={step1Ref}>
              <div className="why-flow-card-top">
                <span className="why-flow-icon is-violet" aria-hidden="true">
                  <FaShieldHalved />
                </span>
                <span className="why-flow-num">01</span>
              </div>
              <h3 className="why-flow-card-title">{tf("step1Title")}</h3>
              <p className="why-flow-card-body">{tf("step1Body")}</p>
            </article>

            <div className="why-flow-connector is-teal" aria-hidden="true">
              <span className="why-flow-connector-label">{tf("connectorSuricat")}</span>
              <span className="why-flow-connector-line" />
            </div>

            <article className="why-flow-card is-step2">
              <div className="why-flow-card-top">
                <span className="why-flow-icon is-orange" aria-hidden="true">
                  <FaTriangleExclamation />
                </span>
                <span className="why-flow-num">02</span>
              </div>
              <h3 className="why-flow-card-title">{tf("step2Title")}</h3>
              <p className="why-flow-card-body">{tf("step2Body")}</p>
              <span className="why-flow-badge">{tf("step2Badge")}</span>
            </article>

            <div className="why-flow-connector is-navy" aria-hidden="true">
              <span className="why-flow-connector-label">{tf("connectorReview")}</span>
              <span className="why-flow-connector-line" />
            </div>

            <article className="why-flow-card is-step3">
              <div className="why-flow-card-top">
                <span className="why-flow-icon is-teal" aria-hidden="true">
                  <FaCircleCheck />
                </span>
                <span className="why-flow-num">03</span>
              </div>
              <h3 className="why-flow-card-title">{tf("step3Title")}</h3>
              <p className="why-flow-card-body">{tf("step3Body")}</p>
            </article>
          </div>

          <div className="why-flow-alt" aria-hidden="true">
            <span className="why-flow-alt-spacer" />
            <span className="why-flow-alt-spacer is-connector" />
            <span className="why-flow-alt-spacer" />
            <span className="why-flow-alt-spacer is-connector" />
            <div className="why-flow-ghost" ref={ghostRef}>
              <p className="why-flow-ghost-text">{tf("unnoticed")}</p>
            </div>
          </div>
        </div>

        <div className="why-suricat-footer">
          <p className="why-suricat-body">
            <span className="why-suricat-body-line">{t("bodyLine1")}</span>
            <span className="why-suricat-body-line">{t("bodyLine2")}</span>
          </p>
          <p className="why-suricat-tagline">{t("tagline")}</p>
          <p className="why-suricat-punchline">{t("punchline")}</p>
        </div>
      </Container>
    </section>
  );
}
