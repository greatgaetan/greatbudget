import { BankAccountWithTransactions, TransactionsFilter } from "@/types"
import { TransactionType } from "@prisma/client"

export function calculateSavingsPercentage(
  totalIncome: number,
  totalExpenses: number
): number {
  if (totalIncome <= 0 || totalExpenses < 0 || totalExpenses > totalIncome) {
    return 0
  }

  let savings = totalIncome - totalExpenses
  let savingsPercentage = (savings / totalIncome) * 100

  return Math.round((savingsPercentage + Number.EPSILON) * 100) / 100
}

export const calculateMonthlyTotals = (
  bankAccount: BankAccountWithTransactions,
  filter: TransactionsFilter
) => {
  const transactions = bankAccount.transactions

  if (!transactions.length) return []

  // Determine the range of months that have transactions
  const sortedTransactions = transactions.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  )
  const startMonth = sortedTransactions[0].createdAt.getMonth()
  const endMonth =
    sortedTransactions[sortedTransactions.length - 1].createdAt.getMonth()

  // Create an array for the months that have transactions
  let monthlyTotals = Array(endMonth - startMonth + 1).fill(0)

  // Iterate over the transactions and add/subtract from the appropriate month
  for (let transaction of transactions) {
    const month = transaction.createdAt.getMonth()

    // Only process transactions in the range of months
    if (month >= startMonth && month <= endMonth) {
      if (filter === "incomes" && transaction.type === TransactionType.INCOME) {
        monthlyTotals[month - startMonth] += transaction.amount
      } else if (
        filter === "expenses" &&
        transaction.type === TransactionType.EXPENSE
      ) {
        monthlyTotals[month - startMonth] += transaction.amount
      } else if (filter === "savings") {
        if (transaction.type === TransactionType.INCOME) {
          monthlyTotals[month - startMonth] += transaction.amount
        } else if (transaction.type === TransactionType.EXPENSE) {
          monthlyTotals[month - startMonth] -= transaction.amount
        }
      }
    }
  }

  // Map over monthlyTotals and return array of objects with the same structure as the 'data' array
  return monthlyTotals.map((total, i) => {
    return {
      name: new Date(0, i + startMonth).toLocaleString("default", {
        month: "short",
      }),
      total: total,
    }
  })
}
