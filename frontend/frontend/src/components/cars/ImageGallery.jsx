"use client"

import { useState } from "react"

const ImageGallery = ({ images = [], carName }) => {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg?height=400&width=600")

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = "/placeholder.svg?height=400&width=600"
  }

  return (
    <div className="image-gallery">
      <div className="main-image mb-4">
        <img
          src={mainImage || "/placeholder.svg"}
          alt={`${carName} - Main View`}
          className="w-full h-[400px] object-cover rounded-lg"
          onError={handleImageError}
        />
      </div>

      {images && images.length > 1 ? (
        <div className="thumbnails grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                mainImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setMainImage(image)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${carName} - View ${index + 1}`}
                className="w-full h-20 object-cover"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ImageGallery
