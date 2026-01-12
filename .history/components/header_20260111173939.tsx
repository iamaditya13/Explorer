"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl font-bold font-serif tracking-tight">
              <span className="text-[#0a3d62] group-hover:text-[#ff6b35] transition-colors">HEADWAY</span>
              <span className="text-[#ff6b35] group-hover:text-[#0a3d62] transition-colors ml-1">TRAVELS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavItem href="/packages" label="Holiday Packages" />
            <NavItem href="/themes" label="Theme Tours" />
            <NavItem href="/flights" label="Flights" />
            <NavItem href="/visas" label="Visas" />
            <NavItem href="/blogs" label="Blogs" />
            <NavItem href="/travel-guide" label="Travel Guide" />
            <NavItem href="/my-booking" label="My Booking" />
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#ff6b35] transition-colors font-medium outline-none">
                More <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/about" className="w-full">About Headway</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact" className="w-full">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/testimonials" className="w-full">Testimonials</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/careers" className="w-full">Careers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/faq" className="w-full">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Login/User */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-[#0a3d62] font-medium flex items-center gap-1">
                  <User className="h-4 w-4" /> {user.name}
                </span>
                <Button 
                  onClick={logout}
                  size="sm" 
                  variant="ghost" 
                  className="text-[#0a3d62] hover:text-[#ff6b35] h-8 px-2 text-xs"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white h-8 px-4">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile: Menu Button Only */}
          <button className="lg:hidden p-2 text-gray-700 hover:text-[#ff6b35] transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <MobileNavItem href="/packages" label="Holiday Packages" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/themes" label="Theme Tours" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/flights" label="Flights" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/visas" label="Visas" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/blogs" label="Blogs" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/travel-guide" label="Travel Guide" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/my-booking" label="My Booking" onClick={() => setMobileMenuOpen(false)} />
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="text-sm font-semibold text-gray-500 mb-2">More</div>
              <MobileNavItem href="/about" label="About Headway" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem href="/contact" label="Contact Us" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem href="/testimonials" label="Testimonials" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem href="/careers" label="Careers" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem href="/faq" label="FAQ" onClick={() => setMobileMenuOpen(false)} />
            </div>

            <div className="border-t border-gray-200 pt-4 mt-2 mb-8">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#0a3d62] font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> {user.name}
                  </span>
                  <Button 
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    size="sm" 
                    variant="ghost" 
                    className="text-[#ff6b35] hover:text-[#0a3d62]"
                  >
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#ff6b35] hover:bg-[#0a3d62] text-white">
                    <User className="h-4 w-4 mr-2" /> Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavItem({ href, label, hasDropdown }: { href: string; label: string; hasDropdown?: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-gray-700 hover:text-[#ff6b35] transition-colors font-medium text-sm xl:text-base"
    >
      {label}
      {hasDropdown && <ChevronDown className="h-4 w-4" />}
    </Link>
  )
}

function MobileNavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-[#ff6b35] py-2 transition-colors block"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

