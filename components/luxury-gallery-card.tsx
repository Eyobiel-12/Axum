"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Crown, Award, Sparkles } from "lucide-react"

interface LuxuryGalleryCardProps {
  image: {
    id: string
    src: string
    alt: string
    title: string
    description: string
    category: string
    featured?: boolean
    luxury?: boolean
    award?: string
  }
  index: number
  onClick: () => void
  isVisible: boolean
}

export function LuxuryGalleryCard({ image, index, onClick, isVisible }: LuxuryGalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Add state for image loading and error handling
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const transform = isHovered
    ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(20px)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"

  return (
    <Card
      ref={cardRef}
      className={`
        luxury-card border-0 shadow-lg sm:shadow-2xl overflow-hidden group cursor-pointer
        transition-all duration-700 ease-out transform-gpu
        w-full h-auto
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"}
        ${image.luxury ? "ring-1 sm:ring-2 ring-amber-400/30 shadow-amber-500/20" : ""}
        hover:shadow-2xl sm:hover:shadow-3xl hover:shadow-amber-500/30
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 animate-pulse flex items-center justify-center">
            <div className="text-stone-500 text-sm">Loading...</div>
          </div>
        )}

        {/* Main Image with error handling */}
        <Image
          src={imageError ? "/placeholder.svg?height=320&width=400" : image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={95}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(true)
          }}
        />

        {/* Luxury Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out z-10" />

        {/* Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {image.featured && (
            <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border-0 flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Star className="w-3 h-3" />
              Signature
            </Badge>
          )}
          {image.luxury && (
            <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Crown className="w-3 h-3" />
              Luxury
            </Badge>
          )}
          {image.award && (
            <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-0 flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Award className="w-3 h-3" />
              {image.award}
            </Badge>
          )}
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
        </div>

        {/* Mobile-optimized info panel */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-1 sm:mb-2 tracking-wide line-clamp-2">
            {image.title}
          </h4>
          <p className="text-amber-200 text-xs sm:text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 line-clamp-3">
            {image.description}
          </p>

          {/* Mobile-friendly accent line */}
          <div className="w-0 h-px bg-gradient-to-r from-amber-400 to-transparent mt-2 sm:mt-4 group-hover:w-full transition-all duration-1000 delay-300" />
        </div>

        {/* 3D Depth Shadow */}
        <div
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: `translateZ(-10px) scale(1.05)`,
            filter: "blur(10px)",
          }}
        />
      </div>
    </Card>
  )
}
