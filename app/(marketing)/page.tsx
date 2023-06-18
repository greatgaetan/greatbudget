import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
}

export default function Page() {
  return <div className="container">Home page</div>
}
