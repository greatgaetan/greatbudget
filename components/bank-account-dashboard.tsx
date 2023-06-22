import { cn } from "@/lib/utils"
import { BankAccountWithTransactions } from "@/types"
import { calculateSavings } from "@/utils/transactions"
import { TransactionType } from "@prisma/client"
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react"
import React from "react"
import BankAccountPanel from "./bank-account-panel"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Heading } from "./ui/heading"
import { Skeleton } from "./ui/skeleton"

export default function BankAccountDashboard({
  bankAccount,
}: {
  bankAccount: BankAccountWithTransactions
}) {
  const incomes = bankAccount.transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.INCOME) {
      return acc + transaction.amount
    }
    return acc
  }, 0)

  const expenses = bankAccount.transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return acc + transaction.amount
    }
    return acc
  }, 0)

  const savings = calculateSavings(incomes, expenses)
  return (
    <div className="space-y-8 md:space-y-8">
      <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">
              TOTAL INCOMES
            </div>
            <Heading variant={"h2"}>{incomes.toLocaleString()} €</Heading>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">
              TOTAL EXPENSES
            </div>
            <Heading variant={"h2"}>{expenses.toLocaleString()} €</Heading>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <PiggyBank className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">SAVINGS</div>
            <Heading
              variant={"h2"}
              className={cn(
                "flex flex-row items-center gap-2",
                savings > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {savings} %
            </Heading>
          </CardContent>
        </Card>
      </div>
      <BankAccountPanel bankAccount={bankAccount} />
    </div>
  )
}

BankAccountDashboard.Skeleton = function BankAccountDashboardSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">
              TOTAL INCOMES
            </div>
            <Heading variant={"h2"}>
              <Skeleton className="h-8 w-40" />
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">
              TOTAL EXPENSES
            </div>
            <Heading variant={"h2"}>
              <Skeleton className="h-8 w-40" />
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="w-fit">
              <div className="bg-accent p-4 rounded-lg">
                <PiggyBank className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-xs mb-1">SAVINGS</div>
            <Heading
              variant={"h2"}
              className="flex flex-row items-center gap-2"
            >
              <Skeleton className="h-8 w-40" />
            </Heading>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
