"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Users, Loader2, AlertCircle, Crown, Sparkles, Diamond } from "lucide-react"
import { format } from "date-fns"
import { useReservationValidation } from "@/hooks/use-reservation-validation"
import { useAvailability } from "@/hooks/use-availability"
import { ReservationConfirmation } from "@/components/reservation-confirmation"
import { EmailStatusNotification } from "@/components/email-status-notification"
import { sendReservationEmails, type ReservationEmailData } from "@/lib/emailjs"
import Image from "next/image"

interface ImperialReservationFormProps {
  onReservationComplete?: (data: any) => void
}

export function ImperialReservationForm({ onReservationComplete }: ImperialReservationFormProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "",
    time: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationNumber, setConfirmationNumber] = useState("")
  const [submittedData, setSubmittedData] = useState<any>(null) // Store submitted data separately
  const [emailStatus, setEmailStatus] = useState<{
    restaurant: "sending" | "success" | "error" | null
  }>({ restaurant: null })
  const [showEmailNotification, setShowEmailNotification] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { errors, isValidating, validateForm, clearFieldError } = useReservationValidation()
  const { isLoading: isLoadingAvailability, fetchAvailability, getAvailableSlots } = useAvailability()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fetch availability when date changes
  useEffect(() => {
    if (date) {
      fetchAvailability(date)
      // Clear selected time if it becomes unavailable
      if (formData.time) {
        const slots = getAvailableSlots(date)
        const selectedSlot = slots.find((slot) => slot.time === formData.time)
        if (!selectedSlot?.available) {
          setFormData((prev) => ({ ...prev, time: "" }))
        }
      }
    }
  }, [date, fetchAvailability, formData.time, getAvailableSlots])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    clearFieldError(field as any)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    clearFieldError("date")
    // Clear time selection when date changes
    setFormData((prev) => ({ ...prev, time: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = await validateForm({ ...formData, date })
    if (!isValid) return

    setIsSubmitting(true)

    try {
      // Simulate reservation API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate confirmation number
      const confirmationNum = `AXM${Date.now().toString().slice(-6)}`
      setConfirmationNumber(confirmationNum)

      // Store the submitted data BEFORE resetting the form
      const reservationData = {
        ...formData,
        date,
        confirmationNumber: confirmationNum,
      }
      setSubmittedData(reservationData)

      // Prepare email data
      const emailData: ReservationEmailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        time: formData.time,
        date: date ? format(date, "EEEE, MMMM d, yyyy") : "",
        specialRequests: formData.specialRequests,
        confirmationNumber: confirmationNum,
      }

      // Show confirmation modal first
      setShowConfirmation(true)

      // Send only restaurant notification email
      setEmailStatus({ restaurant: "sending" })
      setShowEmailNotification(true)

      try {
        const emailResults = await sendReservationEmails(emailData)
        setEmailStatus({
          restaurant: emailResults.restaurantNotification ? "success" : "error",
        })
      } catch (error) {
        console.error("Email sending failed:", error)
        setEmailStatus({ restaurant: "error" })
      }

      // Call completion callback
      onReservationComplete?.(emailData)
    } catch (error) {
      console.error("Reservation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    // Reset form ONLY after closing confirmation
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      guests: "",
      time: "",
      specialRequests: "",
    })
    setDate(undefined)
    setSubmittedData(null)
  }

  const availableSlots = date ? getAvailableSlots(date) : []
  const hasAvailableSlots = availableSlots.some((slot) => slot.available)

  return (
    <div className="w-full">
      <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-stone-50 relative">
        {/* Imperial Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rotate-45 animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-24 h-24 border border-amber-400 rotate-12 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 border border-amber-400 rotate-45 animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <CardHeader className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-8 relative overflow-hidden">
          {/* Luxury shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <Image
                src="/images/axum-logo.jpg"
                alt="Axum Restaurant Logo"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-light tracking-wide flex items-center gap-2">
                <Diamond className="w-6 h-6" />
                Reserve Your Table
              </CardTitle>
              <p className="text-amber-100 font-light mt-2">Experience culinary excellence</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div
              className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-light text-stone-800 tracking-wide">Guest Information</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-400 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <Label htmlFor="firstName" className="text-stone-700 font-light flex items-center gap-2">
                    First Name <span className="text-amber-600">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`border-stone-300 focus:border-amber-500 h-12 transition-all duration-300 group-hover:border-amber-300 ${errors.firstName ? "border-red-500 animate-pulse" : ""}`}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="lastName" className="text-stone-700 font-light flex items-center gap-2">
                    Last Name <span className="text-amber-600">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`border-stone-300 focus:border-amber-500 h-12 transition-all duration-300 group-hover:border-amber-300 ${errors.lastName ? "border-red-500 animate-pulse" : ""}`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-stone-700 font-light flex items-center gap-2">
                  Email Address <span className="text-amber-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-stone-300 focus:border-amber-500 h-12 transition-all duration-300 group-hover:border-amber-300 ${errors.email ? "border-red-500 animate-pulse" : ""}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="phone" className="text-stone-700 font-light flex items-center gap-2">
                  Phone Number <span className="text-amber-600">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`border-stone-300 focus:border-amber-500 h-12 transition-all duration-300 group-hover:border-amber-300 ${errors.phone ? "border-red-500 animate-pulse" : ""}`}
                  placeholder="+31 6 12345678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Reservation Details Section */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-light text-stone-800 tracking-wide">Reservation Details</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-400 to-transparent" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2 group">
                  <Label className="text-stone-700 font-light flex items-center gap-2">
                    Preferred Date <span className="text-amber-600">*</span>
                  </Label>
                  {/* Mobile-first approach */}
                  <div className="md:hidden">
                    <Input
                      type="date"
                      value={date ? format(date, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const selectedDate = e.target.value ? new Date(e.target.value) : undefined
                        handleDateSelect(selectedDate)
                      }}
                      min={format(new Date(), "yyyy-MM-dd")}
                      max={format(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")}
                      className={`h-12 border-stone-300 focus:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.date ? "border-red-500 animate-pulse" : ""}`}
                    />
                  </div>
                  {/* Desktop popover */}
                  <div className="hidden md:block">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-light h-12 border-stone-300 hover:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.date ? "border-red-500 animate-pulse" : ""}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            const maxDate = new Date()
                            maxDate.setMonth(maxDate.getMonth() + 3)
                            return date < today || date > maxDate || date.getDay() === 1
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="time" className="text-stone-700 font-light flex items-center gap-2">
                    Preferred Time <span className="text-amber-600">*</span>
                  </Label>
                  {/* Mobile-first approach */}
                  <div className="md:hidden">
                    <select
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      disabled={!date}
                      className={`w-full h-12 px-3 py-2 border rounded-md bg-white text-stone-900 border-stone-300 focus:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.time ? "border-red-500 animate-pulse" : ""}`}
                    >
                      <option value="">{!date ? "Select date first" : "Select time"}</option>
                      {isLoadingAvailability ? (
                        <option disabled>Loading...</option>
                      ) : (
                        availableSlots.map((slot) => (
                          <option key={slot.time} value={slot.time} disabled={!slot.available}>
                            {slot.time}{" "}
                            {!slot.available ? "(Unavailable)" : slot.capacity - slot.booked <= 2 ? "(Limited)" : ""}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  {/* Desktop Select */}
                  <div className="hidden md:block">
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleInputChange("time", value)}
                      disabled={!date}
                    >
                      <SelectTrigger
                        className={`h-12 border-stone-300 focus:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.time ? "border-red-500 animate-pulse" : ""}`}
                      >
                        <SelectValue placeholder={!date ? "Select date first" : "Select time"} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingAvailability ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        ) : availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <SelectItem
                              key={slot.time}
                              value={slot.time}
                              disabled={!slot.available}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{slot.time}</span>
                                {!slot.available && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    Unavailable
                                  </Badge>
                                )}
                                {slot.available && slot.capacity - slot.booked <= 2 && (
                                  <Badge variant="outline" className="ml-2 text-xs text-amber-600">
                                    Limited
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))
                        ) : date ? (
                          <div className="p-4 text-center text-stone-500">No slots available</div>
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      {errors.time}
                    </p>
                  )}
                  {date && !isLoadingAvailability && !hasAvailableSlots && (
                    <Alert className="mt-2 border-amber-200 bg-amber-50">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-700">No slots available for this date</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="guests" className="text-stone-700 font-light flex items-center gap-2">
                    Number of Guests <span className="text-amber-600">*</span>
                  </Label>
                  {/* Mobile-first approach */}
                  <div className="md:hidden">
                    <select
                      value={formData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      className={`w-full h-12 px-3 py-2 border rounded-md bg-white text-stone-900 border-stone-300 focus:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.guests ? "border-red-500 animate-pulse" : ""}`}
                    >
                      <option value="">Select guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                      <option value="9+">9+ Guests (Contact us)</option>
                    </select>
                  </div>
                  {/* Desktop Select */}
                  <div className="hidden md:block">
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger
                        className={`h-12 border-stone-300 focus:border-amber-500 transition-all duration-300 group-hover:border-amber-300 ${errors.guests ? "border-red-500 animate-pulse" : ""}`}
                      >
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                        <SelectItem value="9+">9+ Guests (Contact us)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.guests && (
                    <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Requests Section */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-light text-stone-800 tracking-wide">Special Requests</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-400 to-transparent" />
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="specialRequests" className="text-stone-700 font-light">
                  Special Requests or Dietary Requirements
                </Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Please let us know about any dietary restrictions, allergies, or special occasions..."
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  className="border-stone-300 focus:border-amber-500 min-h-[120px] transition-all duration-300 group-hover:border-amber-300"
                />
                <p className="text-sm text-stone-500 font-light">
                  We'll do our best to accommodate your special requests
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div
              className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button
                type="submit"
                disabled={isSubmitting || isValidating || !hasAvailableSlots}
                className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 text-white py-4 text-lg font-light tracking-wide border-0 shadow-xl disabled:opacity-50 relative overflow-hidden group"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Reservation...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Confirm Reservation
                    </>
                  )}
                </div>
              </Button>

              <p className="text-sm text-stone-500 text-center mt-4 font-light">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmation && submittedData && (
        <ReservationConfirmation
          reservationData={submittedData}
          confirmationNumber={confirmationNumber}
          onClose={handleCloseConfirmation}
        />
      )}

      {/* Email Status Notification */}
      <EmailStatusNotification
        isVisible={showEmailNotification}
        status={emailStatus}
        onClose={() => {
          setShowEmailNotification(false)
          setEmailStatus({ restaurant: null, customer: null })
        }}
      />
    </div>
  )
}
