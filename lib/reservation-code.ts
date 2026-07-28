/** Caracteres legibles (sin 0/O, 1/I/L). */
const CODE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/**
 * Código corto estable derivado del UUID de la reserva (misma reserva → mismo código).
 */
export function bookingIdToRequestCode(bookingId: string): string {
  const normalized = bookingId.replace(/-/g, "").toUpperCase();
  let hash = 5381;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 33 + normalized.charCodeAt(i)) >>> 0;
  }
  let code = "";
  let n = hash;
  for (let i = 0; i < 5; i++) {
    code += CODE_CHARSET[n % CODE_CHARSET.length];
    n = (Math.imul(n, 1103515245) + 12345 + i * 97) >>> 0;
  }
  return `EDM-${code}`;
}
