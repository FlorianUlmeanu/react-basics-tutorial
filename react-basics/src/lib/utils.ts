import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn = clsx (combină clase condiționat) + twMerge (rezolvă conflictele când
// două clase Tailwind ating aceeași proprietate, ex. "px-4" din variantă vs.
// "px-8" primit din afară prin props — câștigă ultima, nu se acumulează).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
