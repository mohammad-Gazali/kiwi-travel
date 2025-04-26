"use client"

import { useCommonMutationResponse } from "@/hooks/use-common-mutation-response";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reviewId: number
}

export function DeleteDialog({ open, onOpenChange, reviewId }: DeleteDialogProps) {
    const { invalidate } = api.useUtils().tripBooking.view;
  
    const response = useCommonMutationResponse(undefined, () => {
      invalidate();
      onOpenChange(false);
    })
  
    const { mutate: deleteReview, isPending } = api.review.delete.useMutation(response);
  
    return (
      <Dialog open={open} onOpenChange={(open) => {
        if (isPending) return;
  
        onOpenChange(open);
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mt-2">Delete your review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => deleteReview(reviewId)} disabled={isPending}>
              {isPending ? "Deleting..." : "Yes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ) 
}