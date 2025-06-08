"use client"

import { useState, useCallback } from "react"

interface TimeSlot {
  time: string
  available: boolean
  capacity: number
  booked: number
}

export function useAvailability() {
  const [isLoading, setIsLoading] = useState(false)
  const [availabilityData, setAvailabilityData] = useState<Record<string, TimeSlot[]>>({})

  const generateTimeSlots = useCallback((date: Date): TimeSlot[] => {
    const dayOfWeek = date.getDay()

    // Restaurant is closed on Mondays
    if (dayOfWeek === 1) {
      return []
    }

    // Base time slots
    const baseSlots = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"]

    // Extended hours for Friday and Saturday
    const extendedSlots = dayOfWeek === 5 || dayOfWeek === 6 ? [...baseSlots, "9:30 PM", "10:00 PM"] : baseSlots

    // Simulate availability based on date and time
    return extendedSlots.map((time) => {
      const seed = date.getDate() + time.charCodeAt(0)
      const random = Math.sin(seed) * 10000
      const availability = (random % 10) / 10

      const capacity = 12 // Total tables
      const booked = Math.floor(availability * capacity)

      return {
        time,
        available: booked < capacity,
        capacity,
        booked,
      }
    })
  }, [])

  const fetchAvailability = useCallback(
    async (date: Date) => {
      const dateKey = date.toISOString().split("T")[0]

      // Don't fetch if we already have data for this date
      if (availabilityData[dateKey]) {
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const slots = generateTimeSlots(date)

        setAvailabilityData((prev) => ({
          ...prev,
          [dateKey]: slots,
        }))
      } catch (error) {
        console.error("Failed to fetch availability:", error)
      } finally {
        // Ensure loading state is always reset
        setIsLoading(false)
      }
    },
    [generateTimeSlots, availabilityData],
  )

  const getAvailableSlots = useCallback(
    (date: Date): TimeSlot[] => {
      const dateKey = date.toISOString().split("T")[0]
      return availabilityData[dateKey] || []
    },
    [availabilityData],
  )

  return {
    isLoading,
    fetchAvailability,
    getAvailableSlots,
  }
}
