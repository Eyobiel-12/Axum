"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Mail, Phone, Crown, Sparkles, Download, Share2 } from "lucide-react"
import { format as formatDate } from "date-fns"
import { generateConfirmationNumber } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface ReservationConfirmationProps {
  reservationData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    guests: string
    time: string
    specialRequests: string
    date?: Date
  }
  confirmationNumber?: string
  onClose: () => void
}

export function ReservationConfirmation({
  reservationData,
  confirmationNumber: propConfirmationNumber,
  onClose,
}: ReservationConfirmationProps) {
  const confirmationNumber = propConfirmationNumber || generateConfirmationNumber()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("Reservation Confirmed!")
  }, [])

  const formattedDate = reservationData.date ? formatDate(reservationData.date, "PPPP") : "Please select a date"
  const fullName = `${reservationData.firstName || ""} ${reservationData.lastName || ""}`.trim()

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const shareText = `I just made a reservation at Axum Restaurant for ${formattedDate} at ${reservationData.time}. Confirmation: ${confirmationNumber}`
    navigator
      .share({
        title: "Reservation Confirmed",
        text: shareText,
        url: window.location.href,
      })
      .catch((error) => console.error("Sharing failed", error))
  }

  return (
    <>
      {/* Print-only styles */}
      <style jsx global>{`
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      font-family: Arial, sans-serif !important;
    }
    
    body > * {
      display: none !important;
    }
    
    .print-card {
      display: block !important;
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      height: 100vh !important;
      background: #fdf6e3 !important;
      padding: 40px !important;
      box-sizing: border-box !important;
      z-index: 9999 !important;
    }
    
    .print-card,
    .print-card *,
    .print-title,
    .print-title *,
    .print-section,
    .print-section *,
    .print-content,
    .print-content *,
    .print-icon,
    .print-label,
    .print-value,
    .print-title-text {
      display: block !important;
      visibility: visible !important;
    }
    
    .print-title {
      display: flex !important;
      align-items: center !important;
      margin-bottom: 30px !important;
    }
    
    .print-title-text {
      font-size: 28px !important;
      font-weight: bold !important;
      color: #333 !important;
      margin: 0 !important;
    }
    
    .print-icon {
      width: 44px !important;
      height: 44px !important;
      background-color: #c2703d !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin-right: 15px !important;
      color: white !important;
      font-size: 20px !important;
      flex-shrink: 0 !important;
      text-align: center !important;
      line-height: 44px !important;
    }
    
    .print-section {
      display: flex !important;
      align-items: flex-start !important;
      margin-bottom: 25px !important;
    }
    
    .print-content {
      flex: 1 !important;
    }
    
    .print-label {
      color: #666 !important;
      font-size: 16px !important;
      margin-bottom: 4px !important;
      font-weight: normal !important;
    }
    
    .print-value {
      color: #000 !important;
      font-size: 20px !important;
      font-weight: bold !important;
      margin-bottom: 5px !important;
      line-height: 1.3 !important;
    }
  }
`}</style>

      {/* Print-only content */}
      <div className="print-card" style={{ display: "none" }}>
        <div className="print-title">
          <div className="print-icon">✦</div>
          <div className="print-title-text">Reservation Details</div>
        </div>

        <div className="print-section">
          <div className="print-icon">#</div>
          <div className="print-content">
            <div className="print-label">Confirmation Number</div>
            <div className="print-value">{confirmationNumber}</div>
          </div>
        </div>

        <div className="print-section">
          <div className="print-icon">📅</div>
          <div className="print-content">
            <div className="print-label">Date & Time</div>
            <div className="print-value">
              {formattedDate} at {reservationData.time}
            </div>
          </div>
        </div>

        <div className="print-section">
          <div className="print-icon">👥</div>
          <div className="print-content">
            <div className="print-label">Party Size</div>
            <div className="print-value">{reservationData.guests} guests</div>
          </div>
        </div>

        <div className="print-section">
          <div className="print-icon">✉️</div>
          <div className="print-content">
            <div className="print-label">Guest Name</div>
            <div className="print-value">{fullName}</div>
          </div>
        </div>

        <div className="print-section">
          <div className="print-icon">📞</div>
          <div className="print-content">
            <div className="print-label">Contact Information</div>
            <div className="print-value">{reservationData.email}</div>
            <div className="print-value">{reservationData.phone}</div>
          </div>
        </div>

        {reservationData.specialRequests && (
          <div className="print-section">
            <div className="print-icon">✨</div>
            <div className="print-content">
              <div className="print-label">Special Requests</div>
              <div className="print-value">{reservationData.specialRequests}</div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print">
        <Card
          ref={cardRef}
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-0 shadow-3xl bg-gradient-to-br from-white via-amber-50/30 to-stone-50 relative"
        >
          {/* Imperial background elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none no-print">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rotate-45 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-amber-400 rotate-12 animate-pulse" />
          </div>

          <CardContent className="p-8 relative z-10">
            <div className="text-center mb-8 no-print">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl backdrop-blur-sm border border-amber-200/30">
                <img
                  src="/images/axum-logo.jpg"
                  alt="Axum Restaurant Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-amber-600" />
                <h2 className="text-4xl font-light text-stone-800">Reservation Confirmed</h2>
                <Crown className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-stone-600 font-light text-lg">
                Thank you for your reservation. We look forward to serving you an extraordinary dining experience.
              </p>
            </div>

            {/* Screen-only content */}
            <div className="bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 rounded-xl p-8 mb-8 border-2 border-amber-200/50 relative overflow-hidden no-print">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <h3 className="text-2xl font-light text-stone-800">Reservation Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">#</span>
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 font-light">Confirmation Number</p>
                      <p className="font-medium text-stone-800 text-xl tracking-wider">{confirmationNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 font-light">Date & Time</p>
                      <p className="font-medium text-stone-800 text-lg">
                        {formattedDate} at {reservationData.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 font-light">Party Size</p>
                      <p className="font-medium text-stone-800 text-lg">
                        {reservationData.guests} {Number.parseInt(reservationData.guests) === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 font-light">Guest Name</p>
                      <p className="font-medium text-stone-800 text-lg">{fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 font-light">Contact Information</p>
                      <p className="font-medium text-stone-800">{reservationData.email}</p>
                      <p className="font-medium text-stone-800">{reservationData.phone}</p>
                    </div>
                  </div>

                  {reservationData.specialRequests && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-600 font-light">Special Requests</p>
                        <p className="font-medium text-stone-800">{reservationData.specialRequests}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 no-print">
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 shadow-xl group"
              >
                <Crown className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
