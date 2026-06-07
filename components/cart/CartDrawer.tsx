"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import CategoryEditorialButton from "@/components/category/CategoryEditorialButton";
import {
  BOOKING_GLASS,
  BOOKING_PAGE_KICKER,
  BOOKING_PAGE_TITLE,
  BOOKING_SECTION_TITLE,
  BOOKING_TEXT_FAINT,
  BOOKING_TEXT_MUTED,
  BOOKING_TEXT_PRIMARY,
} from "@/lib/booking-ui";
import { formatPriceARS } from "@/lib/format-price";
import { getSafeLocalImageSrc, PRODUCT_BLUR_DATA_URL } from "@/lib/product-image-helper";

export default function CartDrawer() {
  const {
    items,
    subtotal,
    isDrawerOpen,
    duplicateNotice,
    closeDrawer,
  } = useCart();
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    if (!isDrawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const formatVariantSummary = (item: (typeof items)[number]) => {
    if (item.variantSelections && item.variantSelections.length > 0) {
      return item.variantSelections
        .map((selection) => {
          const label = t(
            `cartPage.variantLabels.${selection.type}`,
            selection.typeLabel || selection.type
          );
          const optionKey = `cartPage.variantOptions.${selection.type}.${selection.value}`;
          const value = t(optionKey, selection.label || selection.value);
          return `${label}: ${value}`;
        })
        .join(" · ");
    }

    return item.variantSummary || "";
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && items.length > 0 ? (
        <div className="fixed inset-0 z-[120]" role="presentation">
          <motion.button
            type="button"
            aria-label={t("cartDrawer.closeCart")}
            className="absolute inset-0 bg-[#1a1a1a]/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className={`absolute inset-y-0 right-0 flex w-full flex-col bg-[#F8F5EE] shadow-[-12px_0_48px_rgba(26,26,26,0.14)] sm:max-w-[480px] ${BOOKING_GLASS.pageWrap}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="border-b border-[#1a1a1a]/10 px-5 pb-5 pt-[calc(var(--experience-header-height,5.5rem)+1rem)] sm:px-7 sm:pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)]">
                <p className={BOOKING_PAGE_KICKER}>{t("cartPage.kicker")}</p>
                <h2 id="cart-drawer-title" className={`${BOOKING_PAGE_TITLE} text-2xl md:text-3xl`}>
                  {t("cartDrawer.title")}
                </h2>
                <p className="mt-2 text-sm text-[#1a1a1a]/65">
                  {t("cartDrawer.addedConfirmation")}
                </p>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                {duplicateNotice ? (
                  <div
                    className="mb-5 rounded-xl border border-[#7A6248]/25 bg-[#7A6248]/10 px-4 py-3 text-sm leading-relaxed text-[#1a1a1a]/80"
                    role="status"
                  >
                    {t("cartDrawer.duplicateNotice")}
                  </div>
                ) : null}

                <div className="space-y-4">
                  {items.map((item) => {
                    const variantSummary = formatVariantSummary(item);
                    const imageSrc = getSafeLocalImageSrc(item.image);

                    return (
                      <article
                        key={item.id}
                        className={BOOKING_GLASS.experienceCard}
                      >
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#1a1a1a]/10 sm:h-24 sm:w-24">
                            <Image
                              src={imageSrc}
                              alt={item.title}
                              fill
                              className="object-cover object-center"
                              sizes="96px"
                              placeholder="blur"
                              blurDataURL={PRODUCT_BLUR_DATA_URL}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className={`text-base font-semibold leading-snug ${BOOKING_TEXT_PRIMARY}`}>
                              {item.title}
                            </h3>
                            <p className={`mt-1 text-sm ${BOOKING_TEXT_MUTED}`}>
                              {formatPriceARS(item.price)}
                              {variantSummary ? ` · ${variantSummary}` : ""}
                            </p>
                            <p className={`mt-2 text-xs uppercase tracking-[0.12em] ${BOOKING_TEXT_FAINT}`}>
                              {item.quantity}{" "}
                              {item.quantity === 1
                                ? t("cartDrawer.entrySingular")
                                : t("cartDrawer.entryPlural")}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className={`text-xs uppercase tracking-wider ${BOOKING_TEXT_FAINT}`}>
                              {t("cartPage.itemSubtotal")}
                            </p>
                            <p className={`mt-1 text-lg font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                              {formatPriceARS(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <footer className="border-t border-[#1a1a1a]/10 bg-[#F8F5EE] px-5 py-5 sm:px-7">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className={BOOKING_SECTION_TITLE}>{t("cartPage.summarySubtotal")}</p>
                    <p className="mt-1 text-sm text-[#1a1a1a]/55">
                      {t("cartDrawer.summaryHint")}
                    </p>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums text-[#1a1a1a]">
                    {formatPriceARS(subtotal)}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <CategoryEditorialButton
                    href={`/${locale}/cart`}
                    onClick={closeDrawer}
                    className="w-full"
                  >
                    {t("cartDrawer.completeBooking")}
                  </CategoryEditorialButton>

                  <CategoryEditorialButton
                    variant="secondary"
                    onClick={closeDrawer}
                    className="w-full"
                  >
                    {t("cartDrawer.continueShopping")}
                  </CategoryEditorialButton>

                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="mt-1 w-full py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]/55 transition-colors hover:text-[#1a1a1a]"
                  >
                    {t("cartDrawer.closeCart")}
                  </button>
                </div>
              </footer>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
