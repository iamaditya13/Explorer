"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Check, X, Heart, Phone, Mail, Share2, PlayCircle, Images, Video, Info, Map, Binoculars, Hotel, CheckCircle2, HelpCircle, Utensils, Bus, UserCheck, ListOrdered, ChevronDown, Download, Send, XCircle } from "lucide-react"
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
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* 1. Header Section (Title, Code, Share) */}
      <div className="bg-white border-b sticky top-0 md:relative z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
             <Link href="/packages" className="text-sm font-medium text-gray-500 hover:text-[#ff6b35] flex items-center gap-1 transition-colors">
                <ChevronDown className="h-4 w-4 rotate-90" /> Back
             </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0a3d62] font-serif mb-1">{pkg.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="font-semibold">{pkg.duration}</span>
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {pkg.destination}</span>
                 <span className="text-gray-400">|</span>
                 <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">Monsoon Special</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Tour Code: FIT/{pkg.id}</span>
              <Button variant="outline" size="sm" className="gap-2 text-[#0a3d62] border-[#0a3d62] hover:bg-[#0a3d62] hover:text-white">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Media Section */}
      <div className="relative h-[400px] md:h-[500px] bg-black group">
         <Image
            src={pkg.images[currentImageIndex] || "/placeholder.svg"}
            alt={pkg.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
               <button className="bg-white/20 backdrop-blur-md hover:bg-[#ff6b35] text-white rounded-full p-4 transition-all hover:scale-110">
                  <PlayCircle className="h-16 w-16" />
               </button>
          </div>
          {/* Thumbnails Overlay (Optional) */}
          <div className="absolute bottom-4 right-4 flex gap-2">
             <Button size="sm" variant="secondary" className="gap-2 bg-white/90 text-black hover:bg-white">
                <Images className="h-4 w-4" /> View Gallery
             </Button>
             <Button size="sm" variant="secondary" className="gap-2 bg-white/90 text-black hover:bg-white">
                <Video className="h-4 w-4" /> Watch Video
             </Button>
          </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 3. Main Content Area (Tabs) */}
          <div className="lg:col-span-2">
            
            <Tabs defaultValue="overview" className="w-full">
              <div className="sticky top-[70px] z-10 bg-gray-50 pt-2 pb-4 overflow-x-auto">
                 <TabsList className="w-full justify-start h-auto p-1 bg-white border shadow-sm rounded-xl gap-2 flex-wrap md:flex-nowrap overflow-x-auto">
                    {[
                      { id: "overview", label: "Overview", icon: Info },
                      { id: "itinerary", label: "Itinerary", icon: Map },
                      { id: "sightseeing", label: "Sightseeing", icon: Binoculars },
                      { id: "hotels", label: "Hotels", icon: Hotel },
                      { id: "inclusions", label: "Inclusions", icon: CheckCircle2 },
                      { id: "faq", label: "FAQ", icon: HelpCircle },
                    ].map(tab => (
                       <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="data-[state=active]:bg-[#0a3d62] data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-2.5 rounded-lg gap-2 text-gray-600 font-medium transition-all"
                       >
                         <tab.icon className="h-4 w-4" /> {tab.label}
                       </TabsTrigger>
                    ))}
                 </TabsList>
              </div>

              {/* Tab: Overview */}
              <TabsContent value="overview" className="space-y-8 animate-in mt-0">
                 
                 {/* Important Note */}
                 <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="text-sm text-red-800">
                       <span className="font-bold">Important Note:</span> Please note that the itinerary below is subject to change based on airline or cruise schedules. Kindly confirm your specific travel plan before making any bookings.
                    </p>
                 </div>

                 {/* Cities */}
                 <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#ff6b35] mb-4 flex items-center gap-2">
                       <MapPin className="h-5 w-5" /> Cities Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {pkg.destination.split(',').map((city, i) => (
                          <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                             {city.trim()} ({i % 2 === 0 ? "3N" : "2N"})
                          </span>
                       ))}
                    </div>
                 </div>

                {/* Highlights / Inclusions Icons */}
                <Card className="border-none shadow-sm overflow-hidden">
                   <CardContent className="p-0">
                      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 border rounded-xl bg-white">
                         {[
                            { label: "Hotel Included", icon: Hotel },
                            { label: "Sightseeing", icon: Binoculars },
                            { label: "Meals", icon: Utensils },
                            { label: "Transfers", icon: Bus },
                            { label: "Guide", icon: UserCheck }
                         ].map((item, idx) => (
                            <div key={idx} className="p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-gray-50 transition-colors">
                               <item.icon className="h-8 w-8 text-[#0a3d62]" />
                               <span className="text-xs font-bold text-gray-600">{item.label}</span>
                            </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>

                 {/* Package Description Paragraphs */}
                 <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xl font-bold text-[#0a3d62] font-serif">Package Highlights</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                       {pkg.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                       <div>
                          <h4 className="font-bold text-gray-900 mb-2">Accommodation</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 marker:text-[#ff6b35]">
                             <li>3 Night(s) in Bali Island at Luxury Resort / Pool Villa or similar</li>
                             <li>2 Night(s) in Ubud at Private Villa or similar</li>
                          </ul>
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 mb-2">Sightseeing</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 marker:text-[#ff6b35]">
                             <li>Full Day Kintamani Volcano Tour</li>
                             <li>Water Sports (Banana Boat, Jet Ski)</li>
                             <li>Tanah Lot Temple Sunset Tour</li>
                          </ul>
                       </div>
                    </div>
                 </div>
              </TabsContent>

              {/* Tab: Itinerary */}
              <TabsContent value="itinerary" className="mt-0">
                 <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-xl font-bold text-[#0a3d62] flex items-center gap-2">
                          <ListOrdered className="h-6 w-6" /> Day Wise Travel Itinerary
                       </h3>
                       <Button size="sm" variant="outline" className="text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">
                          Expand All
                       </Button>
                    </div>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                      {pkg.itinerary.map((day, index) => (
                        <div key={day.day} className="relative flex items-start group">
                           {/* Timeline Dot */}
                           <div className="absolute left-0 top-0 mt-1 ml-1.5 flex items-center justify-center h-8 w-8 rounded-full bg-white border-4 border-[#ff6b35] group-hover:scale-110 transition-transform shadow-md z-10">
                              <span className="text-[10px] font-bold text-[#0a3d62]">{day.day}</span>
                           </div>
                           
                           <div className="ml-12 w-full bg-white rounded-xl border group-hover:shadow-lg transition-shadow p-5 relative">
                              <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-600">
                                 Day {day.day}
                              </div>
                              <h4 className="text-lg font-bold text-[#0a3d62] mb-1 pr-16">{day.title}</h4>
                              <p className="text-sm text-gray-500 mb-4 italic">
                                 Arrive at {pkg.destination}. Overnight Stay.
                              </p>
                              
                              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                 {day.description}
                              </p>
                              
                              <div className="flex gap-2 mt-4 pt-4 border-t border-dashed">
                                 <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Included Meals:</span>
                                 <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">Breakfast</span>
                                 <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">Dinner</span>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                     <div className="mt-8 text-center">
                        <Button className="bg-[#ff6b35] hover:bg-[#e65100] text-white rounded-full px-8">
                           Expand Full Itinerary <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                     </div>
                 </div>
              </TabsContent>

               {/* Tab: Inclusions */}
              <TabsContent value="inclusions" className="mt-0">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                       <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" /> Included
                       </h3>
                       <ul className="space-y-3">
                          {pkg.inclusions.map((item, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                       <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                          <XCircle className="h-5 w-5" /> Excluded
                       </h3>
                       <ul className="space-y-3">
                          {pkg.exclusions.map((item, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </TabsContent>

            </Tabs>
          </div>

          {/* 4. Sidebar: Calculate Your Price (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
               <Card className="border shadow-lg rounded-xl overflow-hidden">
                  <div className="bg-gray-50 border-b p-4 text-center">
                     <h3 className="font-bold text-[#0a3d62] text-lg">Calculate Your Price</h3>
                  </div>
                  <CardContent className="p-5 space-y-5">
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-semibold text-gray-500">Departure City</label>
                           <select className="w-full text-sm border rounded-md h-9 px-2 bg-white">
                              <option>Land Package</option>
                              <option>Mumbai</option>
                              <option>Delhi</option>
                           </select>
                        </div>
                         <div className="space-y-1">
                           <label className="text-xs font-semibold text-gray-500">Travel Date</label>
                           <input type="date" className="w-full text-sm border rounded-md h-9 px-2 bg-white" />
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500">Travellers</label>
                        <select className="w-full text-sm border rounded-md h-9 px-2 bg-white">
                              <option>2 Adults</option>
                              <option>2 Adults, 1 Child</option>
                              <option>4 Adults</option>
                           </select>
                     </div>

                     <div className="space-y-2">
                         <label className="text-xs font-semibold text-gray-500 block">Hotel Preference</label>
                         <div className="flex gap-4">
                            {["Budget", "Standard", "Deluxe"].map((type, i) => (
                               <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
                                  <input type="radio" name="hotel" className="accent-[#ff6b35]" defaultChecked={i === 1} />
                                  {type}
                               </label>
                            ))}
                         </div>
                     </div>

                     <div className="pt-4 border-t border-dashed flex items-end justify-between">
                        <div>
                           <p className="text-xs text-gray-500">Total Price Per Person</p>
                           <p className="text-xs text-green-600 font-medium">EMI starts from ₹ 1,579/mo</p>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-bold text-[#0a3d62]">₹ {pkg.price.toLocaleString("en-IN")}</p>
                           <p className="text-[10px] text-gray-400">+ GST & TCS Extra</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-11 text-sm rounded-lg">
                           <Download className="h-4 w-4 mr-2" /> Itinerary
                        </Button>
                        <Button onClick={() => setShowInquiryForm(true)} className="w-full bg-[#ff6b35] hover:bg-[#e65100] text-white font-bold h-11 text-sm rounded-lg">
                           <Send className="h-4 w-4 mr-2" /> Inquiry
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* Need Help Card */}
               <div className="bg-[#0a3d62] rounded-xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
                     <p className="text-sm text-gray-300 mb-4">Our travel experts are here to help you plan your perfect trip.</p>
                     <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-[#0a3d62] font-semibold">
                        <Phone className="h-4 w-4 mr-2" /> Request Callback
                     </Button>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
               </div>

            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
