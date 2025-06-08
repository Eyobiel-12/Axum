"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Building } from "lucide-react"

type NotificationStatus = "sending" | "success" | "error"

interface EmailStatusNotificationProps {
  isVisible: boolean
  status: {
    restaurant: NotificationStatus | null
  }
  onClose: () => void
}

export function EmailStatusNotification({ isVisible, status, onClose }: EmailStatusNotificationProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [notificationQueue, setNotificationQueue] = useState<
    { type: "restaurant"; status: NotificationStatus }[]
  >([])

  useEffect(() => {
    if (isVisible && status.restaurant) {
      setNotificationQueue([{ type: "restaurant", status: status.restaurant }])
      setShouldShow(true)
    } else {
      setShouldShow(false)
      setNotificationQueue([])
    }
  }, [isVisible, status])

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const currentNotification = notificationQueue[0]

      // Auto-hide after 5 seconds for success/error states
      if (currentNotification.status === "success" || currentNotification.status === "error") {
        const timer = setTimeout(() => {
          setNotificationQueue((prevQueue) => prevQueue.slice(1))
          if (notificationQueue.length === 1) {
            setTimeout(onClose, 300)
            setShouldShow(false)
          }
        }, 5000)

        return () => clearTimeout(timer)
      }
    }
  }, [notificationQueue, onClose])

  const currentNotification = notificationQueue.length > 0 ? notificationQueue[0] : null

  if (!shouldShow || !currentNotification) return null

  const notificationStatus = currentNotification.status

  const getStatusMessage = (status: NotificationStatus) => {
    const messages: Record<NotificationStatus, { title: string; description: string }> = {
      sending: { title: "", description: "" },
      success: { title: "Restaurant Notified", description: "Restaurant notification sent successfully" },
      error: { title: "Notification Failed", description: "Failed to send restaurant notification" },
    }

    return messages[status]
  }

  const statusMessage = getStatusMessage(notificationStatus)

  if (notificationStatus === "sending") return null

  const getAlertClassName = (status: NotificationStatus) => {
    switch (status) {
      case "sending":
        return "border-amber-200 bg-amber-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
    }
  }

  const getIconClassName = (status: NotificationStatus) => {
    switch (status) {
      case "sending":
        return "text-amber-600 animate-pulse"
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
    }
  }

  const getIcon = (status: NotificationStatus) => {
    switch (status) {
      case "sending":
        return <Building className={getIconClassName(status)} />
      case "success":
        return <CheckCircle className={getIconClassName(status)} />
      case "error":
        return <AlertCircle className={getIconClassName(status)} />
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 space-y-2 ${
        shouldShow ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <Alert className={`max-w-md ${getAlertClassName(notificationStatus)}`}>
        {getIcon(notificationStatus)}
        <div>
          <div className="font-medium text-sm">{statusMessage.title}</div>
          <AlertDescription className="text-sm">{statusMessage.description}</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
