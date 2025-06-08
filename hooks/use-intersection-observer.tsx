"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
  skip?: boolean
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.1, root = null, rootMargin = "0%", triggerOnce = true, skip = false } = options
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
    setIsVisible(entry.isIntersecting)
  }, [])

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || skip || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => {
      if (triggerOnce && isVisible) {
        observer.unobserve(node)
      } else {
        observer.disconnect()
      }
    }
  }, [elementRef, threshold, root, rootMargin, updateEntry, triggerOnce, isVisible, skip])

  return { elementRef, entry, isVisible }
}
