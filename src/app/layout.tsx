import "@/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Suspense>
            <UTSSR />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
