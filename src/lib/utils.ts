import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals: number = 2): string {
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCurrency(num: number, currency: string = "INR"): string {
  if (isNaN(num)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(num);
}
