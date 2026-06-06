"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import {
  BOOKING_GLASS,
  BOOKING_INPUT_CLASS,
  BOOKING_LABEL_CLASS,
  BOOKING_PAGE_INTRO,
  BOOKING_PAGE_KICKER,
  BOOKING_PAGE_TITLE,
  BOOKING_QTY_CONTROL,
  BOOKING_SECTION_HINT,
  BOOKING_SECTION_TITLE,
  BOOKING_TEXT_FAINT,
  BOOKING_TEXT_MUTED,
  BOOKING_TEXT_PRIMARY,
  BOOKING_TEXT_SECONDARY,
  bookingMotion,
} from "@/lib/booking-ui";
import { formatPriceARS } from "@/lib/format-price";

export default function CartPage() {
  const {
    items,
    subtotal,
    reservation,
    updateReservation,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const handleCheckout = () => {
    router.push(`/${locale}/checkout`);
  };

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

  if (items.length === 0) {
    return (
      <main
        data-route="cart"
        className={`${BOOKING_GLASS.pageWrap} flex flex-col`}
      >
        <div className={BOOKING_GLASS.pageBackdrop} aria-hidden />
        <div className="relative z-10 flex min-h-[70dvh] flex-col items-center justify-center px-4 pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.5rem)]">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/assets/images/hero/emptycart.webp"
              alt={t("cartPage.emptyImageAlt")}
              fill
              className="object-cover object-center opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EE]/40 via-[#F8F5EE]/88 to-[#F8F5EE]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-center"
          >
            <h1 className={`mb-4 ${BOOKING_PAGE_TITLE}`}>
              {t("cartPage.emptyTitle")}
            </h1>
            <p className={`mb-10 text-base leading-relaxed ${BOOKING_TEXT_MUTED}`}>
              {t("cartPage.emptyText")}
            </p>
            <Link
              href={`/${locale}/products`}
              className={BOOKING_GLASS.primaryCta}
            >
              {t("cartPage.emptyCta")}
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main data-route="cart" className={BOOKING_GLASS.pageWrap}>
      <div className={BOOKING_GLASS.pageBackdrop} aria-hidden />
      <div className={`${BOOKING_GLASS.container} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.5rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+2rem)]`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 md:mb-12"
        >
          <p className={BOOKING_PAGE_KICKER}>
            {t("cartPage.kicker")}
          </p>
          <h1 className={BOOKING_PAGE_TITLE}>
            {t("cartPage.title")}
          </h1>
          <p className={BOOKING_PAGE_INTRO}>
            {t("cartPage.intro")}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            className="space-y-6 lg:col-span-3"
            variants={bookingMotion.container}
            initial="hidden"
            animate="show"
          >
            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>{t("cartPage.experienceSection")}</h2>
              <p className={BOOKING_SECTION_HINT}>{t("cartPage.experienceHint")}</p>
              <div className="mt-8 space-y-6">
                {items.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  return (
                    <div key={item.id} className={BOOKING_GLASS.experienceCard}>
                      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                        {item.image ? (
                          <div className="relative mx-auto h-40 w-full shrink-0 overflow-hidden rounded-xl border border-[#1a1a1a]/10 sm:mx-0 sm:h-32 sm:w-40">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto h-40 w-full shrink-0 rounded-xl border border-[#1a1a1a]/10 bg-[#1a1a1a]/4 sm:mx-0 sm:h-32 sm:w-40" />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-lg font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                            {item.title}
                          </h3>
                          <p className={`mt-2 text-sm ${BOOKING_TEXT_MUTED}`}>
                            {formatPriceARS(item.price)}
                            {formatVariantSummary(item)
                              ? ` · ${formatVariantSummary(item)}`
                              : ""}
                          </p>
                          <div className="mt-5 flex flex-wrap items-center gap-4">
                            <div className={BOOKING_QTY_CONTROL}>
                              <button
                                type="button"
                                onClick={() => decreaseQty(item.id)}
                                className={`px-4 py-2 text-lg ${BOOKING_TEXT_SECONDARY} transition hover:bg-[#1a1a1a]/5`}
                                aria-label={t("cartPage.decreaseQty")}
                              >
                                −
                              </button>
                              <span className={`min-w-[3rem] border-x border-[#1a1a1a]/12 px-4 py-2 text-center text-sm font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => increaseQty(item.id)}
                                className={`px-4 py-2 text-lg ${BOOKING_TEXT_SECONDARY} transition hover:bg-[#1a1a1a]/5`}
                                aria-label={t("cartPage.increaseQty")}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-sm font-medium text-rose-700/90 underline-offset-4 transition hover:text-rose-800"
                            >
                              {t("cartPage.remove")}
                            </button>
                          </div>
                        </div>
                        <div className="text-right sm:pt-1">
                          <p className={`text-xs uppercase tracking-wider ${BOOKING_TEXT_FAINT}`}>
                            {t("cartPage.itemSubtotal")}
                          </p>
                          <p className={`text-xl font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                            {formatPriceARS(itemSubtotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>{t("cartPage.detailsSection")}</h2>
              <p className={BOOKING_SECTION_HINT}>{t("cartPage.detailsHint")}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="res-date">
                    {t("cartPage.fieldDate")}
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={reservation.preferredDate}
                    onChange={(e) =>
                      updateReservation({ preferredDate: e.target.value })
                    }
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="res-time">
                    {t("cartPage.fieldTime")}
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    value={reservation.preferredTime}
                    onChange={(e) =>
                      updateReservation({ preferredTime: e.target.value })
                    }
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="res-party">
                    {t("cartPage.fieldParty")}
                  </label>
                  <input
                    id="res-party"
                    type="number"
                    min={1}
                    max={99}
                    value={reservation.partySize}
                    onChange={(e) =>
                      updateReservation({
                        partySize: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="res-notes">
                    {t("cartPage.fieldNotes")}
                  </label>
                  <textarea
                    id="res-notes"
                    rows={4}
                    value={reservation.notes}
                    onChange={(e) =>
                      updateReservation({ notes: e.target.value })
                    }
                    placeholder={t("cartPage.fieldNotesPlaceholder")}
                    className={`${BOOKING_INPUT_CLASS} min-h-[6rem] resize-y`}
                  />
                </div>
              </div>
            </motion.section>
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={BOOKING_GLASS.sticky}
            >
              <h2 className={`text-lg font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                {t("cartPage.summaryTitle")}
              </h2>
              <p className={`mt-1 text-sm ${BOOKING_TEXT_MUTED}`}>{t("cartPage.summaryLead")}</p>

              <ul className="mt-8 space-y-4 border-b border-[#1a1a1a]/10 pb-8">
                {items.map((item) => (
                  <li
                    key={`sum-${item.id}`}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className={BOOKING_TEXT_SECONDARY}>
                      {item.title}
                      <span className={BOOKING_TEXT_FAINT}>
                        {" "}
                        ×{item.quantity}
                      </span>
                    </span>
                    <span className={`shrink-0 font-medium ${BOOKING_TEXT_PRIMARY}`}>
                      {formatPriceARS(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between gap-4">
                <span className={`text-sm font-medium uppercase tracking-wider ${BOOKING_TEXT_FAINT}`}>
                  {t("cartPage.summaryTotal")}
                </span>
                <span className={`text-2xl font-semibold tracking-tight ${BOOKING_TEXT_PRIMARY}`}>
                  {formatPriceARS(subtotal)}
                </span>
              </div>

              <p className={`mt-6 text-xs leading-relaxed ${BOOKING_TEXT_FAINT}`}>
                {t("cartPage.summaryNote")}
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                className={`${BOOKING_GLASS.primaryCta} mt-8`}
              >
                {t("cartPage.confirmCta")}
              </button>

              <Link
                href={`/${locale}/products`}
                className={`${BOOKING_GLASS.subtleLink} mt-6 block text-center`}
              >
                {t("cartPage.continueShopping")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
