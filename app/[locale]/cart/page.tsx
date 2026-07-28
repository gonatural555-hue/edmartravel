"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import ReservationFlowHeader from "@/components/reservation/ReservationFlowHeader";
import ReservationExperienceCard from "@/components/reservation/ReservationExperienceCard";
import ReservationPriceRow, {
  ReservationSummaryNote,
} from "@/components/reservation/ReservationPriceRow";
import ReservationFormField, {
  inputClassName,
} from "@/components/reservation/ReservationFormField";
import {
  BOOKING_GLASS,
  BOOKING_SECTION_HINT,
  BOOKING_SECTION_TITLE,
  RESERVATION_GRID,
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
      <main data-route="cart" className={BOOKING_GLASS.pageWrap}>
        <div className="relative z-10 flex min-h-[70dvh] flex-col items-center justify-center px-5 pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)]">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/assets/images/hero/emptycart.webp"
              alt={t("cartPage.emptyImageAlt")}
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EE]/50 via-[#F8F5EE]/92 to-[#F8F5EE]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-lg text-center ${BOOKING_GLASS.panel}`}
          >
            <h1 className="font-theater text-3xl font-semibold text-[#1a1a1a]">
              {t("cartPage.emptyTitle")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#1a1a1a]/58">
              {t("cartPage.emptyText")}
            </p>
            <Link
              href={`/${locale}/products`}
              className={`${BOOKING_GLASS.primaryCta} mt-8 inline-flex`}
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
      <div className={`${BOOKING_GLASS.container} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+1.75rem)]`}>
        <ReservationFlowHeader
          kicker={t("cartPage.kicker")}
          title={t("cartPage.title")}
          intro={t("cartPage.intro")}
        />

        <div className={RESERVATION_GRID}>
          <motion.div
            className="space-y-6"
            variants={bookingMotion.container}
            initial="hidden"
            animate="show"
          >
            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>{t("cartPage.experienceSection")}</h2>
              <p className={BOOKING_SECTION_HINT}>{t("cartPage.experienceHint")}</p>
              <div className="mt-7 space-y-5">
                {items.map((item) => (
                  <ReservationExperienceCard
                    key={item.id}
                    item={item}
                    variantSummary={formatVariantSummary(item) || undefined}
                    unitPriceLabel={t("cartPage.unitPrice")}
                    subtotalLabel={t("cartPage.itemSubtotal")}
                    removeLabel={t("cartPage.remove")}
                    decreaseLabel={t("cartPage.decreaseQty")}
                    increaseLabel={t("cartPage.increaseQty")}
                    onDecrease={() => decreaseQty(item.id)}
                    onIncrease={() => increaseQty(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            </motion.section>

            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>{t("cartPage.detailsSection")}</h2>
              <p className={BOOKING_SECTION_HINT}>{t("cartPage.detailsHint")}</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <ReservationFormField
                  id="res-date"
                  label={t("cartPage.fieldDate")}
                >
                  <input
                    id="res-date"
                    type="date"
                    value={reservation.preferredDate}
                    onChange={(e) =>
                      updateReservation({ preferredDate: e.target.value })
                    }
                    className={inputClassName()}
                  />
                </ReservationFormField>
                <ReservationFormField
                  id="res-time"
                  label={t("cartPage.fieldTime")}
                >
                  <input
                    id="res-time"
                    type="time"
                    value={reservation.preferredTime}
                    onChange={(e) =>
                      updateReservation({ preferredTime: e.target.value })
                    }
                    className={inputClassName()}
                  />
                </ReservationFormField>
                <ReservationFormField
                  id="res-party"
                  label={t("cartPage.fieldParty")}
                >
                  <input
                    id="res-party"
                    type="number"
                    min={1}
                    max={999}
                    value={reservation.partySize}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10);
                      updateReservation({
                        partySize: Number.isFinite(n) && n > 0 ? n : 1,
                      });
                    }}
                    className={inputClassName()}
                  />
                </ReservationFormField>
                <div className="sm:col-span-2">
                  <ReservationFormField
                    id="res-notes"
                    label={t("cartPage.fieldNotes")}
                  >
                    <textarea
                      id="res-notes"
                      rows={4}
                      value={reservation.notes}
                      onChange={(e) =>
                        updateReservation({ notes: e.target.value })
                      }
                      placeholder={t("cartPage.fieldNotesPlaceholder")}
                      className={`${inputClassName()} min-h-[6rem] resize-y`}
                    />
                  </ReservationFormField>
                </div>
              </div>
            </motion.section>
          </motion.div>

          <aside>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className={BOOKING_GLASS.sticky}
            >
              <h2 className="font-theater text-lg font-semibold text-[#1a1a1a]">
                {t("cartPage.summaryTitle")}
              </h2>
              <p className="mt-1.5 text-sm text-[#1a1a1a]/55">
                {t("cartPage.summaryLead")}
              </p>

              <ul className="mt-7 space-y-3.5 border-b border-[#1a1a1a]/8 pb-6">
                {items.map((item) => (
                  <li
                    key={`sum-${item.id}`}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-[#1a1a1a]/68">
                      {item.title}
                      <span className="text-[#1a1a1a]/42"> ×{item.quantity}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-[#1a1a1a]">
                      {formatPriceARS(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <ReservationPriceRow
                  label={t("cartPage.summaryTotal")}
                  value={formatPriceARS(subtotal)}
                  emphasis
                />
              </div>

              <ReservationSummaryNote>
                {t("cartPage.summaryNote")}
              </ReservationSummaryNote>

              <button
                type="button"
                onClick={() => router.push(`/${locale}/checkout`)}
                className={`${BOOKING_GLASS.primaryCta} mt-7`}
              >
                {t("cartPage.confirmCta")}
              </button>

              <Link
                href={`/${locale}/products`}
                className={`${BOOKING_GLASS.subtleLink} mt-5 block text-center`}
              >
                {t("cartPage.continueShopping")}
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}
