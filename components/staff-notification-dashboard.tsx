"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Crown, Sparkles, Phone, Mail, Calendar, Clock, Users, Star } from "lucide-react"

interface StaffNotificationDashboardProps {
  notifications: Array<{
    id: string
    confirmationNumber: string
    customerName: string
    date: string
    time: string
    guests: string
    experienceLevel: string
    specialRequests?: string
    urgency: "HIGH" | "NORMAL"
    timestamp: string
  }>
}

export default function StaffNotificationDashboard({ notifications = [] }: StaffNotificationDashboardProps) {
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null)

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "VIP Experience":
        return "bg-gradient-to-r from-purple-600 to-pink-600"
      case "Premium Service":
        return "bg-gradient-to-r from-amber-600 to-orange-600"
      default:
        return "bg-gradient-to-r from-green-600 to-emerald-600"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    return urgency === "HIGH" ? "bg-red-500" : "bg-blue-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Staff Excellence Dashboard</h1>
              <p className="text-amber-300 text-lg">Axum Restaurant - Where Legends Are Made</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Bell className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{notifications.length}</div>
              <div className="text-purple-300 text-sm">Active Notifications</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-500/30">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.experienceLevel === "VIP Experience").length}
              </div>
              <div className="text-amber-300 text-sm">VIP Experiences</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.urgency === "HIGH").length}
              </div>
              <div className="text-red-300 text-sm">High Priority</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {notifications.reduce((sum, n) => sum + Number.parseInt(n.guests), 0)}
              </div>
              <div className="text-green-300 text-sm">Total Guests</div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedNotification(notification.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={`${getUrgencyColor(notification.urgency)} text-white px-3 py-1`}>
                    {notification.urgency} PRIORITY
                  </Badge>
                  <Badge className={`${getExperienceColor(notification.experienceLevel)} text-white px-3 py-1`}>
                    {notification.experienceLevel}
                  </Badge>
                </div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {notification.customerName}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Confirmation Number */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-3 border border-amber-500/30">
                    <div className="text-amber-300 text-sm font-medium">Confirmation #</div>
                    <div className="text-white font-mono font-bold text-lg">{notification.confirmationNumber}</div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{notification.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{notification.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{notification.guests} guests</span>
                  </div>
                </div>

                {/* Special Requests */}
                {notification.specialRequests && (
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20">
                    <div className="text-purple-300 text-xs font-medium mb-1">Special Requests:</div>
                    <div className="text-slate-300 text-sm">{notification.specialRequests}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>

                {/* Timestamp */}
                <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-700">
                  Received: {notification.timestamp}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Active Notifications</h3>
              <p className="text-slate-400">All caught up! New reservations will appear here.</p>
            </CardContent>
          </Card>
        )}

        {/* Inspiration Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">✨ Today's Inspiration</h3>
            <p className="text-slate-300 text-lg italic">
              "Every reservation is an opportunity to showcase Ethiopian hospitality at its finest. Let's create
              unforgettable memories that honor the ancient traditions of Axum!"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
