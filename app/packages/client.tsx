"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MapPin, Calendar, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Package } from "@/lib/storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { LoginDialog } from "@/components/login-dialog"

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [themeFilter, setThemeFilter] = useState("all")
  const { toggleFavorite, isFavorite, user } = useAuth()
  const [destinationFilter, setDestinationFilter] = useState("all")
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    const data = read()
    if (data) {
      setPackages(data.siteContent.packages)
    }
  }, [])

  // Memoize filtered packages
  const filteredPackages = useMemo(() => {
    let filtered = [...packages]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.destination.toLowerCase().includes(query),
      )
    }

    // Theme filter
    if (themeFilter !== "all") {
      filtered = filtered.filter((pkg) => pkg.theme === themeFilter)
    }

    // Destination filter
    if (destinationFilter !== "all") {
      filtered = filtered.filter((pkg) => pkg.destination.toLowerCase().includes(destinationFilter.toLowerCase()))
    }

    return filtered
  }, [packages, searchQuery, themeFilter, destinationFilter])

  const themes = Array.from(new Set(packages.map((p) => p.theme)))
  const destinations = Array.from(new Set(packages.map((p) => p.destination)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Holiday Packages"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Holiday Packages</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Discover amazing travel experiences worldwide with Explorers
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={themeFilter} onValueChange={setThemeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                {themes.map((theme) => (
                  <SelectItem key={`theme-${theme}`} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={destinationFilter} onValueChange={setDestinationFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((dest) => (
                  <SelectItem key={`dest-${dest}`} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Package Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setThemeFilter("all")
                setDestinationFilter("all")
              }}
              className="mt-4 bg-[#ff6b35] hover:bg-[#0a3d62]"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-xl transition-all duration-300 group overflow-hidden border-none shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2 items-center">
                    <div className="bg-[#ff6b35] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {pkg.duration}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (!user) {
                          setShowLoginDialog(true)
                          return
                        }
                        toggleFavorite(pkg.id)
                      }}
                      className={`p-2 rounded-full shadow-lg transition-all ${
                        isFavorite(pkg.id) 
                          ? "bg-[#FF8A00] text-[#0a3d62]" 
                          : "bg-white text-gray-400 hover:text-[#0a3d62]"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite(pkg.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  {pkg.featured && (
                    <div className="absolute top-4 left-4 bg-[#0a3d62] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-blue-50 text-[#0a3d62] px-2 py-1 rounded text-xs font-medium uppercase tracking-wider">{pkg.theme}</span>
                    <span className="text-gray-300">•</span>
                    <span className="uppercase tracking-wider text-xs font-medium">{pkg.destination}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[#ff6b35] transition-colors font-serif">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{pkg.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Starting From</p>
                      <p className="text-2xl font-bold text-[#0a3d62]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <Button className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white rounded-full px-6">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
        message="Please login to add packages to your favorites."
      />
    </div>
  )
}
