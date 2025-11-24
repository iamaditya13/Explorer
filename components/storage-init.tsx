"use client"

import { useEffect } from "react"
import { init } from "@/lib/storage"

export function StorageInit() {
  useEffect(() => {
    init()
  }, [])

  return null
}
