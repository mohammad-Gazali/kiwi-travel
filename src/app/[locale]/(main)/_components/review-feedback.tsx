"use client";

import { ReviewDialog } from "@/components/review-dialog";
import { dismissingReviewStore } from "@/lib/dismissing-reviews-store";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const ReviewFeedback = () => {
  const locale = useLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const [open, setOpen] = useState(false);

  const { data } = api.tripBooking.availableBookingsForReview.useQuery();

  const bookingToReview = data?.find(
    (item) => !dismissingReviewStore.isDismissed(item.bookingId),
  );

  useEffect(() => {
    setOpen(bookingToReview !== undefined);
  }, [bookingToReview]);

  return bookingToReview ? (
    <ReviewDialog
      open={open}
      onOpenChange={setOpen}
      bookingId={bookingToReview.bookingId}
      title={localeAttribute(bookingToReview, "title")}
      disableManualClose
    />
  ) : null;
};

export default ReviewFeedback