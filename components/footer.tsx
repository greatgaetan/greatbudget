import * as React from "react"

import { cn } from "@/lib/utils"
import Logo from "./logo"
import { ThemeToggle } from "./theme-toggle"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col py-10 my-4 gap-4 md:py-0">
        <div className="flex flex-row items-center justify-between">
          <Logo height={32} width={32} />

          <ThemeToggle />
        </div>
        <div>bonjour</div>
      </div>
    </footer>
  )
}
