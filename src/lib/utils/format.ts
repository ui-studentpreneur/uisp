import { siteConfig } from "@/config/site";

/**
 * Formatters are centralised so locale changes happen in one place and
 * `Intl` instances are constructed once instead of per render.
 */

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  dateStyle: "medium",
});

const numberFormatter = new Intl.NumberFormat(siteConfig.locale);

export function formatDate(value: Date | string | number): string {
  return dateFormatter.format(new Date(value));
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}
