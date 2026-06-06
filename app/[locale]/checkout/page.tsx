"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { useUser, type Address, type Order } from "@/context/UserContext";
import PayPalButton from "@/components/PayPalButton";
import {
  BOOKING_GLASS,
  BOOKING_INPUT_CLASS,
  BOOKING_LABEL_CLASS,
  BOOKING_PAGE_INTRO,
  BOOKING_PAGE_KICKER,
  BOOKING_PAGE_TITLE,
  BOOKING_SECTION_HINT,
  BOOKING_SECTION_TITLE,
  BOOKING_TEXT_FAINT,
  BOOKING_TEXT_MUTED,
  BOOKING_TEXT_PRIMARY,
  BOOKING_TEXT_SECONDARY,
  bookingMotion,
} from "@/lib/booking-ui";
import { formatPriceARS } from "@/lib/format-price";

type TravelerForm = {
  firstName: string;
  lastName: string;
  idDocument: string;
  country: string;
  phone: string;
  email: string;
  accommodation: string;
  checkoutNotes: string;
};

function buildOrderAddress(t: TravelerForm): Address {
  const ts = (s: string) => s.trim();
  const full = `${ts(t.firstName)} ${ts(t.lastName)}`.trim();
  return {
    id: `contact_${Date.now()}`,
    fullName: full || ts(t.email),
    phone: ts(t.phone),
    email: ts(t.email),
    idDocument: ts(t.idDocument),
    accommodation: ts(t.accommodation) || undefined,
    checkoutNotes: ts(t.checkoutNotes) || undefined,
    addressLine1: ts(t.accommodation),
    addressLine2: undefined,
    city: "",
    postalCode: "",
    country: ts(t.country),
    isDefault: true,
  };
}

function isTravelerComplete(t: TravelerForm) {
  return (
    t.firstName.trim() &&
    t.lastName.trim() &&
    t.idDocument.trim() &&
    t.country.trim() &&
    t.phone.trim() &&
    t.email.trim()
  );
}

function formatReservationLine(
  locale: string,
  dateStr: string,
  timeStr: string,
  partySize: number
) {
  const loc =
    locale === "es"
      ? "es-AR"
      : locale === "fr"
        ? "fr-FR"
        : locale === "it"
          ? "it-IT"
          : "en-US";
  let datePart = "—";
  if (dateStr) {
    const d = new Date(`${dateStr}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      datePart = d.toLocaleDateString(loc, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  }
  const timePart = timeStr || "—";
  return { datePart, timePart, partySize };
}

export default function CheckoutPage() {
  const { items, subtotal, reservation, clearCart } = useCart();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { user, addOrder, authInitialized } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "manual" | "whatsapp" | "paypal"
  >("manual");

  const [traveler, setTraveler] = useState<TravelerForm>({
    firstName: "",
    lastName: "",
    idDocument: "",
    country: "",
    phone: "",
    email: "",
    accommodation: "",
    checkoutNotes: "",
  });

  useEffect(() => {
    if (!user) return;
    setTraveler((prev) => ({
      ...prev,
      firstName:
        prev.firstName.trim() || user.first_name?.trim() || "",
      lastName: prev.lastName.trim() || user.last_name?.trim() || "",
      email: prev.email.trim() ? prev.email : user.email || "",
    }));
  }, [user?.first_name, user?.last_name, user?.email]);

  const travelerOk = useMemo(() => isTravelerComplete(traveler), [traveler]);

  const reservationSnapshot = useMemo(
    () => ({
      preferredDate: reservation.preferredDate,
      preferredTime: reservation.preferredTime,
      partySize: reservation.partySize,
      notes: reservation.notes,
    }),
    [reservation]
  );

  const formattedSlot = useMemo(
    () =>
      formatReservationLine(
        locale,
        reservation.preferredDate,
        reservation.preferredTime,
        reservation.partySize
      ),
    [
      locale,
      reservation.preferredDate,
      reservation.preferredTime,
      reservation.partySize,
    ]
  );

  const travelerPayload = useMemo(() => {
    const ts = (s: string) => s.trim();
    return {
      fullName: `${ts(traveler.firstName)} ${ts(traveler.lastName)}`.trim(),
      idDocument: ts(traveler.idDocument),
      email: ts(traveler.email),
      phone: ts(traveler.phone),
      country: ts(traveler.country),
      accommodation: ts(traveler.accommodation) || undefined,
      checkoutNotes: ts(traveler.checkoutNotes) || undefined,
    };
  }, [traveler]);

  const persistBookingToSupabase = async (
    paypalOrderId?: string
  ): Promise<
    { ok: true; bookingId: string } | { ok: false; errorCode?: string }
  > => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        traveler: travelerPayload,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        paymentMethod,
        paypalOrderId,
        reservation: reservationSnapshot,
      }),
    });
    const data = (await res.json().catch(() => null)) as {
      bookingId?: string;
      error?: string;
    } | null;
    if (!res.ok || !data?.bookingId) {
      return { ok: false, errorCode: data?.error };
    }
    return { ok: true, bookingId: data.bookingId };
  };

  const bookingErrorMessage = (code?: string) => {
    if (code === "SUBTOTAL_MISMATCH") {
      return t("checkoutPage.bookingErrorSubtotal");
    }
    return t("checkoutPage.bookingErrorGeneric");
  };

  const handleConfirmOrder = async () => {
    if (items.length === 0 || !travelerOk) return;

    if (paymentMethod === "paypal") {
      return;
    }

    if (!authInitialized || !user) {
      setBookingError(t("checkoutPage.loginRequiredBody"));
      return;
    }

    setBookingError(null);
    setIsLoading(true);

    const saved = await persistBookingToSupabase();
    if (!saved.ok) {
      setIsLoading(false);
      setBookingError(bookingErrorMessage(saved.errorCode));
      return;
    }

    const address = buildOrderAddress(traveler);
    const order: Order = {
      id: saved.bookingId,
      items,
      subtotal,
      address,
      date: new Date().toISOString(),
      status: "pending_payment",
      paymentMethod,
      reservation: { ...reservationSnapshot },
    };

    addOrder(order);

    clearCart();
    setIsLoading(false);
    router.push(`/${locale}/order-success`);
  };

  const handlePayPalSuccess = async (details: { id?: string } | null) => {
    if (items.length === 0 || !travelerOk) return;

    if (!authInitialized || !user) {
      setBookingError(t("checkoutPage.loginRequiredBody"));
      return;
    }

    setBookingError(null);
    setIsLoading(true);

    const address = buildOrderAddress(traveler);

    const saved = await persistBookingToSupabase(details?.id);
    if (!saved.ok) {
      setIsLoading(false);
      setBookingError(
        saved.errorCode
          ? bookingErrorMessage(saved.errorCode)
          : t("checkoutPage.bookingPayPalDbError")
      );
      return;
    }

    const orderId = saved.bookingId;

    try {
      const payload = {
        orderId,
        email: traveler.email.trim(),
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: subtotal,
        currency: "ARS" as const,
        paypalOrderId: details?.id,
      };

      const response = await fetch("/api/orders/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        console.error("[Checkout] Falló creación de orden PayPal en backend", {
          status: response.status,
          body: data,
        });
      }
    } catch (error) {
      console.error("[Checkout] Error llamando a /api/orders/paypal", error);
    }

    const order: Order = {
      id: orderId,
      items,
      subtotal,
      address,
      date: new Date().toISOString(),
      status: "paid",
      paymentMethod: "paypal" as const,
      paypalOrderId: details?.id,
      reservation: { ...reservationSnapshot },
    };

    addOrder(order);

    clearCart();
    setIsLoading(false);
    router.push(`/${locale}/order-success`);
  };

  const handlePayPalError = (error: unknown) => {
    console.error("PayPal payment error:", error);
    setIsLoading(false);
  };

  if (items.length === 0) {
    return (
      <main
        data-route="checkout"
        className={`${BOOKING_GLASS.pageWrap} flex min-h-[60dvh] flex-col items-center justify-center px-4 py-20`}
      >
        <div className={BOOKING_GLASS.pageBackdrop} aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative z-10 max-w-md text-center ${BOOKING_GLASS.panel}`}
        >
          <h1 className={`text-2xl font-semibold ${BOOKING_TEXT_PRIMARY}`}>
            {t("checkoutPage.emptyTitle")}
          </h1>
          <p className={`mt-3 text-sm ${BOOKING_TEXT_MUTED}`}>
            {t("checkoutPage.emptyText")}
          </p>
          <Link
            href={`/${locale}/products`}
            className={`${BOOKING_GLASS.primaryCta} mt-8`}
          >
            {t("checkoutPage.emptyCta")}
          </Link>
        </motion.div>
      </main>
    );
  }

  const paymentOptionClass = (active: boolean) =>
    `flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-4 text-sm transition-[border-color,background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ` +
    (active
      ? "border-[#1a1a1a]/25 bg-[#FFFFFF] shadow-[0_8px_28px_rgba(26,26,26,0.08)]"
      : "border-[#1a1a1a]/10 bg-[#FFFFFF] hover:border-[#1a1a1a]/18 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0");

  return (
    <main
      data-route="checkout"
      className={`${BOOKING_GLASS.pageWrap} min-h-[100dvh]`}
    >
      <div className={BOOKING_GLASS.pageBackdrop} aria-hidden />
      <div className={`${BOOKING_GLASS.container} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.5rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+2rem)]`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className={BOOKING_PAGE_KICKER}>
              {t("checkoutPage.kicker")}
            </p>
            <h1 className={BOOKING_PAGE_TITLE}>
              {t("checkoutPage.title")}
            </h1>
            <p className={BOOKING_PAGE_INTRO}>
              {t("checkoutPage.intro")}
            </p>
          </div>
          <Link
            href={`/${locale}/cart`}
            className={`text-sm font-medium ${BOOKING_TEXT_SECONDARY} transition hover:text-[#1a1a1a]`}
          >
            {t("checkoutPage.backToCart")}
          </Link>
        </motion.div>

        {authInitialized && !user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-2xl border border-amber-600/20 bg-amber-50 px-5 py-4 text-sm text-amber-950"
            role="status"
          >
            <p className="font-semibold text-amber-950">
              {t("checkoutPage.loginRequiredTitle")}
            </p>
            <p className="mt-2 text-amber-900/85">
              {t("checkoutPage.loginRequiredBody")}
            </p>
            <Link
              href={`/${locale}/auth`}
              className={`${BOOKING_GLASS.primaryCta} mt-4 !w-auto !min-h-[40px] !px-5 !py-2 !text-xs`}
            >
              {t("checkoutPage.loginCta")}
            </Link>
          </motion.div>
        )}

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            className="space-y-6 lg:col-span-3"
            variants={bookingMotion.container}
            initial="hidden"
            animate="show"
          >
            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>
                {t("checkoutPage.sectionPersonal")}
              </h2>
              <p className={BOOKING_SECTION_HINT}>{t("checkoutPage.sectionPersonalHint")}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-fn">
                    {t("checkoutPage.form.firstName")}
                  </label>
                  <input
                    id="co-fn"
                    value={traveler.firstName}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, firstName: e.target.value }))
                    }
                    autoComplete="given-name"
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-ln">
                    {t("checkoutPage.form.lastName")}
                  </label>
                  <input
                    id="co-ln"
                    value={traveler.lastName}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, lastName: e.target.value }))
                    }
                    autoComplete="family-name"
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-email">
                    {t("checkoutPage.form.email")}
                  </label>
                  <input
                    id="co-email"
                    value={traveler.email}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, email: e.target.value }))
                    }
                    type="email"
                    autoComplete="email"
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-phone">
                    {t("checkoutPage.form.phone")}
                  </label>
                  <input
                    id="co-phone"
                    value={traveler.phone}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, phone: e.target.value }))
                    }
                    type="tel"
                    autoComplete="tel"
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
              </div>
              {user && (
                <p className={`mt-6 text-xs ${BOOKING_TEXT_FAINT}`}>
                  <Link
                    href={`/${locale}/account`}
                    className="font-medium text-[#3A5F4A] underline-offset-4 transition hover:text-[#1a1a1a]"
                  >
                    {t("checkoutPage.manageAccountLink")}
                  </Link>
                </p>
              )}
            </motion.section>

            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>
                {t("checkoutPage.sectionExtra")}
              </h2>
              <p className={BOOKING_SECTION_HINT}>{t("checkoutPage.sectionExtraHint")}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-country">
                    {t("checkoutPage.form.country")}
                  </label>
                  <input
                    id="co-country"
                    value={traveler.country}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, country: e.target.value }))
                    }
                    autoComplete="country-name"
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-doc">
                    {t("checkoutPage.form.idDocument")}
                  </label>
                  <input
                    id="co-doc"
                    value={traveler.idDocument}
                    onChange={(e) =>
                      setTraveler((p) => ({ ...p, idDocument: e.target.value }))
                    }
                    required
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-acc">
                    {t("checkoutPage.form.accommodation")}
                  </label>
                  <input
                    id="co-acc"
                    value={traveler.accommodation}
                    onChange={(e) =>
                      setTraveler((p) => ({
                        ...p,
                        accommodation: e.target.value,
                      }))
                    }
                    placeholder={t("checkoutPage.form.accommodationPlaceholder")}
                    className={BOOKING_INPUT_CLASS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={BOOKING_LABEL_CLASS} htmlFor="co-notes">
                    {t("checkoutPage.form.checkoutNotes")}
                  </label>
                  <textarea
                    id="co-notes"
                    rows={3}
                    value={traveler.checkoutNotes}
                    onChange={(e) =>
                      setTraveler((p) => ({
                        ...p,
                        checkoutNotes: e.target.value,
                      }))
                    }
                    placeholder={t("checkoutPage.form.checkoutNotesPlaceholder")}
                    className={`${BOOKING_INPUT_CLASS} min-h-[5rem] resize-y`}
                  />
                </div>
              </div>
            </motion.section>

            <motion.section variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <h2 className={BOOKING_SECTION_TITLE}>
                {t("checkoutPage.paymentMethod")}
              </h2>
              <p className={BOOKING_SECTION_HINT}>{t("checkoutPage.paymentHint")}</p>
              <div className="mt-8 space-y-3">
                {(
                  [
                    {
                      value: "manual" as const,
                      label: t("checkoutPage.paymentOptions.manual.label"),
                      hint: t("checkoutPage.paymentOptions.manual.hint"),
                    },
                    {
                      value: "whatsapp" as const,
                      label: t("checkoutPage.paymentOptions.whatsapp.label"),
                      hint: t("checkoutPage.paymentOptions.whatsapp.hint"),
                    },
                    {
                      value: "paypal" as const,
                      label: t("checkoutPage.paymentOptions.paypal.label"),
                      hint: t("checkoutPage.paymentOptions.paypal.hint"),
                    },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className={paymentOptionClass(paymentMethod === option.value)}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className="mt-1 h-4 w-4 shrink-0 border-[#1a1a1a]/25 bg-white text-[#1a1a1a] focus:ring-[#1a1a1a]/15"
                    />
                    <span className="space-y-1">
                      <span className={`block font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                        {option.label}
                      </span>
                      <span className={`block text-xs ${BOOKING_TEXT_MUTED}`}>
                        {option.hint}
                      </span>
                    </span>
                  </label>
                ))}
                {paymentMethod === "paypal" && (
                  <div className="mt-6 border-t border-[#1a1a1a]/10 pt-6">
                    {!authInitialized ? (
                      <p className={`rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-sm ${BOOKING_TEXT_MUTED}`}>
                        {t("checkoutPage.authLoading")}
                      </p>
                    ) : !user ? (
                      <p className="rounded-xl border border-amber-600/20 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                        {t("checkoutPage.loginRequiredBody")}
                      </p>
                    ) : !travelerOk ? (
                      <p className="rounded-xl border border-amber-600/20 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                        {t("checkoutPage.paypalNeedTraveler")}
                      </p>
                    ) : (
                      <PayPalButton
                        amount={subtotal}
                        currency="ARS"
                        onSuccess={handlePayPalSuccess}
                        onError={handlePayPalError}
                        onCancel={() => setIsLoading(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.section>
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className={BOOKING_GLASS.sticky}
            >
              <h2 className={`text-lg font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                {t("checkoutPage.summary")}
              </h2>
              <p className={`mt-1 text-sm ${BOOKING_TEXT_MUTED}`}>
                {t("checkoutPage.summaryLead")}
              </p>

              <div className="mt-8 space-y-4 border-b border-[#1a1a1a]/10 pb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className={`font-medium ${BOOKING_TEXT_PRIMARY}`}>{item.title}</p>
                      <p className={`mt-1 text-xs ${BOOKING_TEXT_FAINT}`}>
                        {t("checkoutPage.quantity")}: {item.quantity} ·{" "}
                        {formatPriceARS(item.price)} {t("checkoutPage.unitPrice")}
                      </p>
                    </div>
                    <span className={`shrink-0 font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                      {formatPriceARS(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className={`flex justify-between gap-3 ${BOOKING_TEXT_SECONDARY}`}>
                  <span>{t("checkoutPage.slotDate")}</span>
                  <span className={`text-right font-medium ${BOOKING_TEXT_PRIMARY}`}>
                    {formattedSlot.datePart}
                  </span>
                </div>
                <div className={`flex justify-between gap-3 ${BOOKING_TEXT_SECONDARY}`}>
                  <span>{t("checkoutPage.slotTime")}</span>
                  <span className={`text-right font-medium ${BOOKING_TEXT_PRIMARY}`}>
                    {formattedSlot.timePart}
                  </span>
                </div>
                <div className={`flex justify-between gap-3 ${BOOKING_TEXT_SECONDARY}`}>
                  <span>{t("checkoutPage.slotParty")}</span>
                  <span className={`font-medium ${BOOKING_TEXT_PRIMARY}`}>
                    {formattedSlot.partySize}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between border-t border-[#1a1a1a]/10 pt-8">
                <span className={`text-sm font-medium uppercase tracking-wider ${BOOKING_TEXT_FAINT}`}>
                  {t("checkoutPage.total")}
                </span>
                <span className={`text-2xl font-semibold ${BOOKING_TEXT_PRIMARY}`}>
                  {formatPriceARS(subtotal)}
                </span>
              </div>

              <p className={`mt-6 rounded-xl border border-[#1a1a1a]/8 bg-[#FFFFFF] px-4 py-3 text-xs leading-relaxed ${BOOKING_TEXT_MUTED}`}>
                {t("checkoutPage.trustMessage")}
              </p>

              <p className={`mt-4 text-xs leading-relaxed ${BOOKING_TEXT_FAINT}`}>
                {t("checkoutPage.summaryNote")}
              </p>

              {bookingError && (
                <p
                  className="mt-6 rounded-xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-xs text-rose-900"
                  role="alert"
                >
                  {bookingError}
                </p>
              )}

              {paymentMethod !== "paypal" && (
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={
                    isLoading ||
                    !travelerOk ||
                    !authInitialized ||
                    !user
                  }
                  className={`${BOOKING_GLASS.primaryCta} mt-8`}
                >
                  {isLoading
                    ? t("checkoutPage.confirming")
                    : t("checkoutPage.confirmOrder")}
                </button>
              )}

              <p className={`mt-6 text-center text-[0.7rem] ${BOOKING_TEXT_FAINT}`}>
                {t("checkoutPage.terms")}
              </p>

              <Link
                href={`/${locale}/cart`}
                className={`${BOOKING_GLASS.subtleLink} mt-6 block text-center`}
              >
                {t("checkoutPage.backToCart")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
