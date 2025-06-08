"use client"

import { useState } from "react"

interface ReservationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  guests: string
  time: string
  specialRequests: string
  date?: Date
}

interface ValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  guests?: string
  time?: string
  date?: string
  general?: string
}

export function useReservationValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValidating, setIsValidating] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
  }

  const validateForm = async (data: ReservationData): Promise<boolean> => {
    setIsValidating(true)
    const newErrors: ValidationErrors = {}

    // Required field validation
    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!data.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!data.guests) {
      newErrors.guests = "Number of guests is required"
    }

    if (!data.time) {
      newErrors.time = "Preferred time is required"
    }

    if (!data.date) {
      newErrors.date = "Preferred date is required"
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(data.date)
      selectedDate.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
      }

      // Check if date is too far in advance (e.g., 3 months)
      const maxDate = new Date()
      maxDate.setMonth(maxDate.getMonth() + 3)
      if (selectedDate > maxDate) {
        newErrors.date = "Reservations can only be made up to 3 months in advance"
      }
    }

    setErrors(newErrors)
    setIsValidating(false)

    return Object.keys(newErrors).length === 0
  }

  const clearErrors = () => {
    setErrors({})
  }

  const clearFieldError = (field: keyof ValidationErrors) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  return {
    errors,
    isValidating,
    validateForm,
    clearErrors,
    clearFieldError,
  }
}
