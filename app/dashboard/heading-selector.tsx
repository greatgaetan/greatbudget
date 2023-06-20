"use client"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heading } from "@/components/ui/heading"
import { BankAccountWithCategory } from "@/types"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import React from "react"
import BankAccountDialog from "./bank-account-dialog"

interface HeadingMenuProps {
  current: BankAccountWithCategory
  bankAccounts: BankAccountWithCategory[]
}

export default function HeadingSelector({
  current,
  bankAccounts,
}: HeadingMenuProps) {
  if (bankAccounts.length === 0) return null

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={
              "hover:bg-accent py-2 px-4 -ml-4 w-fit rounded-lg hover:text-accent-foreground cursor-pointer"
            }
          >
            <div className="inline-flex items-center text-xs">
              BANK ACCOUNT <ChevronDown className="h-3 w-3 ml-1" />
            </div>
            <Heading variant="h3">{current?.name}</Heading>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="ml-4">
          {bankAccounts.map((bankAccount) => (
            <Link key={bankAccount.id} href={`/dashboard/${bankAccount.id}`}>
              <DropdownMenuItem>{bankAccount.name}</DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="flex flex-row items-center gap-1 cursor-pointer">
              <Plus className="h-4 w-4" />
              New bank account
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <BankAccountDialog inDropdown={true} formType="create" />
    </Dialog>
  )
}
