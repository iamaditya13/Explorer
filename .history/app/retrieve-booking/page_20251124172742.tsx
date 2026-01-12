import Link from "next/link"
import Image from "next/image"
import { Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RetrieveBookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Retrieve Booking"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Retrieve Booking</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Access your booking information
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-[#ff6b35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-3">Search Local Bookings</h2>
                <p className="text-gray-600 mb-6">Find bookings saved in this browser</p>
                <Link href="/my-booking">
                  <Button className="bg-[#ff6b35] hover:bg-[#0a3d62] w-full">Search Bookings</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-[#1a5a85] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-3">External Booking Portal</h2>
                <p className="text-gray-600 mb-6">Access our main booking system</p>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-2 w-full bg-transparent">
                    Go to Portal
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
