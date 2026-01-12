"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Check, X, Heart, Phone, Mail, Share2, PlayCircle, Images, Video, Info, Map, Binoculars, Hotel, CheckCircle2, HelpCircle, Utensils, Bus, UserCheck, ListOrdered, ChevronDown, Download, Send, XCircle, Star, Moon, AlertCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { read, type Package } from "@/lib/storage"
import { BookingForm } from "@/components/booking-form"
import { InquiryForm } from "@/components/inquiry-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAuth } from "@/lib/auth"
import { LoginDialog } from "@/components/login-dialog"

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [pkg, setPkg] = useState<Package | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const { toggleFavorite, isFavorite, user } = useAuth()
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    const data = read()
    if (data && resolvedParams.slug) {
      const foundPackage = data.siteContent.packages.find((p) => p.slug === resolvedParams.slug)
      setPkg(foundPackage || null)
    }
  }, [resolvedParams.slug])

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading package details...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#f6f8fa] min-h-screen font-sans text-[#1A1A1A]">
      {/* 1. Header Section (Title, Code, Share) */}
      <div className="bg-white border-b sticky top-0 md:relative z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
             <Link href="/packages" className="text-sm font-medium text-[#4A5568] hover:text-[#FF7A00] flex items-center gap-1 transition-colors">
                <ChevronDown className="h-4 w-4 rotate-90" /> Back to Packages
             </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-2xl md:text-3xl font-bold text-[#0B3C5D] font-serif tracking-tight">{pkg.title}</h1>
                 {pkg.tourType && (
                    <span className="bg-[#0B3C5D] text-white text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider">
                       {pkg.tourType} Tour
                    </span>
                 )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#4A5568] items-center font-medium">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-[#FF7A00]" /> {pkg.duration}</span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#FF7A00]" /> {pkg.destination}</span>
                 {pkg.tourCode && (
                   <>
                     <span className="text-gray-300">|</span>
                     <span className="text-[#4A5568]">Code: {pkg.tourCode}</span>
                   </>
                 )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 text-[#0B3C5D] border-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white transition-colors font-medium">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Media Section */}
      <div className="relative h-[480px] bg-black group">
         <Image
            src={pkg.images[currentImageIndex] || "/placeholder.svg"}
            alt={pkg.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
               <button className="bg-white/10 backdrop-blur-md hover:bg-[#FF7A00]/90 text-white rounded-full p-5 transition-all hover:scale-110 shadow-2xl border border-white/30 group/play">
                  <PlayCircle className="h-16 w-16 group-hover/play:text-white" />
               </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Thumbnails Overlay */}
          <div className="absolute bottom-6 right-6 flex gap-3">
             <Button size="sm" className="gap-2 bg-white/90 text-[#0B3C5D] hover:bg-white hover:text-[#FF7A00] font-semibold border-none shadow-lg backdrop-blur-sm">
                <Images className="h-4 w-4" /> View Gallery
             </Button>
             <Button size="sm" className="gap-2 bg-white/90 text-[#0B3C5D] hover:bg-white hover:text-[#FF7A00] font-semibold border-none shadow-lg backdrop-blur-sm">
                <Video className="h-4 w-4" /> Watch Video
             </Button>
          </div>
      </div>

      {/* 3. Navigation Tabs (Sticky Bar) */}
      <Tabs defaultValue="overview" className="w-full">
         <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
             <div className="container mx-auto px-4">
                 <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-6 overflow-x-auto min-w-max md:min-w-0 no-scrollbar">
                    {[
                      { id: "overview", label: "Overview", icon: Info },
                      { id: "itinerary", label: "Itinerary", icon: Map },
                      { id: "sightseeing", label: "Sightseeing", icon: Binoculars },
                      { id: "gallery", label: "Gallery", icon: Images },
                      { id: "hotels", label: "Hotels", icon: Hotel },
                      { id: "optionals", label: "Optionals", icon: Star },
                      { id: "video", label: "Video", icon: Video },
                      { id: "info", label: "Tour Policies", icon: HelpCircle },
                    ].map(tab => (
                       <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="data-[state=active]:text-[#FF7A00] data-[state=active]:border-b-2 data-[state=active]:border-[#FF7A00] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-1 py-4 gap-2 text-[#4A5568] font-semibold text-sm transition-all whitespace-nowrap border-b-2 border-transparent hover:text-[#0B3C5D]"
                       >
                         {tab.label}
                       </TabsTrigger>
                    ))}
                 </TabsList>
             </div>
         </div>

         <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN: Main Content */}
              <div className="lg:col-span-2 space-y-8 min-h-screen">
                  
                  {/* Tab: Overview */}
                  <TabsContent value="overview" className="space-y-6 mt-0 animate-in fade-in slide-in-from-bottom-2">
                     <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-[#0B3C5D] mb-4 font-serif">Trip Overview</h3>
                        <p className="text-[#1A1A1A] leading-relaxed text-base tracking-wide text-justify">
                           {pkg.description}
                        </p>
                        
                        <div className="mt-8 flex flex-wrap gap-3">
                           <span className="text-sm font-bold text-[#1A1A1A] py-1">Ideally Suited For:</span>
                           {pkg.theme && (
                              <span className="bg-[#fff4f0] text-[#FF7A00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#FF7A00]/20">
                                 {pkg.theme.replace("-", " ")}
                              </span>
                           )}
                           <span className="bg-blue-50 text-[#0B3C5D] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#0B3C5D]/10">
                              Family Friendly
                           </span>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-5">
                        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                               <h4 className="flex items-center gap-2 font-bold text-lg text-[#0B3C5D] mb-4 font-serif">
                                  <Hotel className="h-5 w-5 text-[#FF7A00]" /> Accommodation
                               </h4>
                               <ul className="space-y-3">
                                  {pkg.hotels?.slice(0, 2).map((hotel, idx) => (
                                     <li key={idx} className="flex flex-col text-sm">
                                        <span className="font-bold text-[#1A1A1A]">{hotel.name}</span>
                                        <span className="text-[#4A5568] text-xs mt-0.5">{hotel.city} • {Array(hotel.starRating).fill('★').join('')}</span>
                                     </li>
                                  ))}
                               </ul>
                            </CardContent>
                        </Card>
                        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                               <h4 className="flex items-center gap-2 font-bold text-lg text-[#0B3C5D] mb-4 font-serif">
                                  <Utensils className="h-5 w-5 text-[#FF7A00]" /> Meals
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                  {pkg.inclusions.some(i => i.toLowerCase().includes('breakfast')) && (
                                     <span className="bg-[#16A34A]/10 text-[#16A34A] px-3 py-1 rounded-md text-sm font-semibold border border-[#16A34A]/20">Daily Breakfast</span>
                                  )}
                                  {pkg.inclusions.some(i => i.toLowerCase().includes('dinner')) && (
                                     <span className="bg-[#16A34A]/10 text-[#16A34A] px-3 py-1 rounded-md text-sm font-semibold border border-[#16A34A]/20">Dinners</span>
                                  )}
                                  <span className="bg-gray-100 text-[#4A5568] px-3 py-1 rounded-md text-sm font-medium border border-gray-200">Local Cuisine</span>
                               </div>
                            </CardContent>
                        </Card>
                     </div>
                  </TabsContent>

                  {/* Tab: Itinerary */}
                  <TabsContent value="itinerary" className="mt-0">
                     <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-2xl font-bold text-[#0B3C5D] font-serif">Day Wise Itinerary</h3>
                           <Button size="sm" variant="outline" className="text-[#FF7A00] border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white font-medium">
                              Expand All
                           </Button>
                        </div>

                        <div className="space-y-0 relative border-l-2 border-[#E2E8F0] ml-4 md:ml-6">
                          {pkg.itinerary.map((day) => (
                            <div key={day.day} className="group pl-8 md:pl-10 pb-10 last:pb-0 relative">
                               {/* Timeline Dot & Badge - FLAMINGO STYLE */}
                               <div className="absolute -left-[11px] top-0 flex items-center justify-center p-1 bg-white">
                                   <div className="bg-[#FF7A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 border border-white">
                                      DAY {day.day}
                                   </div>
                               </div>
                               
                               <div className="flex flex-col gap-1 mb-3 mt-[-4px]">
                                  <h4 className="text-xl font-bold text-[#0B3C5D] group-hover:text-[#FF7A00] transition-colors">{day.title}</h4>
                               </div>
                               
                               <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow group-hover:border-[#FF7A00]/30 transition-colors">
                                <CardContent className="p-5">
                                    <p className="text-[#1A1A1A] leading-relaxed text-sm md:text-base mb-4">
                                        {day.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50 bg-[#f9fafb] -mx-5 -mb-5 p-4 rounded-b-xl">
                                        {day.meals?.map((meal, mIdx) => (
                                            <div key={mIdx} className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-white px-2.5 py-1.5 rounded border border-[#16A34A]/20 shadow-sm">
                                                <Utensils className="h-3 w-3" /> {meal.toUpperCase()}
                                            </div>
                                        ))}
                                        {day.overnightCity && (
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D] bg-white px-2.5 py-1.5 rounded border border-[#0B3C5D]/20 shadow-sm">
                                                <Moon className="h-3 w-3" /> OVERNIGHT: {day.overnightCity.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                               </Card>
                            </div>
                          ))}
                        </div>
                         <div className="mt-8 text-center">
                            <Button className="bg-[#FF7A00] hover:bg-[#e65100] text-white rounded-full px-8 py-6 text-sm font-bold shadow-lg shadow-orange-500/20">
                               View Full Itinerary <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                         </div>
                     </div>
                  </TabsContent>

                  {/* Tab: Sightseeing */}
                  <TabsContent value="sightseeing" className="mt-0">
                     <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-[#0B3C5D] mb-6 font-serif">Included Sightseeing</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                           {pkg.sightseeing?.map((spot, idx) => (
                              <div key={idx} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white group cursor-pointer">
                                 <div className="h-24 w-24 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <Image src={spot.image || "/placeholder.svg"} alt={spot.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="font-bold text-[#0B3C5D] text-lg mb-1 group-hover:text-[#FF7A00] transition-colors">{spot.title}</h4>
                                    <span className="text-xs text-[#4A5568] uppercase tracking-wide font-semibold block mb-2">{spot.city}</span>
                                    <p className="text-sm text-[#4A5568] line-clamp-2 leading-relaxed">{spot.description}</p>
                                    {spot.type === "required" && (
                                       <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">
                                          <CheckCircle2 className="h-3 w-3" /> Included in Package
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </TabsContent>

                  {/* Tab: Hotels */}
                  <TabsContent value="hotels" className="mt-0">
                     <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-[#0B3C5D] mb-6 font-serif">Selected Accommodations</h3>
                        <div className="space-y-6">
                           {pkg.hotels?.map((hotel, idx) => (
                              <div key={idx} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                 <div className="w-full md:w-64 h-40 bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0 shadow-sm">
                                    <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                                    <div className="absolute top-3 left-3 bg-[#0B3C5D] text-white text-xs font-bold px-2 py-1 rounded">
                                       {hotel.starRating} Star
                                    </div>
                                 </div>
                                 <div className="flex-1 py-1">
                                    <h4 className="text-xl font-bold text-[#0B3C5D]">{hotel.name}</h4>
                                    <div className="flex items-center gap-1 text-[#FF7A00] my-2">
                                       {Array.from({ length: hotel.starRating || 3 }).map((_, i) => (
                                          <Star key={i} className="h-4 w-4 fill-current" />
                                       ))}
                                    </div>
                                    <p className="text-sm text-[#4A5568] mb-4 flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {hotel.city}
                                    </p>
                                    {hotel.isIncluded && (
                                       <span className="inline-flex items-center gap-1.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold px-3 py-1.5 rounded-full border border-[#16A34A]/20">
                                          <Check className="h-3 w-3" /> Included in Trip
                                       </span>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </TabsContent>

                  {/* Tab: Tour Info (Policies) */}
                  <TabsContent value="info" className="mt-0 space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                           <h3 className="text-lg font-bold text-[#16A34A] mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" /> Inclusions
                           </h3>
                           <ul className="space-y-3">
                              {pkg.inclusions.map((item, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-[#4A5568]">
                                    <Check className="h-4 w-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
                                    <span className="font-medium">{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                           <h3 className="text-lg font-bold text-[#DC2626] mb-4 flex items-center gap-2">
                              <XCircle className="h-5 w-5" /> Exclusions
                           </h3>
                           <ul className="space-y-3">
                              {pkg.exclusions.map((item, i) => (
                                 <li key={i} className="flex items-start gap-3 text-sm text-[#4A5568]">
                                    <X className="h-4 w-4 text-[#DC2626] mt-0.5 flex-shrink-0" />
                                    <span className="font-medium">{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     {pkg.policies && (
                        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm space-y-8">
                            <h3 className="text-2xl font-bold text-[#0B3C5D] font-serif border-b border-gray-100 pb-4">Tour Policies</h3>
                            
                            <div className="grid md:grid-cols-2 gap-10">
                               <div>
                                  <h4 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                                     <CreditCard className="h-4 w-4 text-[#0B3C5D]" /> Payment Policy
                                  </h4>
                                  <ul className="space-y-3 list-disc pl-5 text-sm text-[#4A5568] marker:text-[#FF7A00]">
                                     {pkg.policies.payment.map((rule, i) => <li key={i}>{rule}</li>)}
                                  </ul>
                               </div>
                               <div>
                                  <h4 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                                     <AlertCircle className="h-4 w-4 text-[#DC2626]" /> Cancellation Policy
                                  </h4>
                                  <ul className="space-y-3 list-disc pl-5 text-sm text-[#4A5568] marker:text-[#DC2626]">
                                     {pkg.policies.cancellation.map((rule, i) => <li key={i}>{rule}</li>)}
                                  </ul>
                               </div>
                            </div>
                            
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                               <h4 className="font-bold text-[#0B3C5D] mb-2 text-sm">TCS (Tax Collected at Source) Terms</h4>
                               <ul className="space-y-1 list-disc pl-4 text-xs text-[#4A5568]">
                                  {pkg.policies.tcs.map((rule, i) => <li key={i}>{rule}</li>)}
                               </ul>
                            </div>
                        </div>
                     )}
                  </TabsContent>

                  <TabsContent value="gallery"><div className="p-8 bg-white rounded-xl text-center text-gray-400 font-medium">Coming Soon</div></TabsContent>
                  <TabsContent value="optionals"><div className="p-8 bg-white rounded-xl text-center text-gray-400 font-medium">Coming Soon</div></TabsContent>
                  <TabsContent value="video"><div className="p-8 bg-white rounded-xl text-center text-gray-400 font-medium">Coming Soon</div></TabsContent>
              </div>

              {/* RIGHT COLUMN: Sticky Sidebar (Navy + Orange) */}
              <div className="lg:col-span-1">
                <div className="sticky top-[80px] space-y-6 z-20">
                   <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
                      <div className="bg-[#0B3C5D] p-6 text-white relative overflow-hidden">
                         <div className="relative z-10 text-center">
                            <p className="text-xs uppercase tracking-widest opacity-80 mb-2 font-medium">Best Price Guaranteed</p>
                            <h3 className="font-bold text-4xl font-serif">₹ {pkg.price.toLocaleString("en-IN")}</h3>
                            <p className="text-[11px] opacity-70 mt-2 font-medium">Per Person on Twin Sharing</p>
                         </div>
                      </div>
                      
                      {/* Sidebar Form Area */}
                       <div className="bg-[#0B3C5D] p-6 pt-0 space-y-5 text-white">
                         <hr className="border-white/10" />
                         
                         <div className="space-y-4">
                            <div className="space-y-1.5">
                               <label className="text-xs font-bold uppercase tracking-wider opacity-80">Departure City</label>
                               <select className="w-full text-sm border-white/20 rounded-lg h-11 px-3 bg-white/10 text-white focus:ring-2 focus:ring-[#FF7A00] outline-none border transition-all [&>option]:text-black">
                                  <option>Land Package Only</option>
                                  <option>Mumbai (BOM)</option>
                                  <option>Delhi (DEL)</option>
                               </select>
                            </div>
                             <div className="space-y-1.5">
                               <label className="text-xs font-bold uppercase tracking-wider opacity-80">Travel Date</label>
                               <input type="date" className="w-full text-sm border-white/20 rounded-lg h-11 px-3 bg-white/10 text-white focus:ring-2 focus:ring-[#FF7A00] outline-none border transition-all [color-scheme:dark]" />
                            </div>
                         </div>

                         <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider opacity-80">Travellers</label>
                            <select className="w-full text-sm border-white/20 rounded-lg h-11 px-3 bg-white/10 text-white focus:ring-2 focus:ring-[#FF7A00] outline-none border transition-all [&>option]:text-black">
                                  <option>2 Adults</option>
                                  <option>2 Adults, 1 Child</option>
                                  <option>4 Adults</option>
                            </select>
                         </div>

                         <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                            <div className="bg-[#FF7A00] text-white p-1.5 rounded-full">
                               <Clock className="h-4 w-4" />
                            </div>
                            <div>
                               <p className="text-xs font-bold text-white">EMI Available</p>
                               <p className="text-[10px] text-white/70">Credit Card EMI starts ₹1,599/mo</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-3 pt-2">
                            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold h-12 text-sm rounded-xl transition-all">
                               <Download className="h-4 w-4 mr-2" /> Itinerary
                            </Button>
                            <Button onClick={() => setShowInquiryForm(true)} className="w-full bg-[#FF7A00] hover:bg-[#e65100] text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-orange-900/20">
                               <Send className="h-4 w-4 mr-2" /> Enquiry
                            </Button>
                         </div>
                      </div>
                   </Card>

                   <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 text-[#FF7A00] bg-[#fff4f0] rounded-full flex items-center justify-center shrink-0">
                         <Phone className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Talk to an expert</p>
                         <p className="text-xl font-bold text-[#0B3C5D] font-serif">1800 123 4567</p>
                      </div>
                   </div>

                </div>
              </div>
            </div>
         </div>
      </Tabs>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm packageId={pkg.id} packageTitle={pkg.title} onClose={() => setShowBookingForm(false)} />
      )}

      {/* Inquiry Form Modal */}
      {showInquiryForm && <InquiryForm packageTitle={pkg.title} onClose={() => setShowInquiryForm(false)} />}

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
        message="Please login to add this package to your favorites."
      />

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between gap-3">
         <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-[#0B3C5D]">₹ {pkg.price.toLocaleString("en-IN")}</p>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-[#FF7A00] text-[#FF7A00] hover:bg-[#fff4f0] text-sm h-10 px-4">
               PDF
            </Button>
            <Button onClick={() => setShowInquiryForm(true)} className="bg-[#FF7A00] hover:bg-[#e65100] text-white text-sm h-10 px-6">
               Send Inquiry
            </Button>
         </div>
      </div>
    </div>
  )
}
