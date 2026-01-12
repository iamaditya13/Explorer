"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { read } from "@/lib/storage"

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("")

  useEffect(() => {
    const data = read()
    if (data) {
      setContent(data.siteContent.pages.privacy)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Privacy Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-lg max-w-none" />
        </div>
      </div>
    </div>
  )
}
