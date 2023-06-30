import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Balancer } from "react-wrap-balancer"

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
}

export default function Page() {
  return (
    <div className="mt-4 container">
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl h-[70vh] sm:h-[500px] md:h-[700px] bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300 via-fuchsia-600 to-teal-200">
        <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-25 brightness-100 contrast-150"></div>
        <div className="z-40 p-8">
          <div className="font-black text-white font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Goodbye <br className="block [@media(min-width:556px)]:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-blue-400 to-accent-foreground dark:to-accent text-transparent">
              spreadsheets,
            </span>
            <br /> Welcome{" "}
            <br className="block [@media(min-width:556px)]:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-blue-400 to-accent-foreground dark:to-accent text-transparent">
              {siteConfig.name}.
            </span>
          </div>
          <Balancer className="text-lg md:text-xl lg:text-2xl font-heading text-white tracking-tighter mt-2">
            Say goodbye to boring budgets and hello to delightful savings 🎉
          </Balancer>
          <div className="mobile:flex items-start mobile:space-x-4 space-y-4 mobile:space-y-0 mt-4 mobile:mt-8">
            <div className="relative">
              <Link
                className={cn(buttonVariants(), "mobile:w-fit w-full")}
                href="/register"
              >
                Get started
                <span className="italic">&nbsp;— it&apos;s free</span>
              </Link>
              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive dark:bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive dark:bg-red-600"></span>
                </span>
              </div>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mobile:w-fit w-full"
              )}
              href="/#features"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="relative w-full h-[700px] rounded-2xl bg-gradient-to-br from-muted to-accent flex items-center justify-center">
        <div className="flex flex-col items-center md:space-y-4 text-center">
          <div className="font-black font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Goodbye <br className="block mobile:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-primary to-muted dark:to-accent text-transparent">
              spreadsheets,
            </span>
            <br /> Welcome <br className="block mobile:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-primary to-muted dark:to-accent text-transparent">
              {siteConfig.name}.
            </span>
          </div>
          <Balancer className="text-lg md:text-xl lg:text-2xl font-heading text-muted-foreground tracking-tighter mt-2">
            Say goodbye to boring budgets and hello to{" "}
            <mark className="text-muted-foreground bg-transparent shadow-[inset_0_-0.5em_0_0_rgb(150,191,252)] dark:shadow-[inset_0_-0.6em_0_0_rgb(70,71,182)]">
              delightful
            </mark>{" "}
            savings 🎉
          </Balancer>
          <div className="mobile:flex items-start mobile:space-x-4 space-y-2 mobile:space-y-0 mt-5 mobile:mt-2">
            <div className="relative">
              <Link
                className={cn(buttonVariants(), "mobile:w-fit w-full")}
                href="/register"
              >
                Get started
                <span className="italic">&nbsp;— it&apos;s free</span>
              </Link>
              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(150,191,252)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[rgb(150,191,252)]"></span>
                </span>
              </div>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mobile:w-fit w-full"
              )}
              href="/#features"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  )
}
