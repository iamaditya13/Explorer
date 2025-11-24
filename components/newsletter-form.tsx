"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { validateEmail } from "@/lib/validators"
import { generateId } from "@/lib/id"
import { read, write } from "@/lib/storage"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setStatus("error")
      return
    }

    const data = read()
    if (data) {
      data.newsletter.push({
        id: generateId(),
        email,
        subscribedAt: new Date().toISOString(),
      })
      write(data)
      setStatus("success")
      setEmail("")

      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <div className="bg-[#0a3d62] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white mb-4">
            Sign up to our newsletter to get exclusive deals and dose of travel inspiration delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              required
            />
            <Button type="submit" className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white">
              Subscribe
            </Button>
          </form>
          {status === "success" && <p className="text-green-400 mt-2">Thank you for subscribing!</p>}
          {status === "error" && <p className="text-red-400 mt-2">Please enter a valid email address.</p>}
        </div>
      </div>
    </div>
  )
}
