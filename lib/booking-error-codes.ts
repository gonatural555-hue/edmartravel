/** Códigos devueltos por POST /api/bookings en el campo `error`. */
export type BookingApiErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_TRAVELER"
  | "INVALID_ITEMS"
  | "INVALID_SUBTOTAL"
  | "SUBTOTAL_MISMATCH"
  | "INVALID_PAYMENT"
  | "BOOKING_INSERT_FAILED"
  | "PASSENGER_INSERT_FAILED"
  | "INTERNAL";

const BOOKING_ERROR_I18N_KEY: Record<BookingApiErrorCode, string> = {
  UNAUTHORIZED: "checkoutPage.bookingErrorUnauthorized",
  INVALID_TRAVELER: "checkoutPage.bookingErrorTraveler",
  INVALID_ITEMS: "checkoutPage.bookingErrorItems",
  INVALID_SUBTOTAL: "checkoutPage.bookingErrorSubtotal",
  SUBTOTAL_MISMATCH: "checkoutPage.bookingErrorSubtotal",
  INVALID_PAYMENT: "checkoutPage.bookingErrorPayment",
  BOOKING_INSERT_FAILED: "checkoutPage.bookingErrorDatabase",
  PASSENGER_INSERT_FAILED: "checkoutPage.bookingErrorPassenger",
  INTERNAL: "checkoutPage.bookingErrorGeneric",
};

export function bookingErrorI18nKey(code?: string): string {
  if (code && code in BOOKING_ERROR_I18N_KEY) {
    return BOOKING_ERROR_I18N_KEY[code as BookingApiErrorCode];
  }
  return "checkoutPage.bookingErrorGeneric";
}
