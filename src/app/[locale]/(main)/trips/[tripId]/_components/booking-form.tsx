"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BookingFormProps {
  price: number;
  duration: string;
}

// TODO: handle submit to navigate to booking with initial values
// TODO: mark disabled fields in the picker via full limit or available days

const BookingForm = ({ price, duration }: BookingFormProps) => {
  const t = useTranslations("TripDetailsPage.bookingForm");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        travelersCount: z.number().int().min(1),
        date: z.date(),
      }),
    ),
    defaultValues: {
      travelersCount: 1,
    },
  });

  const trip = {};

  const travelersCount = form.watch("travelersCount");
  const date = form.watch("date");

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <form onSubmit={form.handleSubmit((val) => {})} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-muted-foreground">{t("perPerson")}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(trip.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {trip.rating} ({trip.reviewCount} {t("reviews")})
            </span>
          </div>
        </form>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("bookingDate")}
            </Label>
            <br />
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : t("selectDate")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={(d) => d < new Date()}
                  onSelect={(d) => {
                    if (!d) return;

                    form.setValue("date", d);
                    setIsCalendarOpen(false);
                  }}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers">{t("travelersCount")}</Label>
            <div className="relative">
              <Input
                className="pl-12"
                min="1"
                type="number"
                {...form.register("travelersCount")}
                id="travelers"
              />
              <Users className="absolute left-4 top-1/2 size-4 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>{t("basePrice")}</span>
            <span>
              ${price} &times; {travelersCount}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>{t("total")}</span>
            <span>${price * travelersCount}</span>
          </div>
        </div>

        <Button className="w-full">{t("bookNow")}</Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>{t("noCharge")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
