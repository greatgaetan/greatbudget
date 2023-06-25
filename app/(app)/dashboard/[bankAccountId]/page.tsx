import { BankAccount, User } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

import BankAccountDashboard from "@/components/bank-account-dashboard"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithTransactions } from "@/types"

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
  if (!bankAccount) {
    notFound()
  }

  return (
    <div>
      <BankAccountDashboard bankAccount={bankAccount} />
    </div>
  )
}
