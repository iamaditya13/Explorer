"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useAuth } from "@/lib/auth"
import { User, LogOut } from "lucide-react"

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
              <span className="text-[#0a3d62] group-hover:text-[#ff6b35] transition-colors">EXPLORERS</span>
              <div className="text-[10px] text-gray-500 font-sans tracking-widest uppercase mt-1">Transworld Pvt. Ltd.</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavItem href="/packages" label="Holiday Packages" hasDropdown />
            <NavItem href="/themes" label="Theme Tours" hasDropdown />
            <NavItem href="/flights" label="Flights" />
            <NavItem href="/visas" label="Visas" />
            <NavItem href="/blogs" label="Blogs" />
            <NavItem href="/travel-guide" label="Travel Guide" hasDropdown />
            <NavItem href="/my-booking" label="My Booking" />
            
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
        <div className="lg:hidden border-t bg-white absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <MobileNavItem href="/packages" label="Holiday Packages" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/themes" label="Theme Tours" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/flights" label="Flights" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/visas" label="Visas" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/blogs" label="Blogs" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/travel-guide" label="Travel Guide" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/my-booking" label="My Booking" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/about" label="About" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavItem href="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
            
            <div className="border-t border-gray-200 pt-4 mt-2">
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
      className="flex items-center gap-1 text-gray-700 hover:text-[#ff6b35] transition-colors font-medium"
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
      className="text-gray-700 hover:text-[#ff6b35] py-2 transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}
