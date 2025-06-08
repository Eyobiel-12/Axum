"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"
import { Phone, Mail, Calendar, Users, MessageSquare, Download, Bell } from "lucide-react"
import Image from "next/image"

interface RestaurantNotificationProps {
  reservationData: {
    confirmationNumber: string
    firstName: string
    lastName: string
    email: string
    phone: string
    date: string
    time: string
    guests: string
    specialRequests?: string
  }
  onClose?: () => void
}

export default function RestaurantNotification({ reservationData, onClose }: RestaurantNotificationProps) {
  const { t } = useTranslation()

  const handlePrint = () => {
    window.print()
  }

  const handleCallCustomer = () => {
    window.open(`tel:${reservationData.phone}`)
  }

  const handleEmailCustomer = () => {
    window.open(`mailto:${reservationData.email}`)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not available"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-4 print:bg-white print:p-0">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-2 border-red-200/50 bg-white/95 backdrop-blur-sm print:shadow-none print:border-none">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.3),transparent_50%)]" />
          </div>

          <CardContent className="p-8 relative z-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-2 rounded-full border-2 border-white/30" />
                <Image
                  src="/images/axum-logo.jpg"
                  alt="Axum Restaurant Logo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-3xl font-light text-stone-800 tracking-wide">NEW RESERVATION ALERT</h2>
              </div>
              <p className="text-stone-600 font-light text-lg">Immediate attention required</p>
            </div>

            {/* Printable reservation details */}
            <div
              id="printable-section"
              className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 rounded-xl p-8 mb-8 border-2 border-red-200/50 relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/axum-logo.jpg"
                      alt="Axum Restaurant"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-medium text-stone-800">AXUM RESTAURANT</h3>
                      <p className="text-sm text-stone-600">Reservation Management</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-600">Alert Time</p>
                    <p className="font-medium text-stone-800">{new Date().toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="bg-white/70 rounded-lg p-4 border border-stone-200/50">
                      <h4 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-600" />
                        Reservation Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">Confirmation #:</span>
                          <span className="font-mono font-bold text-red-700">{reservationData.confirmationNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Date:</span>
                          <span className="font-medium">{formatDate(reservationData.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Time:</span>
                          <span className="font-medium">{reservationData.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Party Size:</span>
                          <span className="font-medium">{reservationData.guests} guests</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/70 rounded-lg p-4 border border-stone-200/50">
                      <h4 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-red-600" />
                        Customer Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">Name:</span>
                          <span className="font-medium">
                            {reservationData.firstName} {reservationData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Email:</span>
                          <span className="font-medium text-blue-700">{reservationData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Phone:</span>
                          <span className="font-medium text-green-700">{reservationData.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {reservationData.specialRequests && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Special Requests & Dietary Notes
                    </h4>
                    <p className="text-amber-700 text-sm leading-relaxed">{reservationData.specialRequests}</p>
                  </div>
                )}

                <div className="bg-stone-100 rounded-lg p-4">
                  <h4 className="font-medium text-stone-800 mb-3">Action Items:</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li>• Confirm table availability and assign seating</li>
                    <li>• Add special requests to reservation system</li>
                    <li>• Contact customer if any issues arise</li>
                    <li>• Prepare for dietary restrictions if mentioned</li>
                    <li>• Set up table according to party size</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action buttons - hidden in print */}
            <div className="flex flex-wrap gap-4 justify-center print:hidden">
              <Button
                onClick={handleCallCustomer}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>

              <Button
                onClick={handleEmailCustomer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Customer
              </Button>

              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Print Details
              </Button>

              {onClose && (
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Close Alert
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
