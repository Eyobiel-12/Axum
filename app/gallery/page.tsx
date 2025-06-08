"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Award, Crown, Sparkles, Diamond, Gem, Utensils } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { LuxuryGalleryCard } from "@/components/luxury-gallery-card"
import { LuxuryLightbox } from "@/components/luxury-lightbox"
import Link from "next/link"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description: string
  category: string
  featured?: boolean
  luxury?: boolean
  award?: string
}

// Fix the gallery images array to ensure all images have proper fallbacks
const galleryImages: GalleryImage[] = [
  // Real Restaurant Photos - Customers & Experience
  {
    id: "real-customers-dining",
    src: "/images/real-customers-outdoor-dining.png",
    alt: "Happy customers enjoying authentic Ethiopian cuisine at Axum restaurant outdoor seating",
    title: "Authentic Dining Experience",
    description:
      "Our valued guests enjoying the true Axum experience with traditional Ethiopian platters in our charming outdoor seating area, creating memories over authentic cuisine",
    category: "experience",
    featured: true,
    luxury: true,
    award: "Authentic",
  },

  // Real Food Photos
  {
    id: "traditional-sambusas",
    src: "/images/traditional-sambusas.png",
    alt: "Traditional Ethiopian sambusas served with authentic dipping sauce",
    title: "Traditional Ethiopian Sambusas",
    description:
      "Crispy, golden sambusas filled with spiced lentils or meat, served with our signature berbere-spiced dipping sauce - a perfect start to your Ethiopian culinary journey",
    category: "food",
    featured: true,
    luxury: true,
  },

  {
    id: "combination-platter-real",
    src: "/images/authentic-ethiopian-combination-platter.png",
    alt: "Authentic Ethiopian combination platter with injera and various traditional stews",
    title: "Signature Combination Platter",
    description:
      "Our most popular dish featuring an array of traditional Ethiopian stews, vegetables, and spiced dishes served on fresh injera bread, perfect for sharing and experiencing the full spectrum of Ethiopian flavors",
    category: "food",
    featured: true,
    luxury: true,
    award: "Signature",
  },

  // Real Interior & Cultural Photos
  {
    id: "cultural-artwork",
    src: "/images/ethiopian-cultural-artwork.png",
    alt: "Traditional Ethiopian cultural artwork and paintings displayed in restaurant",
    title: "Ethiopian Cultural Heritage",
    description:
      "Beautiful traditional Ethiopian artwork adorning our walls, depicting scenes of daily life, cultural celebrations, and the rich heritage of Ethiopia, creating an immersive cultural atmosphere",
    category: "interior",
    featured: true,
    luxury: true,
    award: "Heritage",
  },

  {
    id: "traditional-interior",
    src: "/images/traditional-restaurant-interior.png",
    alt: "Traditional Ethiopian restaurant interior with cultural artifacts and authentic decor",
    title: "Authentic Ethiopian Ambiance",
    description:
      "Step into our restaurant and be transported to Ethiopia with traditional seating, handwoven baskets, cultural artifacts, and authentic decor that tells the story of our rich heritage",
    category: "interior",
    featured: true,
    luxury: true,
  },

  // Add missing responsive images with proper error handling
  {
    id: "restaurant-storefront",
    src: "/images/axum-restaurant-storefront.png",
    alt: "Axum restaurant storefront with distinctive yellow signage and welcoming entrance",
    title: "Welcome to Axum",
    description:
      "Our distinctive storefront in the heart of the city, featuring our iconic yellow Axum signage and welcoming atmosphere that invites you to discover authentic Ethiopian cuisine",
    category: "exterior",
    featured: true,
    luxury: true,
  },

  {
    id: "restaurant-entrance",
    src: "/images/restaurant-exterior-entrance.png",
    alt: "Axum restaurant entrance with outdoor seating and charming street presence",
    title: "Charming Street Presence",
    description:
      "Our inviting entrance with outdoor seating options, perfect for enjoying Ethiopian cuisine while watching the vibrant street life of the neighborhood",
    category: "exterior",
    featured: true,
  },

  // Authentic Ethiopian Food - Real Restaurant Photos
  {
    id: "signature-platter-1",
    src: "/images/real-ethiopian-platter-1.png",
    alt: "Traditional Ethiopian platter with authentic injera and various stews",
    title: "Authentic Ethiopian Feast",
    description:
      "Our signature platter featuring traditional injera bread with an array of authentic Ethiopian stews, vegetables, and spices, served in the traditional communal style",
    category: "food",
    featured: true,
    luxury: true,
    award: "Authentic",
  },
  {
    id: "traditional-clay-pot",
    src: "/images/traditional-clay-pot.png",
    alt: "Traditional Ethiopian clay pot with berbere spice preparation",
    title: "Traditional Clay Pot Cooking",
    description:
      "Authentic Ethiopian cooking methods using traditional clay pots, featuring our house-made berbere spice blend and fresh injera rolls",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "artistic-presentation",
    src: "/images/authentic-ethiopian-feast.png",
    alt: "Beautifully presented Ethiopian platter with colorful traditional dishes",
    title: "Artistic Ethiopian Presentation",
    description:
      "A masterful arrangement of traditional Ethiopian dishes showcasing the vibrant colors and authentic flavors of our heritage cuisine",
    category: "food",
    featured: true,
    luxury: true,
    award: "Signature",
  },
  {
    id: "communal-dining",
    src: "/images/communal-dining-experience.png",
    alt: "Guests sharing traditional Ethiopian meal in communal style",
    title: "Communal Dining Experience",
    description:
      "Experience the authentic Ethiopian tradition of communal dining, where families and friends gather around our generous platters to share food and create memories",
    category: "experience",
    featured: true,
    luxury: true,
  },
  {
    id: "elaborate-spread",
    src: "/images/elaborate-ethiopian-spread.png",
    alt: "Elaborate Ethiopian feast with multiple traditional dishes",
    title: "Royal Ethiopian Banquet",
    description:
      "An elaborate feast featuring the full spectrum of Ethiopian cuisine, from spicy meat stews to delicate vegetarian dishes, all served on fresh injera",
    category: "food",
    luxury: true,
    award: "Heritage",
  },
  {
    id: "traditional-tibs",
    src: "/images/traditional-tibs-dish.png",
    alt: "Sizzling tibs served in traditional Ethiopian clay dish",
    title: "Sizzling Traditional Tibs",
    description:
      "Our signature tibs served sizzling hot in traditional clay cookware, featuring tender meat sautéed with onions, peppers, and authentic Ethiopian spices",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "heritage-platter",
    src: "/images/signature-ethiopian-platter.png",
    alt: "Traditional Ethiopian platter with heritage recipes",
    title: "Heritage Recipe Collection",
    description:
      "A carefully curated selection of dishes prepared using recipes passed down through generations, showcasing the authentic flavors of ancient Ethiopia",
    category: "food",
    luxury: true,
    award: "Traditional",
  },
  {
    id: "elegant-presentation",
    src: "/images/elegant-restaurant-presentation.png",
    alt: "Elegant restaurant presentation of Ethiopian cuisine",
    title: "Restaurant Elegance",
    description:
      "Our restaurant's sophisticated presentation of traditional Ethiopian cuisine, combining authentic flavors with elegant service and ambiance",
    category: "experience",
    featured: true,
    luxury: true,
    award: "Excellence",
  },

  // Real Restaurant Interior Photos
  {
    id: "main-dining-room",
    src: "/images/axum-main-dining-room.png",
    alt: "Main dining room with traditional red and white table settings and warm Ethiopian ambiance",
    title: "Main Dining Room",
    description:
      "Our welcoming main dining room featuring traditional red and white table settings, warm lantern lighting, and authentic Ethiopian décor creating the perfect atmosphere for your dining experience",
    category: "interior",
    featured: true,
    luxury: true,
  },
  {
    id: "traditional-seating",
    src: "/images/traditional-ethiopian-seating.png",
    alt: "Traditional Ethiopian seating area with colorful textiles and woven baskets",
    title: "Traditional Ethiopian Seating",
    description:
      "Experience authentic Ethiopian dining in our traditional seating area, featuring handwoven textiles in vibrant colors, traditional baskets, and low wooden seating for an immersive cultural experience",
    category: "interior",
    featured: true,
    luxury: true,
    award: "Authentic",
  },
  {
    id: "two-level-interior",
    src: "/images/restaurant-two-level-interior.png",
    alt: "Two-level restaurant interior with mezzanine and traditional Ethiopian artifacts",
    title: "Multi-Level Dining Experience",
    description:
      "Our spacious two-level restaurant interior showcases traditional Ethiopian artifacts, warm ambient lighting, and multiple seating areas including an elegant mezzanine level",
    category: "interior",
    featured: true,
    luxury: true,
  },
  {
    id: "guests-dining",
    src: "/images/guests-dining-experience.png",
    alt: "Happy guests enjoying their meal in the authentic Ethiopian restaurant setting",
    title: "Guests Enjoying Axum Experience",
    description:
      "Our valued guests sharing a memorable dining experience in our authentic Ethiopian setting, surrounded by traditional décor and enjoying our hospitality",
    category: "experience",
    featured: true,
  },
  // Add these new authentic food images to the existing galleryImages array
  {
    id: "yeshekla-tibs-authentic",
    src: "/images/yeshekla-tibs-real.png",
    alt: "Authentic Yeshekla Tibs - sizzling beef with colorful peppers in cast iron pan",
    title: "Yeshekla Tibs - Sizzling Beef",
    description:
      "Our signature sizzling beef dish served in a traditional cast iron pan with colorful bell peppers, onions, and aromatic Ethiopian spices, creating an authentic dining experience",
    category: "food",
    featured: true,
    luxury: true,
    award: "Signature",
  },
  {
    id: "gored-gored-authentic",
    src: "/images/gored-gored-real.png",
    alt: "Traditional Gored Gored - cubed raw beef in spicy berbere sauce",
    title: "Gored Gored - Traditional Raw Beef",
    description:
      "Authentic Ethiopian raw beef preparation with tender cubes marinated in our house-made berbere sauce and traditional spices, a true delicacy for adventurous diners",
    category: "food",
    featured: true,
    luxury: true,
    award: "Traditional",
  },
  {
    id: "tegamino-authentic",
    src: "/images/tegamino-real.png",
    alt: "Tegamino served in traditional black clay pot with vegetables",
    title: "Tegamino in Clay Pot",
    description:
      "Traditional chickpea flour stew (Shuro) prepared and served in our authentic Ethiopian clay pot, accompanied by fresh vegetables and traditional sides",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "yemisir-wot-authentic",
    src: "/images/yemisir-wot-real.png",
    alt: "Rich red lentil stew with berbere spices",
    title: "Yemisir Wot - Red Lentil Stew",
    description:
      "Our signature red lentil stew simmered to perfection with authentic berbere spice blend, creating a rich, flavorful dish that represents the heart of Ethiopian cuisine",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "gomen-authentic",
    src: "/images/gomen-real.png",
    alt: "Traditional collard greens stew with carrots and spices",
    title: "Gomen - Ethiopian Collard Greens",
    description:
      "Fresh collard greens slow-cooked with carrots, onions, and traditional Ethiopian spices, creating a nutritious and flavorful vegetarian dish",
    category: "food",
    featured: false,
    luxury: true,
  },
  {
    id: "atakilt-wot-authentic",
    src: "/images/atakilt-wot-real.png",
    alt: "Mixed vegetable stew with cabbage, carrots, and potatoes",
    title: "Atakilt Wot - Mixed Vegetables",
    description:
      "A colorful medley of cabbage, carrots, and potatoes seasoned with turmeric and traditional spices, representing the vibrant vegetarian cuisine of Ethiopia",
    category: "food",
    featured: false,
    luxury: true,
  },
  // New chicken dishes
  {
    id: "doro-wot-authentic",
    src: "/images/doro-wot-real.png",
    alt: "Traditional Doro Wot with hardboiled egg in rich berbere sauce",
    title: "Doro Wot - Chicken Stew",
    description:
      "Our signature Ethiopian chicken stew featuring tender chicken drumstick slow-cooked in rich berbere sauce with a traditional hardboiled egg - the national dish of Ethiopia",
    category: "food",
    featured: true,
    luxury: true,
    award: "Signature",
  },
  {
    id: "doro-alicha-authentic",
    src: "/images/doro-wot-clay-real.png",
    alt: "Doro Alicha served in traditional clay bowl with hardboiled egg",
    title: "Doro Alicha - Mild Chicken Stew",
    description:
      "Tender chicken drumstick in a mild turmeric sauce with hardboiled egg, served in a traditional clay bowl - a milder alternative to the spicy Doro Wot",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "doro-tibs-authentic",
    src: "/images/doro-tibs-real.png",
    alt: "Chicken Tibs with vegetables and Ethiopian spices",
    title: "Doro Tibs - Sautéed Chicken",
    description:
      "Tender chunks of marinated chicken breast sautéed with onions, bell peppers, and jalapeños in our special Ethiopian spice blend",
    category: "food",
    featured: false,
    luxury: true,
  },
  {
    id: "chicken-tibs-authentic",
    src: "/images/chicken-tibs-real.png",
    alt: "Chicken Tibs with vegetables in traditional presentation",
    title: "Special Chicken Tibs",
    description:
      "Our special preparation of chicken tibs featuring tender chicken pieces with fresh vegetables and aromatic Ethiopian spices",
    category: "food",
    featured: false,
    luxury: true,
  },
  // New beef dishes
  {
    id: "key-wot-authentic",
    src: "/images/key-wot-real.png",
    alt: "Key Wot - spicy beef stew with berbere sauce and fresh herbs",
    title: "Key Wot - Spicy Beef Stew",
    description:
      "Traditional Ethiopian beef stew simmered in rich berbere sauce with onions, garlic, ginger and authentic Ethiopian spices, garnished with fresh herbs",
    category: "food",
    featured: true,
    luxury: true,
  },
  {
    id: "beef-wot-authentic",
    src: "/images/beef-wot-real.png",
    alt: "Beef stew with rich red sauce and traditional spices",
    title: "Special Beef Wot",
    description:
      "Tender beef cubes slow-cooked in our special berbere sauce with traditional Ethiopian spices, creating a rich and flavorful stew",
    category: "food",
    featured: false,
    luxury: true,
  },
  {
    id: "beef-tibs-authentic",
    src: "/images/beef-tibs-real.png",
    alt: "Beef Tibs with bell peppers and onions",
    title: "Special Beef Tibs",
    description:
      "Tender beef cubes sautéed with bell peppers, onions, and jalapeños in our special Ethiopian spice blend, creating a colorful and flavorful dish",
    category: "food",
    featured: false,
    luxury: true,
  },
  // Lamb dishes
  {
    id: "gomen-meat-authentic",
    src: "/images/gomen-meat-real.png",
    alt: "Gomen Be Siga - collard greens with meat",
    title: "Gomen Be Siga - Greens with Meat",
    description:
      "Traditional Ethiopian dish combining fresh collard greens with tender meat pieces, slow-cooked with onions, garlic, and authentic Ethiopian spices",
    category: "food",
    featured: false,
    luxury: true,
  },
  {
    id: "lamb-potato-authentic",
    src: "/images/lamb-potato-real.png",
    alt: "Lamb stew with potatoes and green chilies",
    title: "Special Lamb Stew",
    description:
      "Tender lamb pieces slow-cooked with potatoes and green chilies in our special Ethiopian spice blend, creating a hearty and flavorful dish",
    category: "food",
    featured: false,
    luxury: true,
  },
]

const categories = [
  { id: "all", label: "All Masterpieces", icon: Diamond },
  { id: "food", label: "Gastronomic Art", icon: Utensils },
  { id: "interior", label: "Palatial Interiors", icon: Crown },
  { id: "experience", label: "Dining Experience", icon: Star },
  { id: "exterior", label: "Restaurant Exterior", icon: Award },
]

export default function LuxuryGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const { elementRef, isVisible } = useIntersectionObserver()

  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const featuredImages = galleryImages.filter((img) => img.featured)
  const luxuryImages = galleryImages.filter((img) => img.luxury)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id))
  }

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentImageIndex + 1) % filteredImages.length

    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowLeft") navigateImage("prev")
        if (e.key === "ArrowRight") navigateImage("next")
        if (e.key === "Escape") setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, currentImageIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-amber-400 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-amber-400 rotate-12 animate-pulse" />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-amber-400 rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 border border-amber-400 rotate-12 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Luxury Header */}
      <section className="relative py-40 bg-gradient-to-br from-stone-900 via-amber-900 to-black text-white overflow-hidden">
        {/* Real Storefront Image Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/axum-storefront-real.png"
            alt="Axum Restaurant Storefront in Amsterdam"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
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
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className={`transition-all duration-1500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Crown className="w-8 h-8 text-amber-400" />
              <h1 className="text-sm font-light tracking-[0.3em] text-amber-400 uppercase">Royal Visual Collection</h1>
              <Crown className="w-8 h-8 text-amber-400" />
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

            <h2 className="text-7xl md:text-8xl font-extralight mb-8 tracking-wide bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              IMPERIAL GALLERY
            </h2>

            <p className="text-2xl text-amber-200 max-w-4xl mx-auto font-light leading-relaxed mb-8">
              Immerse yourself in the authentic world of Axum Restaurant, where every moment is captured in breathtaking
              detail, showcasing real experiences, genuine cuisine, and the true essence of Ethiopian heritage
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-amber-300">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="text-sm font-light">Authentic Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-light">Cultural Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-light">Traditional Cuisine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Featured Showcase */}
      <section className="py-32 bg-gradient-to-r from-white via-amber-50/50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gem className="w-6 h-6 text-amber-600" />
              <h2 className="text-sm font-light tracking-[0.2em] text-amber-600 uppercase">Authentic Moments</h2>
              <Gem className="w-6 h-6 text-amber-600" />
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8" />
            <h3 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-8 tracking-wide">
              Real Restaurant Experience
            </h3>
            <p className="text-xl text-stone-600 max-w-4xl mx-auto font-light leading-relaxed">
              Discover the genuine Axum experience through authentic photographs showcasing our real customers,
              traditional cuisine, and the warm atmosphere that makes every visit memorable
            </p>
          </div>

          {/* Luxury Masonry Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Large Featured Image */}
            <div className="lg:col-span-2 lg:row-span-2">
              <Card className="border-0 shadow-3xl hover:shadow-4xl transition-all duration-1000 overflow-hidden group cursor-pointer h-full luxury-card">
                <div className="relative h-[600px] overflow-hidden">
                  <Image
                    src={luxuryImages[0]?.src || "/placeholder.svg"}
                    alt={luxuryImages[0]?.alt || "Luxury dining"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    quality={100}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                  <Badge className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 flex items-center gap-2 px-4 py-2 text-base">
                    <Crown className="w-4 h-4" />
                    Authentic Collection
                  </Badge>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h4 className="text-4xl font-light mb-4 tracking-wide">{luxuryImages[0]?.title}</h4>
                    <p className="text-amber-200 text-lg font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {luxuryImages[0]?.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Smaller Featured Images */}
            {luxuryImages.slice(1, 5).map((image, index) => (
              <Card
                key={image.id}
                className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden group cursor-pointer luxury-card"
                onClick={() => openLightbox(image)}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />

                  {image.luxury && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white border-0 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Authentic
                    </Badge>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-xl font-light mb-2 tracking-wide">{image.title}</h4>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section
        ref={elementRef}
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-stone-50 via-white to-amber-50/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Luxury Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-10 sm:mb-20 overflow-x-auto pb-4 sm:pb-0 px-2 -mx-4 sm:mx-0">
              <TabsList className="flex sm:grid sm:grid-cols-5 bg-gradient-to-r from-stone-100 via-white to-stone-100 p-2 sm:p-3 rounded-full shadow-xl border border-amber-200/50 min-w-max sm:min-w-0">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-full px-4 sm:px-4 md:px-6 py-3 sm:py-3 md:py-4 font-light tracking-wide flex items-center gap-2 transition-all duration-500 hover:bg-amber-50 text-sm md:text-base whitespace-nowrap mx-1 first:ml-0 last:mr-0"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="inline">{category.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            {/* Luxury Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredImages.map((image, index) => (
                <LuxuryGalleryCard
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => openLightbox(image)}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Luxury Lightbox */}
      <LuxuryLightbox
        selectedImage={selectedImage}
        currentImageIndex={currentImageIndex}
        filteredImages={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNavigate={navigateImage}
      />

      {/* Royal Call to Action */}
      <section className="py-32 bg-gradient-to-br from-stone-900 via-amber-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Crown className="w-8 h-8 text-amber-400" />
            <h2 className="text-5xl md:text-6xl font-extralight tracking-wide">Experience Authentic Ethiopia</h2>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>

          <p className="text-2xl text-amber-200 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
            These authentic images showcase the real Axum experience. Join us for a genuine Ethiopian dining adventure
            that celebrates tradition, community, and the rich flavors of our heritage
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 text-white px-16 py-6 text-xl font-light tracking-wide border-0 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 luxury-card"
            >
              <Link href="/reservations">
                <Crown className="w-5 h-5 mr-3" />
                Reserve Your Experience
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-3 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-16 py-6 text-xl font-light tracking-wide bg-transparent backdrop-blur-sm shadow-2xl transition-all duration-500 luxury-card"
            >
              <Link href="/menu">
                <Sparkles className="w-5 h-5 mr-3" />
                Explore Authentic Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
