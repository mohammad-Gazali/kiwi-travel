"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import React, { type PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ruRU } from "@clerk/localizations";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const Providers = ({
  children,
  locale,
}: PropsWithChildren<{
  locale: string;
}>) => {
  return (
    <ClerkProvider localization={locale === "ru" ? ruRU : undefined}>
      <TRPCReactProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
};

export default Providers;
