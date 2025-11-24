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
    <div className="w-full max-w-4xl bg-white rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex-1 w-full md:w-auto relative group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b35] transition-colors h-5 w-5" />
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="w-full h-12 pl-12 pr-4 rounded-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 outline-none"
        />
      </div>
      
      <div className="hidden md:block w-px h-8 bg-gray-200" />

      <div className="flex-1 w-full md:w-auto relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal h-12 rounded-full px-4 hover:bg-gray-50",
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

      <Button size="lg" className="w-full md:w-auto rounded-full bg-[#ff6b35] hover:bg-[#0a3d62] text-white px-8 h-12 shadow-lg hover:shadow-xl transition-all">
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </div>
  )
}
