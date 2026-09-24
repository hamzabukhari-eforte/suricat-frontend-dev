import type { MaxWidth } from "@/lib/layout/measure";
import type { Translator } from "@/lib/i18n/types";

export type SolutionCard = { icon: string; title: string; body: string };
export type SolutionOutcome = {
  icon: string;
  label: string;
  title: string;
  body: string;
};

/** Optional per-page measure overrides. Defaults live in SolutionPageContent. */
export type SolutionMeasures = {
  hero?: MaxWidth;
  heroTitle?: MaxWidth;
  heroSubtitle?: MaxWidth;
  title?: MaxWidth;
  description?: MaxWidth;
  outcomesIntro?: MaxWidth;
  readinessNote?: MaxWidth;
};

export type SolutionPageData = {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  readinessNote: string;
  measures?: SolutionMeasures;
  problem: {
    title: string;
    paragraphs: string[];
    cards: SolutionCard[];
  };
  solution: {
    title: string;
    paragraphs: string[];
    cards: SolutionCard[];
  };
  enables: {
    title: string;
    intro: string;
    outcomes: SolutionOutcome[];
  };
};

type SolutionStructure = {
  measures?: SolutionMeasures;
  problemIcons: string[];
  solutionIcons: string[];
  outcomeIcons: string[];
};

/**
 * Structural (non-copy) data for solution pages.
 * User-facing strings live in messages under `solutions.{slug}`.
 */
export const solutionPages = {
  "continuous-compliance": {
    measures: { hero: "max-w-4xl", heroTitle: "max-w-full" },
    problemIcons: [
      "fa-calendar-xmark",
      "fa-rotate",
      "fa-magnifying-glass-minus",
      "fa-chart-line",
    ],
    solutionIcons: [
      "fa-wave-square",
      "fa-network-wired",
      "fa-bell-concierge",
      "fa-timeline",
    ],
    outcomeIcons: [
      "fa-eye",
      "fa-magnifying-glass",
      "fa-file-circle-check",
      "fa-chart-mixed",
      "fa-clipboard-check",
    ],
  },
  "documentation-confidence": {
    measures: { hero: "max-w-4xl", heroTitle: "max-w-full" },
    problemIcons: [
      "fa-puzzle-piece",
      "fa-share-nodes",
      "fa-clock",
      "fa-triangle-exclamation",
    ],
    solutionIcons: [
      "fa-link",
      "fa-magnifying-glass-chart",
      "fa-route",
      "fa-shield-halved",
    ],
    outcomeIcons: [
      "fa-check-double",
      "fa-file-circle-check",
      "fa-route",
      "fa-clock-rotate-left",
      "fa-award",
    ],
  },
  "inspection-findings": {
    measures: { hero: "max-w-5xl", heroTitle: "max-w-4xl" },
    problemIcons: [
      "fa-diagram-project",
      "fa-share-nodes",
      "fa-clock-rotate-left",
      "fa-triangle-exclamation",
    ],
    solutionIcons: [
      "fa-sitemap",
      "fa-brain",
      "fa-route",
      "fa-shield-halved",
    ],
    outcomeIcons: [
      "fa-comment-dots",
      "fa-bolt",
      "fa-shield-halved",
      "fa-eye",
      "fa-circle-check",
    ],
  },
  "change-impact-assessment": {
    measures: { hero: "max-w-5xl", heroTitle: "max-w-5xl" },
    problemIcons: [
      "fa-eye-slash",
      "fa-network-wired",
      "fa-person-digging",
      "fa-triangle-exclamation",
    ],
    solutionIcons: [
      "fa-code-branch",
      "fa-magnifying-glass-chart",
      "fa-bolt",
      "fa-shield-halved",
    ],
    outcomeIcons: [
      "fa-magnifying-glass",
      "fa-eye",
      "fa-bolt",
      "fa-clock",
      "fa-bullseye",
    ],
  },
  "inspection-readiness": {
    measures: { hero: "max-w-5xl", heroTitle: "max-w-4xl" },
    problemIcons: [
      "fa-hourglass-half",
      "fa-link-slash",
      "fa-clock-rotate-left",
      "fa-triangle-exclamation",
    ],
    solutionIcons: [
      "fa-gauge-high",
      "fa-sitemap",
      "fa-magnifying-glass-chart",
      "fa-shield-halved",
    ],
    outcomeIcons: [
      "fa-eye",
      "fa-magnifying-glass-clock",
      "fa-hourglass-end",
      "fa-diagram-project",
      "fa-shield-halved",
    ],
  },
  "document-alignment": {
    measures: { hero: "max-w-4xl", heroTitle: "max-w-full" },
    problemIcons: [
      "fa-code-branch",
      "fa-layer-group",
      "fa-magnifying-glass",
      "fa-chart-line",
    ],
    solutionIcons: [
      "fa-rotate",
      "fa-network-wired",
      "fa-bell-slash",
      "fa-file-shield",
    ],
    outcomeIcons: [
      "fa-magnifying-glass",
      "fa-link",
      "fa-person-digging",
      "fa-bolt",
      "fa-clipboard-check",
    ],
  },
} as const satisfies Record<string, SolutionStructure>;

export type SolutionSlug = keyof typeof solutionPages;

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asCardArray(
  value: unknown,
): { title: string; body: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is { title?: unknown; body?: unknown } => !!v && typeof v === "object")
    .map((v) => ({
      title: typeof v.title === "string" ? v.title : "",
      body: typeof v.body === "string" ? v.body : "",
    }));
}

function asOutcomeArray(
  value: unknown,
): { label: string; title: string; body: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (v): v is { label?: unknown; title?: unknown; body?: unknown } =>
        !!v && typeof v === "object",
    )
    .map((v) => ({
      label: typeof v.label === "string" ? v.label : "",
      title: typeof v.title === "string" ? v.title : "",
      body: typeof v.body === "string" ? v.body : "",
    }));
}

/** Merge dictionary copy for `solutions.{slug}` with structural icons/measures. */
export function buildTranslatedSolutionData(
  slug: SolutionSlug,
  t: Translator,
): SolutionPageData {
  const structure = solutionPages[slug];
  const ns = `solutions.${slug}`;

  const problemCards = asCardArray(t.raw(`${ns}.problem.cards`)).map(
    (card, i) => ({
      ...card,
      icon: structure.problemIcons[i] ?? "fa-circle",
    }),
  );
  const solutionCards = asCardArray(t.raw(`${ns}.solution.cards`)).map(
    (card, i) => ({
      ...card,
      icon: structure.solutionIcons[i] ?? "fa-circle",
    }),
  );
  const outcomes = asOutcomeArray(t.raw(`${ns}.enables.outcomes`)).map(
    (outcome, i) => ({
      ...outcome,
      icon: structure.outcomeIcons[i] ?? "fa-circle",
    }),
  );

  return {
    heroTitle: t(`${ns}.heroTitle`),
    heroTitleAccent: t(`${ns}.heroTitleAccent`),
    heroSubtitle: t(`${ns}.heroSubtitle`),
    readinessNote: t(`${ns}.readinessNote`),
    measures: structure.measures,
    problem: {
      title: t(`${ns}.problem.title`),
      paragraphs: asStringArray(t.raw(`${ns}.problem.paragraphs`)),
      cards: problemCards,
    },
    solution: {
      title: t(`${ns}.solution.title`),
      paragraphs: asStringArray(t.raw(`${ns}.solution.paragraphs`)),
      cards: solutionCards,
    },
    enables: {
      title: t(`${ns}.enables.title`),
      intro: t(`${ns}.enables.intro`),
      outcomes,
    },
  };
}
