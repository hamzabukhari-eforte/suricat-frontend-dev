/** Meaningful home-page hash slugs (nav, footer, deep links). */

export const HOME_SECTION_IDS = {
  why: "why-suricat",
  platform: "platform",
  solutions: "solutions",
  industries: "industries",
} as const;

/** Why Suricat tab order — index matches WhySuricatSection tabs. */
export const WHY_TAB_SLUGS = [
  "suricats-mission",
  "built-by-practitioners",
  "the-structural-problem",
  "why-existing-systems-fall-short",
  "how-suricat-works",
  "designed-for-regulated-environments",
  "what-suricat-enables",
] as const;

/** Platform tab order — index matches PlatformIntelligenceSection tabs. */
export const PLATFORM_TAB_SLUGS = [
  "intelligence-layer",
  "read-only-by-design",
  "no-rip-and-replace",
  "human-accountability",
  "deployment",
  "regulatory-ontology",
  "canonical-intelligence-schema",
  "quality-validation-rating",
  "bounded-reasoning",
] as const;

export type WhyTabSlug = (typeof WHY_TAB_SLUGS)[number];
export type PlatformTabSlug = (typeof PLATFORM_TAB_SLUGS)[number];

/** Legacy numeric hashes kept for old bookmarks. */
const LEGACY_SECTION_IDS: Record<string, string> = {
  "why-suricat-section": HOME_SECTION_IDS.why,
  "platform-intelligence-section": HOME_SECTION_IDS.platform,
  "solutions-section": HOME_SECTION_IDS.solutions,
  "industries-section": HOME_SECTION_IDS.industries,
};

function normalizeHashId(hash: string): string {
  return decodeURIComponent(hash.replace(/^#/, ""));
}

export function whyTabHref(index: number): string {
  const slug = WHY_TAB_SLUGS[index];
  return slug ? `/#${slug}` : `/#${HOME_SECTION_IDS.why}`;
}

export function platformTabHref(index: number): string {
  const slug = PLATFORM_TAB_SLUGS[index];
  return slug ? `/#${slug}` : `/#${HOME_SECTION_IDS.platform}`;
}

export function parseWhyTabIndex(hash: string): number | null {
  const id = normalizeHashId(hash);
  if (!id) return null;

  const slugIndex = WHY_TAB_SLUGS.indexOf(id as WhyTabSlug);
  if (slugIndex >= 0) return slugIndex;

  const legacy = id.match(/^why-tab-(\d+)$/);
  if (!legacy) return null;
  const index = Number.parseInt(legacy[1], 10);
  return Number.isNaN(index) ? null : index;
}

export function parsePlatformTabIndex(hash: string): number | null {
  const id = normalizeHashId(hash);
  if (!id) return null;

  const slugIndex = PLATFORM_TAB_SLUGS.indexOf(id as PlatformTabSlug);
  if (slugIndex >= 0) return slugIndex;

  const legacy = id.match(/^platform-tab-(\d+)$/);
  if (!legacy) return null;
  const index = Number.parseInt(legacy[1], 10);
  return Number.isNaN(index) ? null : index;
}

/** Map a URL hash to the DOM section id to scroll into view. */
export function sectionIdForHash(hash: string): string | null {
  const id = normalizeHashId(hash);
  if (!id) return null;

  if (parseWhyTabIndex(`#${id}`) !== null) return HOME_SECTION_IDS.why;
  if (parsePlatformTabIndex(`#${id}`) !== null) return HOME_SECTION_IDS.platform;

  if (id in LEGACY_SECTION_IDS) return LEGACY_SECTION_IDS[id];

  return id;
}
