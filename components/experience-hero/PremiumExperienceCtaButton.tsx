"use client";

import CategoryEditorialButton, {
  type CategoryEditorialButtonVariant,
} from "@/components/category/CategoryEditorialButton";

type PremiumExperienceCtaButtonProps = {
  label: string;
  variant?: CategoryEditorialButtonVariant;
} & (
  | { href: string; onAction?: never }
  | { href?: undefined; onAction: () => void }
);

/** CTA del hero — mismo estilo pill que las cards de categoría. */
export default function PremiumExperienceCtaButton({
  label,
  href,
  onAction,
  variant = "primary",
}: PremiumExperienceCtaButtonProps) {
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  if (href) {
    return (
      <CategoryEditorialButton
        href={href}
        variant={variant}
        onClick={stopPropagation}
      >
        {label}
      </CategoryEditorialButton>
    );
  }

  return (
    <CategoryEditorialButton
      variant={variant}
      onClick={(e) => {
        stopPropagation(e);
        onAction?.();
      }}
    >
      {label}
    </CategoryEditorialButton>
  );
}
