import type { MaxWidth } from "@/lib/layout/measure";
import { DEFAULT_SECTION_MAX } from "@/lib/layout/measure";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  /** Content shell width. Defaults to `max-w-7xl`. */
  maxWidth?: MaxWidth;
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  maxWidth = DEFAULT_SECTION_MAX,
}: ContainerProps) {
  return (
    <Tag
      className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-6 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
