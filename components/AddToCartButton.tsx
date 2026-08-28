"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  title: string;
  price: number;
  image?: string;
  variantSelections?: {
    type: string;
    typeLabel?: string;
    value: string;
    label?: string;
  }[];
  disabled?: boolean;
  label?: string;
  className?: string;
  /** PDP: hover con fondo oscuro y texto dorado */
  variant?: "default" | "invert" | "editorial";
  /** Abre el panel lateral de carrito tras agregar (PDP / cards). */
  openDrawerOnAdd?: boolean;
};

export default function AddToCartButton({
  id,
  title,
  price,
  image,
  variantSelections,
  disabled,
  label,
  className,
  variant = "default",
  openDrawerOnAdd = false,
}: Props) {
  const { addItem, reserveAndOpen } = useCart();

  const handleClick = () => {
    const payload = { id, title, price, image, variantSelections };
    if (openDrawerOnAdd) {
      reserveAndOpen(payload);
      return;
    }
    addItem(payload);
  };

  const variantClass =
    variant === "editorial"
      ? "w-full rounded-full border border-[#1a1a1a]/20 bg-white text-[#1a1a1a] hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:shadow-[0_8px_28px_rgba(26,26,26,0.12)]"
      : variant === "invert"
      ? "w-full border-2 border-accent-gold bg-accent-gold text-dark-base hover:bg-dark-base hover:text-accent-gold hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
      : "w-full md:w-auto bg-accent-gold text-dark-base hover:bg-accent-gold/90 hover:shadow-[0_12px_26px_rgba(200,155,60,0.25)]";

  const focusRingClass =
    variant === "editorial"
      ? "focus-visible:ring-[#1a1a1a]/30 focus-visible:ring-offset-[#F8F5EE]"
      : "focus-visible:ring-accent-gold/80 focus-visible:ring-offset-dark-base";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={[
        variantClass,
        "px-6 py-3 rounded-md font-semibold",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        focusRingClass,
        "active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label || "Add to cart"}
    </button>
  );
}
