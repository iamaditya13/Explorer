"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Phone, CheckCircle2, Star, Hotel, Plane, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"

// Dummy Data for Themes
const themes = [
  { id: 1, name: "Super Saver Packages", tours: "20+", image: "/placeholder.svg?height=400&width=300" },
  { id: 2, name: "Winter Tours", tours: "70+", image: "/placeholder.svg?height=400&width=300" },
  { id: 3, name: "Group Tours", tours: "110+", image: "/placeholder.svg?height=400&width=300" },
  { id: 4, name: "Maharaj Tours", tours: "15+", image: "/placeholder.svg?height=400&width=300" },
  { id: 5, name: "Honeymoon Packages", tours: "60+", image: "/placeholder.svg?height=400&width=300" },
  { id: 6, name: "Short Breaks", tours: "20+", image: "/placeholder.svg?height=400&width=300" },
  { id: 7, name: "Exotic Tours", tours: "15+", image: "/placeholder.svg?height=400&width=300" },
  { id: 8, name: "Self-Drive Tours", tours: "5+", image: "/placeholder.svg?height=400&width=300" },
]

// Dummy Data for Destinations
const destinations = [
  { name: "USA", desc: "Big cities, national parks & theme parks", price: "1,50,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Dubai", desc: "Desert safaris, modern attractions & luxury", price: "45,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Japan", desc: "Cherry blossoms, culture & technology", price: "2,00,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Thailand", desc: "Island escapes, nightlife & city vibes", price: "30,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Singapore & Malaysia", desc: "Two countries, one seamless experience", price: "65,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Europe", desc: "Switzerland, France, Italy & more", price: "2,50,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Bali", desc: "Tropical beaches, culture & relaxation", price: "40,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "Australia", desc: "Wildlife, cities & adventure combined", price: "1,80,000", image: "/placeholder.svg?height=400&width=300" },
  { name: "New Zealand", desc: "Nature, scenic beauty & peaceful escapes", price: "2,20,000", image: "/placeholder.svg?height=400&width=300" },
]

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900">
      
      {/* 2.1 Main Headline & Tagline (Hero) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/rann-utsav-the-tent-city-india-colorful-camel.jpg" // Keeping existing image or update if provided
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif tracking-tight drop-shadow-2xl">
            Explore Tour Packages by Theme
          </h1>
          <p className="text-xl md:text-3xl mb-12 text-gray-100 max-w-3xl mx-auto drop-shadow-lg font-light tracking-wide">
            Travel the World with Comfort, Care, and Confidence
          </p>
          
          <div className="flex justify-center w-full max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2.2 Theme Tour Categories (Carousel) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-4">Choose Your Perfect Theme</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Headway offers thoughtfully designed travel themes so every traveller finds a journey that fits their style, comfort, and expectations.</p>
          </div>
          
          <div className="px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {themes.map((theme) => (
                  <CarouselItem key={theme.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <Card className="overflow-hidden border-none shadow-lg group hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-0 relative aspect-[3/4]">
                           <Image
                            src={theme.image}
                            alt={theme.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="font-bold text-lg mb-1">{theme.name}</h3>
                            <p className="text-sm opacity-80">{theme.tours} Tours</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex bg-white hover:bg-[#ff6b35] hover:text-white border-[#0a3d62] text-[#0a3d62]" />
              <CarouselNext className="hidden md:flex bg-white hover:bg-[#ff6b35] hover:text-white border-[#0a3d62] text-[#0a3d62]" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* 2.3 Travel Offers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-2">Exclusive Travel Offers</h2>
              <p className="text-gray-600">Special seasonal deals and early-bird benefits curated for Headway travellers.</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="default" className="bg-[#ff6b35] hover:bg-[#e65100]">Tour Package Offers</Button>
              <Button variant="outline" className="text-[#0a3d62] border-[#0a3d62] hover:bg-[#0a3d62] hover:text-white">Hotel & Stay Offers</Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Placeholder Offer Cards */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-white rounded-full text-[#0a3d62]">
                  <Plane className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a3d62] mb-2">Summer Special: Europe</h3>
                  <p className="text-gray-700 mb-4">Flat ₹10,000 OFF on group bookings for upcoming summer tours.</p>
                  <Button variant="link" className="p-0 text-[#ff6b35] font-bold">View Details &rarr;</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-white rounded-full text-[#ff6b35]">
                  <Hotel className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a3d62] mb-2">Luxury Stays in Dubai</h3>
                  <p className="text-gray-700 mb-4">Free room upgrade on select 5-star properties this month.</p>
                  <Button variant="link" className="p-0 text-[#ff6b35] font-bold">View Details &rarr;</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2.4 Company Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
               <Image
                src="/placeholder.svg?height=800&width=600" // Replace with relevant company image
                alt="Headway Travels Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-6 leading-tight">
                Headway Travels – Your Trusted International Travel Partner
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                <p>
                  With decades of experience in planning international holidays, Headway Travels stands for trust, comfort, and thoughtfully curated journeys. We specialise in international tour packages designed especially for Indian travellers — keeping food preferences, travel habits, and comfort at the heart of every itinerary.
                </p>
                <p>
                  Headquartered in India with support across major cities, Headway ensures smooth planning, transparent processes, and dependable travel experiences. From visas and flights to accommodation and guided tours, we manage everything so you can travel worry-free.
                </p>
                <p className="font-medium text-[#0a3d62]">
                  At Headway, travel is not just about destinations — it is about how cared for you feel throughout your journey.
                </p>
              </div>
              <Button className="mt-8 bg-[#0a3d62] text-white hover:bg-[#ff6b35] transition-colors rounded-full px-8 h-12">
                About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Explore the World (Best-Selling) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-4">Explore the World with Headway’s Best Holiday Packages</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your next global adventure starts here. Discover Headway’s most loved international tours covering iconic cities, natural wonders, cultural landmarks, and leisure destinations. Every itinerary is designed with Indian travellers in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <Link href={`/destinations/${dest.name.toLowerCase().replace(/ /g, '-')}`} key={idx} className="group">
                <Card className="h-full border-none shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0a3d62]">
                      Best Seller
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-[#0a3d62] font-serif mb-2 group-hover:text-[#ff6b35] transition-colors">{dest.name} Tour Packages</h3>
                    <p className="text-sm text-gray-600 mb-4 h-10">{dest.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 uppercase font-semibold">Starts From</span>
                      <span className="text-lg font-bold text-[#ff6b35]">₹ {dest.price}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
             <p className="text-center mt-12 text-[#0a3d62] font-medium text-lg italic">
                "When your food feels familiar, every journey feels more enjoyable."
            </p>
        </div>
      </section>

      {/* 2.6 Indian Food & Comfort */}
      <section className="py-24 relative overflow-hidden bg-[#0a3d62] text-white">
          <div className="container mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-[#ff6b35]">Indian Food.<br/>Indian Comfort.<br/>Global Experiences.</h2>
                      <div className="space-y-6 text-gray-200 text-lg leading-relaxed font-light">
                          <p>
                              What makes Headway different is our commitment to comfort abroad. We understand how important food, familiarity, and routine are when travelling internationally.
                          </p>
                          <p>
                              Our specially curated tour packages include Indian meals wherever possible, vegetarian options, and Maharaj Tours with Indian chefs. From timely meals to familiar spices, we ensure that travellers feel at home even thousands of miles away.
                          </p>
                          <p className="text-xl font-medium text-white">
                              At Headway, comfort is not an extra — it is a promise.
                          </p>
                      </div>
                  </div>
                   <div className="relative h-[400px] rounded-full overflow-hidden border-8 border-white/10 shadow-2xl">
                       <Image
                        src="/placeholder.svg?height=800&width=800" // Image of Indian food or happy family
                        alt="Indian Comfort Food"
                        fill
                        className="object-cover"
                      />
                  </div>
              </div>
          </div>
      </section>

      {/* 2.7 Travel Your Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-4">Travel Your Style – Choose Your Perfect Theme</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Every traveller is different. Headway offers a wide range of travel styles to suit your mood, schedule, and travel goals.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                      "Super Saver Tours", "Group Tours", "Honeymoon Packages", "Self-Drive Adventures",
                      "Short Break Holidays", "Fixed Departure Tours", "Maharaj Tours (Indian Chef)", "Discovery & Offbeat"
                  ].map((style, i) => (
                      <div key={i} className="group relative h-40 rounded-xl overflow-hidden cursor-pointer">
                           <Image
                            src={`/placeholder.svg?height=300&width=400&text=${style}`}
                            alt={style}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                              <span className="text-white font-bold text-lg">{style}</span>
                          </div>
                      </div>
                  ))}
              </div>
        </div>
      </section>

      {/* 2.8 Start Your Journey & 2.9 Why Choose Headway */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
                
                {/* Start Journey */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0a3d62] font-serif mb-6">Start Your Journey From Your City</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Headway Travels supports travellers across India. Whether you are planning your trip from <span className="font-semibold text-[#ff6b35]">Ahmedabad, Mumbai, Pune, Jaipur, Bangalore, or Delhi</span>, our team ensures smooth coordination, personalised assistance, and local support.
                    </p>
                    <p className="text-gray-700 mb-8 font-medium">
                        From your first enquiry to your safe return home, Headway is with you at every step.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {["Ahmedabad", "Mumbai", "Pune", "Delhi", "Bangalore"].map(city => (
                            <div key={city} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm text-sm text-[#0a3d62]">
                                <MapPin className="h-3 w-3" /> {city}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Headway */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#ff6b35]">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0a3d62] font-serif mb-6">Why Travellers Choose Headway</h2>
                    <ul className="space-y-4">
                        {[
                            "25+ years of experience in international travel",
                            "Indian food on international tours",
                            "Experienced and caring tour managers",
                            "Multiple travel themes for every traveller",
                            "Global destinations with Indian comfort",
                            "Support across major Indian cities",
                            "Transparent pricing and reliable planning",
                            "Trusted by thousands of satisfied travellers"
                        ].map((reason, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                <CheckCircle2 className="h-5 w-5 text-[#ff6b35] flex-shrink-0 mt-0.5" />
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                     <p className="text-center mt-8 text-[#0a3d62] font-semibold">
                         At Headway, you don’t just travel — you travel confidently, comfortably, and carefree.
                     </p>
                </div>
            </div>
        </div>
      </section>

      {/* 2.10 Call to Action & 2.11 Newsletter */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a3d62]">
             <Image
                src="/placeholder.svg?height=600&width=1600" // World map or travel texture
                alt=""
                fill
                className="object-cover opacity-10 mix-blend-overlay"
              />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">Let Headway Plan Your Next Journey</h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Whether it is a family holiday, honeymoon, group tour, or solo adventure, Headway is ready to listen, plan, and deliver a travel experience made just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-[#ff6b35] hover:bg-[#e65100] text-white text-lg px-8 h-14 rounded-full shadow-xl">Contact Our Travel Experts</Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#0a3d62] text-lg px-8 h-14 rounded-full">Plan My Trip</Button>
            </div>

            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">Get Exclusive Travel Deals & Inspiration</h3>
                <p className="text-sm text-gray-300 mb-4">Subscribe to receive the latest travel offers, destination ideas, and special discounts directly in your inbox.</p>
                <div className="flex gap-2">
                    <Input placeholder="Enter your email" className="bg-white/80 border-0 focus-visible:ring-0 text-[#0a3d62] placeholder:text-gray-500" />
                    <Button className="bg-[#ff6b35] hover:bg-[#e65100]">Subscribe</Button>
                </div>
            </div>
        </div>
      </section>

    </div>
  )
}
