import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  teal: "suricat-teal-btn cursor-pointer rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all",
  navy: "cursor-pointer border-2 border-navy text-white bg-navy rounded-full font-bold hover:bg-navy/90 inline-flex items-center justify-center gap-2 transition-colors",
  "outline-teal":
    "cursor-pointer border-2 border-teal text-teal bg-transparent rounded-full font-bold hover:bg-teal hover:text-navy inline-flex items-center justify-center gap-2 transition-all",
  "outline-white":
    "cursor-pointer border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-navy inline-flex items-center justify-center gap-2 transition-all",
  "outline-navy":
    "cursor-pointer border-2 border-navy text-navy bg-transparent rounded-full font-bold hover:bg-navy hover:text-white inline-flex items-center justify-center gap-2 transition-all",
  orange:
    "btn-orange cursor-pointer rounded-full font-bold inline-flex items-center justify-center gap-2 transition-all",
  "ghost-nav":
    "nav-link-animated cursor-pointer font-bold text-navy hover:text-navy/90 transition-colors",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-6 sm:px-8 py-3 sm:py-3.5 text-sm",
  xl: "px-8 py-2.5 text-base",
} as const;

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
  const classes = `${variants[variant]} ${variant === "ghost-nav" ? "" : sizes[size]} ${className}`.trim();

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
