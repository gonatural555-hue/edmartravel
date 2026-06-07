"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import CategoryEditorialButton from "@/components/category/CategoryEditorialButton";
import {
  BOOKING_GLASS,
  BOOKING_PAGE_TITLE,
  BOOKING_QTY_CONTROL,
  BOOKING_SECTION_TITLE,
  BOOKING_TEXT_FAINT,
  BOOKING_TEXT_PRIMARY,
  BOOKING_TEXT_SECONDARY,
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
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    if (!isDrawerOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
  };

  const drawerTransition = {
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const backdropTransition = {
    duration: 0.32,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  useEffect(() => {
    if (isDrawerOpen && items.length === 0) {
      closeDrawer();
    }
  }, [isDrawerOpen, items.length, closeDrawer]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isDrawerOpen ? (
        <>
          <motion.button
            key="cart-drawer-backdrop"
            type="button"
            aria-label={t("cartDrawer.closeCart")}
            className="fixed inset-0 z-[120] bg-[#1a1a1a]/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={closeDrawer}
          />

          <motion.aside
            key="cart-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="fixed inset-y-0 right-0 z-[121] flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-[#F8F5EE] text-[#1a1a1a] shadow-[-12px_0_48px_rgba(26,26,26,0.14)] sm:max-w-[480px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerTransition}
          >
            <header className="shrink-0 border-b border-[#1a1a1a]/10 px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-7 sm:pb-4 sm:pt-5">
              <h2 id="cart-drawer-title" className={`${BOOKING_PAGE_TITLE} text-[1.65rem] leading-tight sm:text-2xl`}>
                {t("cartDrawer.title")}
              </h2>
              <p className="mt-1 text-sm leading-snug text-[#1a1a1a]/65">
                {t("cartDrawer.addedConfirmation")}
              </p>
            </header>

            <div
              className="scrollbar-none min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-y-contain px-5 py-4 sm:px-7 sm:py-5"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
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
                    const imageSrc = getSafeLocalImageSrc(item.image);

                    return (
                      <article
                        key={item.id}
                        className={`${BOOKING_GLASS.experienceCard} flex min-h-[11.5rem] flex-col sm:min-h-[12.5rem]`}
                      >
                        <div className="flex min-h-0 flex-1 gap-3 sm:gap-4">
                          <div className="relative h-24 w-24 shrink-0 self-start overflow-hidden rounded-xl border border-[#1a1a1a]/10">
                            <Image
                              src={imageSrc}
                              alt={item.title}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 640px) 96px, 96px"
                              placeholder="blur"
                              blurDataURL={PRODUCT_BLUR_DATA_URL}
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <h3
                              className={`font-theater text-[0.9375rem] font-semibold uppercase leading-snug tracking-[-0.02em] sm:text-base ${BOOKING_TEXT_PRIMARY}`}
                            >
                              {item.title}
                            </h3>
                            <p className={`mt-2 text-sm ${BOOKING_TEXT_SECONDARY}`}>
                              {t("cartPage.unitPrice")}
                            </p>
                            <p className={`text-lg font-semibold tabular-nums sm:text-xl ${BOOKING_TEXT_PRIMARY}`}>
                              {formatPriceARS(item.price)}
                            </p>
                            <p className="cart-drawer-item-subtotal mt-auto pt-3 text-right text-base font-semibold tabular-nums sm:text-lg">
                              {t("cartPage.itemSubtotal")}{" "}
                              {formatPriceARS(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#1a1a1a]/8 pt-4">
                          <div className={BOOKING_QTY_CONTROL}>
                            <button
                              type="button"
                              onClick={() => decreaseQty(item.id)}
                              className={`px-3.5 py-1.5 text-lg ${BOOKING_TEXT_SECONDARY} transition hover:bg-[#1a1a1a]/5`}
                              aria-label={t("cartPage.decreaseQty")}
                            >
                              −
                            </button>
                            <span
                              className={`min-w-[2.75rem] border-x border-[#1a1a1a]/12 px-3 py-1.5 text-center text-sm font-semibold ${BOOKING_TEXT_PRIMARY}`}
                              aria-live="polite"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQty(item.id)}
                              className={`px-3.5 py-1.5 text-lg ${BOOKING_TEXT_SECONDARY} transition hover:bg-[#1a1a1a]/5`}
                              aria-label={t("cartPage.increaseQty")}
                            >
                              +
                            </button>
                          </div>

                          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="hidden text-sm font-medium text-rose-700/90 underline-offset-4 transition hover:text-rose-800 sm:inline"
                            >
                              {t("cartPage.remove")}
                            </button>
                            <p className={`text-[0.6875rem] font-medium uppercase tracking-[0.14em] sm:text-xs ${BOOKING_TEXT_FAINT}`}>
                              {item.quantity}{" "}
                              {item.quantity === 1
                                ? t("cartDrawer.entrySingular")
                                : t("cartDrawer.entryPlural")}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
            </div>

            <footer
              className="cart-drawer-footer"
              tabIndex={0}
              aria-label={t("cartDrawer.footerLabel", "Resumen y acciones del carrito")}
            >
              <div className="cart-drawer-footer__summary">
                <div>
                  <p className={`cart-drawer-footer__summary-title ${BOOKING_SECTION_TITLE}`}>
                    {t("cartPage.summarySubtotal")}
                  </p>
                  <p className="cart-drawer-footer__summary-hint text-[#1a1a1a]/55">
                    {t("cartDrawer.summaryHint")}
                  </p>
                </div>
                <p className={`cart-drawer-footer__total font-semibold tabular-nums text-[#1a1a1a]`}>
                  {formatPriceARS(subtotal)}
                </p>
              </div>

              <div className="cart-drawer-footer__actions">
                <CategoryEditorialButton
                  href={`/${locale}/cart`}
                  onClick={closeDrawer}
                  className="cart-drawer-footer__cta w-full"
                >
                  {t("cartDrawer.completeBooking")}
                </CategoryEditorialButton>

                <CategoryEditorialButton
                  variant="secondary"
                  onClick={closeDrawer}
                  className="cart-drawer-footer__cta w-full"
                >
                  {t("cartDrawer.continueShopping")}
                </CategoryEditorialButton>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="cart-drawer-footer__close w-full text-center font-semibold uppercase text-[#1a1a1a]/55 transition-colors hover:text-[#1a1a1a]"
                >
                  {t("cartDrawer.closeCart")}
                </button>
              </div>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
