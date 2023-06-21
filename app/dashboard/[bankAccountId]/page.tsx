import { BankAccount, User } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

import BankAccountDashboard from "@/components/bank-account-dashboard"
import HeadingSelector from "@/components/heading-selector"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithTransactions } from "@/types"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: BankAccountPageProps): Promise<Metadata> {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccount = await getBankAccountsForUser(
    params.bankAccountId,
    user.id
  )

  return {
    title: bankAccount.name,
  }
}

async function getBankAccountsForUser(
  bankAccountId: BankAccount["id"],
  userId: User["id"]
) {
  return (await db.bankAccount.findFirst({
    select: {
      id: true,
      name: true,
      transactions: true,
    },
    where: {
      id: bankAccountId,
      userId: userId,
    },
  })) as unknown as BankAccountWithTransactions
}

async function getAllBankAccountsForUser(userId: User["id"]) {
  return (await db.bankAccount.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      userId: userId,
    },
  })) as unknown as BankAccount[]
}

interface BankAccountPageProps {
  params: { bankAccountId: string }
}

export default async function BankAccountPage({
  params,
}: BankAccountPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccount = await getBankAccountsForUser(
    params.bankAccountId,
    user.id
  )

  const bankAccounts = await getAllBankAccountsForUser(user.id)

  if (!bankAccount) {
    notFound()
  }

  return (
    <div>
      <Badge variant="outline" className="m-0 md:hidden">
        🚀 <Separator className="mx-2 my-0 h-4" orientation="vertical" />{" "}
        {siteConfig.name} is easier to use on desktop
      </Badge>
      <HeadingSelector bankAccounts={bankAccounts} current={bankAccount} />
      <BankAccountDashboard bankAccount={bankAccount} />
    </div>
  )
}
