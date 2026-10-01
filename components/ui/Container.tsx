import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  /** Horizontal padding. Defaults to true (`px-4 sm:px-6`). */
  padded?: boolean;
};

/**
 * Site-wide content shell — 90vw, capped at 1600px.
 * Prefer this over ad-hoc `max-w-* mx-auto` wrappers.
 */
export function Container({
  children,
  className = "",
  as: Tag = "div",
  padded = true,
}: ContainerProps) {
  return (
    <Tag
      className={`suricat-container w-[90vw] max-w-[1800px] mx-auto ${padded ? "px-4 sm:px-6" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
