import {
  BOOKING_FIELD_ERROR,
  BOOKING_INPUT_CLASS,
  BOOKING_INPUT_ERROR_CLASS,
  BOOKING_LABEL_CLASS,
} from "@/lib/booking-ui";

type ReservationFormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export default function ReservationFormField({
  id,
  label,
  error,
  children,
}: ReservationFormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label className={BOOKING_LABEL_CLASS} htmlFor={id}>
        {label}
      </label>
      <div aria-describedby={errorId}>{children}</div>
      {error ? (
        <p id={errorId} className={BOOKING_FIELD_ERROR} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function inputClassName(hasError?: boolean) {
  return `${BOOKING_INPUT_CLASS}${hasError ? ` ${BOOKING_INPUT_ERROR_CLASS}` : ""}`;
}
