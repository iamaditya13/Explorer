"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { read } from "@/lib/storage"

export default function AboutPage() {
  const [content, setContent] = useState("")

  useEffect(() => {
    const data = read()
    if (data) {
      setContent(data.siteContent.pages.about)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">About Us</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Your Trusted Travel Partner
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-lg max-w-none" />
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 font-serif text-[#0a3d62]">Why Choose Explorers?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Years of Experience</h3>
                  <p className="text-gray-600">Decades of expertise in international travel</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Round-the-clock assistance for all your needs</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                  <p className="text-gray-600">Competitive rates with no hidden charges</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Customized Tours</h3>
                  <p className="text-gray-600">Tailored itineraries to match your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
