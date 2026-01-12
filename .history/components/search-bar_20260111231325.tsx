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

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm md:bg-white rounded-[2rem] md:rounded-full shadow-2xl p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 md:gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-white/20">
      <div className="flex-1 w-full md:w-auto relative group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b35] transition-colors h-5 w-5" />
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl md:rounded-full bg-gray-50 md:bg-transparent border border-transparent focus:bg-white md:focus:bg-transparent focus:border-gray-200 md:focus:border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 outline-none transition-all"
        />
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
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
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
