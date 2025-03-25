"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { tripFormSchema, TripFormValues } from "../form-schema";

// Mock destinations for select dropdown
const mockDestinations = [
  { id: 1, name: "Paris, France" },
  { id: 2, name: "Tokyo, Japan" },
  { id: 3, name: "New York, USA" },
  { id: 4, name: "Bali, Indonesia" },
  { id: 5, name: "Nairobi, Kenya" },
  { id: 6, name: "Athens, Greece" },
];

interface TripFormProps {
  initialData?: Partial<TripFormValues>;
}

export function TripForm({ initialData }: TripFormProps) {
  const [newFeature, setNewFeature] = useState("");

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      multiple: true,
    });

  // Define form with default values
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      titleEn: initialData?.titleEn || "",
      titleRu: initialData?.titleRu || "",
      descriptionEn: initialData?.descriptionEn || "",
      descriptionRu: initialData?.descriptionRu || "",
      longDescriptionEn: initialData?.longDescriptionEn || "",
      longDescriptionRu: initialData?.longDescriptionRu || "",
      features: initialData?.features || [],
      assetsUrls: initialData?.assetsUrls || [],
      travelTime: initialData?.travelTime || "00:00:00",
      status: initialData?.status || "available",
      destinationId: initialData?.destinationId || 0,
      tripPriceInCents: initialData?.tripPriceInCents || 0,
    },
  });

  // Add a new feature to the features array
  const addFeature = () => {
    if (newFeature.trim() === "") return;
    const currentFeatures = form.getValues("features");
    form.setValue("features", [...currentFeatures, newFeature]);
    setNewFeature("");
  };

  // Remove a feature from the features array
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index),
    );
  };

  // Remove an asset URL from the assetsUrls array
  const removeAssetUrl = (index: number) => {
    const currentAssetUrls = form.getValues("assetsUrls");
    form.setValue(
      "assetsUrls",
      currentAssetUrls.filter((_, i) => i !== index),
    );
  };

  // Handle form submission
  const handleSubmit = (data: TripFormValues) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* English Title */}
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter English title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Russian Title */}
          <FormField
            control={form.control}
            name="titleRu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Russian Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Russian title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* English Description */}
          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter English description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Russian Description */}
          <FormField
            control={form.control}
            name="descriptionRu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Russian Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Russian description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* English Long Description */}
          <FormField
            control={form.control}
            name="longDescriptionEn"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>English Long Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed English description"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Russian Long Description */}
          <FormField
            control={form.control}
            name="longDescriptionRu"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Russian Long Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed Russian description"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features */}
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Features</FormLabel>
                <div className="mb-2 flex flex-wrap gap-2">
                  {field.value.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-md bg-secondary px-3 py-1 text-secondary-foreground"
                    >
                      <span>{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-1"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addFeature}
                  >
                    Add
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asset URLs */}
          <FormField
            control={form.control}
            name="assetsUrls"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Asset URLs</FormLabel>
                <div className="mb-2 space-y-2">
                  {field.value.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={url} disabled />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeAssetUrl(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div
                  className="cursor-pointer rounded-lg border border-dashed border-gray-900/25 p-4 text-center transition-colors hover:bg-gray-100"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {acceptedFiles.length === 0 ? (
                    <>
                      <UploadCloud className="mx-auto size-12 text-gray-500" />
                      {isDragActive ? (
                        <p className="text-sm text-gray-500">
                          Drop the files here ...
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {acceptedFiles.map(file => (
                        <div className="relative" key={file.name} >
                          <img 
                            className="w-24 h-20 rounded-md"
                            src={URL.createObjectURL(file)} 
                          />
                          <div 

                            className="hover:bg-black/60 absolute inset-0 rounded-md transition-colors" 
                          />
                          <button className="bg-black/60 hover:bg-black text-white rounded-full p-0.5 absolute top-1 right-1">
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <FormDescription>
                  Add URLs to images or other assets for this trip
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Time */}
          <FormField
            control={form.control}
            name="travelTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Time</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="HH:MM" {...field} />
                </FormControl>
                <FormDescription>Format: HH:MM</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Destination ID */}
          <FormField
            control={form.control}
            name="destinationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(Number.parseInt(value))
                  }
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockDestinations.map((destination) => (
                      <SelectItem
                        key={destination.id}
                        value={destination.id.toString()}
                      >
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trip Price */}
          <FormField
            control={form.control}
            name="tripPriceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (in cents)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price in cents"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter the price in cents (e.g., $10.00 = 1000)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Save Trip
        </Button>
      </form>
    </Form>
  );
}
