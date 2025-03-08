"use client"

import { useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"


// Import styles
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/plugins/counter.css"
const LazyLightbox = dynamic(() => import("./lazy-light-box").then(mod => mod.default))

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  // State for lightbox
  const [open, setOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  // Format images for lightbox
  const lightboxImages = images.map((src) => ({ src }))

  // Calculate how many thumbnails to show
  const MAX_TOTAL_IMAGES_WITHOUT_INDICATOR = 5 // 1 main + 4 thumbnails
  const MAX_VISIBLE_THUMBNAILS = 4

  // Determine if we need to show the "+X" indicator
  const hasMoreImages = images.length > MAX_TOTAL_IMAGES_WITHOUT_INDICATOR
  const visibleThumbnailsCount = hasMoreImages ? MAX_VISIBLE_THUMBNAILS - 1 : MAX_VISIBLE_THUMBNAILS
  const remainingImagesCount = images.length - (visibleThumbnailsCount + 1) // +1 for the main image

  // Function to open lightbox with specific image
  const openLightbox = (index: number) => {
    setImageIndex(index)
    setOpen(true)
  }

  return (
    <div className="space-y-2">
      {/* Main image */}
      <div
        className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-xl cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={images[0] ?? "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 hover:opacity-100 font-medium">View Gallery</span>
        </div>
      </div>

      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(1, visibleThumbnailsCount + 1).map((image, index) => (
          <div
            key={index}
            className="relative h-20 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(index + 1)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - image ${index + 2}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
          </div>
        ))}

        {/* "More images" placeholder - only show if there are more than 5 total images */}
        {hasMoreImages && (
          <div
            className="relative h-20 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(visibleThumbnailsCount + 1)}
          >
            <Image
              src={images[visibleThumbnailsCount + 1] ?? "/placeholder.svg"}
              alt={`${title} - more images`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white font-medium text-lg">+{remainingImagesCount}</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      {open && (
        <LazyLightbox
          open={open}
          close={() => setOpen(false)}
          slides={lightboxImages}
          index={imageIndex}
          counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
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
            buttonPrev: images.length <= 1 ? () => null : undefined,
            buttonNext: images.length <= 1 ? () => null : undefined,
          }}
        />
      )}
    </div>
  )
}


