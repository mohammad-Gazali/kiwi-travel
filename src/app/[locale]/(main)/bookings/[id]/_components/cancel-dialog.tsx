"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { api } from "@/trpc/react"
import { useCommonMutationResponse } from "@/hooks/use-common-mutation-response"

interface CancelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId: number
  title: string
}

export function CancelDialog({ open, onOpenChange, bookingId, title }: CancelDialogProps) {
  const { invalidate: invalidateList } = api.useUtils().tripBooking.list;
  const { invalidate: invalidateView } = api.useUtils().tripBooking.view;

  const response = useCommonMutationResponse(undefined, () => {
    invalidateList();
    invalidateView();
    onOpenChange(false);
  })

  const { mutate: cancel, isPending } = api.tripBooking.cancel.useMutation(response);

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (isPending) return;

      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-2">Cancel your booking to {title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Keep Booking
          </Button>
          <Button variant="destructive" onClick={() => cancel(bookingId)} disabled={isPending}>
            {isPending ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
