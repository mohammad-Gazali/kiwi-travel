import createIntlMiddleware from "next-intl/middleware";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";

export default clerkMiddleware((_, req) => createIntlMiddleware(routing)(req));

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // for internationalized pathnames
    "/",
    "/(en|ru)/:path*",
  ],
};
