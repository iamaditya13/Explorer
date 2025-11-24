"use client"

import { useEffect, useState, use } from "react"
import Image from "next/image"
import { Clock, MapPin, Check, X, Heart, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Package } from "@/lib/storage"
import { BookingForm } from "@/components/booking-form"
import { InquiryForm } from "@/components/inquiry-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAuth } from "@/lib/auth"
import { LoginDialog } from "@/components/login-dialog"

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [pkg, setPkg] = useState<Package | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const { toggleFavorite, isFavorite, user } = useAuth()
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    const data = read()
    if (data && resolvedParams.slug) {
      const foundPackage = data.siteContent.packages.find((p) => p.slug === resolvedParams.slug)
      setPkg(foundPackage || null)
    }
  }, [resolvedParams.slug])

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading package details...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image Gallery */}
      <div className="bg-black">
        <div className="container mx-auto px-4 py-0">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={pkg.images[currentImageIndex] || "/placeholder.svg"}
              alt={pkg.title}
              fill
              className="object-cover"
            />
            {pkg.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {pkg.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Header Card */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{pkg.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#ff6b35]" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#ff6b35]" />
                    <span>{pkg.destination}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
              </CardContent>
            </Card>

            {/* Itinerary Card */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Itinerary</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {pkg.itinerary.map((day, index) => (
                    <AccordionItem 
                      key={day.day} 
                      value={`day-${day.day}`} 
                      className="border rounded-lg bg-white"
                    >
                      <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#ff6b35] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-left text-gray-900">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-gray-600">
                        {day.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
                    Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {(pkg.inclusions || []).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                    Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {(pkg.exclusions || []).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Book This Package Card */}
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Book This Package</h3>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">Starting From</p>
                    <p className="text-3xl font-bold text-[#ff6b35]">₹{pkg.price.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-gray-500">per person</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-[#ff6b35] hover:bg-[#e65100] text-white h-12 text-base font-semibold"
                    >
                      Book Now
                    </Button>
                    
                    <Button
                      onClick={() => setShowInquiryForm(true)}
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 h-12 text-base"
                    >
                      Send Inquiry
                    </Button>
                    
                    <a href="https://wa.me/919825081806" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 h-12 text-base"
                      >
                        WhatsApp Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help Card */}
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Need Help?</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Call us:</p>
                      <a href="tel:+919825081806" className="text-[#ff6b35] font-bold text-lg hover:underline">
                        +91 98250 81806
                      </a>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-gray-500 mb-1">Email:</p>
                      <a href="mailto:world@explorers.co.in" className="text-[#ff6b35] font-medium hover:underline">
                        world@explorers.co.in
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm packageId={pkg.id} packageTitle={pkg.title} onClose={() => setShowBookingForm(false)} />
      )}

      {/* Inquiry Form Modal */}
      {showInquiryForm && <InquiryForm packageTitle={pkg.title} onClose={() => setShowInquiryForm(false)} />}

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
        message="Please login to add this package to your favorites."
      />
    </div>
  )
}
