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
  titleClassName = "mb-4 text-[32px] font-bold leading-tight text-navy sm:mb-6 lg:leading-[36px]",
}: HomeNarrativeHeaderProps) {
  return (
    <div className="mb-10 lg:mb-12">
      {eyebrow ? (
        <span className="mb-4 block text-[14px] font-bold uppercase tracking-widest text-teal">
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
      className={`mb-4 text-[20px] font-normal leading-relaxed text-navy last:mb-0 lg:leading-[28px] ${
        fullWidth ? "max-w-none" : "max-w-4xl"
      }`}
    >
      {children}
    </p>
  );
}
