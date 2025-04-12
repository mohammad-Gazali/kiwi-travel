import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/routing";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/server";
import { PageParams } from "@/types/page-params";
import { format } from "date-fns";
import { BanknoteX, BookCheck, Car, Check, CircleDollarSign, Globe, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import BookingForm from "./_components/booking-form";
import { AssetGallery } from "./_components/asset-gallery";

// TODO: handle reviews

export default async function TripDetailsPage({ params }: PageParams<{ tripId: string }>) {
  const { tripId } = await params;

  const locale = await getLocale();
  const localeAttribute = localeAttributeFactory(locale);
  
  const t = await getTranslations("TripDetailsPage");

  const t_TripType = await getTranslations("General.tripType");
  const t_Amenities = await getTranslations("General.amenities");
  const t_TimeUnits = await getTranslations("General.timeUnits");

  const trip = await api.trip.view(Number(tripId));

  if (!trip) notFound();

  const price = trip.tripPriceInCents / 100;

  const amenities = [
    {
      title: "transfer",
      icon: Car,
    },
    {
      title: "guide",
      icon: BookCheck,
    },
    {
      title: "free_cancel",
      icon: BanknoteX,
    },
    {
      title: "online_payment",
      icon: CircleDollarSign,
    },
  ]

  const duration = trip.duration
    .replaceAll("days", t_TimeUnits("days"))
    .replaceAll("hours", t_TimeUnits("hours"))
    .replaceAll("day", t_TimeUnits("day"))
    .replaceAll("hour", t_TimeUnits("hour"))

  return (
    <main className="container mx-auto md:px-0 px-4 py-8 mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Title and Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{localeAttribute(trip, "title")}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {localeAttribute(trip.destination.country, "name")}, {localeAttribute(trip.destination, "name")}
                </span>
              </div>
            </div>
            <Badge className="w-fit">
              {t_TripType(trip.tripType)}
            </Badge>
          </div>

          {/* Main Image Gallery */}
          <AssetGallery assets={trip.assetsUrls} title={localeAttribute(trip, "title")} />

          {/* Tabs for Description and Details */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">{t("tabs.description")}</TabsTrigger>
              <TabsTrigger value="details">{t("tabs.details")}</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 space-y-4">
              <p className="text-muted-foreground">{localeAttribute(trip, "description")}</p>
              <p className="text-muted-foreground whitespace-pre-line">{localeAttribute(trip, "longDescription")}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t("tripFeatures")}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trip.features.map(({ feature }) => (
                      <li key={feature.id} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{localeAttribute(feature, "content")}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">{t("amenities")}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon
                      return (
                        <div key={amenity.title} className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                          <Icon className="h-6 w-6 mb-2" />
                          <span className="text-sm text-center">{t_Amenities(amenity.title)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="lg:col-span-1">
          <BookingForm price={price} duration={duration} />

          <div className="mt-6 bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-medium">{t("tripInformation")}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("country")}</span>
                <span className="font-medium">{localeAttribute(trip.destination.country, "name")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("destination")}</span>
                <span className="font-medium">{localeAttribute(trip.destination, "name")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("duration")}</span>
                <span className="font-medium">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("type")}</span>
                <span className="font-medium">{t_TripType(trip.tripType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("travelTime")}</span>
                <span className="font-medium">{format(`0001-01-01T${trip.travelTime}`, "hh:mm a")}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Link href="#" className="flex items-center justify-center w-full">
                {t("askQuestion")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

