"use client"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import Balancer from "react-wrap-balancer"

const Hero = () => {
  const targetDivRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("home")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [targetDivProps, setTargetDivProps] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  const updateTargetDivProps = () => {
    if (targetDivRef.current) {
      const { width, height, top, left } =
        targetDivRef.current.getBoundingClientRect()

      setTargetDivProps({
        width,
        height,
        top,
        left,
      })
    }
  }

  useEffect(() => {
    updateTargetDivProps()
    window.addEventListener("resize", updateTargetDivProps)
    window.addEventListener("scroll", updateTargetDivProps)
    return () => {
      window.removeEventListener("resize", updateTargetDivProps)
      window.removeEventListener("scroll", updateTargetDivProps)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ""
    }, 2000)
  }, [])

  const Preloader = () => {
    const variants = {
      initial: {
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        opacity: 1,
      },
      exit: {
        width: targetDivProps.width,
        height: targetDivProps.height,
        top: targetDivProps.top,
        left: targetDivProps.left,
        borderRadius: "24px",
        opacity: 0,
        transition: {
          width: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }, // Duration for width scaling
          height: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }, // Duration for height scaling
          top: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }, // Duration for top scaling
          left: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }, // Duration for left scaling
          opacity: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.7 },
        },
      },
    }

    return (
      <motion.div
        initial="initial"
        exit="exit"
        variants={variants}
        className="fixed uppercase flex flex-col items-center justify-center z-50 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300 via-fuchsia-600 to-teal-200 text-[clamp(2rem,5vw,2.5rem)] 2xl:text-6xl font-black text-white space-x-1 -space-y-1"
      >
        <div className="flex flex-col">
          <div ref={ref} className="overflow-y-hidden inline-block">
            <motion.span
              initial={{ transform: "translateY(100%)" }}
              animate={{
                transform: isInView ? "translateY(0%)" : "translateY(100%)",
              }}
              transition={{
                transform: {
                  duration: 0.7,
                },
              }}
              className="inline-block relative"
            >
              {t("plan")}
            </motion.span>
          </div>
          <div ref={ref} className="overflow-y-hidden inline-block">
            <motion.span
              initial={{ transform: "translateY(100%)" }}
              animate={{
                transform: isInView ? "translateY(0%)" : "translateY(100%)",
              }}
              transition={{
                transform: {
                  duration: 0.7,
                  delay: 0.5,
                },
              }}
              className="inline-block relative"
            >
              {t("track")}
            </motion.span>
          </div>
          <div ref={ref} className="overflow-y-hidden inline-block">
            <motion.span
              initial={{ transform: "translateY(100%)" }}
              animate={{
                transform: isInView ? "translateY(0%)" : "translateY(100%)",
              }}
              transition={{
                transform: {
                  duration: 0.7,
                  delay: 1,
                },
              }}
              className="inline-block relative"
            >
              {t("goals")}
            </motion.span>
          </div>
        </div>
      </motion.div>
    )
  }
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div
        ref={targetDivRef}
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl h-[70vh] sm:h-[500px] md:h-[700px] bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300 via-fuchsia-600 to-teal-200"
      >
        <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-25 brightness-100 contrast-150"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 3.2,
          }}
          className="z-40 p-8"
        >
          <div className="font-black text-white font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {t("goodbye") + " "}
            <br className="block [@media(min-width:556px)]:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-blue-400 to-accent-foreground dark:to-accent text-transparent">
              {t("spreadsheets")},
            </span>
            <br /> {t("welcome") + " "}
            <br className="block [@media(min-width:556px)]:hidden" />
            <span className="bg-clip-text bg-gradient-to-br from-blue-400 to-accent-foreground dark:to-accent text-transparent">
              {siteConfig.name}.
            </span>
          </div>
          <Balancer className="text-lg md:text-xl lg:text-2xl font-heading text-white tracking-tighter mt-2">
            {t("hero-paragraph")}
          </Balancer>
          <div className="mobile:flex items-start mobile:space-x-4 space-y-4 mobile:space-y-0 mt-4 mobile:mt-8">
            <div className="relative">
              <Link
                className={cn(buttonVariants(), "mobile:w-fit w-full")}
                href="/register"
              >
                {t("hero-cta")}
                <span className="italic">&nbsp;{t("hero-cta-2")}</span>
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
        </motion.div>
      </div>
    </>
  )
}

export default Hero
