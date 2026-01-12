"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { read, type FAQ } from "@/lib/storage"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    const data = read()
    if (data) {
      setFaqs(data.siteContent.pages.faq)
    }
  }, [])

  const categories = Array.from(new Set(faqs.map((f) => f.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="FAQ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Find answers to common questions
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#ff6b35]">{category}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs
                  .filter((faq) => faq.category === category)
                  .map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="bg-white border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-semibold text-left">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
