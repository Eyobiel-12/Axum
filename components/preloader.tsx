"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-stone-900 via-amber-900 to-stone-900 flex items-center justify-center">
      <div className="text-center text-white">
        {/* Logo container with explicit dimensions and styling */}
        <div className="w-32 h-32 mx-auto mb-6 relative bg-amber-50 rounded-full p-2 shadow-lg">
          <Image
            src="/images/axum-logo.jpg"
            alt="Axum Restaurant Logo"
            width={120}
            height={120}
            className="object-contain rounded-full"
            priority
          />
        </div>

        <h1 className="text-4xl font-extralight tracking-[0.2em] mb-2 text-amber-100">AXUM</h1>
        <p className="text-amber-300 mb-8 font-light">Loading Experience...</p>

        <div className="w-64 h-1 bg-amber-900 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-amber-400 mt-4 text-sm">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
