import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Advertise With Us - Headway Travels",
  description: "Partner with Headway Travels to reach a premium audience of travelers. Explore our advertising opportunities.",
}

export default function AdvertiseWithUsPage() {
  return (
    <div className="font-sans py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-6">Advertise With Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          Reach thousands of premium travellers by advertising on Headway Travels website and newsletters. We offer targeted advertising opportunities for tourism boards, airlines, hotels, and lifestyle brands.
        </p>
        
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
            <h3 className="text-xl font-bold text-[#0a3d62]">Why Advertise with Headway?</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-bold text-2xl text-[#ff6b35]">500k+</p>
                    <p className="text-sm text-gray-600">Monthly Visitors</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-bold text-2xl text-[#ff6b35]">100k+</p>
                    <p className="text-sm text-gray-600">Email Subscribers</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-bold text-2xl text-[#ff6b35]">High</p>
                    <p className="text-sm text-gray-600">Engagement Rate</p>
                </div>
            </div>

            <p className="text-gray-600">
                For detailed media kit and pricing, please contact our marketing team.
            </p>
            
            <a href="mailto:marketing@headwaytravels.com" className="inline-flex items-center gap-2 text-[#0a3d62] font-bold hover:text-[#ff6b35] transition-colors">
                <Mail className="h-5 w-5" /> marketing@headwaytravels.com
            </a>
        </div>
      </div>
    </div>
  )
}
