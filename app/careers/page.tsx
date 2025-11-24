"use client"

import { useState } from "react"
import Image from "next/image"
import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CareerForm } from "@/components/career-form"

const openPositions = [
  {
    id: "1",
    title: "Travel Consultant",
    location: "Ahmedabad",
    type: "Full-time",
    description: "We are looking for an experienced travel consultant to join our team.",
  },
  {
    id: "2",
    title: "Tour Manager",
    location: "Mumbai",
    type: "Full-time",
    description: "Seeking a dynamic tour manager with international tour experience.",
  },
  {
    id: "3",
    title: "Customer Support Executive",
    location: "Ahmedabad",
    type: "Full-time",
    description: "Join our customer support team to assist travelers with their queries.",
  },
]

export default function CareersPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState("")

  const handleApply = (position: string) => {
    setSelectedPosition(position)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Careers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Careers</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Join our team and help people explore the world
          </p>
        </div>
      </div>

      {/* Open Positions */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
        <div className="space-y-6 max-w-4xl">
          {openPositions.map((position) => (
            <Card key={position.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="bg-[#ff6b35] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                      <p className="text-gray-700">{position.description}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleApply(position.title)} className="bg-[#ff6b35] hover:bg-[#0a3d62]">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showForm && <CareerForm position={selectedPosition} onClose={() => setShowForm(false)} />}
    </div>
  )
}
