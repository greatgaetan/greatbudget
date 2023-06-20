import { BankAccount, User } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithCategory } from "@/types"
import HeadingSelector from "../heading-selector"

async function getBankAccountsForUser(
  bankAccountId: BankAccount["id"],
  userId: User["id"]
) {
  return (await db.bankAccount.findFirst({
    select: {
      id: true,
      name: true,
      categories: true,
    },
    where: {
      id: bankAccountId,
      userId: userId,
    },
  })) as unknown as BankAccountWithCategory
}

async function getAllBankAccountsForUser(userId: User["id"]) {
  return (await db.bankAccount.findMany({
    select: {
      id: true,
      name: true,
      categories: true,
    },
    where: {
      userId: userId,
    },
  })) as unknown as BankAccountWithCategory[]
}

interface EditorPageProps {
  params: { bankAccountId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
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
      <HeadingSelector bankAccounts={bankAccounts} current={bankAccount} />
      <div>
        To prove that I am on the right bank account, here is the info of the
        current selected:
      </div>
      <pre>{JSON.stringify(bankAccount, null, 2)}</pre>
    </div>
    // <Editor
    //   bankAccount={{
    //     id: bankAccount.id,
    //     title: bankAccount.title,
    //     content: bankAccount.content,
    //     published: bankAccount.published,
    //   }}
    // />
  )
}
