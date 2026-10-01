"use client";

import {
  HomeNarrativeHeader,
  HomeNarrativeText,
} from "@/components/sections/home/HomeNarrativeHeader";
import {
  FaCube,
  FaFileLines,
  FaGear,
  FaMagnifyingGlass,
  FaShieldHalved,
  FaTriangleExclamation,
  FaUsers,
} from "@/components/ui/icons";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";

type NodeTone = "requirement" | "affected" | "evidence" | "ghost";

const CARD_GAP = 12; // consistent gap between arrow tip and card edge

function DiagramNode({
  label,
  badge,
  Icon,
  tone,
  nodeRef,
}: {
  label: string;
  badge?: string;
  Icon: IconType;
  tone: NodeTone;
  nodeRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const isRow = tone === "requirement";

  return (
    <div
      ref={nodeRef}
      className={`ag-node ag-node-${tone}${isRow ? " ag-node-row" : ""}`}
    >
      <span className="ag-node-icon-wrap" aria-hidden="true">
        <Icon className="ag-node-icon" />
      </span>
      <div className="ag-node-copy">
        <span className="ag-node-label">{label}</span>
        {badge ? <span className="ag-node-badge">{badge}</span> : null}
      </div>
    </div>
  );
}

type AlignGeom = {
  width: number;
  height: number;
  d: string;
  issueX: number;
  issueY: number;
};

type TreeGeom = {
  width: number;
  height: number;
  trunk: string;
  branches: string[];
  hubX: number;
  hubY: number;
  evidence: string;
};

/** Sharp L-elbow: hub → horizontal → vertical down to card (with gap). */
function sharpElbow(
  hubX: number,
  hubY: number,
  toX: number,
  toY: number,
): string {
  return `M ${hubX} ${hubY} H ${toX} V ${toY}`;
}

function AlignmentDiagram({ t }: { t: (key: string) => string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);
  const procRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const capaRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<AlignGeom | null>(null);
  const [tree, setTree] = useState<TreeGeom | null>(null);
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    const root = visualRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIconsReady(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIconsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIconsReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const update = () => {
      const diagram = diagramRef.current;
      const body = bodyRef.current;
      const req = reqRef.current;
      const proc = procRef.current;
      const risk = riskRef.current;
      const train = trainRef.current;
      const evidence = evidenceRef.current;
      if (!diagram || !body || !req || !proc || !risk || !train || !evidence) {
        return;
      }

      const dr = diagram.getBoundingClientRect();
      const br = body.getBoundingClientRect();
      const rr = req.getBoundingClientRect();
      const pr = proc.getBoundingClientRect();
      const rk = risk.getBoundingClientRect();
      const tr = train.getBoundingClientRect();
      const er = evidence.getBoundingClientRect();

      const ghostBottoms = [controlRef, capaRef, designRef]
        .map((ref) => ref.current?.getBoundingClientRect().bottom)
        .filter((v): v is number => typeof v === "number")
        .map((b) => b - br.top);

      // Orange U: left 25% of Procedure / Training — no start arrow.
      const x1 = pr.left + pr.width * 0.25 - br.left;
      const y1 = pr.bottom - br.top;
      const x2 = tr.left + tr.width * 0.25 - br.left;
      const y2 = tr.bottom - br.top;

      const deepest =
        ghostBottoms.length > 0
          ? Math.max(...ghostBottoms)
          : Math.max(y1, y2);
      // Extra clearance so orange never touches ghost card bottoms.
      const midY = deepest + 52;

      const neededHeight = midY + 36;
      const bodyHeight = Math.max(br.height, neededHeight);
      const alignD = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
      const issueX = (x1 + x2) / 2;
      const issueY = midY;

      setGeom((prev) => {
        if (
          prev &&
          prev.width === br.width &&
          prev.height === bodyHeight &&
          prev.d === alignD &&
          prev.issueX === issueX &&
          prev.issueY === issueY
        ) {
          return prev;
        }
        return {
          width: br.width,
          height: bodyHeight,
          d: alignD,
          issueX,
          issueY,
        };
      });

      // Teal tree: sharp L-elbows, stop CARD_GAP above each card.
      const hubX = rr.left + rr.width / 2 - dr.left;
      const hubStartY = rr.bottom - dr.top + 2;
      const hubY = hubStartY + 16;
      const targets = [pr, rk, tr].map((r) => ({
        x: r.left + r.width / 2 - dr.left,
        y: r.top - dr.top - CARD_GAP,
      }));
      const trunk = `M ${hubX} ${hubStartY} V ${hubY}`;
      const branches = targets.map((target) =>
        sharpElbow(hubX, hubY, target.x, target.y),
      );

      // Evidence link from Training — horizontal with gaps on both ends.
      const ex1 = tr.right - dr.left + CARD_GAP;
      const ex2 = er.left - dr.left - CARD_GAP;
      const eY =
        (tr.top + tr.height * 0.45 + (er.top + er.height * 0.45)) / 2 -
        dr.top;
      const evidenceBalanced = `M ${ex1} ${eY} H ${ex2}`;

      const nextTree: TreeGeom = {
        width: dr.width,
        height: dr.height,
        trunk,
        branches,
        hubX,
        hubY,
        evidence: evidenceBalanced,
      };

      setTree((prev) => {
        if (
          prev &&
          prev.width === nextTree.width &&
          prev.height === nextTree.height &&
          prev.trunk === nextTree.trunk &&
          prev.hubX === nextTree.hubX &&
          prev.hubY === nextTree.hubY &&
          prev.evidence === nextTree.evidence &&
          prev.branches.join("|") === nextTree.branches.join("|")
        ) {
          return prev;
        }
        return nextTree;
      });
    };

    update();

    const ro = new ResizeObserver(update);
    if (diagramRef.current) ro.observe(diagramRef.current);
    if (bodyRef.current) ro.observe(bodyRef.current);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const issueStyle: CSSProperties | undefined = geom
    ? {
        left: geom.issueX,
        top: geom.issueY,
      }
    : undefined;

  return (
    <div
      ref={visualRef}
      className={`ag-visual${iconsReady ? " ag-icons-ready" : ""}`}
    >
      <div className="ag-visual-header">
        <p className="ag-visual-kicker">{t("visual.kicker")}</p>
        <p className="ag-visual-example">{t("visual.example")}</p>
      </div>

      <div className="ag-diagram" aria-hidden="true" ref={diagramRef}>
        <div className="ag-flow-root">
          <DiagramNode
            label={t("nodes.requirement")}
            badge={t("badges.revised")}
            Icon={FaFileLines}
            tone="requirement"
            nodeRef={reqRef}
          />
        </div>

        <div className="ag-flow-spacer" />

        <div
          className="ag-flow-body"
          ref={bodyRef}
          style={geom ? { minHeight: geom.height } : undefined}
        >
          <div className="ag-col">
            <DiagramNode
              label={t("nodes.procedure")}
              badge={t("badges.affected")}
              Icon={FaFileLines}
              tone="affected"
              nodeRef={procRef}
            />
            <span className="ag-flow-link ag-flow-link-gray" />
            <DiagramNode
              label={t("nodes.control")}
              Icon={FaShieldHalved}
              tone="ghost"
              nodeRef={controlRef}
            />
          </div>

          <div className="ag-col">
            <DiagramNode
              label={t("nodes.risk")}
              badge={t("badges.affected")}
              Icon={FaTriangleExclamation}
              tone="affected"
              nodeRef={riskRef}
            />
            <span className="ag-flow-link ag-flow-link-gray" />
            <DiagramNode
              label={t("nodes.capa")}
              Icon={FaGear}
              tone="ghost"
              nodeRef={capaRef}
            />
          </div>

          <div className="ag-col ag-col-wide">
            <div className="ag-training-row">
              <div className="ag-training-stack">
                <DiagramNode
                  label={t("nodes.training")}
                  badge={t("badges.affected")}
                  Icon={FaUsers}
                  tone="affected"
                  nodeRef={trainRef}
                />
              </div>
              <span className="ag-evidence-gap" />
              <DiagramNode
                label={t("nodes.evidence")}
                badge={t("badges.needsAttention")}
                Icon={FaMagnifyingGlass}
                tone="evidence"
                nodeRef={evidenceRef}
              />
            </div>
            <div className="ag-under-training">
              <span className="ag-flow-link ag-flow-link-gray" />
              <DiagramNode
                label={t("nodes.design")}
                Icon={FaCube}
                tone="ghost"
                nodeRef={designRef}
              />
            </div>
          </div>

          {geom ? (
            <svg
              className="ag-align-svg"
              width={geom.width}
              height={geom.height}
              viewBox={`0 0 ${geom.width} ${geom.height}`}
            >
              <defs>
                <marker
                  id="ag-orange-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path
                    d="M 1 1 L 9 5 L 1 9"
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </marker>
              </defs>
              <path
                className="ag-align-stroke"
                d={geom.d}
                markerEnd="url(#ag-orange-arrow)"
              />
            </svg>
          ) : null}

          {geom ? (
            <div className="ag-issue" style={issueStyle}>
              <span className="ag-issue-mark" aria-hidden="true">
                !
              </span>
              <span className="ag-issue-label">{t("alignmentIssue")}</span>
            </div>
          ) : null}
        </div>

        {tree ? (
          <svg
            className="ag-tree-svg"
            width={tree.width}
            height={tree.height}
            viewBox={`0 0 ${tree.width} ${tree.height}`}
          >
            <defs>
              <marker
                id="ag-teal-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M 1.5 1.5 L 8.5 5 L 1.5 8.5"
                  fill="none"
                  stroke="#19d3c5"
                  strokeWidth="1.45"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </marker>
              <marker
                id="ag-evidence-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="4.5"
                markerHeight="4.5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M 1.5 1.5 L 8.5 5 L 1.5 8.5"
                  fill="none"
                  stroke="#19d3c5"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </marker>
            </defs>

            <path className="ag-tree-trunk" d={tree.trunk} />
            {tree.branches.map((d, i) => (
              <path
                key={i}
                className="ag-tree-branch"
                d={d}
                markerEnd="url(#ag-teal-arrow)"
              />
            ))}
            <circle
              className="ag-tree-hub-glow"
              cx={tree.hubX}
              cy={tree.hubY}
              r="6.5"
            />
            <circle
              className="ag-tree-hub"
              cx={tree.hubX}
              cy={tree.hubY}
              r="3.25"
            />

            <path
              className="ag-evidence-stroke"
              d={tree.evidence}
              markerEnd="url(#ag-evidence-arrow)"
            />
          </svg>
        ) : null}
      </div>

      <div className="ag-steps">
        <div className="ag-step">
          <span className="ag-step-num">1</span>
          <div className="ag-step-body">
            <p className="ag-step-q">{t("steps.s1.q")}</p>
            <div className="ag-step-row">
              <span className="ag-step-chip ag-step-chip-requirement">
                <FaFileLines aria-hidden="true" />
              </span>
              <p className="ag-step-a">{t("steps.s1.a")}</p>
            </div>
          </div>
        </div>

        <div className="ag-step">
          <span className="ag-step-num">2</span>
          <div className="ag-step-body">
            <p className="ag-step-q">{t("steps.s2.q")}</p>
            <div className="ag-step-list">
              <div className="ag-step-row">
                <span className="ag-step-chip ag-step-chip-procedure">
                  <FaFileLines aria-hidden="true" />
                </span>
                <p className="ag-step-a">{t("nodes.procedure")}</p>
              </div>
              <div className="ag-step-row">
                <span className="ag-step-chip ag-step-chip-risk">
                  <FaTriangleExclamation aria-hidden="true" />
                </span>
                <p className="ag-step-a">{t("nodes.risk")}</p>
              </div>
              <div className="ag-step-row">
                <span className="ag-step-chip ag-step-chip-training">
                  <FaUsers aria-hidden="true" />
                </span>
                <p className="ag-step-a">{t("nodes.training")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ag-step">
          <span className="ag-step-num">3</span>
          <div className="ag-step-body">
            <p className="ag-step-q">{t("steps.s3.q")}</p>
            <div className="ag-step-row">
              <span className="ag-step-chip ag-step-chip-issue">
                <FaTriangleExclamation aria-hidden="true" />
              </span>
              <p className="ag-step-a">{t("steps.s3.a")}</p>
            </div>
          </div>
        </div>

        <div className="ag-step">
          <span className="ag-step-num">4</span>
          <div className="ag-step-body">
            <p className="ag-step-q">{t("steps.s4.q")}</p>
            <div className="ag-step-row ag-step-row-evidence">
              <span
                className="ag-step-chip ag-step-chip-evidence ag-step-chip-file-search"
                aria-hidden="true"
              >
                <span className="ag-file-search-icon">
                  <FaFileLines className="ag-file-search-doc" />
                  <FaMagnifyingGlass className="ag-file-search-mag" />
                </span>
              </span>
              <p className="ag-step-a ag-step-a-multiline">{t("steps.s4.a")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlignmentGapSection() {
  const t = useTranslations("home.alignmentGap");

  return (
    <section id="alignment-gap" className="bg-surface-muted pt-12 pb-10">
      <Container>
        <HomeNarrativeHeader eyebrow={t("sectionTitle")} title={t("headline")}>
          <HomeNarrativeText fullWidth>{t("lead")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p1")}</HomeNarrativeText>
          <HomeNarrativeText fullWidth>{t("p2")}</HomeNarrativeText>
          <p className="mb-0 max-w-none text-base font-semibold leading-relaxed text-navy sm:text-lg lg:text-[20px] lg:leading-[28px]">
            {t("closer")}
          </p>
        </HomeNarrativeHeader>

        <AlignmentDiagram t={t} />
      </Container>
    </section>
  );
}
