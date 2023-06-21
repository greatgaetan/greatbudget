import * as React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Logo from "./logo"
import { ThemeToggle } from "./theme-toggle"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col py-10 my-4 gap-4 md:py-0">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <Logo height={32} width={32} />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-col">
          <Link href="/about/project">The project</Link>
          <Link href="/about/privacy">Privacy</Link>
          <Link href="/about/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
