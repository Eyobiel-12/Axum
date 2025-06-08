"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Star,
  Crown,
  Award,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

interface LuxuryLightboxProps {
  selectedImage: any
  currentImageIndex: number
  filteredImages: any[]
  onClose: () => void
  onNavigate: (direction: "prev" | "next") => void
}

export function LuxuryLightbox({
  selectedImage,
  currentImageIndex,
  filteredImages,
  onClose,
  onNavigate,
}: LuxuryLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isLiked, setIsLiked] = useState(false)
  const [showImageInfo, setShowImageInfo] = useState(true)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowImageInfo(false), 3000)
    return () => clearTimeout(timer)
  }, [selectedImage])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
    if (zoomLevel <= 1.5) {
      setIsZoomed(false)
      setImagePosition({ x: 0, y: 0 })
    }
  }

  const handleImageClick = (e: React.MouseEvent) => {
    if (!isZoomed) {
      handleZoomIn()
    } else {
      const rect = imageRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) * -0.5
        const y = (e.clientY - rect.top - rect.height / 2) * -0.5
        setImagePosition({ x, y })
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: selectedImage.title,
        text: selectedImage.description,
        url: window.location.href,
      })
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = selectedImage.src
    link.download = `axum-${selectedImage.id}.jpg`
    link.click()
  }

  if (!selectedImage) return null

  return (
    <Dialog open={!!selectedImage} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[95vw] w-full h-[95vh] p-0 bg-black/98 border-0 backdrop-blur-xl"
        aria-describedby="lightbox-description"
      >
        <span id="lightbox-description" className="sr-only">
          Image lightbox gallery
        </span>
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Luxury Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400 rotate-45 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-amber-400 rotate-12 animate-pulse" />
            <div
              className="absolute top-1/2 left-1/4 w-16 h-16 border border-amber-400 rotate-45 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Top Control Bar */}
          <div
            className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-500 ${showImageInfo ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border-0 px-4 py-2">
                  {currentImageIndex + 1} of {filteredImages.length}
                </Badge>
                {selectedImage.featured && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
                {selectedImage.luxury && (
                  <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-0 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Luxury
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-red-400 transition-all duration-300"
                  onClick={onClose}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300 w-12 h-12 rounded-full backdrop-blur-sm bg-black/30"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300 w-12 h-12 rounded-full backdrop-blur-sm bg-black/30"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Zoom Controls */}
          <div className="absolute right-6 bottom-32 z-50 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300 w-10 h-10 rounded-full backdrop-blur-sm bg-black/30"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-amber-400 transition-all duration-300 w-10 h-10 rounded-full backdrop-blur-sm bg-black/30"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <div className="text-white text-xs text-center mt-2 bg-black/50 rounded px-2 py-1 backdrop-blur-sm">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Main Image */}
          <div
            ref={imageRef}
            className="relative w-full h-full max-w-6xl max-h-[85vh] cursor-pointer overflow-hidden"
            onClick={handleImageClick}
          >
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              fill
              className="object-contain transition-all duration-500 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              }}
              quality={100}
              priority
            />

            {/* Luxury Frame Effect */}
            <div className="absolute inset-0 border-4 border-gradient-to-r from-amber-400/30 via-transparent to-amber-400/30 pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/50" />
          </div>

          {/* Luxury Info Panel */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 transition-all duration-500 ${showImageInfo ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 hover:translate-y-0 hover:opacity-100"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl font-light text-white mb-3 tracking-wide">{selectedImage.title}</h3>
                  <p className="text-amber-200 text-lg font-light leading-relaxed mb-4 max-w-3xl">
                    {selectedImage.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border-0 px-4 py-2">
                      {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                    </Badge>
                    {selectedImage.award && (
                      <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-0 flex items-center gap-1 px-4 py-2">
                        <Award className="w-4 h-4" />
                        {selectedImage.award}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right text-stone-400">
                  <p className="text-sm mb-1">Professional Photography</p>
                  <p className="text-xs">© 2024 Axum Restaurant</p>
                </div>
              </div>

              {/* Luxury Accent Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-6 opacity-50" />
            </div>
          </div>

          {/* Floating Luxury Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float opacity-30"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
