import { routing } from "@/i18n/routing";
import Header from "./_components/header";
import Footer from "./_components/footer";
import ReviewFeedback from "./_components/review-feedback";
import ConfirmFeedback from "./_components/confirm-feedback";
import { PageParams } from "@/types/page-params";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { env } from "@/env";
import { auth } from "@clerk/nextjs/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageParams<{ locale: string }>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || 'https://karimtor.com'),
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      title: "Karim Tour",
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ru': '/ru'
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: '/',
      siteName: t("title"),
      images: [
        {
          url: '/logo.png',
          width: 1080,
          height: 182,
          alt: t("title"),
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      title: t("title"),
      description: t("description"),
      images: ['/logo.png'],
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <>
      <Header />
      {children}
      <Footer />
      {
        userId !== null && (
          <>
            <ReviewFeedback />
            <ConfirmFeedback />
          </>
        )
      }
    </>
  );
}
