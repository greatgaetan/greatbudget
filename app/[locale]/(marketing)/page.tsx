import React from "react"
import Hero from "./hero"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Features from "./features"

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
}

export default function Page() {
  return (
    <>
      <div className="mt-4 container">
        <Hero />
        <Features />
      </div>
    </>
  )
}
