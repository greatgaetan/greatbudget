"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heading } from "@/components/ui/heading"
import { cn } from "@/lib/utils"
import { BankAccountWithCategory } from "@/types"
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { ChevronDown, ChevronsDown, ChevronsUpDown, Plus } from "lucide-react"

import React from "react"

interface HeadingMenuProps {
  bankAccounts: Pick<BankAccountWithCategory, "name" | "categories">[]
}

export default function HeadingSelector({ bankAccounts }: HeadingMenuProps) {
  const [selected, setSelected] = React.useState(
    bankAccounts.length > 0 ? bankAccounts[0] : null
  )

  if (bankAccounts.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={
            "hover:bg-accent py-2 px-4 -ml-4 w-fit rounded-md hover:text-accent-foreground cursor-pointer"
          }
        >
          <div className="inline-flex items-center text-xs">
            BANK ACCOUNT <ChevronDown className="h-3 w-3 ml-1" />
          </div>
          <Heading variant="h3">{selected?.name}</Heading>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="ml-4">
        {bankAccounts.map((bankAccount) => (
          <DropdownMenuItem
            key={bankAccount.name}
            onSelect={() => setSelected(bankAccount)}
          >
            {bankAccount.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center gap-1">
          <Plus className="h-4 w-4" />
          New bank account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
