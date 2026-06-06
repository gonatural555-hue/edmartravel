"use client";

import HomeCtaButton, {
  type HomeCtaVariant,
} from "@/components/home/HomeCtaButton";

type PremiumExperienceCtaButtonProps = {
  label: string;
  onAction: () => void;
  variant?: HomeCtaVariant;
};

/** CTA editorial — esquinas rectas, mayúsculas, inversión de color al hover */
export default function PremiumExperienceCtaButton({
  label,
  onAction,
  variant = "primary",
}: PremiumExperienceCtaButtonProps) {
  return (
    <HomeCtaButton
      variant={variant}
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
    >
      {label}
    </HomeCtaButton>
  );
}
