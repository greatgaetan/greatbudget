"use client"
import { Heading, headingVariants } from "@/components/ui/heading"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"
import { Balancer } from "react-wrap-balancer"

const Features = () => {
  const t = useTranslations("home")
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  }

  return (
    <>
      <div
        id="features"
        className="mt-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading"
      >
        {t("features-title")}
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-6 xl:grid-cols-3 xl:grid-rows-4 gap-8 mt-4 mb-32">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-2 row-span-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row h-full items-center justify-around gap-4">
            <div className="sm:w-4/6 space-y-6">
              <Heading variant={"h3"}>{t("features-stats-title")}</Heading>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-stats-description-1")}
              </Balancer>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-stats-description-2")}
              </Balancer>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-stats-description-3")}
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
        </motion.div>
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:row-start-3 xl:row-start-auto xl:col-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">
              {t("features-search-1") + " "}
              <kbd className="text-muted-foreground mt-1 h-5 inline-flex items-center w-fit rounded border bg-muted px-1.5 font-mono text-sm font-medium opacity-100 gap-1">
                <span className="text-lg pt-0.5">⌘</span>
                <span className="text-xs">/</span>
                <span className="text-xs">Ctrl</span>
                <span className="text-xs">+</span>
                <span className="text-xs">K</span>
              </kbd>
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
        </motion.div>
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:row-start-3 xl:col-start-3 xl:row-start-2 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">{t("features-feedback")}</Balancer>
            <div className="relative w-24 h-24">
              <Image
                src={"/images/heart-front-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="heart icon"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-2 row-span-2 xl:col-start-2 lg:row-start-4 xl:row-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row h-full items-center justify-around gap-4">
            <div className="sm:w-4/6 space-y-6">
              <Balancer className={headingVariants({ variant: "h3" })}>
                {t("features-goals-title")}
              </Balancer>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-goals-description-1")}
              </Balancer>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-goals-description-2")}
              </Balancer>
              <Balancer className="lg:w-5/6 xl:w-auto">
                {t("features-goals-description-3")}
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
        </motion.div>
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:row-start-6 xl:col-start-1 xl:row-start-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">{t("features-multilanguage")}</Balancer>
            <div className="relative w-24 h-24">
              <Image
                src={"/images/notebook-iso-color.png"}
                fill
                style={{ objectFit: "contain" }}
                alt="heart icon"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:row-start-6 xl:row-start-4 bg-slate-100 dark:bg-slate-900 rounded-lg p-8"
        >
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <Balancer className="w-4/6">{t("features-themes")}</Balancer>
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
        </motion.div>
      </div>
    </>
  )
}

export default Features
