import type { Metadata } from "next"
import LoginPage from "./client"

export const metadata: Metadata = {
  title: "Login - Headway Travels",
  description: "Login to your Headway Travels account to manage bookings and view favorites.",
}

export default function Page() {
  return <LoginPage />
}
