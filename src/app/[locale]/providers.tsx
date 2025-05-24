"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import React, { type PropsWithChildren } from "react";
import { ruRU } from "@clerk/localizations";

const Providers = ({
  children,
  locale,
}: PropsWithChildren<{
  locale: string;
}>) => {
  return (
    <ClerkProvider localization={locale === "ru" ? ruRU : undefined}>
      <TRPCReactProvider>
        {children}
      </TRPCReactProvider>
    </ClerkProvider>
  );
};

export default Providers;
