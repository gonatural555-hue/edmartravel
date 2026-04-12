"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { useUser, type Order } from "@/context/UserContext";
import { BOOKING_GLASS } from "@/lib/booking-ui";
import { SITE_CONFIG } from "@/lib/config";
import { PRODUCTS_DATA } from "@/lib/products-data";
import type { TourismExperience } from "@/lib/product-types";
import ProductCardSimple from "@/components/ProductCardSimple";
import { formatPriceARS } from "@/lib/format-price";

function hasShippingLines(order: Order) {
  const a = order.address;
  return Boolean(
    (a.addressLine1 && a.addressLine1.trim()) ||
      (a.city && a.city.trim()) ||
      (a.postalCode && a.postalCode.trim())
  );
}

const RECOMMEND_IDS = [
  "cabalgata-picada-potrerillos",
  "mono-city-tour-mendoza",
  "andes-experience-horseback-sunset-picnic",
] as const;

export default function OrderSuccessPage() {
  const locale = useLocale();
  const t = useTranslations();
  const { orders, lastOrderId } = useUser();
  const [order, setOrder] = useState<Order | null>(null);

  /** Catálogo estático (sin `node:fs`) — `getProducts()` solo es válido en servidor */
  const recommendedProducts = useMemo((): TourismExperience[] => {
    return RECOMMEND_IDS.map((id) =>
      PRODUCTS_DATA.find((p) => p.id === id)
    ).filter((p): p is TourismExperience => p != null);
  }, []);

  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const found = lastOrderId
      ? orders.find((entry) => entry.id === lastOrderId)
      : orders[0];
    if (found) setOrder(found);
  }, [orders, lastOrderId]);

  const formattedDate = useMemo(() => {
    if (!order?.date) return "";
    const date = new Date(order.date);
    const loc =
      locale === "es"
        ? "es-AR"
        : locale === "fr"
          ? "fr-FR"
          : locale === "it"
            ? "it-IT"
            : "en-US";
    return date.toLocaleDateString(loc, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [order?.date, locale]);

  const stepSetKey = useMemo(() => {
    if (!order) return "default";
    if (order.paymentMethod === "whatsapp") return "whatsapp";
    if (order.paymentMethod === "paypal" && order.status === "paid")
      return "paypalPaid";
    return "default";
  }, [order]);

  const whatsappDigits = SITE_CONFIG.contact.whatsappPhone;

  const whatsappHrefBare = useMemo(() => {
    if (!whatsappDigits) return null;
    return `https://wa.me/${whatsappDigits}`;
  }, [whatsappDigits]);

  const whatsappHref = useMemo(() => {
    if (!whatsappDigits || !order) return null;
    const text = t("orderSuccessPage.whatsappMessage")
      .replace("{id}", order.id)
      .replace("{amount}", formatPriceARS(order.subtotal));
    return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(text)}`;
  }, [order, t, whatsappDigits, locale]);

  const getNextSteps = () => {
    const base = `orderSuccessPage.steps.${stepSetKey}`;
    return [
      {
        icon: "💬",
        title: t(`${base}.1.title`),
        description: t(`${base}.1.desc`),
      },
      {
        icon: "📍",
        title: t(`${base}.2.title`),
        description: t(`${base}.2.desc`),
      },
      {
        icon: "✉️",
        title: t(`${base}.3.title`),
        description: t(`${base}.3.desc`),
      },
    ];
  };

  const reservation = order?.reservation;

  return (
    <main
      data-route="order-success"
      className="relative overflow-x-hidden bg-[#0a0908] pb-8 pt-28 text-white md:pt-32"
    >
      <div className={BOOKING_GLASS.pageBackdrop} aria-hidden />
      <div className={`${BOOKING_GLASS.container} text-center`}>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 flex w-full max-w-3xl flex-col items-center text-center md:mb-12"
        >
          <div
            className="mb-8 inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full
              bg-gradient-to-b from-white/[0.12] to-white/[0.04]
              shadow-[0_10px_40px_rgba(200,155,60,0.15)]
              ring-1 ring-accent-gold/40 ring-offset-4 ring-offset-[#0a0908]"
            aria-hidden
          >
            <svg
              className="h-10 w-10 text-accent-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.65}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-gold/90">
            {t("orderSuccessPage.kicker")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.35rem]">
            {t("orderSuccessPage.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {t("orderSuccessPage.subtitle")}
          </p>
          {order && (
            <div className="mt-8 flex w-full max-w-xl flex-col items-center space-y-8">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-md">
                <span className="text-sm text-white/60">
                  {t("orderSuccessPage.orderNumberLabel")}
                </span>
                <span className="font-mono text-sm font-semibold text-accent-gold">
                  {order.id}
                </span>
              </div>

              {whatsappHref && whatsappHrefBare && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xl"
                >
                  <p className="text-sm leading-relaxed text-white/55">
                    {t("orderSuccessPage.whatsappHeroLead")}
                  </p>
                  <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                    <Link
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-semibold text-[#0a0a0a] shadow-[0_10px_36px_rgba(37,211,102,0.25)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(37,211,102,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:flex-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <svg
                        className="h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t("orderSuccessPage.whatsappCtaPayment")}
                    </Link>
                    <Link
                      href={whatsappHrefBare}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-xl border border-white/18 bg-white/[0.06] px-6 py-3.5 text-[0.95rem] font-semibold text-white/95 backdrop-blur-md transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/40 sm:flex-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      {t("orderSuccessPage.whatsappCtaChat")}
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.header>

        {!order ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mx-auto max-w-lg text-center ${BOOKING_GLASS.panel}`}
          >
            <p className="text-white/85">{t("orderSuccessPage.noOrder")}</p>
            <p className="mt-3 text-sm text-white/50">
              {t("orderSuccessPage.noOrderHint")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href={`/${locale}/products`} className={BOOKING_GLASS.primaryCta}>
                {t("orderSuccessPage.continueShopping")}
              </Link>
              <Link
                href={`/${locale}/account`}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06]"
              >
                {t("orderSuccessPage.viewAccount")}
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
            <div className="grid w-full gap-8 lg:grid-cols-2">
              <section className={`${BOOKING_GLASS.panel} text-center`}>
                <h2 className="text-xl font-semibold text-white">
                  {t("orderSuccessPage.summaryTitle")}
                </h2>

                {order.paymentMethod === "whatsapp" && (
                  <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-50">
                    <p className="font-medium text-amber-100">
                      {t("orderSuccessPage.pendingWhatsappTitle")}
                    </p>
                    <p className="mt-1 text-amber-100/85">
                      {t("orderSuccessPage.pendingWhatsappBody")}
                    </p>
                  </div>
                )}
                {(!order.paymentMethod || order.paymentMethod === "manual") && (
                  <div className="mt-6 rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-50">
                    <p className="font-medium text-sky-100">
                      {t("orderSuccessPage.pendingManualTitle")}
                    </p>
                    <p className="mt-1 text-sky-100/85">
                      {t("orderSuccessPage.pendingManualBody")}
                    </p>
                  </div>
                )}
                {order.paymentMethod === "paypal" && order.status === "paid" && (
                  <div className="mt-6 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
                    <p className="font-medium text-emerald-100">
                      {t("orderSuccessPage.paidPaypalTitle")}
                    </p>
                    <p className="mt-1 text-emerald-100/85">
                      {t("orderSuccessPage.paidPaypalBody")}
                    </p>
                  </div>
                )}

                {reservation &&
                  (reservation.preferredDate ||
                    reservation.preferredTime ||
                    reservation.notes) && (
                    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/75">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                        {t("orderSuccessPage.reservationBlockTitle")}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {reservation.preferredDate && (
                          <li>
                            <span className="text-white/45">
                              {t("orderSuccessPage.resDate")}:{" "}
                            </span>
                            {reservation.preferredDate}
                          </li>
                        )}
                        {reservation.preferredTime && (
                          <li>
                            <span className="text-white/45">
                              {t("orderSuccessPage.resTime")}:{" "}
                            </span>
                            {reservation.preferredTime}
                          </li>
                        )}
                        <li>
                          <span className="text-white/45">
                            {t("orderSuccessPage.resParty")}:{" "}
                          </span>
                          {reservation.partySize}
                        </li>
                        {reservation.notes?.trim() && (
                          <li className="pt-2 text-white/65">
                            {reservation.notes}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                <div className="mt-8 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-2 border-b border-white/10 pb-4 text-center last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-white/45">
                          {t("checkoutPage.quantity")}: {item.quantity} ×{" "}
                          {formatPriceARS(item.price)}
                        </p>
                      </div>
                      <span className="shrink-0 font-semibold text-white">
                        {formatPriceARS(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-col items-center justify-center gap-1 text-lg font-semibold text-white">
                    <span>{t("orderSuccessPage.totalLabel")}</span>
                    <span>{formatPriceARS(order.subtotal)}</span>
                  </div>
                  {formattedDate && (
                    <p className="mt-3 text-xs text-white/45">
                      {t("orderSuccessPage.orderedOn")} {formattedDate}
                    </p>
                  )}
                </div>
              </section>

              <section className={`${BOOKING_GLASS.panel} text-center`}>
                <h2 className="text-xl font-semibold text-white">
                  {hasShippingLines(order)
                    ? t("orderSuccessPage.shippingTitle")
                    : t("orderSuccessPage.contactTitle")}
                </h2>
                <div className="mt-6 space-y-2 text-sm text-white/75">
                  <p className="text-base font-semibold text-white">
                    {order.address.fullName}
                  </p>
                  {order.address.idDocument && (
                    <p>
                      <span className="text-white/45">
                        {t("checkoutPage.form.idDocument")}:{" "}
                      </span>
                      {order.address.idDocument}
                    </p>
                  )}
                  {order.address.email && (
                    <p>
                      <span className="text-white/45">
                        {t("checkoutPage.form.email")}:{" "}
                      </span>
                      {order.address.email}
                    </p>
                  )}
                  <p>{order.address.country}</p>
                  <p className="pt-2">📞 {order.address.phone}</p>
                  {order.address.accommodation?.trim() && (
                    <p className="pt-2 text-white/80">
                      <span className="text-white/45">
                        {t("checkoutPage.form.accommodation")}:{" "}
                      </span>
                      {order.address.accommodation}
                    </p>
                  )}
                  {order.address.checkoutNotes?.trim() && (
                    <p className="text-white/65">
                      <span className="text-white/45">
                        {t("checkoutPage.form.checkoutNotes")}:{" "}
                      </span>
                      {order.address.checkoutNotes}
                    </p>
                  )}
                  {hasShippingLines(order) && (
                    <>
                      <p className="pt-2 text-white/75">
                        {order.address.addressLine1}
                        {order.address.addressLine2
                          ? `, ${order.address.addressLine2}`
                          : ""}
                      </p>
                      <p className="text-white/75">
                        {order.address.city}, {order.address.postalCode}
                      </p>
                    </>
                  )}
                </div>
              </section>
            </div>

            <section className={`${BOOKING_GLASS.panel} w-full text-center`}>
              <h2 className="text-xl font-semibold text-white">
                {t("orderSuccessPage.nextTitle")}
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {getNextSteps().map((step, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="mb-3 flex justify-center text-2xl">
                      {step.icon}
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/55">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
              {whatsappHref && (
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 text-base font-semibold text-[#0a0a0a] shadow-[0_10px_32px_rgba(37,211,102,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(37,211,102,0.3)] motion-reduce:hover:translate-y-0 sm:flex-none"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("orderSuccessPage.whatsappCta")}
                </Link>
              )}
              <Link
                href={`/${locale}/products`}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/[0.1] sm:flex-none"
              >
                {t("orderSuccessPage.continueShopping")}
              </Link>
              <Link
                href={`/${locale}/account`}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/20 px-8 py-3.5 text-base font-semibold text-white/90 transition hover:bg-white/[0.06] sm:flex-none"
              >
                {t("orderSuccessPage.viewAccount")}
              </Link>
            </div>

            {recommendedProducts.length > 0 && (
              <section className="w-full border-t border-white/10 pt-8">
                <h2 className="text-xl font-semibold text-white">
                  {t("orderSuccessPage.recommendationsTitle")}
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-white/50">
                  {t("orderSuccessPage.recommendationsSubtitle")}
                </p>
                <div className="mx-auto mt-8 grid max-w-5xl justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedProducts.map((product) => (
                    <ProductCardSimple
                      key={product.id}
                      product={product}
                      locale={locale}
                      elevated
                      labels={{
                        viewProduct: t("common.viewExperience"),
                        noImage: t("common.noImage"),
                        addToCart: t("common.addToCart"),
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
