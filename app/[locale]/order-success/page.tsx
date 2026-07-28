"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { useUser } from "@/context/UserContext";
import { BOOKING_GLASS, RESERVATION_GRID } from "@/lib/booking-ui";
import { bookingIdToRequestCode } from "@/lib/reservation-code";
import {
  buildWhatsAppReservationUrl,
  type WhatsAppMessageLabels,
} from "@/lib/reservation-whatsapp";
import OrderStatusBadge from "@/components/reservation/OrderStatusBadge";
import ReservationTimeline from "@/components/reservation/ReservationTimeline";
import {
  ReservationCustomerDetails,
  ReservationOrderItemsSummary,
} from "@/components/reservation/ReservationSummaryDetails";
import WhatsAppReservationButton from "@/components/reservation/WhatsAppReservationButton";
import RecommendedExperiences from "@/components/reservation/RecommendedExperiences";
import ReservationFlowHeader from "@/components/reservation/ReservationFlowHeader";
import { PRODUCTS_DATA } from "@/lib/products-data";
import type { TourismExperience } from "@/lib/product-types";
import { isAuthUiEnabled } from "@/lib/feature-flags";

const RECOMMEND_IDS = [
  "cabalgata-picada-potrerillos",
  "mono-city-tour-mendoza",
  "andes-experience-horseback-sunset-picnic",
] as const;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function OrderSuccessPage() {
  const locale = useLocale();
  const t = useTranslations();
  const { orders, lastOrderId } = useUser();
  const authUiEnabled = isAuthUiEnabled();
  const isClient = useIsClient();
  const [copied, setCopied] = useState(false);

  const order = useMemo(() => {
    if (!orders?.length) return null;
    return lastOrderId
      ? orders.find((entry) => entry.id === lastOrderId) ?? orders[0]
      : orders[0];
  }, [orders, lastOrderId]);

  const requestCode = useMemo(() => {
    if (!order) return "";
    return order.requestCode ?? bookingIdToRequestCode(order.id);
  }, [order]);

  const whatsappLabels = useMemo((): WhatsAppMessageLabels => {
    const wl = (key: string) => t(`orderSuccessPage.whatsappLabels.${key}`);
    return {
      greeting: wl("greeting"),
      codeSection: wl("codeSection"),
      passengerSection: wl("passengerSection"),
      experiencesSection: wl("experiencesSection"),
      totalSection: wl("totalSection"),
      notesSection: wl("notesSection"),
      closing: wl("closing"),
      labelName: wl("labelName"),
      labelLastName: wl("labelLastName"),
      labelEmail: wl("labelEmail"),
      labelPhone: wl("labelPhone"),
      labelCountry: wl("labelCountry"),
      labelDocument: wl("labelDocument"),
      labelAccommodation: wl("labelAccommodation"),
      labelQuantity: wl("labelQuantity"),
      labelParty: wl("labelParty"),
      labelDate: wl("labelDate"),
      labelTime: wl("labelTime"),
      labelPrice: wl("labelPrice"),
      labelSubtotal: wl("labelSubtotal"),
      toCoordinate: wl("toCoordinate"),
    };
  }, [t]);

  const whatsappHref = useMemo(() => {
    if (!order) return null;
    return buildWhatsAppReservationUrl(order, whatsappLabels);
  }, [order, whatsappLabels]);

  const recommendedProducts = useMemo((): TourismExperience[] => {
    return RECOMMEND_IDS.map((id) =>
      PRODUCTS_DATA.find((p) => p.id === id)
    ).filter((p): p is TourismExperience => p != null);
  }, []);

  const bookedIds = order?.items.map((i) => i.id) ?? [];

  const timelineSteps = useMemo(
    () => [
      {
        id: "1",
        title: t("orderSuccessPage.timeline.1.title"),
        description: t("orderSuccessPage.timeline.1.desc"),
        state: "completed" as const,
      },
      {
        id: "2",
        title: t("orderSuccessPage.timeline.2.title"),
        description: t("orderSuccessPage.timeline.2.desc"),
        state: "current" as const,
      },
      {
        id: "3",
        title: t("orderSuccessPage.timeline.3.title"),
        description: t("orderSuccessPage.timeline.3.desc"),
        state: "pending" as const,
      },
      {
        id: "4",
        title: t("orderSuccessPage.timeline.4.title"),
        description: t("orderSuccessPage.timeline.4.desc"),
        state: "pending" as const,
      },
    ],
    [t]
  );

  const handleCopyCode = async () => {
    if (!requestCode) return;
    try {
      await navigator.clipboard.writeText(requestCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (!isClient) {
    return (
      <main data-route="order-success" className={BOOKING_GLASS.pageWrap}>
        <div className={`${BOOKING_GLASS.container} py-24 text-center`}>
          <p className="text-sm text-[#1a1a1a]/55">{t("checkoutPage.authLoading")}</p>
        </div>
      </main>
    );
  }

  return (
    <main data-route="order-success" className={BOOKING_GLASS.pageWrap}>
      <div className={`${BOOKING_GLASS.container} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+1.75rem)]`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <ReservationFlowHeader
            kicker={t("orderSuccessPage.kicker")}
            title={t("orderSuccessPage.title")}
            intro={t("orderSuccessPage.subtitle")}
          />

          {!order ? (
            <div className={`mx-auto max-w-lg text-center ${BOOKING_GLASS.panel}`}>
              <p className="text-[#1a1a1a]/78">{t("orderSuccessPage.noOrder")}</p>
              <p className="mt-3 text-sm text-[#1a1a1a]/50">
                {t("orderSuccessPage.noOrderHint")}
              </p>
              <Link
                href={`/${locale}/products`}
                className={`${BOOKING_GLASS.primaryCta} mt-8 inline-flex`}
              >
                {t("orderSuccessPage.continueShopping")}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className={`${BOOKING_GLASS.panel} flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between`}>
                <div>
                  <OrderStatusBadge label={t("orderSuccessPage.statusBadge")} />
                  <p className="mt-4 text-sm text-[#1a1a1a]/55">
                    {t("orderSuccessPage.requestCodeLabel")}
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold tracking-wide text-[#1a1a1a]">
                    {requestCode}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#1a1a1a]/14 bg-white px-4 text-sm font-medium text-[#1a1a1a]/72 transition hover:border-[#1a1a1a]/22 hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30"
                >
                  {copied ? t("orderSuccessPage.copiedCode") : t("orderSuccessPage.copyCode")}
                </button>
              </div>

              <div className={RESERVATION_GRID}>
                <div className={BOOKING_GLASS.panel}>
                  <ReservationTimeline
                    title={t("orderSuccessPage.timelineTitle")}
                    steps={timelineSteps}
                  />
                </div>
                <div className={`${BOOKING_GLASS.panel} space-y-8`}>
                  <ReservationOrderItemsSummary
                    order={order}
                    locale={locale}
                    title={t("orderSuccessPage.summaryRequestTitle")}
                    labels={{
                      quantity: t("checkoutPage.quantity"),
                      unitPrice: t("checkoutPage.unitPrice"),
                      date: t("checkoutPage.slotDate"),
                      time: t("checkoutPage.slotTime"),
                      party: t("checkoutPage.slotParty"),
                      total: t("orderSuccessPage.totalLabel"),
                      toCoordinate: t("checkoutPage.undefinedDate"),
                      undefinedDate: t("checkoutPage.undefinedDate"),
                      undefinedTime: t("checkoutPage.undefinedTime"),
                      undefinedParty: t("checkoutPage.undefinedParty"),
                    }}
                  />
                  <ReservationCustomerDetails
                    order={order}
                    title={t("orderSuccessPage.customerTitle")}
                    labels={{
                      firstName: t("orderSuccessPage.customerLabels.firstName"),
                      lastName: t("orderSuccessPage.customerLabels.lastName"),
                      email: t("orderSuccessPage.customerLabels.email"),
                      phone: t("orderSuccessPage.customerLabels.phone"),
                      country: t("orderSuccessPage.customerLabels.country"),
                      document: t("orderSuccessPage.customerLabels.document"),
                      accommodation: t("orderSuccessPage.customerLabels.accommodation"),
                      notes: t("orderSuccessPage.customerLabels.notes"),
                      experienceNotes: t("orderSuccessPage.customerLabels.experienceNotes"),
                    }}
                  />
                </div>
              </div>

              <div className="mx-auto flex max-w-xl flex-col gap-4">
                <WhatsAppReservationButton
                  href={whatsappHref}
                  label={t("orderSuccessPage.whatsappCtaMain")}
                  unavailableMessage={t("orderSuccessPage.whatsappUnavailable")}
                />
                <Link
                  href={`/${locale}/products`}
                  className={BOOKING_GLASS.secondaryCta}
                >
                  {t("orderSuccessPage.continueShopping")}
                </Link>
                {authUiEnabled ? (
                  <Link
                    href={`/${locale}/account`}
                    className={`${BOOKING_GLASS.subtleLink} text-center`}
                  >
                    {t("orderSuccessPage.viewAccount")}
                  </Link>
                ) : null}
              </div>

              <RecommendedExperiences
                title={t("orderSuccessPage.recommendationsTitle")}
                subtitle={t("orderSuccessPage.recommendationsSubtitle")}
                products={recommendedProducts}
                locale={locale}
                viewLabel={t("common.viewExperience")}
                noImageLabel={t("common.noImage")}
                excludeIds={bookedIds}
              />
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
