import "@/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { PageParams } from "@/types/page-params";
import { Toaster } from "@/components/ui/toaster"
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Kiwi Travel",
  description: "Awesome website for booking your next travel",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

async function UTSSR() {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & PageParams<{ locale: string }>>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <Providers locale={locale}>
            <Suspense>
              <UTSSR />
            </Suspense>
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
