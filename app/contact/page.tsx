"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Car, Train, Star, Award } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <section className="relative py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-amber-400 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-400 rotate-12"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-sm font-light tracking-[0.2em] text-amber-400 uppercase mb-4">Get in Touch</h1>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8"></div>
          <h2 className="text-6xl md:text-7xl font-extralight mb-6">Contact Us</h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
            We'd love to hear from you. Connect with our team for reservations, inquiries, or special requests
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl h-full">
          {/* Main Contact Grid */}
          <div className="grid xl:grid-cols-2 gap-16 mb-16">
            {/* Contact Form */}
            <div className="w-full">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8">
                  <CardTitle className="text-3xl font-light tracking-wide">Send us a Message</CardTitle>
                  <p className="text-amber-100 font-light">We'll respond within 24 hours</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-stone-700 font-light">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="border-stone-300 focus:border-amber-500 h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-stone-700 font-light">
                          Last Name
                        </Label>
                        <Input id="lastName" className="border-stone-300 focus:border-amber-500 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-stone-700 font-light">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-stone-300 focus:border-amber-500 h-12"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-stone-700 font-light">
                          Phone Number
                        </Label>
                        <Input id="phone" type="tel" className="border-stone-300 focus:border-amber-500 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-stone-700 font-light">
                          Subject
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                        >
                          <SelectTrigger className="h-12 border-stone-300 focus:border-amber-500">
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
                      <Label htmlFor="message" className="text-stone-700 font-light">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        rows={8}
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="border-stone-300 focus:border-amber-500 min-h-[200px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 text-lg font-light tracking-wide border-0 shadow-xl"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-light text-stone-800 mb-8">Contact Information</h3>
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-stone-800 mb-2">Address</h4>
                        <p className="text-stone-600 font-light text-lg leading-relaxed">
                          Korte Leidsedwarsstraat 58
                          <br />
                          1017 RC Amsterdam, Netherlands
                          <br />
                          <a
                            href="https://maps.app.goo.gl/6nHh4ctHQfMDcNHY9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-700 transition-colors"
                          >
                            View on Google Maps
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-stone-800 mb-2">Phone</h4>
                        <p className="text-stone-600 font-light text-lg leading-relaxed">
                          <a href="tel:+31206261472" className="hover:text-amber-600 transition-colors">
                            +31 20 626 1472
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-stone-800 mb-2">Email</h4>
                        <p className="text-stone-600 font-light text-lg leading-relaxed">
                          <a
                            href="mailto:axumrestaurantams@gmail.com"
                            className="hover:text-amber-600 transition-colors"
                          >
                            axumrestaurantams@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-stone-800 mb-2">Operating Hours</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600 font-light">Monday - Thursday</span>
                            <span className="text-stone-700">5:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600 font-light">Friday - Saturday</span>
                            <span className="text-stone-700">5:00 PM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-600 font-light">Sunday</span>
                            <span className="text-stone-700">5:00 PM - 10:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Transportation */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-stone-50">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-medium text-stone-800 mb-6">Getting Here</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Car className="w-5 h-5 text-amber-600 mt-1" />
                        <div>
                          <p className="font-medium text-stone-800">Parking</p>
                          <p className="text-stone-600 text-sm font-light">Street parking available</p>
                          <p className="text-stone-600 text-sm font-light">Public parking nearby</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Train className="w-5 h-5 text-amber-600 mt-1" />
                        <div>
                          <p className="font-medium text-stone-800">Public Transit</p>
                          <p className="text-stone-600 text-sm font-light">Tram: Leidseplein (2 minutes walk)</p>
                          <p className="text-stone-600 text-sm font-light">Metro: Rokin (10 minutes walk)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recognition */}
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-amber-600" />
                      <h3 className="text-xl font-medium text-stone-800">Recognition</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-stone-600 font-light">Authentic Ethiopian Cuisine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-stone-600 font-light">Traditional Coffee Ceremony</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Private Events */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5" />
                    <h3 className="text-xl font-medium">Private Events & Catering</h3>
                  </div>
                  <p className="text-amber-100 mb-6 font-light leading-relaxed">
                    Host your special event at Axum Restaurant. Our authentic Ethiopian cuisine and traditional
                    atmosphere are perfect for corporate events, celebrations, and intimate gatherings.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-amber-100 text-sm mb-6">
                    <p>• Private dining arrangements</p>
                    <p>• Traditional coffee ceremony</p>
                    <p>• Authentic Ethiopian platters</p>
                    <p>• Cultural dining experience</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-light w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Inquire About Private Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="mt-16">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.757349753394!2d4.907358476707487!3d52.35668607201879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609cdb14c47a1%3A0x64f522c33ba5c9f6!2sAxum%20Restaurant!5e0!3m2!1sen!2snl!4v1748352542695!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/20 to-amber-900/20 pointer-events-none"></div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
