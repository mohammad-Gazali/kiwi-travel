import { PLACEHOLDER_IMAGE } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mainImage(assets: string[]) {
  return (
    assets.find((asset) => !asset.endsWith("?type=video")) ?? PLACEHOLDER_IMAGE
  );
}

export function localeAttributeFactory(locale: string) {
  const currentLocale: Locale = locale as any;

  return function <T, K extends keyof T & string>(
    obj: T,
    key: K extends `${infer Base}${Capitalize<Locale>}` ? Base : never,
  ): string {
    const enKey = `${key}En` as const;
    const ruKey = `${key}Ru` as const;

    const object: any = obj;

    if (currentLocale === "en" && enKey in object) {
      return object[enKey];
    }

    if (currentLocale === "ru" && ruKey in object) {
      return object[ruKey]!;
    }

    // Fallback to English if Russian translation doesn't exist
    if (enKey in object) {
      return object[enKey];
    }

    // If neither exists, return the key as a last resort
    return key;
  };
}

type Locale = "en" | "ru";
