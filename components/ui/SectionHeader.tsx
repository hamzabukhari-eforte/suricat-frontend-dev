import type { MaxWidth } from "@/lib/layout/measure";
import {
  DEFAULT_DESCRIPTION_MAX,
  DEFAULT_TITLE_MAX,
} from "@/lib/layout/measure";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string | ReactNode;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  /** Title measure. Defaults to `max-w-3xl`. */
  titleMaxWidth?: MaxWidth;
  /** Description measure. Defaults to `max-w-4xl`. */
  descriptionMaxWidth?: MaxWidth;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleAs: TitleTag = "h2",
  titleMaxWidth = DEFAULT_TITLE_MAX,
  descriptionMaxWidth = DEFAULT_DESCRIPTION_MAX,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-sm uppercase tracking-widest text-teal font-semibold mb-3">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={`${titleMaxWidth} text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight lg:leading-[36px] text-navy`}
      >
        {title}
      </TitleTag>
      {description ? (
        <div
          className={`${descriptionMaxWidth} mt-4 text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[28px] text-navy/80 ${align === "center" ? "mx-auto" : ""}`.trim()}
        >
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      ) : null}
    </div>
  );
}
