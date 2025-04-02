"use client";

import { Button } from "@/components/ui/button";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Check, Move, Plus, UploadCloud, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const LazyLightbox = dynamic(() =>
  import("@/components/lazy-light-box").then((mod) => mod.default),
);

export interface AssetFile {
  preview: string;
  isVideo: boolean;
  isInitialData: boolean;
}

interface UploadFilesFieldProps {
  assets: AssetFile[];
  setAssets: React.Dispatch<React.SetStateAction<AssetFile[]>>;
}

const UploadFilesField = ({ assets, setAssets }: UploadFilesFieldProps) => {
  const extraFilesRef = useRef<HTMLInputElement>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Format slides for lightbox
  const lightboxSlides = assets.map(({ isVideo, ...file }) => ({
    src: isVideo ? null : file.preview,
    type: isVideo ? "video" : "image",
    sources: isVideo
      ? [
          {
            src: file.preview,
          },
        ]
      : undefined,
  }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    disabled: assets.length !== 0,
    onDrop: (acceptedFiles) => {
      return setAssets(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            isVideo: file.type.startsWith("video"),
            isInitialData: false,
          }),
        ),
      );
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAssets((items) => {
        // Since we're using indices as IDs, we can directly use them for arrayMove
        const oldIndex = active.id as number;
        const newIndex = over.id as number;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Create an array of indices to use as IDs
  const indices = Array.from({ length: assets.length }, (_, i) => i);

  return (
    <>
      <FormItem className="col-span-1 md:col-span-2">
        <FormLabel>Assets</FormLabel>
        <input
          ref={extraFilesRef}
          onChange={(e) => {
            const files = Array.from(e.target.files!).map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                isVideo: file.type.startsWith("video"),
                isInitialData: false,
              }),
            );

            setAssets((pre) => [...pre, ...files]);
          }}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          multiple
        />
        <div
          className={`rounded-lg border border-dashed border-gray-900/25 p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-input ${assets.length === 0 ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/5" : ""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} accept="image/*,video/*" />
          {assets.length === 0 ? (
            <>
              <UploadCloud className="mx-auto size-12 text-gray-500" />
              {isDragActive ? (
                <p className="text-sm text-gray-500">Drop the files here ...</p>
              ) : (
                <p className="text-sm text-gray-500">
                  Drag 'n' drop some files here, or click to select files
                </p>
              )}
            </>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={indices}>
                <div className="flex flex-wrap items-center gap-4 overflow-hidden">
                  {assets.map((file, index) => (
                    <AssetItem
                      file={file}
                      index={index}
                      setImageIndex={setImageIndex}
                      isOrdering={reorderMode}
                      setAssets={setAssets}
                      setOpenLightbox={setOpenLightbox}
                      key={index}
                    />
                  ))}
                  <div className="flex flex-col gap-2">
                    {!reorderMode && (
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          extraFilesRef.current?.click();
                        }}
                      >
                        <Plus />
                        Add More Files
                      </Button>
                    )}
                    <Button
                      onClick={() => setReorderMode((pre) => !pre)}
                      disabled={assets.length < 2}
                      type="button"
                      variant="outline"
                    >
                      {reorderMode ? (
                        <>
                          <Check />
                          Done Reordering
                        </>
                      ) : (
                        <>
                          <Move />
                          Reorder Assets
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
        <FormDescription>Add images or videos for this trip</FormDescription>
      </FormItem>

      {/* Lightbox Component */}
      {openLightbox && (
        <LazyLightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={lightboxSlides as any}
          index={imageIndex}
          counter={{
            container: { style: { top: "unset", bottom: 0, left: 0 } },
          }}
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            border: 2,
            borderRadius: 4,
            padding: 4,
            gap: 8,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
          }}
          carousel={{
            finite: true,
          }}
          render={{
            buttonPrev: assets.length <= 1 ? () => null : undefined,
            buttonNext: assets.length <= 1 ? () => null : undefined,
          }}
        />
      )}
    </>
  );
};

const AssetItem = ({
  file,
  index,
  isOrdering,
  setAssets,
  setImageIndex,
  setOpenLightbox,
}: {
  file: AssetFile;
  index: number;
  isOrdering: boolean;
  setAssets: UploadFilesFieldProps["setAssets"];
  setImageIndex: (value: number) => void;
  setOpenLightbox: (value: boolean) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: index,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  
  return (
    <div
      className={`relative overflow-hidden rounded-md ${
        isOrdering ? "cursor-move" : ""
      } ${isDragging ? "scale-105 opacity-70 shadow-xl" : ""}`}
      ref={setNodeRef}
      style={style}
      {...(isOrdering ? { ...attributes, ...listeners } : {})}
    >
      {file.isVideo ? (
        <>
          <video className="h-20 w-24 object-cover" src={file.preview}></video>
          <div className="absolute bottom-0 left-0 rounded-tr-full bg-black/60 p-0.5 pr-2 text-sm text-white hover:bg-black">
            video
          </div>
        </>
      ) : (
        <img className="h-20 w-24 object-cover" src={file.preview} />
      )}
      {isOrdering ? (
        <></>
      ) : (
        <>
          <div
            className="absolute inset-0 transition-colors hover:bg-black/60"
            onClick={(e) => {
              e.stopPropagation();
              setImageIndex(index);
              setOpenLightbox(true);
            }}
          />
          <button
            className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAssets((pre) => pre.filter((f) => f !== file));

              if (!file.isInitialData) {
                URL.revokeObjectURL(file.preview);
              }
            }}
          >
            <X className="size-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default UploadFilesField;
