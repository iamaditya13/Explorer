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
    <div className="min-h-screen bg-[#f6f8fa]">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-white">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        {/* Navy Overlay 60% */}
        <div className="absolute inset-0 bg-[#0B3C5D]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/90 via-transparent to-transparent" />
        
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
            <MapPin className="h-8 w-8 text-[#FF7A00]" />
            <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight">{destination.name}</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            {destination.description}
          </p>
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 mb-12 shadow-2xl">
            <span className="text-lg text-gray-200 font-medium">Tours starting from</span>
            <span className="text-3xl font-bold text-[#FF7A00] drop-shadow-sm">₹{destination.priceFrom.toLocaleString("en-IN")}</span>
          </div>

          {/* New Rich Content Sections: Ideal For */}
          {destination.idealFor && (
             <div className="flex flex-wrap justify-center gap-3 mb-8">
                {destination.idealFor.map((tag, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 transition-colors cursor-default">
                        {tag}
                    </span>
                ))}
             </div>
          )}
        </div>
      </div>

      {/* Why Visit & Popular Experiences Grid */}
      {(destination.whyVisit || destination.popularExperiences) && (
          <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
              <div className="grid md:grid-cols-2 gap-8">
                  {/* Why Visit */}
                  {destination.whyVisit && (
                      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                          <h3 className="text-3xl font-bold text-[#0B3C5D] font-serif mb-8 border-b border-gray-100 pb-4">Why Visit {destination.name}?</h3>
                          <ul className="space-y-5">
                              {destination.whyVisit.map((reason, idx) => (
                                  <li key={idx} className="flex items-start gap-4">
                                      <div className="bg-[#fff4f0] p-2.5 rounded-full mt-0.5 flex-shrink-0">
                                          <div className="h-2 w-2 rounded-full bg-[#FF7A00]" />
                                      </div>
                                      <span className="text-[#4A5568] text-lg leading-relaxed">{reason}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

                  {/* Popular Experiences (Navy Background) */}
                  {destination.popularExperiences && (
                      <div className="bg-[#0B3C5D] p-10 rounded-2xl shadow-xl text-white">
                          <h3 className="text-3xl font-bold text-white font-serif mb-8 border-b border-white/10 pb-4">Popular Experiences</h3>
                          <ul className="space-y-4">
                              {destination.popularExperiences.map((exp, idx) => (
                                  <li key={idx} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/10 group cursor-pointer">
                                      <div className="bg-[#FF7A00] p-2 rounded-full group-hover:scale-110 transition-transform">
                                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                      </div>
                                      <span className="text-gray-100 text-lg font-medium">{exp}</span>
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
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0B3C5D]">{destination.name} Tour Packages</h2>
          <Link href="/packages">
            <Button variant="outline" className="border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white font-medium">
              View All Packages
            </Button>
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl mb-6">No packages available for {destination.name} yet.</p>
            <Link href="/packages">
              <Button className="bg-[#FF7A00] hover:bg-[#e65100] text-lg px-8 py-6 h-auto font-bold shadow-lg shadow-orange-500/20">Browse All Packages</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="hover:shadow-2xl transition-all duration-300 group overflow-hidden border-none shadow-lg ring-1 ring-gray-100 rounded-2xl bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-[#FF7A00] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                    {pkg.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] bg-[#fff4f0] px-2 py-1 rounded">
                        {pkg.tourType || "Group Tour"}
                     </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[#FF7A00] transition-colors font-serif text-[#0B3C5D] line-clamp-2 min-h-[56px]">
                    {pkg.title}
                  </h3>
                   <div className="flex items-center gap-4 text-sm text-[#4A5568] mb-6 border-b border-gray-50 pb-4">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#FF7A00]" /> {pkg.destination}</span>
                   </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] text-[#4A5568] uppercase tracking-wider font-bold mb-0.5">Starting From</p>
                      <p className="text-2xl font-bold text-[#0B3C5D]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <Button className="bg-[#0B3C5D] hover:bg-[#FF7A00] text-white rounded-xl px-6 font-bold transition-colors shadow-md">
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
      <div className="bg-[#0B3C5D] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Ready to explore {destination.name}?</h3>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Contact us to customize your perfect {destination.name} experience with our expert travel consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" className="bg-[#FF7A00] hover:bg-[#e65100] text-white text-lg px-8 py-6 h-auto shadow-xl shadow-orange-900/20 font-bold rounded-xl">
              Send Inquiry
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-[#0B3C5D] text-lg px-8 py-6 h-auto font-bold rounded-xl"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
