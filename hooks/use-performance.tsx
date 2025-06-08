"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  connectionType: string
  isSlowConnection: boolean
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    connectionType: "unknown",
    isSlowConnection: false,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        setMetrics((prev) => ({ ...prev, fps }))
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Start FPS monitoring
    measureFPS()

    // Memory usage monitoring
    const updateMemoryUsage = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        setMetrics((prev) => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / 1048576, // Convert to MB
        }))
      }
    }

    // Connection monitoring
    const updateConnection = () => {
      if ("connection" in navigator) {
        const connection = (navigator as any).connection
        setMetrics((prev) => ({
          ...prev,
          connectionType: connection.effectiveType || "unknown",
          isSlowConnection: connection.effectiveType === "slow-2g" || connection.effectiveType === "2g",
        }))
      }
    }

    updateMemoryUsage()
    updateConnection()

    const memoryInterval = setInterval(updateMemoryUsage, 5000)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(memoryInterval)
    }
  }, [])

  return metrics
}
