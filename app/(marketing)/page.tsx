"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Heading } from "@/components/ui/heading"
import { siteConfig } from "@/config/site"
import Spline from "@splinetool/react-spline"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"
import { Balancer } from "react-wrap-balancer"

// export const metadata: Metadata = {
//   title: "Home",
//   description: siteConfig.description,
// }

export default function Page() {
  return (
    <div className="mt-12 container relative">
      <div className="space-y-2 md:space-y-4 md:ml-12">
        <div className="font-black font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight">
          Goodbye <br className="block [@media(min-width:495px)]:hidden" />
          <span className="bg-clip-text bg-gradient-to-br from-primary to-muted dark:to-accent text-transparent">
            spreadsheets,
          </span>
          <br /> Welcome{" "}
          <br className="block [@media(min-width:495px)]:hidden" />
          <span className="bg-clip-text bg-gradient-to-br from-primary to-muted dark:to-accent text-transparent">
            {siteConfig.name}.
          </span>
        </div>
        <Balancer className="text-lg md:text-xl lg:text-2xl font-heading text-muted-foreground tracking-tighter">
          Say goodbye to boring budgets and hello to{" "}
          <mark className="dark:text-muted-foreground bg-transparent shadow-[inset_0_-0.5em_0_0_rgb(150,191,252)] dark:shadow-[inset_0_-0.6em_0_0_rgb(70,71,182)]">
            delightful
          </mark>{" "}
          savings 🎉
        </Balancer>
      </div>
      <div className="mt-8 sm:p-6 md:p-12">
        <div className="mx-auto hidden md:block dark:hidden">
          <AspectRatio
            ratio={16 / 10}
            className="shadow-[0_0px_50px_rgba(8,_112,_184,_0.7)] rounded-xl"
          >
            <Image
              src={"/images/app-dashboard-light-up.png"}
              alt="greatbudget app screen"
              className="rounded-md"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </AspectRatio>
        </div>
        <div className="mx-auto hidden md:dark:block">
          <AspectRatio
            ratio={16 / 10}
            className="shadow-[0_0px_50px_rgba(8,_112,_184,_0.7)] rounded-xl"
          >
            <Image
              src={"/images/app-dashboard-dark-up.png"}
              alt="greatbudget app screen"
              className="rounded-md"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}
