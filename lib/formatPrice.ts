import { type CurrencyCode, shop } from "@/config/shop";

export function convertFromDZD(amountDZD: number, currency: CurrencyCode): number {
  const { rateFromDZD, decimals } = shop.currencies[currency];
  const converted = amountDZD * rateFromDZD;
  const factor = Math.pow(10, decimals);
  return Math.round(converted * factor) / factor;
}

export function formatPrice(amountDZD: number, currency: CurrencyCode): string {
  const { symbol, decimals } = shop.currencies[currency];
  const value = convertFromDZD(amountDZD, currency);
  const formatted =
    decimals === 0
      ? Math.round(value).toLocaleString("fr-FR")
      : value.toLocaleString("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
  return `${formatted} ${symbol}`;
}
