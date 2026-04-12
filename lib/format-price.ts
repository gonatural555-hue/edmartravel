/**
 * Precios en pantalla y emails: pesos argentinos, miles con punto, sufijo explícito.
 * Ej.: $100.000 ARS
 */
export function formatPriceARS(amount: number): string {
  const n = Math.round(Number(amount));
  const formatted = n.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `$${formatted} ARS`;
}

/**
 * Emails y totales cuando el pedido trae código ISO de moneda (p. ej. ARS).
 */
export function formatOrderMoney(amount: number, currency: string): string {
  const c = currency.toUpperCase();
  if (c === "ARS") {
    return formatPriceARS(amount);
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: c,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
