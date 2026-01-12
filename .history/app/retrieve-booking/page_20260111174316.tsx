"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function RetrieveBookingPage() {
  return (
    <div className="font-sans py-20 bg-gray-50 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0a3d62] font-serif mb-2">Manage Your Booking</h1>
                <p className="text-gray-600">Enter your booking details to view itinerary, vouchers, and payment status.</p>
            </div>

            <Card className="border-none shadow-xl">
                <CardContent className="p-8 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Booking Reference ID</label>
                        <Input placeholder="e.g. HW-123456" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Last Name / Email</label>
                        <Input placeholder="Enter last name or registered email" />
                    </div>
                    <Button className="w-full bg-[#ff6b35] hover:bg-[#e65100] text-white h-12 text-lg">
                        Retrieve Booking
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
