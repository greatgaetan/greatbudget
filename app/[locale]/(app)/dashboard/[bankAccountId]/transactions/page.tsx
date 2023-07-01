import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithTransactions } from "@/types"
import { BankAccount, TransactionCategory, User } from "@prisma/client"
import { redirect } from "next-intl/server"
import { notFound } from "next/navigation"
import React from "react"
import { TransactionRow, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

async function getBankAccountsForUser(
  bankAccountId: BankAccount["id"],
  userId: User["id"]
) {
  return (await db.bankAccount.findFirst({
    select: {
      id: true,
      name: true,
      transactions: {
        select: {
          id: true,
          description: true,
          amount: true,
          createdAt: true,
          categoryId: true,
          type: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: {
      id: bankAccountId,
      userId: userId,
    },
  })) as unknown as BankAccountWithTransactions
}

async function getData(
  bankAccount: BankAccountWithTransactions,
  categories: TransactionCategory[]
): Promise<TransactionRow[]> {
  // Create a lookup object for category names.
  const categoryNameLookup = Object.fromEntries(
    categories.map((category) => [category.id, category.name])
  )

  // Map over the transactions and replace the category ID with the category name.
  const transactionsWithCategoryNames = bankAccount.transactions.map(
    (transaction) => ({
      id: transaction.id,
      bankAccountId: bankAccount.id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
      category: categoryNameLookup[transaction.categoryId],
    })
  )
  return transactionsWithCategoryNames
}

export default async function Transactions({
  params,
}: {
  params: { bankAccountId: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccount = await getBankAccountsForUser(
    params.bankAccountId,
    user.id
  )

  const usersCategories = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      categories: true,
    },
  })

  if (!bankAccount) {
    notFound()
  }

  const data =
    usersCategories === null
      ? []
      : await getData(bankAccount, usersCategories.categories)

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        usersCategories={usersCategories?.categories ?? []}
        bankAccountId={bankAccount.id}
      />
    </div>
  )
}
