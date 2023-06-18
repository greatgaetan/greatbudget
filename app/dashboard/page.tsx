import { Heading } from "@/components/ui/heading"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithCategory } from "@/types"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import React from "react"
import HeadingSelector from "./heading-selector"
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your budget with a clean dashboard.",
}

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccounts = (await db.bankAccount.findMany({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
      categories: true,
    },
  })) as Pick<BankAccountWithCategory, "name" | "categories">[]

  return (
    <div>
      <HeadingSelector bankAccounts={bankAccounts} />
    </div>
  )
}
