"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Mail, MapPin, Crown, Diamond } from "lucide-react"
import { ImperialReservationForm } from "@/components/imperial-reservation-form"
import Image from "next/image"

export default function ReservationsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Imperial Background Elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-amber-400 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-amber-400 rotate-12 animate-pulse" />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-amber-400 rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 border border-amber-400 rotate-12 animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Imperial Header */}
      <section className="relative py-40 bg-gradient-to-br from-stone-900 via-amber-900 to-black text-white overflow-hidden">
        {/* Restaurant Interior Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/axum-dining-room.png"
            alt="Axum Restaurant Dining Room"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-20">
          <div
            className={`transition-all duration-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Crown className="w-8 h-8 text-amber-400" />
              <h1 className="text-sm font-light tracking-[0.3em] text-amber-400 uppercase">Reserve Your Experience</h1>
              <Crown className="w-8 h-8 text-amber-400" />
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-8 tracking-wide bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              Reservations
            </h2>

            <p className="text-xl md:text-2xl text-amber-200 max-w-4xl mx-auto font-light leading-relaxed mb-8">
              Secure your table for an extraordinary dining experience that celebrates the ancient flavors of the Axum
              Empire
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-amber-300">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-light">Royal Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5" />
                <span className="text-sm font-light">Authentic Cuisine</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-light">Imperial Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reservation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid xl:grid-cols-3 gap-16">
            {/* Imperial Reservation Form */}
            <div className="xl:col-span-2">
              <ImperialReservationForm />
            </div>

            {/* Imperial Information Sidebar */}
            <div className="space-y-8">
              {/* Reservation Details */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-amber-50/30 to-stone-50 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Diamond className="w-6 h-6 text-amber-400 opacity-30" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-2xl font-light text-stone-800">Reservation Details</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium text-stone-800">Dining Hours</p>
                        <p className="text-stone-600 font-light">Tuesday - Thursday: 5:30 PM - 10:00 PM</p>
                        <p className="text-stone-600 font-light">Friday - Saturday: 5:30 PM - 10:30 PM</p>
                        <p className="text-stone-600 font-light">Sunday: 5:30 PM - 9:30 PM</p>
                        <p className="text-amber-600 font-light">Closed Mondays</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium text-stone-800">Party Size</p>
                        <p className="text-stone-600 font-light">Maximum 8 guests per online reservation</p>
                        <p className="text-stone-600 font-light">Larger parties: please call us directly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium text-stone-800">Location</p>
                        <p className="text-stone-600 font-light">Axum Restaurant</p>
                        <p className="text-stone-600 font-light">Amsterdam, Netherlands</p>
                        <a
                          href="https://maps.app.goo.gl/6nHh4ctHQfMDcNHY9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 transition-colors text-sm"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-amber-50 to-stone-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Cancellation Policy</h3>
                  <p className="text-stone-700 leading-relaxed font-light mb-4">
                    We require 24-hour notice for cancellations. Same-day cancellations may be subject to a fee. For
                    parties of 6 or more, we require a credit card to hold the reservation.
                  </p>
                  <p className="text-stone-600 text-sm font-light">
                    We understand that plans change and will work with you to accommodate when possible.
                  </p>
                </CardContent>
              </Card>

              {/* Private Dining */}
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-5 h-5" />
                    <h3 className="text-xl font-medium">Private Dining</h3>
                  </div>
                  <p className="text-amber-100 leading-relaxed font-light mb-6">
                    Host your special event in our private dining room. Perfect for intimate celebrations, business
                    dinners, and exclusive gatherings for up to 20 guests.
                  </p>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-light w-full group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Inquire About Private Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
