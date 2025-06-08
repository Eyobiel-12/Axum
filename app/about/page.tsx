"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Crown } from "lucide-react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description:
        "We source traditional spices and ingredients directly from Ethiopia, working with local farmers to ensure every dish maintains its authentic character while supporting communities.",
    },
    {
      icon: Crown,
      title: "Excellence",
      description:
        "Every element of the dining experience is crafted to perfection, from the precision of our culinary techniques to the warmth of our hospitality.",
    },
    {
      icon: Globe,
      title: "Heritage",
      description:
        "We honor the rich culinary traditions of the Axum Empire while creating innovative interpretations that speak to contemporary palates.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <section className="relative py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-amber-400 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-400 rotate-12"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-sm font-light tracking-[0.2em] text-amber-400 uppercase mb-4">Our Heritage</h1>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8"></div>
          <h2 className="text-6xl md:text-7xl font-extralight mb-6">Our Story</h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
            A journey through time, taste, and tradition, honoring the legacy of one of Africa's greatest civilizations
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div>
                <h2 className="text-sm font-light tracking-[0.2em] text-amber-600 uppercase mb-4">The Axum Legacy</h2>
                <div className="w-16 h-px bg-amber-600 mb-8"></div>
                <h3 className="text-5xl md:text-6xl font-extralight text-stone-800 leading-tight mb-8">
                  Ancient Wisdom
                  <span className="text-amber-600"> Modern Vision</span>
                </h3>
              </div>
              <p className="text-xl text-stone-700 leading-relaxed font-light">
                Named after the ancient Kingdom of Axum, one of the great civilizations of the ancient world, our
                restaurant pays homage to the rich culinary heritage of Ethiopia.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Our mission transcends mere dining—we create experiences that honor this magnificent legacy while
                establishing new traditions for future generations.
              </p>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/historical-aksum-illustration.png"
                  alt="Historical illustration of ancient Aksum city"
                  width={500}
                  height={600}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-light text-amber-200">Historical Aksum City, 6th Century AD</p>
                  <p className="text-xs text-stone-300">British Museum Historical Collection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-sm font-light tracking-[0.2em] text-amber-600 uppercase mb-4">Guiding Principles</h2>
              <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
              <h3 className="text-4xl md:text-5xl font-extralight text-stone-800">Our Values</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="p-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-light text-stone-800 mb-4">{value.title}</h4>
                    <p className="text-stone-600 leading-relaxed font-light">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-stone-900 to-amber-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-6">Experience the Axum Difference</h2>
          <p className="text-xl text-stone-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join us for an unforgettable journey through the flavors of ancient Ethiopia, elevated to new heights of
            culinary excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-lg font-light tracking-wide border-0 shadow-xl"
            >
              <Link href="/reservations">Reserve Your Table</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-12 py-4 text-lg font-light tracking-wide bg-transparent"
            >
              <Link href="/menu">Explore Our Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
