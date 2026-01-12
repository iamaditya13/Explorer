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
          p.destination.toLowerCase().includes(foundDestination.name.toLowerCase()),
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-white">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/">
             <Button variant="ghost" className="text-white hover:bg-white/20 gap-2 pl-2">
                <ArrowLeft className="h-5 w-5" /> Back
             </Button>
          </Link>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MapPin className="h-8 w-8 text-[#ff6b35]" />
            <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight">{destination.name}</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            {destination.description}
          </p>
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 mb-12">
            <span className="text-lg text-gray-200">Tours starting from</span>
            <span className="text-3xl font-bold text-[#ff6b35]">₹{destination.priceFrom.toLocaleString("en-IN")}</span>
          </div>

          {/* New Rich Content Sections: Ideal For */}
          {destination.idealFor && (
             <div className="flex flex-wrap justify-center gap-3 mb-8">
                {destination.idealFor.map((tag, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30">
                        {tag}
                    </span>
                ))}
             </div>
          )}
        </div>
      </div>

      {/* Why Visit & Popular Experiences Grid */}
      {(destination.whyVisit || destination.popularExperiences) && (
          <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 gap-8">
                  {/* Why Visit */}
                  {destination.whyVisit && (
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                          <h3 className="text-2xl font-bold text-[#0a3d62] font-serif mb-6">Why Visit {destination.name}?</h3>
                          <ul className="space-y-4">
                              {destination.whyVisit.map((reason, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                      <div className="bg-[#fff4f0] p-2 rounded-full mt-0.5">
                                          <div className="h-2 w-2 rounded-full bg-[#ff6b35]" />
                                      </div>
                                      <span className="text-gray-700 text-lg">{reason}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

                  {/* Popular Experiences */}
                  {destination.popularExperiences && (
                      <div className="bg-[#0a3d62] p-8 rounded-2xl shadow-sm text-white">
                          <h3 className="text-2xl font-bold text-white font-serif mb-6">Popular Experiences</h3>
                          <ul className="space-y-4">
                              {destination.popularExperiences.map((exp, idx) => (
                                  <li key={idx} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10">
                                      <div className="bg-[#ff6b35] p-1.5 rounded-full">
                                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                      </div>
                                      <span className="text-gray-100 text-lg font-light">{exp}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Packages */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold font-serif text-[#0a3d62]">{destination.name} Tour Packages</h2>
          <Link href="/packages">
            <Button variant="outline" className="border-[#0a3d62] text-[#0a3d62] hover:bg-[#0a3d62] hover:text-white">
              View All Packages
            </Button>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl mb-6">No packages available for {destination.name} yet.</p>
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

      {/* CTA Section */}
      <div className="bg-[#0a3d62] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to explore {destination.name}?</h3>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Contact us to customize your perfect {destination.name} experience with our expert travel consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#ff6b35] hover:bg-[#0a3d62] text-lg px-8 py-6 h-auto shadow-lg shadow-orange-500/20">
              Send Inquiry
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0a3d62] text-lg px-8 py-6 h-auto"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
