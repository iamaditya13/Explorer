import type { Metadata } from "next"
import PackagesPage from "./client"

export const metadata: Metadata = {
  title: "Holiday Packages - Headway Travels",
  description: "Discover amazing holiday packages worldwide. Best deals on family tours, honeymoon packages, and more.",
}

export default function Page() {
  return <PackagesPage />
}
