"use client"

import { footerConfig } from "@/config/footer"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { LanguageSwitcher } from "./languague-switcher"
import Logo from "./logo"
import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname()

  const renderLinks = () =>
    footerConfig.mainNav.map((link, index) => (
      <React.Fragment key={link.href}>
        <Link
          href={link.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            path.startsWith(link.href)
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {link.title}
        </Link>
        {index < footerConfig.mainNav.length - 1 && (
          <Separator className="w-px h-4 mx-2" orientation="vertical" />
        )}
      </React.Fragment>
    ))

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col py-10 my-4 gap-4 md:py-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
          <div className="flex flex-row justify-start items-center">
            <Link href="/">
              <Logo height={32} width={32} />
              <span className="sr-only">greatbudget</span>
            </Link>
          </div>
          <div className="hidden sm:flex flex-row text-sm items-center justify-center">
            {renderLinks()}
          </div>
          <div className="flex flex-row justify-end items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <div className="text-sm sm:text-center">
          <div className="flex sm:hidden flex-row items-center mb-2">
            {renderLinks()}
          </div>
          Dev with ❤️ by{" "}
          <a href="https://www.greatgaetan.com" className="font-semibold">
            @greatgaetan
          </a>
        </div>
      </div>
    </footer>
  )
}
