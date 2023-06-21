import BankAccountDialog from "@/components/bank-account-dialog"
import { BankAccountOperations } from "@/components/bank-account-operations"
import BankAccountTooltip from "@/components/bank-account-tooltip"
import { buttonVariants } from "@/components/ui/button"
import { Heading, headingVariants } from "@/components/ui/heading"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { BankAccount } from "@prisma/client"
import { format } from "date-fns"
import { ArrowLeftRight, CalendarPlus, Edit, Plus } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

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
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })) as unknown as BankAccount[]

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between sm:w-2/3 lg:w-1/2">
        <div>
          <Heading variant="h1">Dashboard</Heading>
          <p className="text-lg text-muted-foreground">
            Create and manage your bank accounts.
          </p>
        </div>
        <BankAccountDialog
          formType="create"
          className={cn(buttonVariants(), "w-full mt-4 sm:mt-0 sm:w-auto")}
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>New bank account</span>
        </BankAccountDialog>
      </div>
      <div className="mt-4 sm:w-2/3 lg:w-1/2 divide-y divide-border">
        {bankAccounts.map((bankAccount) => (
          <div
            key={bankAccount.id}
            className="flex items-center justify-between py-4"
          >
            <div className="grid gap-1">
              <Link
                href={`/dashboard/${bankAccount.id}`}
                className={cn(
                  headingVariants({ variant: "h2" }),
                  "lg:hover:text-foreground lg:text-muted-foreground text-foreground"
                )}
              >
                {bankAccount.name}
              </Link>
              <div className="flex flex-row items-center mt-2 gap-4">
                <BankAccountTooltip
                  icon={
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  }
                  text="0"
                  content="Transactions"
                />
                <BankAccountTooltip
                  icon={
                    <CalendarPlus className="h-4 w-4 text-muted-foreground" />
                  }
                  text={format(bankAccount.createdAt, "dd MMM")}
                  content="Created on"
                />
                <BankAccountTooltip
                  icon={<Edit className="h-4 w-4 text-muted-foreground" />}
                  text={format(bankAccount.updatedAt, "dd MMM")}
                  content="Last modified"
                />
              </div>
            </div>
            <BankAccountOperations bankAccount={bankAccount} />
          </div>
        ))}
      </div>
    </div>
  )
}
