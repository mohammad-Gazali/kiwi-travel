"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import {
  tripBookingFormSchema,
  TripBookingFormValues,
} from "@/validators/trip-booking-schema";
import { days } from "@/validators/trip-schema";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Lock, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface BookingFormProps {
  price: number;
  duration: string;
  availableDays: (typeof days)[number][];
  tripId: number;
}

// TODO: handle reviews

const BookingForm = ({
  price,
  duration,
  availableDays,
  tripId,
}: BookingFormProps) => {
  const t = useTranslations("TripDetailsPage.bookingForm");

  const { isSignedIn, isLoaded } = useAuth();

  const trip = {} as any;

  // array of day indexes of the current trip's `availableDays`
  // e.g.
  // ["Monday", "Friday"] ======> [1, 5]
  // ["Tuesday"] ======> [2]
  const mappedDays = availableDays.map((item) => days.indexOf(item));

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
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
        </div>

        {isSignedIn ? (
          <BookingSubmitDialog
            mappedDays={mappedDays}
            price={price}
            tripId={tripId}
          />
        ) : (
          <SignInButton>
            <Button variant="outline" disabled={!isLoaded} className="w-full">
              {isLoaded ? (
                <>
                  <Lock />
                  {t("signInFirstly")}
                </>
              ) : (
                t("loading")
              )}
            </Button>
          </SignInButton>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>{t("noCharge")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface BookingSubmitDialog {
  price: number;
  mappedDays: number[];
  tripId: number;
}

const BookingSubmitDialog = ({
  price,
  mappedDays,
  tripId,
}: BookingSubmitDialog) => {
  const t = useTranslations("TripDetailsPage.bookingForm");

  const [open, setOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { toast } = useToast();

  const { mutate: createBooking, isPending } =
    api.tripBooking.create.useMutation({
      onSuccess: ({ message }) => {
        toast({
          title: "Success",
          description: message,
        });

        setOpen(false);
      },
      onError: ({ message }) => {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      },
    });

  // Initialize the form
  const form = useForm<TripBookingFormValues>({
    resolver: zodResolver(tripBookingFormSchema),
    defaultValues: {
      travelersCount: 1,
      phone: "",
    },
  });

  // Get the current travelers value for price calculation
  const travelers = form.watch("travelersCount") || 1;

  // Calculate total price based on number of travelers
  const totalPrice = (price * travelers).toFixed(2);

  const handleIncreaseTravelers = () => {
    const current = form.getValues("travelersCount") || 1;
    form.setValue("travelersCount", current + 1, { shouldValidate: true });
  };

  const handleDecreaseTravelers = () => {
    const current = form.getValues("travelersCount") || 1;
    if (current > 1) {
      form.setValue("travelersCount", current - 1, { shouldValidate: true });
    }
  };

  function onSubmit(data: TripBookingFormValues) {
    if (isPending) return;

    createBooking({
      ...data,
      tripId,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (isPending) return;

        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" className="w-full">
          {t("bookNow")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
          <DialogDescription>{t("dialogDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("bookingDate")}</FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : t("selectDate")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        disabled={(d) =>
                          d < new Date() || !mappedDays.includes(d.getDay())
                        }
                        onSelect={(d) => {
                          if (!d) return;

                          form.setValue("date", d);
                          setIsCalendarOpen(false);
                        }}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phoneNumber")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travelersCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("travelersCount")}</FormLabel>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleDecreaseTravelers}
                      disabled={field.value <= 1}
                    >
                      -
                    </Button>
                    <FormControl>
                      <div className="w-full text-center">
                        <span className="text-lg font-medium">
                          {field.value}
                        </span>
                        <Input
                          type="hidden"
                          {...field}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value);
                            field.onChange(isNaN(value) ? 1 : value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleIncreaseTravelers}
                    >
                      +
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-2 rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("basePrice")}</span>
                <span className="text-sm">${price}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t pt-2">
                <span className="text-lg font-bold">{t("total")}</span>
                <span className="text-lg font-bold">${totalPrice}</span>
              </div>
            </div>

            <DialogFooter>
              <Button disabled={isPending} type="submit" className="w-full">
                {t("completeBooking")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
