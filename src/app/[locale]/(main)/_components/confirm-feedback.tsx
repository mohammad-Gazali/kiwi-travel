"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const ConfirmFeedback = () => {
  const t = useTranslations("ConfirmFeedback");
  const locale = useLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const [open, setOpen] = useState(false);

  const { data: notification } = api.notifications.viewConfirmNotification.useQuery();

  useEffect(() => {
    if (notification) {
      console.log(localeAttribute(notification, "tripTitle"))
      setOpen(true);
    }
  }, [notification]);

  return notification ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {notification.isCancelled ? t("bookingCancelled") : t("bookingConfirmed")}
          </DialogTitle>
          <DialogDescription>
            {notification.isCancelled
              ? t("cancelledMessage", { tripTitle: localeAttribute(notification, "tripTitle") })
              : t("confirmedMessage", { tripTitle: localeAttribute(notification, "tripTitle") })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Link className="w-fit" onClick={() => setOpen(false)} href={`/bookings/${notification.tripBookingId}`}>
            <Button>{t("viewBookingDetails")}</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default ConfirmFeedback;