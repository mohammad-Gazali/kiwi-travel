import "server-only";
import { api } from "@/trpc/server";
import { env } from "@/env";
import { getTranslations } from "next-intl/server";
import RSS from "rss";

export async function generateRSSFeed(locale: Locale): Promise<string> {
  const trips = await api.trip.listRssFeed(locale);

  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  const feed = new RSS({
    title: t("title"),
    description: t("description"),
    language: locale,
    site_url: env.NEXT_PUBLIC_APP_URL,
    feed_url: `${env.NEXT_PUBLIC_APP_URL}/api/feed-${locale}`.replaceAll(
      "//",
      "/",
    ),
    image_url: `${env.NEXT_PUBLIC_APP_URL}/logo.svg`,
  });

  trips.forEach((trip) => {
    feed.item({
      title: trip.title,
      description: trip.description,
      url: `${env.NEXT_PUBLIC_APP_URL}/${locale}/trips/${trip.id}`.replaceAll(
        "//",
        "/",
      ),
      date: trip.createdAt,
    });
  });

  return feed.xml({ indent: true });
}

type Locale = "en" | "ru";
