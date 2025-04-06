"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUploadThing } from "@/hooks/use-upload-thing";
import { destinationFormSchema } from "@/validators/destination-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const mockCountries = [
  { id: 1, nameEn: "United States", nameRu: "Соединенные Штаты" },
  { id: 2, nameEn: "Russia", nameRu: "Россия" },
  { id: 3, nameEn: "Japan", nameRu: "Япония" },
  { id: 4, nameEn: "Germany", nameRu: "Германия" },
  { id: 5, nameEn: "France", nameRu: "Франция" },
  { id: 6, nameEn: "China", nameRu: "Китай" },
  { id: 7, nameEn: "Brazil", nameRu: "Бразилия" },
  { id: 8, nameEn: "Italy", nameRu: "Италия" },
  { id: 9, nameEn: "India", nameRu: "Индия" },
  { id: 10, nameEn: "Egypt", nameRu: "Египет" },
];

interface DestinationFormProps {
  initialData?: Partial<DestinationFormValues & { imageUrl: string }>;
  isUpdate?: boolean;
}

const clientFormSchema = destinationFormSchema.omit({ imageUrl: true });

type DestinationFormValues = z.infer<typeof clientFormSchema>;

export function DestinationForm({
  initialData,
  isUpdate,
}: DestinationFormProps) {
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl ?? "");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define form with default values
  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      nameEn: initialData?.nameEn || "",
      nameRu: initialData?.nameRu || "",
      isPopular: initialData?.isPopular || false,
      country: initialData?.country || ("" as any),
    },
  });

  const { startUpload } = useUploadThing("countryImageUploader");

  const handleSubmit = async (value: DestinationFormValues) => {
    let imageUrl = imagePreview;

    if (image) {
      const res = await startUpload([image]);

      imageUrl = res!.at(0)!.ufsUrl!;
    }

    // TODO: handle submit
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== initialData?.imageUrl) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Country</FormLabel>
                <Select
                  defaultValue={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockCountries.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.id.toString()}
                      >
                        {country.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <div className="flex flex-col gap-4">
            <Label>Image</Label>
            <div className="flex items-center gap-2">
              {imagePreview && (
                <img
                  className="h-20 w-24 rounded-md bg-slate-400 object-cover"
                  src={imagePreview}
                  alt="image preview"
                />
              )}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                type="button"
              >
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.item(0);
                  const oldImagePreview = imagePreview;

                  if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }

                  if (oldImagePreview) {
                    URL.revokeObjectURL(oldImagePreview);
                  }
                }}
              />
            </div>
          </div>

          {/* Is it popular */}
          <FormField
            control={form.control}
            name="isPopular"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 -mt-2">
                <FormControl>
                  <Switch
                    className="mt-2"
                    name={field.name}
                    ref={field.ref}
                    disabled={field.disabled}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Popular Destination</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          Save Destination
        </Button>
      </form>
    </Form>
  );
}
