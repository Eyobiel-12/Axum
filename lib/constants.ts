export const SITE_CONFIG = {
  name: "Axum Restaurant",
  description: "Authentic Ethiopian fine dining restaurant in Amsterdam",
  url: "https://v0-axum-restaurant-website.vercel.app",
  ogImage: "/images/axum-logo.jpg",
  links: {
    twitter: "https://twitter.com/axumrestaurant",
    instagram: "https://instagram.com/axumrestaurant",
    facebook: "https://facebook.com/axumrestaurant",
  },
  contact: {
    phone: "+31206261472",
    email: "axumrestaurantams@gmail.com",
    address: "Korte Leidsedwarsstraat 58, 1017 RC Amsterdam, Netherlands",
  },
  hours: {
    tuesday: "17:30 - 22:00",
    wednesday: "17:30 - 22:00",
    thursday: "17:30 - 22:00",
    friday: "17:30 - 22:30",
    saturday: "17:30 - 22:30",
    sunday: "17:30 - 21:30",
    monday: "Closed",
  },
} as const

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_knff5r5",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_03y5h7p",
  userId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "fT-abc-a8qyPCy5Ak",
} as const
