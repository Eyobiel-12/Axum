"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Calendar, Crown, Sparkles } from "lucide-react"
import Image from "next/image"

interface LuxuryRestaurantNotificationProps {
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

export default function LuxuryRestaurantNotification({ reservationData, onClose }: LuxuryRestaurantNotificationProps) {
  const handleCallCustomer = () => {
    window.open(`tel:${reservationData.phone}`)
  }

  const handleEmailCustomer = () => {
    window.open(`mailto:${reservationData.email}`)
  }

  const handlePrint = () => {
    window.print()
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
    <div className="min-h-screen bg-stone-100 p-4 print:bg-white print:p-0">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden shadow-4xl border-0 bg-white rounded-3xl print:shadow-none">
          {/* Luxurious Header with Logo */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-12 text-center relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent_50%)]" />
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                <Image
                  src="/images/axum-logo.jpg"
                  alt="Axum Restaurant Logo"
                  width={56}
                  height={56}
                  className="rounded-xl object-cover"
                />
              </div>

              <h1 className="text-4xl font-light text-white mb-3 tracking-wide">New Reservation Confirmed</h1>
              <div className="text-amber-100 text-lg font-light">Please welcome our guest!</div>
            </div>
          </div>

          {/* Imperial Axum Gallery Section */}
          <div className="w-full bg-stone-50">
            <div className="relative">
              <Image
                src="/images/axum-obelisk-heritage.png"
                alt="Axum Obelisk Heritage"
                width={600}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="flex gap-1">
              <div className="flex-1">
                <Image
                  src="/images/axum-landscape-church.png"
                  alt="Imperial Axum Landscape"
                  width={300}
                  height={120}
                  className="w-full h-32 object-cover rounded-bl-3xl"
                />
              </div>
              <div className="flex-1">
                <Image
                  src="/images/historical-aksum-illustration.png"
                  alt="Historical Axum"
                  width={300}
                  height={120}
                  className="w-full h-32 object-cover rounded-br-3xl"
                />
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Confirmation Number Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-stone-50 px-6 py-3 rounded-full border-2 border-amber-200/50">
                <Crown className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-stone-600 font-light">Confirmation #</span>
                <span className="font-mono font-bold text-amber-700 text-lg tracking-wider">
                  {reservationData.confirmationNumber}
                </span>
              </div>
            </div>

            {/* Reservation Details Table */}
            <div className="bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-2xl p-8 mb-8 border border-stone-200/50 relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <h3 className="text-2xl font-light text-stone-800">Reservation Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Date:</span>
                    <span className="col-span-2 text-stone-800 font-light">{formatDate(reservationData.date)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Time:</span>
                    <span className="col-span-2 text-stone-800 font-light">{reservationData.time}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Guests:</span>
                    <span className="col-span-2 text-stone-800 font-light">{reservationData.guests} guests</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Name:</span>
                    <span className="col-span-2 text-stone-800 font-light">
                      {reservationData.firstName} {reservationData.lastName}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Email:</span>
                    <span className="col-span-2 text-blue-700 font-light">{reservationData.email}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-stone-200/50">
                    <span className="text-amber-700 font-medium">Phone:</span>
                    <span className="col-span-2 text-green-700 font-light">{reservationData.phone}</span>
                  </div>

                  {reservationData.specialRequests && (
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <span className="text-amber-700 font-medium">Special Requests:</span>
                      <span className="col-span-2 text-stone-800 font-light">{reservationData.specialRequests}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Customer Section */}
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-6 mb-8 border border-amber-200/50">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-medium text-stone-800">Contact Customer</h4>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleCallCustomer}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Customer
                </Button>

                <Button
                  onClick={handleEmailCustomer}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Customer
                </Button>

                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 print:hidden"
                >
                  Print Details
                </Button>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/50">
              <h4 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Action Items for Staff
              </h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  Confirm table availability and assign seating arrangement
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  Review special requests and dietary requirements
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  Prepare table setup according to party size
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  Contact customer if any clarification needed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  Ensure exceptional Ethiopian dining experience
                </li>
              </ul>
            </div>

            {/* Close Button */}
            {onClose && (
              <div className="text-center mt-8 print:hidden">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-2 border-stone-300 text-stone-700 hover:bg-stone-50 px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Close Notification
                </Button>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className="bg-stone-50 rounded-b-3xl px-8 py-6 text-center border-t border-stone-200/50">
            <div className="text-amber-700 font-medium mb-2">
              <a href="https://axumrestaurant.com" className="hover:text-amber-800 transition-colors">
                axumrestaurant.com
              </a>
            </div>
            <div className="text-stone-500 text-sm">Axum Restaurant, Amsterdam, Netherlands</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
