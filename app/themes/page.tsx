"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { read, type Theme } from "@/lib/storage"

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    const data = read()
    if (data) {
      setThemes(data.siteContent.themes)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Theme Tours"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Theme Tours</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Discover tours tailored to your travel style
          </p>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <Link key={theme.id} href={`/themes/${theme.slug}`}>
              <Card className="hover:shadow-2xl transition-all duration-500 group overflow-hidden cursor-pointer border-none shadow-lg h-[400px]">
                <div className="relative h-full">
                  <Image
                    src={theme.image || "/placeholder.svg"}
                    alt={theme.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-[#ff6b35] transition-colors font-serif">
                      {theme.name}
                    </h2>
                    <p className="text-gray-200 mb-4 line-clamp-2 text-lg">{theme.description}</p>
                    <div className="flex items-center gap-2 text-[#ff6b35] font-semibold uppercase tracking-wider text-sm">
                      <span>Explore {theme.tourCount}+ Tours</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
