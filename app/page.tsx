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
import { read, type Theme, type Destination } from "@/lib/storage"

export default function HomePage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    const data = read()
    if (data) {
      setThemes(data.siteContent.themes)
      setDestinations(data.siteContent.destinations.filter(d => d.featured))
    }
  }, [])
  return (
    <div className="font-sans text-gray-900">
      
      {/* 2.1 Main Headline & Tagline (Hero) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/rann-utsav-the-tent-city-india-colorful-camel.jpg" // Keeping existing image
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-16">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-white font-serif tracking-tight drop-shadow-2xl animate-fadeInUp">
            Explore Tour Packages by Theme
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl mb-12 text-gray-100 max-w-4xl mx-auto drop-shadow-lg font-light tracking-wide animate-fadeInUp stagger-2">
            Travel the World with Comfort, Care, and Confidence
          </p>
          
          <div className="flex justify-center w-full max-w-3xl mx-auto animate-fadeInUp stagger-3">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2.2 Theme Tour Categories (Carousel) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-4">Choose Your Perfect Theme</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Headway offers thoughtfully designed travel themes so every traveller finds a journey that fits their style, comfort, and expectations.</p>
          </div>
          
          <div className="px-4 md:px-12">
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
                      <Link href={`/packages?theme=${encodeURIComponent(theme.name)}`}>
                        <Card className="overflow-hidden border-none shadow-lg group hover:shadow-2xl transition-all duration-300 rounded-3xl cursor-pointer">
                          <CardContent className="p-0 relative aspect-[3/4]">
                             <Image
                              src={theme.image}
                              alt={theme.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                              <h3 className="font-bold text-2xl mb-1">{theme.name}</h3>
                              <p className="text-sm opacity-80 font-medium">{theme.tourCount}+ Tours</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex bg-white hover:bg-[#ff6b35] hover:text-white border-[#0a3d62] text-[#0a3d62] h-12 w-12 rounded-full" />
              <CarouselNext className="hidden md:flex bg-white hover:bg-[#ff6b35] hover:text-white border-[#0a3d62] text-[#0a3d62] h-12 w-12 rounded-full" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* 2.3 Travel Offers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-4">Exclusive Travel Offers</h2>
              <p className="text-gray-600 text-lg">Special seasonal deals and early-bird benefits curated for Headway travellers.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button variant="default" className="flex-1 md:flex-none bg-[#ff6b35] hover:bg-[#e65100] rounded-full px-6">Tour Package Offers</Button>
              <Button variant="outline" className="flex-1 md:flex-none text-[#0a3d62] border-[#0a3d62] hover:bg-[#0a3d62] hover:text-white rounded-full px-6">Hotel & Stay Offers</Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Placeholder Offer Cards */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-md hover:shadow-lg transition-shadow rounded-3xl overflow-hidden group">
              <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 bg-white rounded-2xl text-[#0a3d62] shadow-sm group-hover:scale-110 transition-transform">
                  <Plane className="h-10 w-10" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-[#0a3d62] mb-2">Summer Special: Europe</h3>
                  <p className="text-gray-700 mb-4">Flat ₹10,000 OFF on group bookings for upcoming summer tours.</p>
                  <Button variant="link" className="p-0 text-[#ff6b35] font-bold text-lg">View Details &rarr;</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-none shadow-md hover:shadow-lg transition-shadow rounded-3xl overflow-hidden group">
              <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 bg-white rounded-2xl text-[#ff6b35] shadow-sm group-hover:scale-110 transition-transform">
                  <Hotel className="h-10 w-10" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-[#0a3d62] mb-2">Luxury Stays in Dubai</h3>
                  <p className="text-gray-700 mb-4">Free room upgrade on select 5-star properties this month.</p>
                  <Button variant="link" className="p-0 text-[#ff6b35] font-bold text-lg">View Details &rarr;</Button>
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
            <div className="relative h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1 bg-gray-50 flex items-center justify-center">
               <Image
                src="/logo-headway.png" 
                alt="Headway Travels Team"
                fill
                className="object-contain p-20 hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a3d62] font-serif mb-8 leading-tight">
                Headway Travels – Your Trusted International Travel Partner
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                <p>
                  With decades of experience in planning international holidays, Headway Travels stands for trust, comfort, and thoughtfully curated journeys. We specialise in international tour packages designed especially for Indian travellers — keeping food preferences, travel habits, and comfort at the heart of every itinerary.
                </p>
                <p>
                  Headquartered in India with support across major cities, Headway ensures smooth planning, transparent processes, and dependable travel experiences. From visas and flights to accommodation and guided tours, we manage everything so you can travel worry-free.
                </p>
                <p className="font-medium text-[#0a3d62] text-xl">
                  At Headway, travel is not just about destinations — it is about how cared for you feel throughout your journey.
                </p>
              </div>
              <Button className="mt-8 bg-[#0a3d62] text-white hover:bg-[#ff6b35] transition-colors rounded-full px-10 h-14 text-lg">
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
            <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-6">Explore the World with Headway</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Your next global adventure starts here. Discover Headway’s most loved international tours covering iconic cities, natural wonders, cultural landmarks, and leisure destinations. Every itinerary is designed with Indian travellers in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <Link href={`/destinations/${dest.slug}`} key={idx} className="group">
                <Card className="h-full border-none shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 rounded-3xl">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-[#0a3d62] shadow-sm">
                      Best Seller
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-2xl text-[#0a3d62] font-serif group-hover:text-[#ff6b35] transition-colors">{dest.name}</h3>
                    </div>
                    <p className="text-base text-gray-600 mb-6 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-sm text-gray-500 uppercase font-semibold">Starts From</span>
                      <span className="text-xl font-bold text-[#ff6b35]">₹ {dest.priceFrom.toLocaleString("en-IN")}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
             <p className="text-center mt-16 text-[#0a3d62] font-medium text-xl italic opacity-80">
                "When your food feels familiar, every journey feels more enjoyable."
            </p>
        </div>
      </section>

      {/* 2.6 Indian Food & Comfort */}
      <section className="py-24 relative overflow-hidden bg-[#0a3d62] text-white">
          <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8 text-[#ff6b35] leading-tight">Indian Food.<br/>Indian Comfort.<br/>Global Experiences.</h2>
                      <div className="space-y-6 text-gray-200 text-lg md:text-xl leading-relaxed font-light">
                          <p>
                              What makes Headway different is our commitment to comfort abroad. We understand how important food, familiarity, and routine are when travelling internationally.
                          </p>
                          <p>
                              Our specially curated tour packages include Indian meals wherever possible, vegetarian options, and Maharaj Tours with Indian chefs. From timely meals to familiar spices, we ensure that travellers feel at home even thousands of miles away.
                          </p>
                          <p className="text-2xl font-bold text-white pt-4">
                              At Headway, comfort is not an extra — it is a promise.
                          </p>
                      </div>
                  </div>
                   <div className="relative h-[400px] md:h-[500px] rounded-full overflow-hidden border-[12px] border-white/10 shadow-2xl mx-auto w-full max-w-[500px]">
                       <Image
                        src="/placeholder.svg" // Image of Indian food or happy family
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
                <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-6">Travel Your Style</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Every traveller is different. Headway offers a wide range of travel styles to suit your mood, schedule, and travel goals.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {themes.map((theme) => (
                      <div key={theme.id} className="group relative h-48 md:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                           <Image
                            src={theme.image}
                            alt={theme.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/60 transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                              <span className="text-white font-bold text-xl md:text-2xl leading-tight block">{theme.name}</span>
                              <div className="h-1 w-12 bg-[#ff6b35] mt-3 transform origin-left md:scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                          </div>
                      </div>
                  ))}
              </div>
        </div>
      </section>

      {/* 2.8 Start Your Journey & 2.9 Why Choose Headway */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                
                {/* Start Journey */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-6">Start Your Journey From Your City</h2>
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                        Headway Travels supports travellers across India. Whether you are planning your trip from <span className="font-semibold text-[#ff6b35]">Ahmedabad, Mumbai, Pune, Jaipur, Bangalore, or Delhi</span>, our team ensures smooth coordination, personalised assistance, and local support.
                    </p>
                    <p className="text-gray-700 mb-10 font-bold text-lg border-l-4 border-[#ff6b35] pl-4">
                        From your first enquiry to your safe return home, Headway is with you at every step.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        {["Ahmedabad", "Mumbai", "Pune", "Delhi", "Bangalore", "Chennai", "Kolkata", "Surat"].map(city => (
                            <div key={city} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm text-[#0a3d62] hover:shadow-md transition-shadow cursor-default font-medium border border-gray-100">
                                <MapPin className="h-4 w-4 text-[#ff6b35]" /> {city}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Headway */}
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff4f0] rounded-bl-[100px] -mr-8 -mt-8 z-0" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-8">Why Travellers Choose Headway</h2>
                        <ul className="space-y-5">
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
                                <li key={i} className="flex items-start gap-4 text-gray-700 text-lg">
                                    <CheckCircle2 className="h-6 w-6 text-[#ff6b35] flex-shrink-0 mt-0.5" />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                         <p className="text-center mt-10 text-[#0a3d62] font-bold text-xl">
                             At Headway, travel confidently, comfortably, and carefree.
                         </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2.10 Call to Action & 2.11 Newsletter */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a3d62]">
             <Image
                src="/placeholder.svg" // World map or travel texture
                alt=""
                fill
                className="object-cover opacity-10 mix-blend-overlay"
              />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6">Let Headway Plan Your Next Journey</h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
                Whether it is a family holiday, honeymoon, group tour, or solo adventure, Headway is ready to listen, plan, and deliver a travel experience made just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button size="lg" className="bg-[#ff6b35] hover:bg-[#e65100] text-white text-lg px-10 h-16 rounded-full shadow-2xl transition-transform hover:scale-105">Contact Our Travel Experts</Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0a3d62] text-lg px-10 h-16 rounded-full transition-transform hover:scale-105">Plan My Trip</Button>
            </div>

            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-3">Get Exclusive Travel Deals & Inspiration</h3>
                <p className="text-gray-300 mb-6 text-lg">Subscribe to receive the latest travel offers, destination ideas, and special discounts directly in your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input placeholder="Enter your email address" className="bg-white/90 border-0 focus-visible:ring-0 text-[#0a3d62] placeholder:text-gray-500 h-14 text-lg px-6 rounded-full" />
                    <Button className="bg-[#ff6b35] hover:bg-[#e65100] h-14 px-8 rounded-full text-lg font-bold">Subscribe</Button>
                </div>
            </div>
        </div>
      </section>

    </div>
  )
}
