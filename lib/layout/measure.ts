/** Tailwind max-width tokens used across section / hero measures. */
export type MaxWidth =
  | "max-w-2xl"
  | "max-w-3xl"
  | "max-w-4xl"
  | "max-w-5xl"
  | "max-w-6xl"
  | "max-w-7xl"
  | "max-w-full"
  | "max-w-md"
  | "max-w-xl";

/** Site-wide content shell (nav, footer, most sections). */
export const DEFAULT_SECTION_MAX: MaxWidth = "max-w-7xl";

/** Narrow title stack (h2 / section headings). */
export const DEFAULT_TITLE_MAX: MaxWidth = "max-w-3xl";

/** Body / description copy under section headings. */
export const DEFAULT_DESCRIPTION_MAX: MaxWidth = "max-w-4xl";

/** Hero copy container (most marketing heroes). */
export const DEFAULT_HERO_MAX: MaxWidth = "max-w-5xl";

/** Hero subtitle / supporting paragraph. */
export const DEFAULT_HERO_SUBTITLE_MAX: MaxWidth = "max-w-5xl";
