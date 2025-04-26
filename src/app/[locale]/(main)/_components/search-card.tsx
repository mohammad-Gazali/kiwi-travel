"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { Link } from "@/i18n/routing";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ChevronsUpDown, Search, Sliders } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchCard() {
  const t = useTranslations("HomePage.hero");

  const locale = useLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: trips, isLoading } =
    api.trip.tinyListSearch.useQuery(debouncedSearchTerm);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("cardTitle")}</h2>
            <Link href="/trips">
              <Button variant="secondary" className="flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                {t("advancedFilters")}
              </Button>
            </Link>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="h-10 w-full justify-between pl-10 font-normal text-muted-foreground hover:bg-background hover:text-muted-foreground"
                >
                  {t("searchPlaceholder")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder={t("search")}
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  className="h-9"
                />
                <CommandList className="max-h-[250px]">
                  {!isLoading && <CommandEmpty>{t("notFound")}</CommandEmpty>}
                  <CommandGroup
                    heading={
                      isLoading || trips?.length !== 0
                        ? t("suggestions")
                        : undefined
                    }
                  >
                    {isLoading
                      ? // Skeleton loading state
                        [1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 px-2 py-2"
                          >
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <div className="flex-1 space-y-1">
                              <Skeleton className="h-3 w-3/4 rounded" />
                              <Skeleton className="h-2 w-1/2 rounded" />
                            </div>
                            <Skeleton className="h-5 w-10 rounded-full" />
                          </div>
                        ))
                      : trips?.map((trip) => (
                          <Link key={trip.id} href={`/trips/${trip.id}`}>
                            <CommandItem
                              onSelect={() => {
                                router.push(`/trips/${trip.id}`);
                                setOpen(false);
                              }}
                              className="flex items-center px-2 py-2"
                            >
                              <img
                                src={trip.image}
                                alt={localeAttribute(trip, "title")}
                                className="mr-3 h-8 w-8 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {localeAttribute(trip, "title")}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {localeAttribute(trip, "location")}
                                </div>
                              </div>
                              <div className="flex items-center rounded-full bg-green-400/20 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
                                {trip.reviewsValue} ★
                              </div>
                            </CommandItem>
                          </Link>
                        ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
