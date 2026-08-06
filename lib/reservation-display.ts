import type { ReservationSnapshot } from "@/context/UserContext";

export function displayReservationDate(
  dateStr: string | undefined,
  fallback: string
): string {
  const t = dateStr?.trim();
  if (!t) return fallback;
  const d = new Date(`${t}T12:00:00`);
  if (Number.isNaN(d.getTime())) return t;
  return d.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function displayReservationTime(
  timeStr: string | undefined,
  fallback: string
): string {
  const t = timeStr?.trim();
  return t || fallback;
}

export function displayPartySize(
  partySize: number | undefined,
  fallback: string
): string {
  if (typeof partySize === "number" && partySize > 0) {
    return String(partySize);
  }
  return fallback;
}

export function formatReservationForLocale(
  locale: string,
  reservation: ReservationSnapshot | undefined,
  fallbacks: { date: string; time: string; party: string }
) {
  if (!reservation) {
    return {
      date: fallbacks.date,
      time: fallbacks.time,
      party: fallbacks.party,
    };
  }
  const loc = locale === "es" ? "es-AR" : "en-US";
  let datePart = fallbacks.date;
  if (reservation.preferredDate?.trim()) {
    const d = new Date(`${reservation.preferredDate.trim()}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      datePart = d.toLocaleDateString(loc, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } else {
      datePart = reservation.preferredDate.trim();
    }
  }
  return {
    date: datePart,
    time: displayReservationTime(reservation.preferredTime, fallbacks.time),
    party: displayPartySize(reservation.partySize, fallbacks.party),
  };
}

export function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const t = fullName.trim();
  if (!t) return { firstName: "", lastName: "" };
  const i = t.indexOf(" ");
  if (i === -1) return { firstName: t, lastName: "" };
  return {
    firstName: t.slice(0, i).trim(),
    lastName: t.slice(i + 1).trim(),
  };
}
