"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Package, type Destination } from "@/lib/storage"

export default function DestinationDetailPage() {
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    const data = read()
    if (data && params.slug) {
      const foundDestination = data.siteContent.destinations.find((d) => d.slug === params.slug)
      setDestination(foundDestination || null)

      if (foundDestination) {
        const destPackages = data.siteContent.packages.filter((p) =>
          p.destination === foundDestination.slug,
        )
        setPackages(destPackages)
      }
    }
  }, [params.slug])

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading destination...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] font-sans">
      {/* Hero Section */}
      <div className="relative h-[85vh] min-h-[600px] flex items-center text-white overflow-hidden">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        {/* Cinematic Navy Gradient Overlay - 75% opacity #0B3C5D */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(11,60,93,0.75), rgba(11,60,93,0.75))"
          }}
        />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/">
             <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 gap-2 pl-2 transition-colors">
                <ArrowLeft className="h-5 w-5" /> Back
             </Button>
          </Link>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="max-w-[640px] flex flex-col items-start text-left space-y-8">
            
            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-[48px] font-bold font-serif text-white leading-tight">
                {destination.name}
              </h1>
              <p className="text-[16px] text-gray-200 leading-[1.7] font-light max-w-lg">
                {destination.description}
              </p>
            </div>

            {/* Price Pill */}
            <div className="inline-flex items-center gap-3 backdrop-blur-sm bg-white/10 border border-white/20 px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-medium text-white/90">Tours starting from</span>
              <span className="text-xl font-bold text-[#FF7A00]">₹ {destination.priceFrom.toLocaleString("en-IN")}</span>
            </div>

            {/* Traveller Tag Pills (Grouped) */}
            {destination.idealFor && (
               <div className="flex flex-col gap-3 mt-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70">Ideal for</span>
                  <div className="flex flex-wrap gap-2">
                    {destination.idealFor.map((tag, idx) => (
                        <span key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/20 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Why Visit & Popular Experiences Grid - Clean Layout */}
      {(destination.whyVisit || destination.popularExperiences) && (
          <div className="container mx-auto px-6 md:px-12 py-16 -mt-24 relative z-20">
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  {/* Why Visit - White Card */}
                  {destination.whyVisit && (
                      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
                          <h3 className="text-2xl font-bold text-[#0B3C5D] font-serif mb-8 text-left">Why Visit {destination.name}?</h3>
                          <ul className="space-y-6 flex-1">
                              {destination.whyVisit.map((reason, idx) => (
                                  <li key={idx} className="flex items-start gap-4">
                                      <div className="bg-[#fff4f0] p-2 rounded-full mt-1 flex-shrink-0">
                                          <div className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                                      </div>
                                      <span className="text-[#4A5568] text-[15px] leading-relaxed font-medium">{reason}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

                  {/* Popular Experiences - Navy Card */}
                  {destination.popularExperiences && (
                      <div className="bg-[#0B3C5D] p-10 rounded-xl shadow-lg flex flex-col h-full text-white">
                          <h3 className="text-2xl font-bold text-white font-serif mb-8 text-left">Popular Experiences</h3>
                          <ul className="space-y-4 flex-1">
                              {destination.popularExperiences.map((exp, idx) => (
                                  <li key={idx} className="flex items-center gap-4 bg-[#082f4d] hover:bg-[#06243d] transition-colors px-6 py-4 rounded-full border border-white/10 group cursor-pointer w-full">
                                      <div className="bg-[#FF7A00] p-1.5 rounded-full flex-shrink-0">
                                          <div className="h-1 w-1 rounded-full bg-white" />
                                      </div>
                                      <span className="text-gray-100 text-[15px] font-medium">{exp}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Packages Grid - Simplified & Clean */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#FF7A00] font-bold text-xs uppercase tracking-widest mb-1 block">Explore</span>
            <h2 className="text-3xl font-bold font-serif text-[#0B3C5D]">{destination.name} Packages</h2>
          </div>
          <Link href="/packages">
            <Button variant="outline" className="border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white font-medium rounded-full px-6">
              View All
            </Button>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg mb-6">No packages listed yet.</p>
            <Link href="/packages">
              <Button className="bg-[#FF7A00] hover:bg-[#e65100] text-white font-bold rounded-full px-8 py-3 shadow-lg shadow-orange-500/20">Browse Packages</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden border-none shadow-lg rounded-xl bg-white h-full flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3C5D] px-3 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {pkg.destination}
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] bg-[#fff4f0] px-2 py-1 rounded-md">
                          {pkg.tourType || "Group Tour"}
                       </span>
                       <span className="text-xs text-gray-500 font-medium">{pkg.duration}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF7A00] transition-colors font-serif text-[#0B3C5D] line-clamp-2">
                      {pkg.title}
                    </h3>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Stars from</p>
                      <p className="text-xl font-bold text-[#0B3C5D]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <Button className="bg-[#0B3C5D] hover:bg-[#FF7A00] text-white rounded-full h-10 w-10 p-0 flex items-center justify-center transition-colors shadow-md group-hover:shadow-lg">
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section - Minimal */}
      <div className="bg-[#0B3C5D] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 font-serif">Plan your {destination.name} Trip</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto font-light">
            Our travel experts can customize the perfect itinerary for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#FF7A00] hover:bg-[#e65100] text-white px-8 py-6 rounded-full font-bold shadow-lg">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
