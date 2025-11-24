"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => void
  logout: () => void
  favorites: string[]
  toggleFavorite: (packageId: string) => void
  isFavorite: (packageId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Client-side only
    const storedUser = localStorage.getItem("explorers_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user", e)
      }
    }

    const storedFavs = localStorage.getItem("explorers_favorites")
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs))
      } catch (e) {
        console.error("Failed to parse favorites", e)
      }
    }
  }, [])

  const login = (email: string) => {
    // Simple mock login - take name from email
    const name = email.split("@")[0]
    const newUser = { 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      email 
    }
    setUser(newUser)
    localStorage.setItem("explorers_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("explorers_user")
  }

  const toggleFavorite = (packageId: string) => {
    if (!user) return // Must be logged in
    
    let newFavs: string[]
    if (favorites.includes(packageId)) {
      newFavs = favorites.filter((id) => id !== packageId)
    } else {
      newFavs = [...favorites, packageId]
    }
    
    setFavorites(newFavs)
    localStorage.setItem("explorers_favorites", JSON.stringify(newFavs))
  }

  const isFavorite = (packageId: string) => favorites.includes(packageId)

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
