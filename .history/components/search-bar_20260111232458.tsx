"use client"

import { useState } from "react"
import { Search, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const [date, setDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<{ title: string; type: 'package' | 'destination'; slug: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // In a real app, this would be a more sophisticated search
    // For now, we'll import read dynamically or just assume data availability
    // Since this is a client component, we should fetch data. 
    // Ideally we'd use a hook, but for this component let's just use the storage read if available or mock it
    // NOTE: Direct import of 'read' might cause hydration issues if not careful, but let's try to keep it simple.
    
    // We will do a dynamic import or simple local filtering if we had the data passed as props.
    // However, to make it self-contained, let's fetch from our local storage helper.
    import("@/lib/storage").then(({ read }) => {
       const data = read()
       if (!data) return

       const lowerTerm = term.toLowerCase()
       const destMatches = data.siteContent.destinations
         .filter(d => d.name.toLowerCase().includes(lowerTerm))
         .map(d => ({ title: d.name, type: 'destination' as const, slug: d.slug }))
       
       const pkgMatches = data.siteContent.packages
         .filter(p => p.title.toLowerCase().includes(lowerTerm))
         .map(p => ({ title: p.title, type: 'package' as const, slug: p.slug }))

       setSuggestions([...destMatches, ...pkgMatches].slice(0, 5))
       setShowSuggestions(true)
    })
  }

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm md:bg-white rounded-[2rem] md:rounded-full shadow-2xl p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 md:gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-white/20 relative z-50">
      <div className="flex-1 w-full md:w-auto relative group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b35] transition-colors h-5 w-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
          /* onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} */ // Delayed hide to allow clicking
          placeholder="Where do you want to go?"
          className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl md:rounded-full bg-gray-50 md:bg-transparent border border-transparent focus:bg-white md:focus:bg-transparent focus:border-gray-200 md:focus:border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 outline-none transition-all"
        />
        
        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
            {suggestions.map((item, index) => (
              <a 
                key={index} 
                href={item.type === 'destination' ? `/destinations/${item.slug}` : `/packages/${item.slug}`}
                className="block px-4 py-3 hover:bg-gray-50 bg-white transition-colors border-b last:border-b-0 text-left"
              >
                <div className="flex items-center gap-3">
                   {item.type === 'destination' ? <MapPin className="h-4 w-4 text-[#ff6b35]" /> : <Search className="h-4 w-4 text-blue-500" />}
                   <div>
                      <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                   </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      
      <div className="hidden md:block w-px h-8 bg-gray-200" />
      <div className="md:hidden w-full h-px bg-gray-100" />

      <div className="flex-1 w-full md:w-auto relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal h-12 md:h-14 rounded-xl md:rounded-full px-4 bg-gray-50 md:bg-transparent hover:bg-gray-100 md:hover:bg-gray-50 border border-transparent focus:border-gray-200 md:focus:border-none",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-5 w-5 text-gray-400" />
              {date ? format(date, "PPP") : <span>Select Dates</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-xl rounded-xl border-gray-200" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-white rounded-xl"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button size="lg" className="w-full md:w-auto rounded-xl md:rounded-full bg-[#ff6b35] hover:bg-[#0a3d62] text-white px-8 h-12 md:h-14 shadow-lg hover:shadow-xl transition-all font-bold text-lg">
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </div>
  )
}
