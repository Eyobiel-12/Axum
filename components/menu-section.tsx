"use client"

import { useState } from "react"
import { AdvancedImage } from "./advanced-image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Leaf, Wheat } from "lucide-react"

interface MenuItem {
  name: string
  description: string
  price: string
  dietary: string[]
  image: string
  signature?: boolean
}

interface MenuSectionProps {
  category: MenuItem[]
  title?: string
}

const getDietaryIcon = (dietary: string) => {
  switch (dietary) {
    case "V":
      return <Leaf className="w-3 h-3" />
    case "GF":
      return <Wheat className="w-3 h-3" />
    default:
      return null
  }
}

const getDietaryLabel = (dietary: string) => {
  switch (dietary) {
    case "V":
      return "Vegetarian"
    case "GF":
      return "Gluten Free"
    default:
      return dietary
  }
}

export default function MenuSection({ category, title }: MenuSectionProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (imagePath: string) => {
    setImageErrors((prev) => new Set(prev).add(imagePath))
  }

  return (
    <section className="mb-16">
      {title && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-amber-800">{title}</h2>
      )}
      <div className="grid gap-6 md:gap-8 lg:gap-12">
        {category.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section - Full width on mobile, half width on desktop */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                  {!imageErrors.has(item.image) ? (
                    <AdvancedImage
                      src={item.image}
                      alt={item.name}
                      fill={true}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={() => handleImageError(item.image)}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <div className="text-center text-amber-600">
                        <div className="text-4xl mb-2">🍽️</div>
                        <p className="text-sm">Image Coming Soon</p>
                      </div>
                    </div>
                  )}
                  {item.signature && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs sm:text-sm">Signature</span>
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 md:mb-4 gap-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white md:text-gray-900 leading-tight">
                      {item.name}
                    </h3>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white md:text-amber-600 sm:ml-4 flex-shrink-0">
                      {item.price}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-white md:text-gray-600 mb-3 md:mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {item.dietary.map((diet, dietIndex) => (
                        <Badge
                          key={dietIndex}
                          variant="outline"
                          className="flex items-center gap-1 text-green-700 border-green-300 text-xs sm:text-sm"
                        >
                          {getDietaryIcon(diet)}
                          {getDietaryLabel(diet)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
