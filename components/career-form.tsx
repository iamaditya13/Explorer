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

interface CareerFormProps {
  position: string
  onClose: () => void
}

export function CareerForm({ position, onClose }: CareerFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
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

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const data = read()
      if (data) {
        data.careerApplications.push({
          id: generateId(),
          position,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resume: formData.resume,
          coverLetter: formData.coverLetter,
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
          <CardTitle>Apply for: {position}</CardTitle>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
              <p className="text-gray-600">Thank you for your application. We'll review it and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="phone">Phone *</Label>
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
                <Label htmlFor="resume">Resume Link (Google Drive, Dropbox, etc.)</Label>
                <Input
                  id="resume"
                  type="url"
                  placeholder="https://"
                  value={formData.resume}
                  onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={4}
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-[#ff6b35] hover:bg-[#0a3d62]">
                  Submit Application
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
