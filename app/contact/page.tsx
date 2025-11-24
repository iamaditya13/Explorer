"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Branch } from "@/lib/storage"
import { InquiryForm } from "@/components/inquiry-form"

export default function ContactPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const data = read()
    if (data) {
      setBranches(data.siteContent.branches)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Get in touch with our travel experts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-[#ff6b35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <a href="tel:+919825081806" className="text-[#ff6b35] font-semibold">
                +91 98250 81806
              </a>
              <p className="text-sm text-gray-600 mt-2">Mon-Sat: 10:30 AM - 7:00 PM</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-[#ff6b35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <a href="mailto:world@explorers.co.in" className="text-[#ff6b35] font-semibold">
                world@explorers.co.in
              </a>
              <p className="text-sm text-gray-600 mt-2">We reply within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-[#ff6b35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/919825081806"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b35] font-semibold"
              >
                Chat with us
              </a>
              <p className="text-sm text-gray-600 mt-2">Quick responses</p>
            </CardContent>
          </Card>
        </div>

        {/* Branches */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Branches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#ff6b35]">{branch.name}</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex gap-3">
                      <MapPin className="h-5 w-5 text-[#ff6b35] flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{branch.address}</p>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="h-5 w-5 text-[#ff6b35] flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{branch.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="h-5 w-5 text-[#ff6b35] flex-shrink-0" />
                      <p className="text-sm font-semibold">{branch.email}</p>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="h-5 w-5 text-[#ff6b35] flex-shrink-0" />
                      <p className="text-sm text-gray-600">{branch.hours}</p>
                    </div>
                    <a
                      href={branch.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#1a5a85] hover:text-[#ff6b35] font-medium text-sm mt-2"
                    >
                      View on Map →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form CTA */}
        <Card className="bg-gradient-to-r from-[#0a3d62] to-[#1a5a85] text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a Question?</h2>
            <p className="text-xl mb-6 text-gray-200">Send us your inquiry and we'll get back to you shortly</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Send Inquiry
            </button>
          </CardContent>
        </Card>
      </div>

      {showForm && <InquiryForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
