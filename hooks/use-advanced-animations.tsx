"use client"

import { useEffect, useState } from "react"
import { useIntersectionObserver } from "./use-intersection-observer"

interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  stagger?: number
  repeat?: boolean
}

export function useAdvancedAnimations(config: AnimationConfig = {}) {
  const { duration = 800, delay = 0, easing = "cubic-bezier(0.4, 0, 0.2, 1)", stagger = 100 } = config
  const [animationState, setAnimationState] = useState<"idle" | "running" | "complete">("idle")
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (isVisible && animationState === "idle") {
      setAnimationState("running")

      const timer = setTimeout(() => {
        setAnimationState("complete")
      }, duration + delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, animationState, duration, delay])

  const getAnimationClasses = (index = 0) => {
    const baseClasses = "transition-all"
    const durationClass = `duration-[${duration}ms]`
    const delayClass = delay > 0 ? `delay-[${delay + index * stagger}ms]` : ""

    return `${baseClasses} ${durationClass} ${delayClass}`
  }

  return {
    elementRef,
    isVisible,
    animationState,
    getAnimationClasses,
    isAnimating: animationState === "running",
    isComplete: animationState === "complete",
  }
}
