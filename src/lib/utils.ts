import { PLACEHOLDER_IMAGE } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import RSS from "rss";
import { api } from "@/trpc/server";
import { env } from "@/env";
import { getTranslations } from "next-intl/server";

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

export async function generateRSSFeed(locale: Locale): Promise<string> {
  const trips = await api.trip.listRssFeed(locale);

  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  const feed = new RSS({
    title: t("title"),
    description: t("description"),
    language: locale,
    site_url: env.NEXT_PUBLIC_APP_URL,
    feed_url: `${env.NEXT_PUBLIC_APP_URL}/api/feed-${locale}`.replaceAll('//', '/'),
    image_url: `${env.NEXT_PUBLIC_APP_URL}/logo.svg`,
  });

  trips.forEach(trip => {
    feed.item({
      title: trip.title,
      description: trip.description,
      url: `${env.NEXT_PUBLIC_APP_URL}/${locale}/trips/${trip.id}`.replaceAll('//', '/'),
      date: trip.createdAt,
    })
  });

  return feed.xml({ indent: true });
}

type Locale = "en" | "ru";
