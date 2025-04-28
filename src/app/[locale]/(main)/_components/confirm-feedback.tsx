"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

const ConfirmFeedback = () => {
  const locale = useLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const [open, setOpen] = useState(false);

  const { data: notification } = api.notifications.viewConfirmNotification.useQuery();

  useEffect(() => {
      if (notification) {
        setOpen(true)
      }
  }, [notification])

  return notification ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {notification.isCancelled ? "Booking Cancelled" : "Booking Confirmed"}
          </DialogTitle>
          <DialogDescription>
            {
              notification.isCancelled 
              ? `Unfortunately the booking for trip '${localeAttribute(notification, "tripTitle")}' has been cancelled for organisational reasons, you can proceed to your booking details.`
              : `Congratulations, the booking for trip '${localeAttribute(notification, "tripTitle")}' has been accepted, you can proceed to your booking details.`
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Link onClick={() => setOpen(false)} href={`/bookings/${notification.tripBookingId}`}>
            <Button>
              View Booking Details
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default ConfirmFeedback