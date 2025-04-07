"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  TripFeatureFormValues,
  tripFeatureSchema,
} from "@/validators/trip-feature-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Feature } from "../page";

interface TripFeatureFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: Feature;
}

export function TripFeatureFormDialog({
  open,
  onOpenChange,
  feature,
}: TripFeatureFormDialogProps) {
  const form = useForm<TripFeatureFormValues>({
    resolver: zodResolver(tripFeatureSchema),
    values: {
      nameEn: feature?.nameEn || "",
      nameRu: feature?.nameRu || "",
    },
  });

  const handleSubmit = (value: TripFeatureFormValues) => {
    // TODO: handle submit
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{feature ? "Edit Feature" : "Add Feature"}</DialogTitle>
          <DialogDescription className="sr-only">
            {feature ? "edit feature form" : "add feature form"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="trip-feature-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* English Name */}
            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter English name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Russian Name */}
            <FormField
              control={form.control}
              name="nameRu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Russian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Russian name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button form="trip-feature-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
