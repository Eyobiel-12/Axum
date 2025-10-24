// Email template configurations for EmailJS

export const EMAIL_TEMPLATES = {
  CUSTOMER_CONFIRMATION: {
    id: "template_customer_confirmation",
    subject: "Reservation Confirmed - Axum Restaurant",
    description: "Sent to customer immediately after successful reservation",
  },
  STAFF_NOTIFICATION: {
    id: "template_staff_notification", 
    subject: "New Reservation Alert - {{confirmation_number}}",
    description: "Sent to staff when new reservation is made",
  },
  REMINDER: {
    id: "template_reminder_24h",
    subject: "Reminder: Your Reservation Tomorrow - Axum Restaurant",
    description: "Sent 24 hours before the reservation",
  },
  CANCELLATION: {
    id: "template_cancellation",
    subject: "Reservation Cancelled - Axum Restaurant",
    description: "Sent when a reservation is cancelled",
  },
  MODIFICATION: {
    id: "template_modification",
    subject: "Reservation Updated - Axum Restaurant",
    description: "Sent when a reservation is modified",
  },
} as const

export const getEmailTemplate = (type: keyof typeof EMAIL_TEMPLATES) => {
  return EMAIL_TEMPLATES[type]
}

// Template variable mappings for EmailJS
export const TEMPLATE_VARIABLES = {
  // Customer information
  to_name: "Customer's full name",
  to_email: "Customer's email address",
  customer_name: "Customer's full name",
  customer_email: "Customer's email address",
  customer_phone: "Customer's phone number",

  // Reservation details
  reservation_date: "Formatted reservation date",
  reservation_time: "Reservation time",
  party_size: "Number of guests",
  special_requests: "Special requests or dietary restrictions",
  confirmation_number: "Unique confirmation number",

  // Restaurant information
  restaurant_name: "Axum Restaurant",
  restaurant_address: "Restaurant address",
  restaurant_phone: "Restaurant phone number",
  restaurant_email: "Restaurant email address",

  // Additional context
  reminder_type: "Type of reminder (24-hour, etc.)",
  cancellation_reason: "Reason for cancellation",
  modification_details: "Details of what was changed",
} as const

// Email template validation
export const validateTemplateData = (data: Record<string, any>) => {
  const required = [
    "customer_name",
    "customer_email",
    "reservation_date",
    "reservation_time",
    "party_size",
    "confirmation_number",
  ]

  const missing = required.filter((field) => !data[field])

  if (missing.length > 0) {
    throw new Error(`Missing required template data: ${missing.join(", ")}`)
  }

  return true
}
