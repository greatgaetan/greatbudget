"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { MainNavItem } from "@/types"
import { useTranslations } from "next-intl"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  configKey: string
}

export function MainNav({ items, children, configKey }: MainNavProps) {
  const path = usePathname()
  const t = useTranslations(configKey)

  return (
    <div className="hidden md:flex gap-6 md:gap-10">
      <Link href="/" className="items-center space-x-2 flex">
        <span className="font-heading font-extrabold text-2xl tracking-tighter">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="gap-6 flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                path.startsWith(item.href)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
