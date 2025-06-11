"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Crown } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-stone-200/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Image
                src="/images/axum-logo.jpg"
                alt="Axum Restaurant Logo"
                fill
                className="object-contain rounded-full border-2 border-slate-400/30 group-hover:border-slate-400"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-2xl font-extralight tracking-[0.15em] transition-colors duration-300 ${
                  isScrolled ? "text-stone-800" : "text-white"
                }`}
              >
                AXUM
              </span>
              <span
                className={`text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? "text-slate-600" : "text-slate-300"
                }`}
              >
                RESTAURANT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-light text-lg tracking-wide transition-all duration-300 hover:text-slate-600 relative group ${
                  pathname === item.href ? "text-slate-600" : isScrolled ? "text-stone-700" : "text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-slate-600 to-slate-400 transition-all duration-300 group-hover:w-full ${
                    pathname === item.href ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}

            <Button
              asChild
              className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 text-white px-8 py-2 font-light tracking-wide border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <Link href="/reservations">
                <Crown className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Reservations
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isScrolled ? "text-stone-700 hover:text-slate-600" : "text-white hover:text-slate-300"
                  }`}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-white via-slate-50/30 to-stone-50">
                <div className="flex flex-col space-y-8 mt-12">
                  <div className="flex items-center space-x-3 pb-6 border-b border-slate-200">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/images/axum-logo.jpg"
                        alt="Axum Restaurant Logo"
                        fill
                        className="object-contain rounded-full border-2 border-slate-400"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-extralight tracking-[0.15em] text-stone-800">AXUM</span>
                      <span className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">RESTAURANT</span>
                    </div>
                  </div>
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl font-light tracking-wide transition-all duration-300 hover:text-slate-600 hover:translate-x-2 ${
                        pathname === item.href ? "text-slate-600 translate-x-2" : "text-stone-700"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white w-full py-3 font-light tracking-wide border-0 shadow-lg mt-8 group"
                  >
                    <Link href="/reservations" onClick={() => setIsOpen(false)}>
                      <Crown className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Reservations
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
