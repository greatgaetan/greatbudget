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
    <div className="mt-12 container relative">
      <div className="flex flex-col md:space-y-4">
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
