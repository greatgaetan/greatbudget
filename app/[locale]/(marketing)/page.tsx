import { buttonVariants } from "@/components/ui/button"
import { Heading, headingVariants } from "@/components/ui/heading"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Balancer } from "react-wrap-balancer"

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
}

export default function Page() {
  const t = useTranslations("Index")

  return (
    <div className="mt-4 container">
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl h-[70vh] sm:h-[500px] md:h-[700px] bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300 via-fuchsia-600 to-teal-200">
        <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-25 brightness-100 contrast-150"></div>
        <div className="z-40 p-8">
          <p>{t("title")}</p>
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
      <div
        id="features"
        className="mt-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading"
      >
        Essential features included
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-6 xl:grid-cols-3 xl:grid-rows-4 gap-8 mt-4 mb-32">
        <div className="col-span-2 row-span-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row h-full items-center justify-around gap-4">
            <div className="sm:w-4/6 space-y-6">
              <Heading variant={"h3"}>
                Complete statistics on your spending
              </Heading>
              <Balancer>
                You can set up the goals you want to achieve for a specific
                category and we will help you to achieve them.
              </Balancer>
              <Balancer>
                Based on your goals, we will warn you if you are spending too
                much in a category to help you to achieve your goals.
              </Balancer>
              <Balancer>
                This system is completely customizable and you can set up as
                many goals as you want. With the gratification system, you will
                be able to achieve your goals in no time!
              </Balancer>
            </div>
            <div className="hidden sm:block relative w-44 h-44">
              <Image
                src={"/images/chart-iso-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="statistics icon"
              />
            </div>
          </div>
          <div className="block sm:hidden relative mx-auto w-44 h-44 mt-8">
            <Image
              src={"/images/chart-iso-color.png"}
              fill
              style={{ objectFit: "contain" }}
              alt="statistics icon"
            />
          </div>
        </div>
        <div className="lg:row-start-3 xl:row-start-auto xl:col-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">
              Built-in search tool to find anything you need in the app. Starts
              with{" "}
              <kbd className="text-muted-foreground h-5 inline-flex items-center w-fit rounded border bg-muted px-1.5 font-mono text-sm font-medium opacity-100 gap-1">
                <span className="text-lg pt-0.5">⌘</span>K
              </kbd>{" "}
              to open it.
            </Balancer>
            <div className="relative w-24 h-24">
              <Image
                src={"/images/zoom-dynamic-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="search icon"
              />
            </div>
          </div>
        </div>
        <div className="lg:row-start-3 xl:col-start-3 xl:row-start-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">
              Lot of love to make your experience delightful. We are always open
              to your feedback!
            </Balancer>
            <div className="relative w-24 h-24">
              <Image
                src={"/images/heart-front-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="heart icon"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-2 xl:col-start-2 lg:row-start-4 xl:row-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row h-full items-center justify-around gap-4">
            <div className="sm:w-4/6 space-y-6">
              <Balancer className={headingVariants({ variant: "h3" })}>
                Set up your goals to achieve your savings target
              </Balancer>
              <Balancer>
                You can set up the goals you want to achieve for a specific
                category and we will help you to achieve them.
              </Balancer>
              <Balancer>
                Based on your goals, we will warn you if you are spending too
                much in a category to help you to achieve your goals.
              </Balancer>
              <Balancer>
                This system is completely customizable and you can set up as
                many goals as you want. With the gratification system, you will
                be able to achieve your goals in no time!
              </Balancer>
            </div>
            <div className="hidden sm:block relative w-48 h-48">
              <Image
                src={"/images/trophy-dynamic-premium.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="badge icon"
              />
            </div>
          </div>
          <div className="block sm:hidden relative mx-auto w-44 h-44 mt-8">
            <Image
              src={"/images/trophy-dynamic-premium.png"}
              fill
              style={{ objectFit: "contain" }}
              alt="badge icon"
            />
          </div>
        </div>
        <div className="lg:row-start-6 xl:col-start-1 xl:row-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">
              Multiple languages supported. Currently English and French. Aiming
              to support a lot more in the future!
            </Balancer>
            <div className="relative w-24 h-24">
              <Image
                src={"/images/notebook-iso-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="heart icon"
              />
            </div>
          </div>
        </div>
        <div className="lg:row-start-6 xl:row-start-4 bg-slate-100 dark:bg-slate-900 rounded-lg p-8">
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">
              Choose between our Light and Dark modes to satisfy your
              requirements.
            </Balancer>
            <div className="relative dark:absolute w-24 h-24 dark:w-0 dark:h-0">
              <Image
                src={"/images/sun-dynamic-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="moutain with sun icon"
              />
            </div>
            <div className="absolute dark:relative w-0 h-0 dark:w-24 dark:h-24">
              <Image
                src={"/images/moon-dynamic-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="moutain with sun icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
