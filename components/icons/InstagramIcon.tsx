import type { SVGProps } from "react";

type InstagramIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/** Icono Instagram — hereda `currentColor` del contenedor. */
export default function InstagramIcon({
  size = 20,
  className,
  ...props
}: InstagramIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
