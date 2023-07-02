"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import Link from "next-intl/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Separator } from "./ui/separator"

export function LanguageSwitcher() {
  const pathname = usePathname()

  console.log("lang pathname: ", pathname)
  return (
    <div className="flex flex-row items-center space-x-2 text-sm">
      <Link
        href="/"
        locale="fr"
        className={cn(
          "hover:text-foreground",
          pathname.startsWith("/fr") ? "text-foreground" : "text-foreground/60"
        )}
      >
        FR
      </Link>
      <Separator className="w-px h-4 mx-2" orientation="vertical" />
      <Link
        href="/"
        locale="en"
        className={cn(
          "hover:text-foreground",
          !pathname.startsWith("/fr") ? "text-foreground" : "text-foreground/60"
        )}
      >
        EN
      </Link>
    </div>
  )
  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
  //           {pathname.startsWith("/fr") ? "FR" : "EN"}
  //           <span className="sr-only">Switch languages</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem>
  //           <Link href="/" locale="fr">
  //             Switch to french
  //           </Link>
  //         </DropdownMenuItem>
  //         <DropdownMenuItem>
  //           <Link href="/" locale="en">
  //             Switch to english
  //           </Link>
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   )
}
