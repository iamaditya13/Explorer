"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      login(email)
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
       {/* Background Image */}
       <div className="absolute inset-0 z-0">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-t-4 border-[#0a3d62]">
        <CardHeader className="text-center">
          <div className="mx-auto bg-[#ff6b35] w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-[#0a3d62]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0a3d62] font-serif">Welcome Back</CardTitle>
          <CardDescription>Login to access your favorites and bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-[#0a3d62] focus:ring-[#0a3d62]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#0a3d62] hover:bg-[#234b38] text-white font-bold py-2"
            >
              Login
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Note: This is a demo. Enter any email to login.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
