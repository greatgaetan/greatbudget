"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type NavigationProps = {
  links: {
    name: string
    href: string
  }[]
}

export default function BankAccountNavigationBar({ links }: NavigationProps) {
  const path = usePathname()

  return (
    <div className="relative border-b border-muted mb-4 pb-2 space-x-6 text-sm">
      {links.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={cn(
            "relative no-underline pb-2 transition-all duration-150 rounded-md ",
            path === href
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-foreground "
          )}
        >
          {name}
          {path === href && (
            <span className="absolute inset-x-0 -bottom-[3px] h-px bg-blue-500" />
          )}
        </Link>
      ))}
    </div>
  )
}
