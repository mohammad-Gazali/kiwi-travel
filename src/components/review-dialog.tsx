"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCommonMutationResponse } from "@/hooks/use-common-mutation-response";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: number;
  title: string;
  disableManualClose?: boolean;
}

export function ReviewDialog({
  open,
  onOpenChange,
  bookingId,
  title,
  disableManualClose,
}: ReviewDialogProps) {
  const t = useTranslations("ReviewDialog");
  const t_ToastMessage = useTranslations("ToastMessages");

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const { invalidate } = api.useUtils().tripBooking.view;

  const response = useCommonMutationResponse(
    undefined,
    () => {
      invalidate();
      onOpenChange(false);
      setRating(0);
      setReview("");
    },
    {
      success: t_ToastMessage("SuccessTitle"),
      error: t_ToastMessage("ErrorTitle"),
    },
  );

  const { mutate: addReview, isPending } =
    api.review.create.useMutation(response);

  const handleSubmit = () => {
    addReview({
      bookingId,
      message: review,
      ratingValue: rating,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (isPending || !!disableManualClose) return;

        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-2">
            {t("reviewYourTrip", { title })}
          </DialogTitle>
          <DialogDescription>{t("shareExperience")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("ratingLabel")}</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="sr-only">{t("rateStars", { star })}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="review" className="text-sm font-medium">
              {t("yourReviewLabel")}
            </label>
            <Textarea
              id="review"
              placeholder={t("reviewPlaceholder")}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || rating < 1 || review.length === 0}
          >
            {isPending ? t("submitting") : t("submitReview")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
