import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  teal: "suricat-teal-btn hero-cta-hover cursor-pointer rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all",
  navy: "nav-cta-btn hero-cta-hover cursor-pointer border-2 border-navy text-white bg-navy rounded-full font-bold hover:bg-navy/90 inline-flex items-center justify-center gap-2 transition-colors",
  "outline-teal":
    "hero-cta-hover cursor-pointer border-2 border-teal text-teal bg-transparent rounded-full font-bold hover:bg-teal hover:text-navy inline-flex items-center justify-center gap-2 transition-all",
  "outline-white":
    "hero-cta-hover cursor-pointer border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-navy inline-flex items-center justify-center gap-2 transition-all",
  "outline-navy":
    "hero-cta-hover cursor-pointer border-2 border-navy text-navy bg-transparent rounded-full font-bold hover:bg-navy hover:text-white inline-flex items-center justify-center gap-2 transition-all",
  orange:
    "btn-orange hero-cta-hover cursor-pointer rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all",
  "ghost-nav":
    "nav-link-animated cursor-pointer font-bold text-navy hover:text-navy/90 transition-colors",
} as const;

const sizes = {
  sm: "px-4",
  md: "px-6",
  lg: "px-6 sm:px-8",
  xl: "px-8",
} as const;

/** Fixed CTA metrics — applied last so consumer className cannot override. */
const CTA_SIZE = "h-[42px] text-sm md:text-base leading-none";

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "teal",
  size = "md",
  className = "",
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const classes =
    variant === "ghost-nav"
      ? `${variants[variant]} ${className}`.trim()
      : `${variants[variant]} ${sizes[size]} ${className} ${CTA_SIZE}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
