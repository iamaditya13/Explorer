import type { Metadata } from "next"
import MyBookingPage from "./client"

export const metadata: Metadata = {
  title: "My Bookings - Headway Travels",
  description: "View and manage your travel bookings with Headway Travels.",
}

export default function Page() {
  return <MyBookingPage />
}
