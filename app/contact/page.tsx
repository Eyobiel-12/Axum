"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Car, Train, Star, Award, MessageCircle, Send, Loader2, CheckCircle, Facebook, Instagram, Twitter, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import * as emailjs from "@emailjs/browser"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const initEmailJS = async () => {
      if (typeof window !== "undefined") {
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key")
      }
    }
    initEmailJS()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "axumrestaurantams@gmail.com",
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
        templateParams
      )

      setIsSubmitted(true)
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Email send error:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <section className="relative py-12 md:py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 md:w-64 md:h-64 border border-slate-400 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 md:w-48 md:h-48 border border-slate-400 rotate-12"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-xs sm:text-sm font-light tracking-[0.2em] text-slate-400 uppercase mb-3 md:mb-4">Get in Touch</h1>
          <div className="w-12 sm:w-16 h-px bg-slate-400 mx-auto mb-6 md:mb-8"></div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight mb-4 md:mb-6 px-4 sm:px-0">Contact Us</h2>
          <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed px-2 sm:px-0">
            We'd love to hear from you. Connect with our team for reservations, inquiries, or special requests
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 md:py-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-full">
          {/* Main Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-16 mb-6 md:mb-16">
            {/* Contact Form */}
            <div className="w-full">
              <Card
                className={`shadow-2xl border-0 overflow-hidden transition-all duration-1000 delay-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6 md:p-8">
                  <CardTitle className="text-xl md:text-3xl font-light tracking-wide">Send us a Message</CardTitle>
                  <p className="text-slate-100 font-light text-sm md:text-base">We'll respond within 24 hours</p>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-stone-700 font-light text-sm md:text-base">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="border-stone-300 focus:border-slate-500 h-11 md:h-12 w-full text-sm md:text-base"
                          required
                          disabled={isSubmitting || isSubmitted}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-stone-700 font-light text-sm md:text-base">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="border-stone-300 focus:border-slate-500 h-11 md:h-12 w-full text-sm md:text-base"
                          required
                          disabled={isSubmitting || isSubmitted}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-stone-700 font-light text-sm md:text-base">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-stone-300 focus:border-slate-500 h-11 md:h-12 w-full text-sm md:text-base"
                        required
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-stone-700 font-light text-sm md:text-base">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="border-stone-300 focus:border-slate-500 h-11 md:h-12 w-full text-sm md:text-base"
                          disabled={isSubmitting || isSubmitted}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-stone-700 font-light text-sm md:text-base">
                          Subject
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          disabled={isSubmitting || isSubmitted}
                        >
                          <SelectTrigger className="h-11 md:h-12 border-stone-300 focus:border-slate-500 w-full text-sm md:text-base">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                            <SelectItem value="private-dining">Private Dining</SelectItem>
                            <SelectItem value="catering">Catering Services</SelectItem>
                            <SelectItem value="feedback">Feedback & Reviews</SelectItem>
                            <SelectItem value="press">Press & Media</SelectItem>
                            <SelectItem value="partnerships">Business Partnerships</SelectItem>
                            <SelectItem value="other">Other Inquiries</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-stone-700 font-light text-sm md:text-base">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="border-stone-300 focus:border-slate-500 min-h-[140px] md:min-h-[200px] w-full text-sm md:text-base resize-none"
                        required
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-6 md:py-4 text-base md:text-lg font-light tracking-wide border-0 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                          <span className="text-sm md:text-base">Sending...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          <span className="text-sm md:text-base">Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          <span className="text-sm md:text-base">Send Message</span>
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Contact Details */}
              <Card
                className={`border-0 shadow-xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-3xl font-light text-stone-800 mb-6 md:mb-8">Contact Information</h3>
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-xl font-medium text-stone-800 mb-2">Address</h4>
                        <p className="text-stone-600 font-light text-sm md:text-lg leading-relaxed">
                          Blasiusstraat 62
                          <br />
                          1091 CV Amsterdam, Netherlands
                          <br />
                          <a
                            href="https://maps.google.com/?q=Blasiusstraat+62,+1091+CV+Amsterdam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-700 transition-colors underline mt-2 inline-block"
                          >
                            View on Google Maps →
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-xl font-medium text-stone-800 mb-2">Phone</h4>
                        <p className="text-stone-600 font-light text-sm md:text-lg leading-relaxed">
                          <a href="tel:+31206633963" className="hover:text-slate-600 transition-colors text-lg md:text-xl">
                            020 663 3963
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-xl font-medium text-stone-800 mb-2">Email</h4>
                        <p className="text-stone-600 font-light text-sm md:text-lg leading-relaxed break-all">
                          <a
                            href="mailto:axumrestaurantams@gmail.com"
                            className="hover:text-slate-600 transition-colors"
                          >
                            axumrestaurantams@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-xl font-medium text-stone-800 mb-3">Operating Hours</h4>
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center flex-wrap gap-x-4">
                            <span className="text-stone-600 font-light text-sm md:text-base">Monday</span>
                            <span className="text-stone-700 font-medium text-sm md:text-base">Closed</span>
                          </div>
                          <div className="flex justify-between items-center flex-wrap gap-x-4">
                            <span className="text-stone-600 font-light text-sm md:text-base">Tuesday - Thursday</span>
                            <span className="text-stone-700 font-medium text-sm md:text-base">5:00 PM - 10:30 PM</span>
                          </div>
                          <div className="flex justify-between items-center flex-wrap gap-x-4">
                            <span className="text-stone-600 font-light text-sm md:text-base">Friday - Saturday</span>
                            <span className="text-stone-700 font-medium text-sm md:text-base">5:00 PM - 12:00 AM</span>
                          </div>
                          <div className="flex justify-between items-center flex-wrap gap-x-4">
                            <span className="text-stone-600 font-light text-sm md:text-base">Sunday</span>
                            <span className="text-stone-700 font-medium text-sm md:text-base">5:00 PM - 10:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Transportation */}
                <Card
                  className={`border-0 shadow-xl bg-gradient-to-br from-slate-50 to-stone-50 transition-all duration-1000 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <CardContent className="p-5 md:p-8">
                    <h3 className="text-base md:text-xl font-medium text-stone-800 mb-4 md:mb-6">Getting Here</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Car className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-stone-800 text-sm md:text-base">Parking</p>
                          <p className="text-stone-600 text-xs md:text-sm font-light">Street parking available</p>
                          <p className="text-stone-600 text-xs md:text-sm font-light">Public parking nearby</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Train className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-stone-800 text-sm md:text-base">Public Transit</p>
                          <p className="text-stone-600 text-xs md:text-sm font-light">Tram: Leidseplein (2 min walk)</p>
                          <p className="text-stone-600 text-xs md:text-sm font-light">Metro: Rokin (10 min walk)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recognition */}
                <Card
                  className={`border-0 shadow-xl transition-all duration-1000 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <CardContent className="p-5 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      <h3 className="text-base md:text-xl font-medium text-stone-800">Recognition</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-stone-600 font-light">Authentic Ethiopian Cuisine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-stone-600 font-light">Traditional Coffee Ceremony</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <Card
                className={`border-0 shadow-xl transition-all duration-1000 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <h3 className="text-base md:text-xl font-medium text-stone-800">Connect With Us</h3>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="https://www.facebook.com/axumrestaurant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group active:bg-slate-100"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Facebook className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-stone-800 text-sm md:text-base">Facebook</p>
                        <p className="text-xs md:text-sm text-stone-600 font-light">Follow us for updates</p>
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/axumrestaurant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group active:bg-slate-100"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Instagram className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-stone-800 text-sm md:text-base">Instagram</p>
                        <p className="text-xs md:text-sm text-stone-600 font-light">See our latest dishes</p>
                      </div>
                    </a>
                    <a
                      href="https://twitter.com/axumrestaurant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group active:bg-slate-100"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Twitter className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-stone-800 text-sm md:text-base">Twitter</p>
                        <p className="text-xs md:text-sm text-stone-600 font-light">Stay in touch</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Private Events */}
              <Card
                className={`border-0 shadow-xl bg-gradient-to-r from-slate-600 to-slate-700 text-white overflow-hidden transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <CardContent className="p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 flex-shrink-0" />
                    <h3 className="text-base md:text-xl font-medium">Private Events & Catering</h3>
                  </div>
                  <p className="text-slate-100 mb-4 md:mb-6 font-light leading-relaxed text-sm md:text-base">
                    Host your special event at Axum Restaurant. Our authentic Ethiopian cuisine and traditional
                    atmosphere are perfect for corporate events, celebrations, and intimate gatherings.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-slate-100 text-xs md:text-sm mb-4 md:mb-6">
                    <p>• Private dining arrangements</p>
                    <p>• Traditional coffee ceremony</p>
                    <p>• Authentic Ethiopian platters</p>
                    <p>• Cultural dining experience</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-slate-600 font-light w-full text-sm md:text-base py-6 md:py-4"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Inquire About Private Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div
            className={`mt-6 sm:mt-8 md:mt-16 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <div className="h-56 sm:h-64 md:h-96 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.599999996218!2d4.9244!3d52.3575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60c3e3c6d5c73%3A0x7c1a8b9f3c1a9f3f!2sBlasiusstraat%2062%2C%201091%20CV%20Amsterdam!5e0!3m2!1sen!2snl!4v1738765432100!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/20 to-slate-900/20 pointer-events-none"></div>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div
            className={`mt-6 sm:mt-8 md:mt-16 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-5 md:p-8">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 md:w-10 md:h-10 flex-shrink-0" />
                  <CardTitle className="text-xl md:text-3xl font-light tracking-wide">Frequently Asked Questions</CardTitle>
                </div>
                <p className="text-slate-100 font-light text-sm md:text-base mt-2">Everything you need to know about visiting Axum</p>
              </CardHeader>
              <CardContent className="p-5 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      Do you accept walk-ins or do I need a reservation?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      While we welcome walk-ins based on availability, we highly recommend making a reservation, especially
                      for weekends and evening dining. Reservations ensure you have a table guaranteed at your preferred time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      Do you accommodate dietary restrictions?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      Absolutely! We offer vegetarian, vegan, and gluten-free options. Our menu is clearly marked with
                      dietary information, and our staff is trained to accommodate various dietary requirements. Please
                      inform us of any allergies or restrictions when making your reservation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      What is the traditional Ethiopian coffee ceremony?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      The coffee ceremony is a beautiful Ethiopian tradition involving three rounds of coffee, roasted and
                      brewed fresh before you. It takes about an hour and can be enjoyed by groups of up to 4 people. We
                      recommend booking this experience when you make your reservation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      Do you host private events or large groups?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      Yes! We offer private dining arrangements and can accommodate groups for corporate events,
                      celebrations, and intimate gatherings. Contact us via the form above or email us directly to discuss
                      your needs and we'll create a customized experience for your group.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      Is there parking available near the restaurant?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      Street parking is available nearby, and there are also public parking facilities within a few minutes'
                      walk. We're also easily accessible by public transport - the Leidseplein tram stop is just 2 minutes
                      away.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border-stone-200">
                    <AccordionTrigger className="text-left font-medium text-stone-800 hover:text-slate-600 text-sm md:text-base">
                      What should I expect from my first visit?
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
                      Expect an authentic Ethiopian dining experience! Your meal will be served family-style on injera, a
                      traditional sourdough flatbread. You'll be eating with your hands, Ethiopian style. Don't worry if
                      you're not familiar with the cuisine - our friendly staff will guide you through the experience. It's
                      a wonderful cultural adventure!
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
