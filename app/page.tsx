"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { read, type SiteContent } from "@/lib/storage"

export default function HomePage() {
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    const data = read()
    if (data) {
      setContent(data.siteContent)
    }
  }, [])

  // Memoize featured packages to avoid recalculation
  const featuredPackages = useMemo(() => {
    return content?.packages.filter((pkg) => pkg.featured).slice(0, 3) || []
  }, [content?.packages])

  // Memoize featured destinations
  const featuredDestinations = useMemo(() => {
    return content?.destinations.filter((d) => d.featured) || []
  }, [content?.destinations])

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif tracking-tight text-balance drop-shadow-lg">
            {content.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-2xl mx-auto drop-shadow-md font-light">
            {content.home.hero.subtitle}
          </p>
          
          <div className="flex justify-center w-full">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Tour Themes Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0a3d62] font-serif">
            Explore Tour Packages by Theme
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {content.themes.map((theme, index) => (
              <Link key={theme.id} href={`/themes/${theme.slug}`}>
                <Card className={`h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-none bg-white overflow-hidden rounded-xl animate-fadeInUp opacity-0 stagger-${Math.min(index + 1, 6)}`}>
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <Image
                        src={theme.image || "/placeholder.svg"}
                        alt={theme.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-[#ff6b35] transition-colors">
                          {theme.name}
                        </h3>
                        <p className="text-xs text-gray-200 font-medium">{theme.tourCount}+ Tours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Offers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif">Travel Offers by Explorers</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white transition-colors">
                Tour Packages
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-[#0a3d62]">Hotels</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
                <Card key={pkg.id} className={`hover:shadow-2xl transition-all duration-300 group overflow-hidden border-none rounded-2xl bg-white h-full flex flex-col animate-fadeInUp opacity-0 stagger-${index + 1}`}>
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={pkg.images[0] || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0a3d62] shadow-sm">
                      Featured
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-[#ff6b35] transition-colors font-serif line-clamp-2">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-1">{pkg.description}</p>
                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
                        <p className="text-2xl font-bold text-[#ff6b35]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                      </div>
                      <Link href={`/packages/${pkg.slug}`}>
                        <Button className="bg-[#0a3d62] hover:bg-[#082a45] text-white rounded-full px-6">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Top Trending Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0a3d62] font-serif">
            Top Trending Travel Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`}>
                <Card className={`h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-xl border-none animate-fadeInUp opacity-0 stagger-${Math.min(index + 1, 6)}`}>
                  <div className="relative h-80">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-xl mb-2 font-serif">{destination.name}</h3>
                        <p className="text-sm mb-3 opacity-90 line-clamp-2 group-hover:opacity-100 transition-opacity">
                          {destination.description}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/20">
                          <p className="text-xs font-medium uppercase tracking-wider opacity-80">From</p>
                          <span className="font-bold text-lg text-[#ff6b35]">₹{destination.priceFrom.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0a3d62] font-serif">{content.home.about.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-10 font-light">{content.home.about.description}</p>
            <Button className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all" size="lg">
              Read more
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Find a Branch */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0a3d62] font-serif">Find a branch near you</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.branches.map((branch) => (
              <Card key={branch.id} className="hover:shadow-xl transition-all duration-300 border-none shadow-md">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-6 text-[#ff6b35] font-serif">{branch.name}</h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex gap-4 items-start">
                      <MapPin className="h-6 w-6 text-[#0a3d62] flex-shrink-0 mt-1" />
                      <p className="text-base leading-relaxed">{branch.address}</p>
                    </div>
                    <div className="pl-10 space-y-2 text-sm">
                      <p><span className="font-semibold text-[#0a3d62]">Phone:</span> {branch.phone}</p>
                      <p><span className="font-semibold text-[#0a3d62]">Email:</span> {branch.email}</p>
                      <p className="text-gray-500 mt-2 italic">{branch.hours}</p>
                    </div>
                    <div className="pl-10 pt-2">
                      <a
                        href={branch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#ff6b35] hover:text-[#e65100] font-bold text-sm group"
                      >
                        Show on Map <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-[#0a3d62] hover:bg-[#082a45] text-white rounded-full px-8" size="lg">
              View All Branches
            </Button>
          </div>
        </div>
      </section>

      {/* Ready to Explore Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d62] via-[#0a3d62] to-[#082849]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">
              Ready to Explore the World?
            </h2>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Let our expert travel consultants craft your perfect journey. Get in touch today for personalized itineraries and exclusive deals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-[#ff6b35] hover:bg-[#e65100] text-white rounded-full px-10 h-14 text-lg font-semibold shadow-2xl hover:shadow-[#ff6b35]/50 transition-all transform hover:scale-105">
                Send an Inquiry
              </Button>
              <a href="tel:+919825081806">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#0a3d62] rounded-full px-10 h-14 text-lg font-semibold transition-all transform hover:scale-105">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +91 98250 81806
                </Button>
              </a>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-6 justify-center text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Best Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Top Destination</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Kerala Tours And Packages, Bhutan Travel Packages, Goa Tours And Packages, Singapore Holiday Packages,
            Malaysia Travel Packages, Thailand Tours And Packages, Leh Holiday Packages, Himachal Pradesh Tour Package,
            Uttarakhand Travel Packages, Rajasthan Travel Packages, Nepal Vacation Packages, Sikkim Trip Packages,
            Kashmir Trip Packages, Andaman Tour Packages, Vietnam Travel Packages, Bali Travel Packages, Italy Tour
            Packages, Spain Vacation Packages, Switzerland Holiday Packages, Greece Travel Packages, Turkey Tour
            Packages, Baku Travel Packages, USA Travel Packages, Mexico Travel Packages, Canada Tour Packages, Australia
            Travel Packages, New Zealand Tour Packages, Mauritius Travel Packages, Seychelles Tour Packages, South
            Africa Holiday Packages, Kenya Tour Packages, Egypt Travel Packages, Dubai Tours And Packages, Madagascar
            Tour Packages
          </p>
        </div>
      </section>

      {/* Top Themes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Top Themes</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Adventure Tours, All Inclusive, Cruise Tours, Family Tours, Group Tours, Honeymoon Tours, Luxury Tours,
            Safari Tours, Senior Citizen Tours, Spiritual Tours, Student Tours, Weekend Getaways, Wildlife Tours, Winter
            Tours
          </p>
        </div>
      </section>
    </div>
  )
}
