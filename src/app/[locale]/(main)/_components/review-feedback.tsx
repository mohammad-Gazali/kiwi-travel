"use client";

import { ReviewDialog } from "@/components/review-dialog";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const ReviewFeedback = () => {
  const locale = useLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const [open, setOpen] = useState(false);

  const { data: notification } = api.notifications.viewReviewNotification.useQuery();

  useEffect(() => {
    if (notification) {
      setOpen(true)
    }
  }, [notification])

  return notification ? (
    <ReviewDialog
      open={open}
      onOpenChange={setOpen}
      bookingId={notification.tripBookingId}
      title={localeAttribute(notification, "tripTitle")}
      disableManualClose
    />
  ) : null;
};

export default ReviewFeedback