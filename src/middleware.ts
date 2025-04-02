import createIntlMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";

const isAdminRoute = createRouteMatcher([
  "/en/dashboard(.*)",
  "/ru/dashboard(.*)",
])

const isAPIRoute = createRouteMatcher([
  "/api(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  
  if (isAdminRoute(req) && !sessionClaims?.metadata.isAdmin) {
    await auth.protect();
  }

  // prevent locale handling for api endpoints
  if (isAPIRoute(req)) return;

  return createIntlMiddleware(routing)(req);
})

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
