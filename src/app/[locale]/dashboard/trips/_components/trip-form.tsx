"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/hooks/use-upload-thing";
import { days, tripFormSchema } from "@/validators/trip-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadFilesField, { AssetFile } from "./upload-files-field";
import {
  UploadProgressDialog,
  type FileWithProgress,
} from "./upload-progress-dialog";
import { MultiSelect } from "@/components/multi-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";

// Mock destinations for select dropdown
const mockDestinations = [
  { id: 1, name: "Paris, France" },
  { id: 2, name: "Tokyo, Japan" },
  { id: 3, name: "New York, USA" },
  { id: 4, name: "Bali, Indonesia" },
  { id: 5, name: "Nairobi, Kenya" },
  { id: 6, name: "Athens, Greece" },
];

// Mock features for select dropdown
const mockFeatures = [
  { id: 1, name: "Private beach access" },
  { id: 2, name: "Infinity pool" },
  { id: 3, name: "Daily breakfast" },
  { id: 4, name: "Airport transfers" },
  { id: 5, name: "Complimentary spa session" },
  { id: 6, name: "24/7 concierge service" },
  { id: 7, name: "WiFi throughout the property" },
  { id: 8, name: "Air conditioning" },
];

const clientFormSchema = tripFormSchema.omit({ assets: true });

type TripFormValues = z.infer<typeof clientFormSchema>;

interface TripFormProps {
  initialData?: Partial<TripFormValues & { assets: string[] }>;
}

export function TripForm({ initialData }: TripFormProps) {
  const [currentUploadingFileIndex, setCurrentUploadingFileIndex] = useState(0);
  const [filesWithProgress, setFilesWithProgress] = useState<
    FileWithProgress[]
  >([]);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [assets, setAssets] = useState<AssetFile[]>(
    initialData?.assets?.map((asset) => ({
      preview: asset,
      // as we mentioned in the `trip` table schema
      // each asset url has a query param at the end
      // refers to the type
      isVideo: asset.endsWith("?type=video"),
      isInitialData: true,
    })) ?? [],
  );
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("fileUploader", {
    onClientUploadComplete: () => {
      toast({
        title: "Upload complete",
        description: "All files have been uploaded successfully.",
      });

      // Mark all files as complete
      setFilesWithProgress((current) =>
        current.map((file) => ({
          ...file,
          progress: 100,
          complete: true,
        })),
      );

      // Only close dialog on success after a short delay
      setTimeout(() => {
        setProgressDialogOpen(false);
        setFilesWithProgress([]);
        setCurrentUploadingFileIndex(0);
      }, 1000);
    },
    onUploadError: (error) => {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Something went wrong with the upload.",
      });

      // Mark current file as having an error
      setFilesWithProgress((current) =>
        current.map((file, index) =>
          index === currentUploadingFileIndex
            ? { ...file, error: error.message || "Upload failed" }
            : file,
        ),
      );
    },
    onUploadProgress: (progress) => {
      setFilesWithProgress((current) =>
        current.map((file, index) => {
          if (index === currentUploadingFileIndex) {
            const isComplete = progress === 100;

            // If this file is complete, increment the current file index
            if (isComplete && index === currentUploadingFileIndex) {
              setCurrentUploadingFileIndex((prev) => prev + 1);
            }

            return {
              ...file,
              progress,
              complete: isComplete,
            };
          }
          return file;
        }),
      );
    },
  });

  // Calculate overall progress based on all files
  const overallProgress = filesWithProgress.length
    ? filesWithProgress.reduce((acc, file) => acc + file.progress, 0) /
      filesWithProgress.length
    : 0;

  useEffect(() => {
    return () => {
      assets.forEach((f) => {
        if (!f.isInitialData) {
          URL.revokeObjectURL(f.preview);
        }
      });
    };
  }, []);

  // Define form with default values
  const form = useForm<TripFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      titleEn: initialData?.titleEn || "",
      titleRu: initialData?.titleRu || "",
      descriptionEn: initialData?.descriptionEn || "",
      descriptionRu: initialData?.descriptionRu || "",
      longDescriptionEn: initialData?.longDescriptionEn || "",
      longDescriptionRu: initialData?.longDescriptionRu || "",
      features: initialData?.features || [],
      travelTime: initialData?.travelTime || "00:00",
      destinationId: initialData?.destinationId || ("" as any),
      price: initialData?.price || 0,
      availableDays: initialData?.availableDays || [],
      bookingsLimitCount: initialData?.bookingsLimitCount,
      duration: initialData?.duration || "",
      isAvailable: initialData?.isAvailable || true,
      isFeatured: initialData?.isFeatured || false,
    },
  });

  const getAssets = async () => {
    const files = assets
      .filter((asset) => !asset.isInitialData)
      // here we wrote `as unknown as File` because when the file is not in the initial data
      // it will be a File object also
      .map((asset) => asset as unknown as File);

    if (files.length === 0) return assets.map((asset) => asset.preview);

    const selectedFiles = files.map((file) => ({
      file,
      progress: 0,
    }));

    setFilesWithProgress(selectedFiles);
    setCurrentUploadingFileIndex(0);
    setProgressDialogOpen(true);

    const res = (await startUpload(files))!;

    let currentResultIndex = 0;

    return assets.map((asset) =>
      asset.isInitialData
        ? asset.preview
        : `${res[currentResultIndex++]!.ufsUrl}?type=${asset.isVideo ? "video" : "image"}`,
    );
  };

  const handleSubmit = async (value: TripFormValues) => {
    const assets = await getAssets();

    if (assets.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Assets",
        description: "You must provide at least one asset for your trip",
      });
      return;
    }

    // TODO: handle submit here
  };

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
                <FormControl>
                  <MultiSelect
                    options={mockFeatures.map((f) => ({
                      label: f.name,
                      value: f.id.toString(),
                    }))}
                    defaultValue={field.value.map((v) => v.toString())}
                    onValueChange={(value) => field.onChange(value.map(Number))}
                    placeholder="Select features"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asset URLs */}
          <UploadFilesField assets={assets} setAssets={setAssets} />
          <UploadProgressDialog
            open={progressDialogOpen}
            setOpen={setProgressDialogOpen}
            files={filesWithProgress}
            isUploading={isUploading}
            overallProgress={overallProgress}
          />

          {/* Available Days */}
          <FormField
            control={form.control}
            name="availableDays"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Available Days</FormLabel>
                <FormControl>
                  <ToggleGroup
                    variant="outline"
                    className="justify-start"
                    onValueChange={field.onChange}
                    type="multiple"
                  >
                    {days.map((day) => (
                      <ToggleGroupItem value={day} key={day}>
                        {day}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
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

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Duration" {...field} />
                </FormControl>
                <FormDescription>
                  Use <span className="text-foreground">day</span>,{" "}
                  <span className="text-foreground">days</span>,{" "}
                  <span className="text-foreground">hour</span> and{" "}
                  <span className="text-foreground">hours</span> for
                  translation, (e.g. 1 day, 3 hours)
                </FormDescription>
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Enter the price (e.g. 10.00)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is it available */}
          <FormField
            control={form.control}
            name="isAvailable"
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
                <FormLabel>Available</FormLabel>
              </FormItem>
            )}
          />

          {/* Is it featured */}
          <FormField
            control={form.control}
            name="isFeatured"
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
                <FormLabel>Featured</FormLabel>
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
