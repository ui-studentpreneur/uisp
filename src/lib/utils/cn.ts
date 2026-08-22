import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional className joiner with Tailwind conflict resolution.
 * `twMerge` makes a later class win over an earlier one for the same property,
 * which is what lets callers override component defaults via `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
