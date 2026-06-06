"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const BASE =
  "home-cta group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-none border-0 px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] antialiased transition-[color,background-color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:text-xs sm:tracking-[0.12em]";

const VARIANTS = {
  /** Negro sólido → invierte a blanco al hover (referencia primaria) */
  primary:
    "home-cta--primary bg-black text-white hover:bg-white hover:text-black",
  /** Transparente → invierte a relleno al hover (referencia secundaria) */
  secondary:
    "home-cta--secondary bg-transparent text-white hover:bg-white hover:text-black",
} as const;

export type HomeCtaVariant = keyof typeof VARIANTS;

type HomeCtaButtonBaseProps = {
  variant?: HomeCtaVariant;
  className?: string;
  children: ReactNode;
};

type HomeCtaButtonAsButton = HomeCtaButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children"> & {
    href?: undefined;
  };

type HomeCtaButtonAsLink = HomeCtaButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
    href: string;
  };

export type HomeCtaButtonProps = HomeCtaButtonAsButton | HomeCtaButtonAsLink;

function HomeCtaContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="home-cta__shimmer" aria-hidden />
      <span className="relative z-[1]">{children}</span>
    </>
  );
}

export default function HomeCtaButton({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: HomeCtaButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`.trim();

  if (href) {
    const { ...linkProps } = props as Omit<
      ComponentPropsWithoutRef<typeof Link>,
      "children"
    >;
    return (
      <Link href={href} className={classes} {...linkProps}>
        <HomeCtaContent>{children}</HomeCtaContent>
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as Omit<
    ComponentPropsWithoutRef<"button">,
    "children"
  >;

  return (
    <button type={type} className={classes} {...buttonProps}>
      <HomeCtaContent>{children}</HomeCtaContent>
    </button>
  );
}
