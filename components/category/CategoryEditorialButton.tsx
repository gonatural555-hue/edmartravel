"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

export type CategoryEditorialButtonVariant = "primary" | "secondary";

const PRIMARY =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white px-8 py-3 text-sm font-medium tracking-[0.04em] text-[#1a1a1a] transition-[background-color,color,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]/40";

const SECONDARY =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#1a1a1a]/15 bg-transparent px-8 py-3 text-sm font-medium tracking-[0.04em] text-[#1a1a1a]/85 transition-[background-color,color,border-color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]/40";

export function categoryEditorialButtonClass(
  variant: CategoryEditorialButtonVariant = "primary",
  className = ""
) {
  const base = variant === "primary" ? PRIMARY : SECONDARY;
  return `${base} ${className}`.trim();
}

type BaseProps = {
  children: ReactNode;
  variant?: CategoryEditorialButtonVariant;
  className?: string;
};

type AsLink = BaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type AsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type CategoryEditorialButtonProps = AsLink | AsButton;

/** CTA editorial premium — pill, fondo blanco / outline, hover invertido. */
export default function CategoryEditorialButton(
  props: CategoryEditorialButtonProps
) {
  const { children, variant = "primary", className = "" } = props;
  const classes = categoryEditorialButtonClass(variant, className);

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as AsButton;
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
