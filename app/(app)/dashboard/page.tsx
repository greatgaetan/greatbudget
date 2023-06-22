import BankAccountDialog from "@/components/bank-account-dialog"
import { BankAccountOperations } from "@/components/bank-account-operations"
import BankAccountTooltip from "@/components/bank-account-tooltip"
import { buttonVariants } from "@/components/ui/button"
import { Heading, headingVariants } from "@/components/ui/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowLeftRight, CalendarPlus, Edit, Loader2, Plus } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your budget with a clean dashboard.",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccounts = await db.bankAccount.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      transactions: {
        select: {
          id: true,
        },
      },
    },
    where: {
      userId: user.id,
    },
  })

  return (
    <div className="flex flex-col items-center md:w-[544px] lg:w-[768px] m-auto mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
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
      <div className="mt-4 min-w-[256px] w-full divide-y divide-border">
        {bankAccounts.map((bankAccount) => {
          return (
            <div
              key={bankAccount.id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex flex-col">
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
                    text={bankAccount.transactions.length.toString()}
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
          )
        })}
      </div>
    </div>
  )
}

DashboardPage.Skeleton = function DashboardSkeleton() {
  return (
    <div className="flex flex-col items-center md:w-[544px] lg:w-[768px] m-auto mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
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
      <div className="mt-4 min-w-[256px] w-full divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-4">
            <div className="flex flex-col">
              <Skeleton className="w-48 h-7 lg:h-8" />

              <div className="flex flex-row items-center mt-2 gap-4">
                <Skeleton className="w-16 h-5 lg:h-6" />
                <Skeleton className="w-16 h-5 lg:h-6" />
                <Skeleton className="w-16 h-5 lg:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
