"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { useUser, type Address, type Order, type UserProfile } from "@/context/UserContext";
import ReservationFlowHeader from "@/components/reservation/ReservationFlowHeader";
import ReservationFormSection from "@/components/reservation/ReservationFormSection";
import ReservationFormField, {
  inputClassName,
} from "@/components/reservation/ReservationFormField";
import ReservationPriceRow, {
  ReservationMetaRow,
  ReservationSummaryNote,
} from "@/components/reservation/ReservationPriceRow";
import {
  BOOKING_GLASS,
  RESERVATION_GRID,
  bookingMotion,
} from "@/lib/booking-ui";
import { bookingErrorI18nKey } from "@/lib/booking-error-codes";
import { isAuthUiEnabled } from "@/lib/feature-flags";
import { formatPriceARS } from "@/lib/format-price";
import { bookingIdToRequestCode } from "@/lib/reservation-code";
import { formatReservationForLocale } from "@/lib/reservation-display";

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

type FieldErrors = Partial<Record<keyof TravelerForm | "partySize", string>>;

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

function validateTraveler(
  t: TravelerForm,
  partySize: number,
  messages: {
    firstName: string;
    lastName: string;
    email: string;
    emailInvalid: string;
    phone: string;
    country: string;
    document: string;
    party: string;
  }
): FieldErrors {
  const errors: FieldErrors = {};
  if (!t.firstName.trim()) errors.firstName = messages.firstName;
  if (!t.lastName.trim()) errors.lastName = messages.lastName;
  if (!t.email.trim()) errors.email = messages.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email.trim())) {
    errors.email = messages.emailInvalid;
  }
  if (!t.phone.trim()) errors.phone = messages.phone;
  if (!t.country.trim()) errors.country = messages.country;
  if (!t.idDocument.trim()) errors.idDocument = messages.document;
  if (!Number.isFinite(partySize) || partySize < 1) {
    errors.partySize = messages.party;
  }
  return errors;
}

function mergeTravelerWithUser(
  traveler: TravelerForm,
  user: UserProfile | null
): TravelerForm {
  if (!user) return traveler;
  return {
    ...traveler,
    firstName: traveler.firstName.trim() || user.first_name?.trim() || "",
    lastName: traveler.lastName.trim() || user.last_name?.trim() || "",
    email: traveler.email.trim() || user.email || "",
  };
}

export default function CheckoutPage() {
  const { items, subtotal, reservation, updateReservation, clearCart } =
    useCart();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { user, addOrder, authInitialized } = useUser();
  const authUiEnabled = isAuthUiEnabled();
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const errorRef = useRef<HTMLDivElement>(null);

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

  const effectiveTraveler = useMemo(
    () => mergeTravelerWithUser(traveler, user),
    [traveler, user]
  );

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
      formatReservationForLocale(locale, reservationSnapshot, {
        date: t("checkoutPage.undefinedDate"),
        time: t("checkoutPage.undefinedTime"),
        party: t("checkoutPage.undefinedParty"),
      }),
    [locale, reservationSnapshot, t]
  );

  const travelerPayload = useMemo(() => {
    const ts = (s: string) => s.trim();
    return {
      fullName: `${ts(effectiveTraveler.firstName)} ${ts(effectiveTraveler.lastName)}`.trim(),
      idDocument: ts(effectiveTraveler.idDocument),
      email: ts(effectiveTraveler.email),
      phone: ts(effectiveTraveler.phone),
      country: ts(effectiveTraveler.country),
      accommodation: ts(effectiveTraveler.accommodation) || undefined,
      checkoutNotes: ts(effectiveTraveler.checkoutNotes) || undefined,
    };
  }, [effectiveTraveler]);

  const validationMessages = useMemo(
    () => ({
      firstName: t("checkoutPage.validation.firstName"),
      lastName: t("checkoutPage.validation.lastName"),
      email: t("checkoutPage.validation.email"),
      emailInvalid: t("checkoutPage.validation.emailInvalid"),
      phone: t("checkoutPage.validation.phone"),
      country: t("checkoutPage.validation.country"),
      document: t("checkoutPage.validation.document"),
      party: t("checkoutPage.validation.party"),
    }),
    [t]
  );

  const persistBookingToSupabase = async (): Promise<
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
        paymentMethod: "whatsapp",
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

  const handleConfirmOrder = async () => {
    if (items.length === 0 || isLoading) return;

    const errors = validateTraveler(
      effectiveTraveler,
      reservation.partySize,
      validationMessages
    );
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      errorRef.current?.focus();
      return;
    }

    if (authUiEnabled && (!authInitialized || !user)) {
      setBookingError(t("checkoutPage.loginRequiredBody"));
      return;
    }

    setBookingError(null);
    setIsLoading(true);

    const saved = await persistBookingToSupabase();
    if (!saved.ok) {
      setIsLoading(false);
      setBookingError(t(bookingErrorI18nKey(saved.errorCode)));
      errorRef.current?.focus();
      return;
    }

    const requestCode = bookingIdToRequestCode(saved.bookingId);
    const address = buildOrderAddress(effectiveTraveler);
    const order: Order = {
      id: saved.bookingId,
      requestCode,
      items,
      subtotal,
      address,
      date: new Date().toISOString(),
      status: "pending_coordination",
      paymentMethod: "whatsapp",
      reservation: { ...reservationSnapshot },
    };

    addOrder(order);
    clearCart();
    setIsLoading(false);
    router.push(`/${locale}/order-success`);
  };

  if (items.length === 0) {
    return (
      <main
        data-route="checkout"
        className={`${BOOKING_GLASS.pageWrap} flex min-h-[60dvh] items-center justify-center px-5 py-20`}
      >
        <div className={`max-w-md text-center ${BOOKING_GLASS.panel}`}>
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">
            {t("checkoutPage.emptyTitle")}
          </h1>
          <p className="mt-3 text-sm text-[#1a1a1a]/55">
            {t("checkoutPage.emptyText")}
          </p>
          <Link
            href={`/${locale}/products`}
            className={`${BOOKING_GLASS.primaryCta} mt-8 inline-flex`}
          >
            {t("checkoutPage.emptyCta")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-route="checkout" className={BOOKING_GLASS.pageWrap}>
      <div className={`${BOOKING_GLASS.container} pb-16 pt-[calc(var(--experience-header-height,5.5rem)+1.25rem)] md:pt-[calc(var(--experience-header-height,5.5rem)+1.75rem)]`}>
        <ReservationFlowHeader
          kicker={t("checkoutPage.kicker")}
          title={t("checkoutPage.title")}
          intro={t("checkoutPage.intro")}
          backHref={`/${locale}/cart`}
          backLabel={t("checkoutPage.backToCart")}
        />

        {authUiEnabled && authInitialized && !user && (
          <div
            className="mb-8 rounded-xl border border-amber-700/20 bg-amber-50 px-5 py-4 text-sm text-amber-950"
            role="status"
          >
            <p className="font-semibold">{t("checkoutPage.loginRequiredTitle")}</p>
            <p className="mt-2">{t("checkoutPage.loginRequiredBody")}</p>
          </div>
        )}

        <div className={RESERVATION_GRID}>
          <motion.div
            className="space-y-6"
            variants={bookingMotion.container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <ReservationFormSection
                title={t("checkoutPage.sectionPersonal")}
                hint={t("checkoutPage.sectionPersonalHint")}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <ReservationFormField
                    id="co-fn"
                    label={t("checkoutPage.form.firstName")}
                    error={fieldErrors.firstName}
                  >
                    <input
                      id="co-fn"
                      value={effectiveTraveler.firstName}
                      onChange={(e) =>
                        setTraveler((p) => ({ ...p, firstName: e.target.value }))
                      }
                      autoComplete="given-name"
                      disabled={isLoading}
                      className={inputClassName(Boolean(fieldErrors.firstName))}
                    />
                  </ReservationFormField>
                  <ReservationFormField
                    id="co-ln"
                    label={t("checkoutPage.form.lastName")}
                    error={fieldErrors.lastName}
                  >
                    <input
                      id="co-ln"
                      value={effectiveTraveler.lastName}
                      onChange={(e) =>
                        setTraveler((p) => ({ ...p, lastName: e.target.value }))
                      }
                      autoComplete="family-name"
                      disabled={isLoading}
                      className={inputClassName(Boolean(fieldErrors.lastName))}
                    />
                  </ReservationFormField>
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-email"
                      label={t("checkoutPage.form.email")}
                      error={fieldErrors.email}
                    >
                      <input
                        id="co-email"
                        type="email"
                        value={effectiveTraveler.email}
                        onChange={(e) =>
                          setTraveler((p) => ({ ...p, email: e.target.value }))
                        }
                        autoComplete="email"
                        disabled={isLoading}
                        className={inputClassName(Boolean(fieldErrors.email))}
                      />
                    </ReservationFormField>
                  </div>
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-phone"
                      label={t("checkoutPage.form.phone")}
                      error={fieldErrors.phone}
                    >
                      <input
                        id="co-phone"
                        type="tel"
                        value={traveler.phone}
                        onChange={(e) =>
                          setTraveler((p) => ({ ...p, phone: e.target.value }))
                        }
                        autoComplete="tel"
                        disabled={isLoading}
                        className={inputClassName(Boolean(fieldErrors.phone))}
                      />
                    </ReservationFormField>
                  </div>
                </div>
              </ReservationFormSection>
            </motion.div>

            <motion.div variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <ReservationFormSection
                title={t("checkoutPage.sectionExperience")}
                hint={t("checkoutPage.sectionExperienceHint")}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <ReservationFormField
                    id="co-date"
                    label={t("cartPage.fieldDate")}
                  >
                    <input
                      id="co-date"
                      type="date"
                      value={reservation.preferredDate}
                      onChange={(e) =>
                        updateReservation({ preferredDate: e.target.value })
                      }
                      disabled={isLoading}
                      className={inputClassName()}
                    />
                  </ReservationFormField>
                  <ReservationFormField
                    id="co-time"
                    label={t("cartPage.fieldTime")}
                  >
                    <input
                      id="co-time"
                      type="time"
                      value={reservation.preferredTime}
                      onChange={(e) =>
                        updateReservation({ preferredTime: e.target.value })
                      }
                      disabled={isLoading}
                      className={inputClassName()}
                    />
                  </ReservationFormField>
                  <ReservationFormField
                    id="co-party"
                    label={t("cartPage.fieldParty")}
                    error={fieldErrors.partySize}
                  >
                    <input
                      id="co-party"
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
                      disabled={isLoading}
                      className={inputClassName(Boolean(fieldErrors.partySize))}
                    />
                  </ReservationFormField>
                </div>
              </ReservationFormSection>
            </motion.div>

            <motion.div variants={bookingMotion.item} className={BOOKING_GLASS.panel}>
              <ReservationFormSection
                title={t("checkoutPage.sectionExtra")}
                hint={t("checkoutPage.sectionExtraHint")}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-country"
                      label={t("checkoutPage.form.country")}
                      error={fieldErrors.country}
                    >
                      <input
                        id="co-country"
                        value={traveler.country}
                        onChange={(e) =>
                          setTraveler((p) => ({ ...p, country: e.target.value }))
                        }
                        autoComplete="country-name"
                        disabled={isLoading}
                        className={inputClassName(Boolean(fieldErrors.country))}
                      />
                    </ReservationFormField>
                  </div>
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-doc"
                      label={t("checkoutPage.form.idDocument")}
                      error={fieldErrors.idDocument}
                    >
                      <input
                        id="co-doc"
                        value={traveler.idDocument}
                        onChange={(e) =>
                          setTraveler((p) => ({
                            ...p,
                            idDocument: e.target.value,
                          }))
                        }
                        disabled={isLoading}
                        className={inputClassName(Boolean(fieldErrors.idDocument))}
                      />
                    </ReservationFormField>
                  </div>
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-acc"
                      label={t("checkoutPage.form.accommodation")}
                    >
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
                        disabled={isLoading}
                        className={inputClassName()}
                      />
                    </ReservationFormField>
                  </div>
                  <div className="sm:col-span-2">
                    <ReservationFormField
                      id="co-notes"
                      label={t("checkoutPage.form.checkoutNotes")}
                    >
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
                        disabled={isLoading}
                        className={`${inputClassName()} min-h-[5.5rem] resize-y`}
                      />
                    </ReservationFormField>
                  </div>
                </div>
              </ReservationFormSection>
            </motion.div>
          </motion.div>

          <aside>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={BOOKING_GLASS.sticky}
            >
              <h2 className="font-theater text-lg font-semibold text-[#1a1a1a]">
                {t("checkoutPage.summary")}
              </h2>
              <p className="mt-1.5 text-sm text-[#1a1a1a]/55">
                {t("checkoutPage.summaryLead")}
              </p>

              <div className="mt-7 space-y-4 border-b border-[#1a1a1a]/8 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-medium text-[#1a1a1a]">{item.title}</p>
                      <p className="mt-1 text-xs text-[#1a1a1a]/42">
                        {t("checkoutPage.quantity")}: {item.quantity} ·{" "}
                        {formatPriceARS(item.price)}
                      </p>
                    </div>
                    <span className="shrink-0 font-semibold">
                      {formatPriceARS(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2.5">
                <ReservationMetaRow
                  label={t("checkoutPage.slotDate")}
                  value={formattedSlot.date}
                />
                <ReservationMetaRow
                  label={t("checkoutPage.slotTime")}
                  value={formattedSlot.time}
                />
                <ReservationMetaRow
                  label={t("checkoutPage.slotParty")}
                  value={formattedSlot.party}
                />
              </div>

              <div className="mt-6 border-t border-[#1a1a1a]/8 pt-6">
                <ReservationPriceRow
                  label={t("checkoutPage.total")}
                  value={formatPriceARS(subtotal)}
                  emphasis
                />
              </div>

              <ReservationSummaryNote>
                {t("checkoutPage.trustMessage")}
              </ReservationSummaryNote>

              {bookingError && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  className="mt-5 rounded-xl border border-[#B4534A]/30 bg-[#FBF0EE] px-4 py-3 text-sm text-[#7A2E28]"
                  role="alert"
                  aria-live="assertive"
                >
                  {bookingError}
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={
                  isLoading ||
                  (authUiEnabled && (!authInitialized || !user))
                }
                className={`${BOOKING_GLASS.primaryCta} mt-6 disabled:cursor-not-allowed disabled:opacity-55`}
              >
                {isLoading ? t("checkoutPage.confirming") : t("checkoutPage.confirmOrder")}
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-[#1a1a1a]/48">
                {t("checkoutPage.confirmFooterNote")}
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}
