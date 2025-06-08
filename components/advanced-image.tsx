"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AdvancedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

export function AdvancedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  quality = 90,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  onError,
}: AdvancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (isVisible && !isInView) {
      setIsInView(true)
    }
  }, [isVisible, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {(isInView || priority) && !hasError && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (isInView || priority) && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-50">📷</div>
            <div className="text-xs">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  )
}
