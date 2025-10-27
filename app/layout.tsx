import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { ScrollProgress } from "@/components/scroll-progress"
import { Preloader } from "@/components/preloader"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: "Axum Restaurant - Authentic Ethiopian Fine Dining in Amsterdam",
    template: "%s | Axum Restaurant",
  },
  description:
    "Experience the ancient flavors of the Axum Empire through modern culinary artistry. Authentic Ethiopian cuisine, traditional coffee ceremony, and luxury dining in the heart of Amsterdam.",
  keywords: [
    "Ethiopian restaurant Amsterdam",
    "authentic Ethiopian food",
    "traditional Ethiopian cuisine",
    "Ethiopian coffee ceremony",
    "fine dining Amsterdam",
    "Axum restaurant",
    "injera bread",
    "berbere spice",
    "Ethiopian cultural dining",
    "Amsterdam restaurants",
  ],
  authors: [{ name: "Axum Restaurant", url: "https://axumrestaurant.nl" }],
  creator: "Axum Restaurant",
  publisher: "Axum Restaurant",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://axumrestaurant.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Axum Restaurant - Authentic Ethiopian Fine Dining",
    description: "Experience the ancient flavors of the Axum Empire through modern culinary artistry in Amsterdam.",
    url: "https://axumrestaurant.nl",
    siteName: "Axum Restaurant",
    images: [
      {
        url: "/images/axum-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Axum Restaurant - Authentic Ethiopian Cuisine",
      },
      {
        url: "/images/real-ethiopian-platter-1.png",
        width: 1200,
        height: 630,
        alt: "Traditional Ethiopian Platter at Axum Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axum Restaurant - Authentic Ethiopian Fine Dining",
    description: "Experience the ancient flavors of the Axum Empire through modern culinary artistry in Amsterdam.",
    images: ["/images/axum-logo.jpg"],
    creator: "@axumrestaurant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
    yandex: "your-yandex-verification-code-here",
    yahoo: "your-yahoo-verification-code-here",
  },
  category: "restaurant",
  classification: "business",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: "Axum Restaurant",
    statusBarStyle: "default",
  },
  applicationName: "Axum Restaurant",
  generator: "Next.js",
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#d97706",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://blob.v0.dev" />
        <link rel="preconnect" href="https://blob.v0.dev" />

        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d97706" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Axum Restaurant",
              description: "Authentic Ethiopian fine dining restaurant in Amsterdam",
              url: "https://axumrestaurant.nl",
              telephone: "+31206633963",
              email: "axumrestaurantams@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Blasiusstraat 62",
                addressLocality: "Amsterdam",
                postalCode: "1091 CV",
                addressCountry: "NL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "52.3575",
                longitude: "4.9244",
              },
              openingHours: ["Tu-Th 17:00-22:30", "Fr-Sa 17:00-00:00", "Su 17:00-22:30"],
              servesCuisine: "Ethiopian",
              priceRange: "€€",
              acceptsReservations: true,
              hasMenu: "https://axumrestaurant.nl/menu",
              image: "https://axumrestaurant.nl/images/axum-logo.jpg",
              logo: "https://axumrestaurant.nl/images/axum-logo.jpg",
              sameAs: ["https://www.facebook.com/axumrestaurant", "https://www.instagram.com/axumrestaurant"],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Preloader />
          </Suspense>
          <ScrollProgress />
          <PerformanceMonitor />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
