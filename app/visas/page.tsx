import { FileText } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function VisasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Visa Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Visa Services</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Complete visa assistance for all destinations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="h-24 w-24 mx-auto mb-6 text-[#ff6b35]" />
          <h2 className="text-3xl font-bold mb-4">Visa Assistance</h2>
          <p className="text-gray-600 mb-8">
            We provide complete visa assistance for all international destinations. Our experts will guide you through
            the entire process.
          </p>
          <Button size="lg" className="bg-[#ff6b35] hover:bg-[#0a3d62]">
            Get Visa Assistance
          </Button>
        </div>
      </div>
    </div>
  )
}
