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
    <div className="bg-[#f5f7fa] min-h-screen font-sans text-gray-900">
      {/* 1. Header Section (Title, Code, Share) */}
      <div className="bg-white border-b sticky top-0 md:relative z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
             <Link href="/packages" className="text-sm font-medium text-gray-500 hover:text-[#ff6b35] flex items-center gap-1 transition-colors">
                <ChevronDown className="h-4 w-4 rotate-90" /> Back to Packages
             </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-2xl md:text-3xl font-bold text-[#0a3d62] font-serif">{pkg.title}</h1>
                 {pkg.tourType && (
                    <span className="bg-[#0a3d62] text-white text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider">
                       {pkg.tourType} Tour
                    </span>
                 )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 items-center">
                <span className="font-semibold flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ff6b35]" /> {pkg.duration}</span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#ff6b35]" /> {pkg.destination}</span>
                 {pkg.tourCode && (
                   <>
                     <span className="text-gray-300">|</span>
                     <span className="text-gray-500 font-medium">Code: {pkg.tourCode}</span>
                   </>
                 )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 text-[#0a3d62] border-[#0a3d62] hover:bg-[#0a3d62] hover:text-white transition-colors">
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
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
               <button className="bg-white/20 backdrop-blur-md hover:bg-[#ff6b35] text-white rounded-full p-6 transition-all hover:scale-110 shadow-2xl border border-white/30">
                  <PlayCircle className="h-16 w-16" />
               </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Navigation Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <div className="sticky top-[70px] z-30 bg-[#f5f7fa] pt-2 pb-2 overflow-x-auto">
                 <TabsList className="w-full justify-start h-auto p-1 bg-white border shadow-sm rounded-xl gap-2 flex-wrap md:flex-nowrap overflow-x-auto min-w-max md:min-w-0">
                    {[
                      { id: "overview", label: "Overview", icon: Info },
                      { id: "itinerary", label: "Itinerary", icon: Map },
                      { id: "sightseeing", label: "Sightseeing", icon: Binoculars },
                      { id: "hotels", label: "Hotels", icon: Hotel },
                      { id: "info", label: "Tour Info", icon: HelpCircle },
                    ].map(tab => (
                       <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="data-[state=active]:bg-[#0a3d62] data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg gap-2 text-gray-600 font-bold text-sm transition-all border border-transparent data-[state=active]:border-[#0a3d62]"
                       >
                         <tab.icon className="h-4 w-4" /> {tab.label}
                       </TabsTrigger>
                    ))}
                 </TabsList>
              </div>

              {/* Tab: Overview */}
              <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 mt-4">
                 <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-4 font-serif">Trip Overview</h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                       {pkg.description}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                       <span className="text-sm font-bold text-gray-900 mr-2">Experience:</span>
                       {pkg.theme && (
                          <span className="bg-[#fff4f0] text-[#ff6b35] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#ff6b35]/20">
                             {pkg.theme.replace("-", " ")}
                          </span>
                       )}
                    </div>
                 </div>

                 {/* Highlights Grid */}
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="flex items-center gap-2 font-bold text-lg text-[#0a3d62] mb-4">
                           <Hotel className="h-5 w-5 text-[#ff6b35]" /> Accommodation
                        </h4>
                        <ul className="space-y-3">
                           {pkg.hotels?.map((hotel, idx) => (
                              <li key={idx} className="flex flex-col text-sm text-gray-700">
                                 <span className="font-semibold text-gray-900">{hotel.name}</span>
                                 <span className="text-gray-500 text-xs">{hotel.city} • {hotel.starRating} Star</span>
                              </li>
                           ))}
                        </ul>
                    </div>
                    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="flex items-center gap-2 font-bold text-lg text-[#0a3d62] mb-4">
                           <Utensils className="h-5 w-5 text-[#ff6b35]" /> Meals
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium border border-green-100">Daily Breakfast</span>
                           {pkg.inclusions.includes("Dinner") && (
                              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium border border-green-100">Dinners</span>
                           )}
                           <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-sm font-medium border border-gray-100">Local Cuisine</span>
                        </div>
                    </div>
                 </div>
              </TabsContent>

              {/* Tab: Itinerary */}
              <TabsContent value="itinerary" className="mt-4">
                 <div className="bg-white border rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-2xl font-bold text-[#0a3d62] font-serif">Day Wise Itinerary</h3>
                       <Button size="sm" variant="outline" className="text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">
                          Expand All
                       </Button>
                    </div>

                    <div className="space-y-0">
                      {pkg.itinerary.map((day) => (
                        <div key={day.day} className="group border-l-2 border-dashed border-[#ff6b35]/30 pb-10 last:pb-0 pl-8 relative">
                           {/* Timeline Dot */}
                           <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-[#ff6b35] border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />
                           
                           <div className="flex flex-col gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">Day {day.day}</span>
                              <h4 className="text-lg font-bold text-[#0a3d62]">{day.title}</h4>
                           </div>
                           
                           <div className="mt-4 bg-gray-50/50 rounded-xl p-5 border border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
                              {day.description}
                           </div>

                           <div className="flex flex-wrap gap-3 mt-4">
                              {day.meals?.map((meal, mIdx) => (
                                 <span key={mIdx} className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-100">
                                    <Utensils className="h-3 w-3" /> {meal}
                                 </span>
                              ))}
                              {day.overnightCity && (
                                 <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100">
                                    <Hotel className="h-3 w-3" /> Overnight in {day.overnightCity}
                                 </span>
                              )}
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </TabsContent>

              {/* Tab: Sightseeing */}
              <TabsContent value="sightseeing" className="mt-4">
                 <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-6 font-serif">Sightseeing & Attractions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                       {pkg.sightseeing?.map((spot, idx) => (
                          <div key={idx} className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow bg-gray-50/50">
                             <div className="h-20 w-20 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                                <Image src={spot.image || "/placeholder.svg"} alt={spot.title} fill className="object-cover" />
                             </div>
                             <div>
                                <h4 className="font-bold text-[#0a3d62]">{spot.title}</h4>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">{spot.city}</span>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{spot.description}</p>
                                {spot.type === "required" && (
                                   <span className="inline-block mt-2 text-[10px] bg-[#0a3d62] text-white px-2 py-0.5 rounded">Included</span>
                                )}
                             </div>
                          </div>
                       ))}
                       {!pkg.sightseeing && <p className="text-gray-500 italic">No sightseeing details available.</p>}
                    </div>
                 </div>
              </TabsContent>

              {/* Tab: Hotels */}
              <TabsContent value="hotels" className="mt-4">
                 <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-6 font-serif">Accommodations</h3>
                    <div className="space-y-6">
                       {pkg.hotels?.map((hotel, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row gap-6 border-b last:border-0 pb-6 last:pb-0">
                             <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl relative overflow-hidden flex-shrink-0">
                                <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                             </div>
                             <div className="flex-1">
                                <h4 className="text-lg font-bold text-[#0a3d62]">{hotel.name}</h4>
                                <div className="flex items-center gap-1 text-[#ff6b35] my-1">
                                   {Array.from({ length: hotel.starRating }).map((_, i) => (
                                      <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                   ))}
                                   <span className="text-xs text-gray-500 ml-1">({hotel.starRating} Star)</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3"><MapPin className="inline h-3 w-3 mr-1" /> {hotel.city}</p>
                                {hotel.isIncluded && (
                                   <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Included in Package</span>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </TabsContent>

              {/* Tab: Tour Info (Policies) */}
              <TabsContent value="info" className="mt-4 space-y-6">
                 {/* Inclusions / Exclusions */}
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                       <h3 className="text-lg font-bold text-[#0a3d62] mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" /> Inclusions
                       </h3>
                       <ul className="space-y-2">
                          {pkg.inclusions.map((item, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                       <h3 className="text-lg font-bold text-[#0a3d62] mb-4 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-red-500" /> Exclusions
                       </h3>
                       <ul className="space-y-2">
                          {pkg.exclusions.map((item, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>

                 {/* Payment & Cancellation Policies */}
                 {pkg.policies && (
                    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-[#0a3d62] font-serif border-b pb-2">Tour Policies</h3>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                           <div>
                              <h4 className="font-bold text-gray-900 mb-3">Payment Policy</h4>
                              <ul className="space-y-2 list-disc pl-4 text-sm text-gray-700 marker:text-[#ff6b35]">
                                 {pkg.policies.payment.map((rule, i) => <li key={i}>{rule}</li>)}
                              </ul>
                           </div>
                           <div>
                              <h4 className="font-bold text-gray-900 mb-3">Cancellation Policy</h4>
                              <ul className="space-y-2 list-disc pl-4 text-sm text-gray-700 marker:text-red-500">
                                 {pkg.policies.cancellation.map((rule, i) => <li key={i}>{rule}</li>)}
                              </ul>
                           </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                           <h4 className="font-bold text-blue-900 mb-2 text-sm">TCS (Tax Collected at Source) Information</h4>
                           <ul className="space-y-1 list-disc pl-4 text-xs text-blue-800">
                              {pkg.policies.tcs.map((rule, i) => <li key={i}>{rule}</li>)}
                           </ul>
                        </div>
                    </div>
                 )}
              </TabsContent>

            </Tabs>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6 z-20">
               <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-200">
                  <div className="bg-[#0a3d62] p-5 text-center text-white relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Starting From</p>
                        <h3 className="font-bold text-3xl font-serif">₹ {pkg.price.toLocaleString("en-IN")}</h3>
                        <p className="text-[10px] opacity-70 mt-1">Per Person • Double Sharing</p>
                     </div>
                     <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                  </div>
                  <CardContent className="p-6 space-y-5 bg-white">
                     
                     <div className="space-y-3">
                        <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Departure City</label>
                           <select className="w-full mt-1.5 text-sm border-gray-200 rounded-lg h-10 px-3 bg-gray-50 focus:ring-2 focus:ring-[#ff6b35] outline-none border transition-all">
                              <option>Land Package Only</option>
                              <option>Mumbai (BOM)</option>
                              <option>Delhi (DEL)</option>
                              <option>Bangalore (BLR)</option>
                           </select>
                        </div>
                         <div>
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Travel Date</label>
                           <input type="date" className="w-full mt-1.5 text-sm border-gray-200 rounded-lg h-10 px-3 bg-gray-50 focus:ring-2 focus:ring-[#ff6b35] outline-none border transition-all" />
                        </div>
                     </div>

                     <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex items-center gap-3">
                        <div className="bg-[#ff6b35] text-white p-1.5 rounded-full">
                           <Clock className="h-4 w-4" />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-gray-900">EMI Available</p>
                           <p className="text-[10px] text-gray-600">Credit Card EMI starts ₹1,599/mo</p>
                        </div>
                     </div>

                     {pkg.taxes && (
                        <div className="flex justify-between text-xs text-gray-500 border-t pt-3 border-dashed">
                           <span>Plus Taxes (GST {pkg.taxes.gst}% + TCS {pkg.taxes.tcs}%)</span>
                           <span className="font-medium text-gray-900">Extra</span>
                        </div>
                     )}

                     <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button className="w-full bg-white border-2 border-[#0a3d62] text-[#0a3d62] hover:bg-[#0a3d62] hover:text-white font-bold h-12 text-sm rounded-xl transition-all">
                           <Download className="h-4 w-4 mr-2" /> PDF
                        </Button>
                        <Button onClick={() => setShowInquiryForm(true)} className="w-full bg-[#ff6b35] hover:bg-[#e65100] text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-orange-500/20">
                           <Send className="h-4 w-4 mr-2" /> Inquiry
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               <div className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4">
                  <div className="h-10 w-10 text-[#0a3d62] bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                     <Phone className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-500 uppercase">Talk to an expert</p>
                     <p className="text-lg font-bold text-[#0a3d62]">1800 123 4567</p>
                  </div>
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between gap-3">
         <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-[#0a3d62]">₹ {pkg.price.toLocaleString("en-IN")}</p>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#fff4f0] text-sm h-10 px-4">
               PDF
            </Button>
            <Button onClick={() => setShowInquiryForm(true)} className="bg-[#ff6b35] hover:bg-[#e65100] text-white text-sm h-10 px-6">
               Send Inquiry
            </Button>
         </div>
      </div>
    </div>
  )
}
