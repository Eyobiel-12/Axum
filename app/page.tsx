"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ThumbsUp } from "lucide-react"
import { AdvancedButton } from "@/components/advanced-button"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { usePerformance } from "@/hooks/use-performance"

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const performance = usePerformance()

  const heroImages = [
    "/images/axum-landscape.png",
    "/images/axum-obelisk-heritage.png",
    "/images/axum-landscape-church.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)

    const handleScroll = () => {
      if (performance.fps > 30) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [heroImages.length, performance.fps])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-3000 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(${index === currentSlide ? 1 : 1.05})`,
            }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={
                index === 0
                  ? "Historic Axum landscape with ancient church and obelisk"
                  : index === 1
                    ? "Ancient Axum obelisk stelae field - UNESCO World Heritage site with towering granite monuments"
                    : "Axum highlands landscape with Orthodox church on hilltop and dramatic rock formations"
              }
              fill
              className="object-cover"
              priority={index === 0}
              quality={performance.isSlowConnection ? 60 : 95}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-stone-900/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4">
        <div className="mb-8">
          <h1
            className={`text-7xl md:text-9xl font-extralight tracking-[0.2em] mb-4 text-amber-100 transition-all duration-1000 text-shadow-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            AXUM
          </h1>

          <div
            className={`w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          />

          <p
            className={`text-2xl md:text-3xl font-light tracking-[0.15em] text-amber-200 mb-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            RESTAURANT
          </p>

          <p
            className={`text-sm md:text-base font-light tracking-[0.1em] text-amber-300 uppercase transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            Ancient Heritage • Modern Excellence
          </p>
        </div>

        <p
          className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-1000 text-shadow-luxury ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          Journey through the sacred landscapes of ancient Axum, where every dish honors the legacy of Ethiopia's
          greatest empire
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <Link href="/reservations">
            <AdvancedButton
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-lg font-light tracking-wide border-0 shadow-2xl hover:shadow-amber-500/25"
              ripple
              haptic
              magneticEffect
              glowEffect
            >
              Reserve Your Experience
              <ArrowRight className="ml-2 w-5 h-5" />
            </AdvancedButton>
          </Link>

          <Link href="/menu">
            <AdvancedButton
              variant="outline"
              size="lg"
              className="border-2 border-amber-400 text-amber-100 hover:bg-amber-400 hover:text-black px-12 py-4 text-lg font-light tracking-wide bg-transparent backdrop-blur-sm shadow-xl"
              ripple
              magneticEffect
            >
              Explore Our Menu
            </AdvancedButton>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "1600ms" }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Heritage Elements */}
      <div className="absolute inset-0 pointer-events-none z-15">
        <div
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-amber-500 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <section
      ref={elementRef}
      className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-amber-400 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-400 rotate-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h2 className="text-sm font-light tracking-[0.2em] text-amber-400 uppercase mb-4">The Story</h2>
              <div className="w-16 h-px bg-amber-400 mb-8"></div>
              <h3 className="text-5xl md:text-6xl font-extralight leading-tight mb-8">
                The Legacy of
                <span className="text-amber-400"> Ancient Axum</span>
              </h3>
            </div>
            <p className="text-xl leading-relaxed text-stone-300 font-light">
              Once upon a time in the land of Ethiopia, a mighty empire known as Axum flourished. It was an era of
              grandeur and prosperity, where the kings and queens of Axum ruled with wisdom and power.
            </p>
            <p className="text-lg leading-relaxed text-stone-400 font-light">
              At the heart of this empire stood the magnificent city of Axum, a bustling metropolis filled with towering
              obelisks, grand palaces, and bustling marketplaces. The people of Axum were known for their ingenuity,
              craftsmanship, and unwavering devotion to their empire.
            </p>
            <p className="text-lg leading-relaxed text-stone-400 font-light">
              Under the rule of King Ezana, the empire reached its zenith. His reign was marked by great conquests,
              expanding the borders of Axum and establishing strong trade networks that reached far beyond the empire's
              boundaries. Traders from distant lands brought exotic goods, spices, and treasures, enriching the city's
              culture and economy.
            </p>
            <Link href="/about">
              <AdvancedButton
                variant="outline"
                className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-3 text-base font-light tracking-wide bg-transparent"
                ripple
                magneticEffect
              >
                Discover Our Heritage
              </AdvancedButton>
            </Link>
          </div>

          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl group">
              <Image
                src="/images/axum-landscape.png"
                alt="Ancient Axum obelisks and architecture"
                width={500}
                height={600}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-light text-amber-200">Ancient Axum Obelisks</p>
                <p className="text-xs text-stone-300">UNESCO World Heritage Site</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SignatureDishesSection() {
  const { elementRef, isVisible } = useIntersectionObserver()

  const signatureDishes = [
    {
      name: "Axum's Special Menu",
      description:
        "Mixed platter of three meat and chicken dishes, served with five vegetable side dishes and ayib cheese",
      price: "€23.50",
      image: "/images/axum-special-menu-real.png",
      featured: true,
      authentic: "አክሱም ልዩ ገበታ",
    },
    {
      name: "Vegetarian Special",
      description: "Pumpkin dish with red lentils, sesame, chickpeas, mixed vegetables, spinach and ayib cheese",
      price: "€20.50",
      image: "/images/vegetarian-special-menu-real.png",
      featured: true,
      authentic: "በያይነቱ",
    },
    {
      name: "Yeshekla Tibs",
      description: "Tender beef marinated with special sauce, sizzling with onion, rosemary, jalapeño and fresh garlic",
      price: "€23.00",
      image: "/images/yeshekla-tibs-real.png",
      featured: true,
      authentic: "ሸክላ ጥብስ",
    },
    {
      name: "Gored Gored",
      description: "Cubed tender beef marinated with purified herbed butter sauce and blended spicy pepper",
      price: "€22.50",
      image: "/images/gored-gored-real.png",
      featured: false,
      authentic: "ጎረድ ጎረድ",
    },
    {
      name: "Tegamino (Shuro)",
      description: "Roasted chickpea powder simmered in our unique clay pot with mild berbere sauce",
      price: "€17.50",
      image: "/images/tegamino-real.png",
      featured: false,
      authentic: "ተጋሚኖ",
    },
    {
      name: "Ethiopian Coffee Ceremony",
      description: "Traditional three-round coffee ceremony prepared and served with full ceremony (for 4 persons)",
      price: "€25.00",
      image: "/images/coffee-ceremony.jpg",
      featured: true,
      authentic: "የሐበሻ ቡና",
    },
  ]

  return (
    <section ref={elementRef} className="py-24 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-sm font-light tracking-[0.2em] text-amber-600 uppercase mb-4">
            Authentic Ethiopian Cuisine
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <h3 className="text-5xl md:text-6xl font-extralight text-stone-800 mb-6">Traditional Specialties</h3>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the authentic flavors of Ethiopia with dishes passed down through generations, served with
            traditional injera and the finest Ethiopian spices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {signatureDishes.map((dish, index) => (
            <Card
              key={index}
              className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden group ${
                dish.featured ? "lg:scale-105 lg:z-10" : ""
              } ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {dish.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-white border-0 animate-pulse">
                    Signature
                  </Badge>
                )}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-amber-300 text-sm font-light">{dish.authentic}</span>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-light text-stone-800">{dish.name}</h4>
                  <span className="text-3xl font-light text-amber-600">{dish.price}</span>
                </div>
                <p className="text-stone-600 leading-relaxed font-light">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link href="/menu">
            <AdvancedButton
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-lg font-light tracking-wide border-0"
              ripple
              magneticEffect
              glowEffect
            >
              View Complete Menu
            </AdvancedButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { elementRef, isVisible } = useIntersectionObserver()

  const testimonials = [
    {
      name: "Simon V.",
      date: "22 maart 2025",
      rating: 8.5,
      comment:
        "Aardige bediening. Voldoende eten (bij andere restaurants vaak nog met honger vertrokken, hier het zelfs niet op kunnen krijgen",
      reviews: 1,
    },
    {
      name: "Marina T.",
      date: "15 maart 2025",
      rating: 9,
      comment: "Heerlijk eten. Duurde wat lang voordat het eten kwam, maar erg vriendelijk personeel",
      reviews: 1,
    },
    {
      name: "Raja S.",
      date: "8 maart 2025",
      rating: 10,
      comment:
        "Lieve bediening. Je moet geen haast hebben. Het is een kleinschalig, leuk restaurant. Eten is geweldig! Zeker een aanrader en voor de prijs hoef je het niet te laten.",
      reviews: 6,
    },
    {
      name: "HPE K.",
      date: "26 december 2024",
      rating: 10,
      comment:
        "Ethiopisch gerecht op een groot rond plateau met pittige linzen, een groene kruidenmix, romige gele spliterwten, gebakken groenten, een rode bietensalade en een frisse gemengde salade, geserveerd op injera. Heerlijk eten voor een goede prijs en vriendelijke bediening",
      reviews: 4,
    },
    {
      name: "Emma v.",
      date: "18 december 2024",
      rating: 9,
      comment:
        "Lekker eten en vriendelijke service. Voelt wel beetje als een 'veredelde snackbar' door het interieur (vooral de van kleur veranderende lichtjes), maar we hebben genoten!",
      reviews: 3,
    },
    {
      name: "Britta V.",
      date: "5 november 2024",
      rating: 9,
      comment:
        "Erg lekker eten, leuk om samen met een gezelschap uit een groot bord te eten. We hadden gekozen voor een mix, waardoor we van diverse gerechten konden proeven. Aanrader!",
      reviews: 1,
    },
  ]

  return (
    <section
      ref={elementRef}
      className="py-24 bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-light tracking-[0.2em] text-amber-600 uppercase mb-4">Guest Experiences</h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <h3 className="text-5xl md:text-6xl font-extralight text-stone-800 mb-6">What Our Guests Say</h3>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            Authentic reviews from our valued guests who have experienced the flavors and hospitality of Axum
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-stone-800">{testimonial.name}</h4>
                  <p className="text-sm text-stone-500">
                    {testimonial.date} • {testimonial.reviews} {testimonial.reviews === 1 ? "recensie" : "recensies"}
                  </p>
                </div>
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                  <span className="text-amber-600 font-semibold">{testimonial.rating}</span>
                  <span className="text-amber-600 text-sm">/10</span>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed font-light">{testimonial.comment}</p>
              <div className="mt-4 flex items-center text-amber-500 text-sm">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>vind-ik-leuk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 relative overflow-hidden">
      <Suspense fallback={<div className="h-screen bg-stone-900" />}>
        <HeroSection />
        <PhilosophySection />
        <SignatureDishesSection />
        <TestimonialsSection />
      </Suspense>
    </div>
  )
}
