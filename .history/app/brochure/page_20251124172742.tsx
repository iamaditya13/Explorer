import { Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Download Brochure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Download Brochure</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Get our complete travel catalog
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="bg-[#ff6b35] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Travel Brochure 2025</h2>
              <p className="text-gray-600 mb-8">
                Download our comprehensive travel brochure featuring all our destinations, tour packages, and special
                offers.
              </p>
              <Button size="lg" className="bg-[#ff6b35] hover:bg-[#0a3d62]">
                Download PDF Brochure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
