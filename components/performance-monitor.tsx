"use client"

import { usePerformance } from "@/hooks/use-performance"
import { useState, useEffect } from "react"

export function PerformanceMonitor() {
  const metrics = usePerformance()
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        setShowMonitor((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  if (!showMonitor) return null

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-black/90 text-white p-4 rounded-lg font-mono text-xs backdrop-blur-sm">
      <div className="space-y-1">
        <div>
          FPS:{" "}
          <span className={metrics.fps < 30 ? "text-red-400" : metrics.fps < 50 ? "text-yellow-400" : "text-green-400"}>
            {metrics.fps}
          </span>
        </div>
        <div>
          Memory:{" "}
          <span className={metrics.memoryUsage > 100 ? "text-red-400" : "text-green-400"}>
            {metrics.memoryUsage.toFixed(1)}MB
          </span>
        </div>
        <div>
          Connection:{" "}
          <span className={metrics.isSlowConnection ? "text-red-400" : "text-green-400"}>{metrics.connectionType}</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2">Ctrl+Shift+P to toggle</div>
    </div>
  )
}
