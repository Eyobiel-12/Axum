import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_g77c7qb"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_nh46s1o"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "fT-abc-a8qyPCy5Ak"

// Initialize EmailJS (only needed once in your app)
emailjs.init(EMAILJS_PUBLIC_KEY)

export interface ReservationEmailData {
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

// Generate dynamic daily inspiration content
const getDailyInspiration = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const hour = now.getHours()
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'

  const inspirations = {
    morning: [
      "As the sun rises, let's welcome our guests with the warmth of Ethiopian hospitality. Today is a new opportunity to create lasting memories.",
      "Morning brings fresh opportunities to showcase our authentic Ethiopian cuisine. Let's make every guest feel like family.",
      "Start the day with the spirit of 'ተስፋ' (hope) and 'እምነት' (faith) in our service. Every guest deserves an exceptional experience.",
    ],
    afternoon: [
      "In the heart of the day, let's maintain our commitment to excellence. Each guest is a valued member of our extended family.",
      "As the day unfolds, remember that our attention to detail sets us apart. Every interaction is an opportunity to exceed expectations.",
      "The afternoon brings new opportunities to share our rich cultural heritage. Let's make every moment count.",
    ],
    evening: [
      "As the evening approaches, let's create magical moments that our guests will cherish. Every detail matters in crafting the perfect experience.",
      "The evening is our time to shine. Let's ensure every guest leaves with a story to tell about their time at Axum.",
      "As night falls, let's maintain our high standards of service. Every guest deserves to feel like royalty.",
    ],
  }

  const teamNotes: Record<number, string> = {
    0: "Sunday: A day of reflection and preparation for the week ahead. Let's set the tone for excellence.",
    1: "Monday: Fresh start, fresh opportunities. Let's make this week exceptional.",
    2: "Tuesday: Building momentum. Every interaction counts towards our reputation.",
    3: "Wednesday: Midweek excellence. Keep the energy high and standards higher.",
    4: "Thursday: Weekend anticipation. Let's prepare for our busiest days.",
    5: "Friday: Weekend begins. Let's make every guest's weekend special.",
    6: "Saturday: Peak performance day. Show why we're the best in Amsterdam.",
  }

  const randomInspiration = inspirations[timeOfDay][Math.floor(Math.random() * inspirations[timeOfDay].length)]
  const teamNote = teamNotes[dayOfWeek]

  return {
    daily_inspiration: randomInspiration,
    team_excellence_note: teamNote,
  }
}

// Send notification to restaurant
export const sendRestaurantNotification = async (data: ReservationEmailData): Promise<boolean> => {
  try {
    // Prepare template variables
    const templateParams = {
      customer_name: `${data.firstName} ${data.lastName}`,
      customer_email: data.email,
      customer_phone: data.phone,
      reservation_date: new Date(data.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reservation_time: data.time,
      party_size: data.guests,
      special_requests: data.specialRequests || "None",
      confirmation_number: data.confirmationNumber,
      table_preference: data.tablePreference || "No preference",
      occasion: data.occasion || "Regular dining",
      notification_time: new Date().toLocaleString(),
      urgency_level: new Date(data.date).getTime() - Date.now() < 24 * 60 * 60 * 1000 ? "HIGH" : "NORMAL",
      // Add any other variables your template uses
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error("Failed to send restaurant notification:", error);
    return false;
  }
}

// Combined function to send restaurant notification only
export const sendReservationEmails = async (
  data: ReservationEmailData,
): Promise<{
  restaurantNotification: boolean
}> => {
  console.log("Starting email sending process...")

  const restaurantResult = await sendRestaurantNotification(data)

  console.log("Email results:", { restaurantResult })

  return {
    restaurantNotification: restaurantResult,
  }
}
