"use client"

import { useEffect, useState } from "react"
import { Calendar, User, Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { read, type Booking } from "@/lib/storage"

export default function MyBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchEmail, setSearchEmail] = useState("")
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])

  useEffect(() => {
    const data = read()
    if (data) {
      setBookings(data.bookings)
    }
  }, [])

  const handleSearch = () => {
    const filtered = bookings.filter((b) => b.email.toLowerCase() === searchEmail.toLowerCase())
    setFilteredBookings(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a3d62] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
          <p className="text-xl text-gray-200">View your booking history</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Find Your Bookings</h2>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
                <Button onClick={handleSearch} className="bg-[#ff6b35] hover:bg-[#0a3d62]">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Found {filteredBookings.length} booking(s)</h3>
              {filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#ff6b35]">{booking.packageName}</h3>
                        <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Confirmed
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Travel Date: {booking.date}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        Guests: {booking.guests}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchEmail && filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No bookings found for this email address.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
