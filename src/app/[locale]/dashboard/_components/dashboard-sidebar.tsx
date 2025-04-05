"use client";

import { Link } from "@/i18n/routing";;
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Globe,
  Map,
  Settings,
  ShoppingCart,
  Users,
  CircleGauge,
  Flag,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const sidebarNavItems = [
  {
    title: "Trips",
    href: "/dashboard/trips",
    icon: Map,
  },
  {
    title: "Countries",
    href: "/dashboard/countries",
    icon: Flag,
  },
  {
    title: "Destinations",
    href: "/dashboard/destinations",
    icon: Globe,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Trip Bookings",
    href: "/dashboard/bookings",
    icon: ShoppingCart,
  },
  {
    title: "Website Constants",
    href: "/dashboard/constants",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      <aside
        id="dashboard-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform lg:translate-x-0 lg:border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <CircleGauge className="h-6 w-6 text-primary" />
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="space-x-2">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <Link
                    href="/"
                    className={buttonVariants({
                      size: "icon",
                      variant: "outline",
                    })}
                  >
                    <Globe />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ThemeToggle />
          </div>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
