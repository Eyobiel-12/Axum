"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { forwardRef, useState, useRef, useEffect } from "react"
import type { ButtonProps } from "@/components/ui/button"

interface AdvancedButtonProps extends ButtonProps {
  ripple?: boolean
  haptic?: boolean
  sound?: boolean
  magneticEffect?: boolean
  glowEffect?: boolean
}

export const AdvancedButton = forwardRef<HTMLButtonElement, AdvancedButtonProps>(
  (
    {
      children,
      className = "",
      ripple = true,
      haptic = true,
      sound = false,
      magneticEffect = true,
      glowEffect = true,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const buttonRef = useRef<HTMLButtonElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
      if (sound) {
        audioRef.current = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        )
      }
    }, [sound])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Haptic feedback
      if (haptic && "vibrate" in navigator) {
        navigator.vibrate(50)
      }

      // Sound feedback
      if (sound && audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {}) // Ignore errors
      }

      // Ripple effect
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const newRipple = { id: Date.now(), x, y }

        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
        }, 600)
      }

      onClick?.(e)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magneticEffect && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setMousePosition({ x: x * 0.1, y: y * 0.1 })
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setMousePosition({ x: 0, y: 0 })
    }

    return (
      <Button
        ref={ref || buttonRef}
        className={`
          relative overflow-hidden transition-all duration-300 transform
          ${magneticEffect ? "hover:scale-105" : ""}
          ${glowEffect ? "hover:shadow-lg hover:shadow-amber-500/25" : ""}
          ${className}
        `}
        style={{
          transform: magneticEffect
            ? `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovered ? "scale(1.05)" : "scale(1)"}`
            : undefined,
        }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              animationDuration: "600ms",
            }}
          />
        ))}

        {/* Glow effect */}
        {glowEffect && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </Button>
    )
  },
)

AdvancedButton.displayName = "AdvancedButton"
