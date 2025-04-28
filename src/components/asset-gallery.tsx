"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// Import styles
import { PLACEHOLDER_IMAGE } from "@/constants";
import { Play } from "lucide-react";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
const LazyLightbox = dynamic(() =>
  import("@/components/lazy-light-box").then((mod) => mod.default),
);

interface AssetGalleryProps {
  assets: string[];
  title: string;
}

const isVideo = (url: string) => url.endsWith("?type=video");

export function AssetGallery({ assets, title }: AssetGalleryProps) {
  // State for lightbox
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Format images for lightbox
  const lightboxImages = assets.map((asset) => {
    const isUrlVideo = isVideo(asset);

    return {
      src: isUrlVideo ? null : asset,
      type: isUrlVideo ? "video" : "image",
      sources: isUrlVideo
        ? [
            {
              src: asset,
            },
          ]
        : undefined,
    };
  });

  // Calculate how many thumbnails to show
  const MAX_TOTAL_IMAGES_WITHOUT_INDICATOR = 5; // 1 main + 4 thumbnails
  const MAX_VISIBLE_THUMBNAILS = 4;

  // Determine if we need to show the "+X" indicator
  const hasMoreImages = assets.length > MAX_TOTAL_IMAGES_WITHOUT_INDICATOR;
  const visibleThumbnailsCount = hasMoreImages
    ? MAX_VISIBLE_THUMBNAILS - 1
    : MAX_VISIBLE_THUMBNAILS;
  const remainingImagesCount = assets.length - (visibleThumbnailsCount + 1); // +1 for the main image

  // Function to open lightbox with specific image
  const openLightbox = (index: number) => {
    setImageIndex(index);
    setOpen(true);
  };

  return (
    <div className="space-y-2">
      {/* Main Asset */}
      <div
        className="relative h-[300px] w-full cursor-pointer overflow-hidden rounded-xl sm:h-[400px]"
        onClick={() => openLightbox(0)}
      >
        <AssetItem
          url={assets[0] ?? PLACEHOLDER_IMAGE}
          title={title}
          index={0}
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/20" />
      </div>

      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-2">
        {assets.slice(1, visibleThumbnailsCount + 1).map((asset, index) => (
          <div
            key={asset}
            className="relative h-20 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index + 1)}
          >
            <AssetItem
              index={index}
              url={asset}
              title={title}
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
          </div>
        ))}

        {
          assets.length < 5 && (
            <div className="bg-secondary size-full rounded-lg" style={{ gridColumn: `span ${5 - assets.length}` }} />
          )
        }

        {/* "More images" placeholder - only show if there are more than 5 total images */}
        {hasMoreImages && (
          <div
            className="relative h-20 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(visibleThumbnailsCount + 1)}
          >
            <AssetItem
              url={assets[visibleThumbnailsCount + 1] ?? PLACEHOLDER_IMAGE}
              title={title}
              index={visibleThumbnailsCount + 1}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors duration-300 hover:bg-black/60">
              <span className="text-lg font-medium text-white">
                +{remainingImagesCount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      {open && (
        <LazyLightbox
          open={open}
          close={() => setOpen(false)}
          slides={lightboxImages as any}
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
    </div>
  );
}

const AssetItem = ({
  url,
  index,
  title,
  className,
  priority,
}: AssetItemProps) => {
  const isUrlVideo = isVideo(url);

  return isUrlVideo ? (
    <div className="relative size-full">
      <video
        className={className}
        src={url}
      ></video>
      <div className={`absolute left-1/2 top-1/2 grid ${priority ? 'size-16' : 'size-8'} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black`}>
        <Play className={priority ? 'size-8' : ''} />
      </div>
    </div>
  ) : (
    <Image
      src={url || PLACEHOLDER_IMAGE}
      alt={index === 0 ? title : `${title} - image ${index + 2}`}
      fill
      className={className}
      priority={priority}
    />
  );
};

interface AssetItemProps {
  url: string;
  index: number;
  title: string;
  className?: string;
  priority?: boolean;
}
