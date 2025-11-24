"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Package, type Theme as ThemeType } from "@/lib/storage"

export default function ThemeDetailPage() {
  const params = useParams()
  const [theme, setTheme] = useState<ThemeType | null>(null)
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    const data = read()
    if (data && params.theme) {
      const foundTheme = data.siteContent.themes.find((t) => t.slug === params.theme)
      setTheme(foundTheme || null)

      if (foundTheme) {
        const themePackages = data.siteContent.packages.filter(
          (p) => p.theme === foundTheme.slug || p.theme === foundTheme.name.toLowerCase(),
        )
        setPackages(themePackages)
      }
    }
  }, [params.theme])

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading theme...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
        <Image src={theme.image || "/placeholder.svg"} alt={theme.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">{theme.name}</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            {theme.description}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
            <span className="text-lg font-semibold">{theme.tourCount}+ Tours Available</span>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold font-serif text-[#0a3d62]">Available Packages</h2>
          <Link href="/packages">
            <Button variant="outline" className="border-[#0a3d62] text-[#0a3d62] hover:bg-[#0a3d62] hover:text-white">
              View All Packages
            </Button>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl mb-6">No packages available for this theme yet.</p>
            <Link href="/packages">
              <Button className="bg-[#ff6b35] hover:bg-[#0a3d62] text-lg px-8 py-6 h-auto">Browse All Packages</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="hover:shadow-xl transition-all duration-300 group overflow-hidden border-none shadow-md"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {pkg.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[#ff6b35] transition-colors font-serif">
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{pkg.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Starting From</p>
                      <p className="text-2xl font-bold text-[#0a3d62]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <Button className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white rounded-full px-6">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
