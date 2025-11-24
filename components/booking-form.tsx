"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { validateEmail, validatePhone, validateRequired } from "@/lib/validators"
import { generateId } from "@/lib/id"
import { read, write } from "@/lib/storage"

interface BookingFormProps {
  packageId: string
  packageTitle: string
  onClose: () => void
}

export function BookingForm({ packageId, packageTitle, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    adults: "2",
    children: "0",
    specialRequests: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = "Full name is required"
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Valid email is required"
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Valid phone number is required"
    }
    if (!validateRequired(formData.travelDate)) {
      newErrors.travelDate = "Travel date is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const data = read()
      if (data) {
        data.bookings.push({
          id: generateId(),
          packageId,
          packageTitle,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          travelDate: formData.travelDate,
          adults: Number.parseInt(formData.adults),
          children: Number.parseInt(formData.children),
          specialRequests: formData.specialRequests,
          createdAt: new Date().toISOString(),
        })
        write(data)
        setSubmitted(true)

        setTimeout(() => {
          onClose()
        }, 2000)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Book Package: {packageTitle}</CardTitle>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Booking Request Submitted!</h3>
              <p className="text-gray-600">Thank you for your booking request. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="travelDate">Travel Date *</Label>
                  <Input
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className={errors.travelDate ? "border-red-500" : ""}
                  />
                  {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
                </div>

                <div>
                  <Label htmlFor="adults">Number of Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="children">Number of Children</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-[#ff6b35] hover:bg-[#0a3d62]">
                  Submit Booking Request
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
