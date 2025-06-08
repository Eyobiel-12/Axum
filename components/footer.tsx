import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Clock, Crown } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/axumrestaurant",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/axumrestaurant",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/axumrestaurant",
      label: "Twitter",
    },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-stone-900 via-amber-900 to-black text-white overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-amber-400 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-400 rotate-12 animate-pulse" />
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 border border-amber-400 rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
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

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Top Section - Brand & Description */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/axum-logo.jpg"
                alt="Axum Restaurant Logo"
                fill
                className="object-contain hover:scale-110 transition-transform duration-500 rounded-full border-2 border-amber-400/30"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-extralight tracking-[0.2em] text-amber-100">Axum Restaurant</span>
              <span className="text-sm font-light tracking-[0.3em] uppercase text-amber-300">RESTAURANT</span>
            </div>
          </div>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

          <p className="text-xl text-amber-200 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Experience the ancient flavors of the Axum Empire in a modern culinary journey that honors tradition while
            embracing innovation. Where every meal becomes a celebration of Ethiopian heritage and contemporary
            excellence.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Navigation Links */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide text-amber-300 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600" />
                Navigation
              </h3>
              <div className="space-y-4">
                {[
                  { href: "/menu", label: "Menu" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/reservations", label: "Reservations" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-stone-300 hover:text-amber-400 transition-all duration-300 font-light hover:translate-x-2 group"
                  >
                    <span className="border-b border-transparent group-hover:border-amber-400 transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide text-amber-300 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600" />
                Contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-stone-300 font-light">
                    <p className="text-amber-200 font-medium mb-1">Address</p>
                    <p>Axum Restaurant</p>
                    <p>Amsterdam, Netherlands</p>
                    <a
                      href="https://maps.app.goo.gl/6nHh4ctHQfMDcNHY9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors text-sm inline-flex items-center gap-1 mt-2 group"
                    >
                      <span className="border-b border-transparent group-hover:border-amber-400 transition-all duration-300">
                        View on Google Maps
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-stone-300 font-light">
                    <p className="text-amber-200 font-medium mb-1">Phone</p>
                    <p>0206633963</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-stone-300 font-light">
                    <p className="text-amber-200 font-medium mb-1">Email</p>
                    <p>axumrestaurantams@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide text-amber-300 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600" />
                Hours
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-amber-200 font-medium">Dining Hours</span>
                </div>

                {[
                  { days: "Tuesday - Thursday", hours: "5:30 PM - 10:00 PM", special: false },
                  { days: "Friday - Saturday", hours: "5:30 PM - 10:30 PM", special: false },
                  { days: "Sunday", hours: "5:30 PM - 9:30 PM", special: false },
                  { days: "Monday", hours: "Closed", special: true },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-stone-700/30">
                    <span className="text-stone-300 font-light">{schedule.days}</span>
                    <span className={`text-sm font-light ${schedule.special ? "text-amber-400" : "text-stone-400"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide text-amber-300 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600" />
                Connect
              </h3>

              {/* Social Media */}
              <div className="mb-8">
                <p className="text-amber-200 font-medium mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl group"
                    >
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Separator */}
        <div className="relative mb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-center lg:text-left">
            <p className="text-stone-400 text-sm font-light mb-2">
              © {currentYear} Axum Restaurant. All rights reserved.
            </p>
            <p className="text-stone-500 text-xs font-light">
              Crafted with passion for culinary excellence and Ethiopian heritage
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-8 text-sm">
            {[
              { href: "#", label: "Privacy Policy" },
              { href: "#", label: "Terms of Service" },
              { href: "#", label: "Accessibility" },
              { href: "#", label: "Careers" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-stone-400 hover:text-amber-400 transition-colors duration-300 font-light group"
              >
                <span className="border-b border-transparent group-hover:border-amber-400 transition-all duration-300">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Luxury Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
    </footer>
  )
}
