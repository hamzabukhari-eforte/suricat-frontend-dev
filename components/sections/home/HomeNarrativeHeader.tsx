import type { ReactNode } from "react";

type HomeNarrativeHeaderProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  titleClassName?: string;
};

export function HomeNarrativeHeader({
  eyebrow,
  title,
  children,
  titleClassName = "text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-4 sm:mb-6 leading-tight lg:leading-[36px] text-navy",
}: HomeNarrativeHeaderProps) {
  return (
    <div className="mb-10 lg:mb-12">
      {eyebrow ? (
        <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-teal">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </div>
  );
}

export function HomeNarrativeText({
  children,
  fullWidth = false,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-base leading-relaxed text-navy last:mb-0 sm:text-lg lg:text-[20px] lg:leading-[28px] ${
        fullWidth ? "max-w-none" : "max-w-4xl"
      }`}
    >
      {children}
    </p>
  );
}
