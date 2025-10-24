import emailjs from "@emailjs/browser"

// EmailJS configuration for staff notifications
const EMAILJS_SERVICE_ID = "service_knff5r5"
const EMAILJS_TEMPLATE_ID = "template_staff_notification"
const EMAILJS_USER_ID = "fT-abc-a8qyPCy5Ak"

// Initialize EmailJS
emailjs.init(EMAILJS_USER_ID)

export interface StaffNotificationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  guests: string
  time: string
  date: string
  specialRequests?: string
  confirmationNumber: string
  tablePreference?: string
  occasion?: string
}

// Enhanced staff notification with luxury presentation
export const sendStaffNotification = async (data: StaffNotificationData): Promise<boolean> => {
  try {
    // Generate luxury experience details
    const experienceLevel =
      Number.parseInt(data.guests) >= 6
        ? "VIP Experience"
        : Number.parseInt(data.guests) >= 4
          ? "Premium Service"
          : "Intimate Dining"

    const tableRecommendation =
      Number.parseInt(data.guests) <= 2
        ? "Romantic corner table with traditional seating"
        : Number.parseInt(data.guests) <= 4
          ? "Premium 4-top with cultural ambiance"
          : Number.parseInt(data.guests) <= 6
            ? "Family-style table with ceremonial setup"
            : "Grand communal table with full Ethiopian experience"

    const serviceNotes = [
      "🏛️ Prepare traditional Ethiopian welcome ceremony",
      "☕ Ready coffee ceremony setup if requested",
      "🍯 Ensure tej (honey wine) is properly chilled",
      "🎵 Consider traditional Ethiopian music playlist",
      "🕯️ Arrange ambient lighting for cultural atmosphere",
    ]

    const templateParams = {
      // Staff notification details
      to_email: "staff@axumrestaurant.nl",
      to_name: "Axum Restaurant Team",

      // Customer information with luxury presentation
      customer_name: `${data.firstName} ${data.lastName}`,
      customer_email: data.email,
      customer_phone: data.phone,
      customer_title: experienceLevel,

      // Enhanced reservation details
      reservation_date: new Date(data.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reservation_time: data.time,
      party_size: data.guests,
      experience_level: experienceLevel,
      table_recommendation: tableRecommendation,

      // Special details
      special_requests: data.specialRequests || "No special requests",
      confirmation_number: data.confirmationNumber,
      table_preference: data.tablePreference || "Standard seating",
      occasion: data.occasion || "Regular dining",

      // Service excellence notes
      service_notes: serviceNotes.join("\n"),

      // Timestamp and urgency
      notification_time: new Date().toLocaleString(),
      urgency_level: new Date(data.date).getTime() - Date.now() < 24 * 60 * 60 * 1000 ? "HIGH" : "NORMAL",

      // Restaurant branding
      restaurant_name: "AXUM RESTAURANT",
      restaurant_tagline: "Where Ancient Ethiopian Heritage Meets Modern Luxury",
      staff_message: "A new guest awaits the legendary Axum experience. Let's create culinary magic! ✨",

      // Visual elements for email template
      logo_url: "https://axumrestaurant.nl/images/axum-logo.jpg",
      heritage_image: "https://axumrestaurant.nl/images/axum-obelisk-heritage.png",
      dining_room_image: "https://axumrestaurant.nl/images/axum-main-dining-room.png",
      signature_dish_image: "https://axumrestaurant.nl/images/real-ethiopian-platter-1.png",
      traditional_seating_image: "https://axumrestaurant.nl/images/traditional-ethiopian-seating.png",

      // Staff motivation elements
      daily_inspiration: "Today we honor the ancient traditions of Axum while creating unforgettable memories",
      team_excellence_note: "Every reservation is an opportunity to showcase Ethiopian hospitality at its finest",
    }

    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

    console.log("✨ Luxury staff notification sent successfully:", response.status, response.text)
    return true
  } catch (error) {
    console.error("❌ Failed to send staff notification:", error)
    return false
  }
}

// Enhanced notification with staff dashboard preview
export const sendEnhancedStaffNotification = async (
  data: StaffNotificationData,
): Promise<{
  emailSent: boolean
  notificationData: any
}> => {
  const emailSent = await sendStaffNotification(data)

  return {
    emailSent,
    notificationData: {
      confirmationNumber: data.confirmationNumber,
      customerName: `${data.firstName} ${data.lastName}`,
      reservationDetails: {
        date: data.date,
        time: data.time,
        guests: data.guests,
        specialRequests: data.specialRequests,
      },
      staffNotes: {
        experienceLevel: Number.parseInt(data.guests) >= 6 ? "VIP Experience" : "Premium Service",
        preparationTime: "30 minutes before arrival",
        specialSetup: data.specialRequests ? "Required" : "Standard",
      },
    },
  }
}
