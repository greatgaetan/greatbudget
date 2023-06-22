// TransactionsHistory.js
import { cn } from "@/lib/utils"
import { BankAccountWithTransactions } from "@/types"
import { TransactionType } from "@prisma/client"
import { format } from "date-fns"
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Heading } from "./ui/heading"

export function TransactionsHistory({
  bankAccount,
}: {
  bankAccount: BankAccountWithTransactions
}) {
  return (
    <div className="col-start-4 col-span-2 rounded-lg lg:ml-0 border bg-card text-card-foreground shadow-sm p-6 flex flex-col">
      <div className="flex-grow">
        <Heading variant={"h3"}>Latest transactions</Heading>
        <p className="text-muted-foreground mb-4">
          This bank account has {bankAccount.transactions.length} transactions
          registered.
        </p>

        <div className="space-y-4 flex-grow">
          {bankAccount.transactions.slice(0, 9).map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex flex-row items-center gap-2">
                <div className="bg-accent p-2 rounded-lg">
                  {transaction.type === "INCOME" ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1">
                    {transaction.description}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(transaction.createdAt, "dd MMM")}
                  </span>
                </div>
              </div>
              <span
                className={cn(
                  "pl-4 min-w-fit font-bold",
                  transaction.type === TransactionType.INCOME &&
                    "text-green-500",
                  transaction.type === TransactionType.EXPENSE && "text-red-500"
                )}
              >
                {transaction.type === "INCOME" ? "+ " : "- "}
                {transaction.amount.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>
      </div>
      <Link
        href={`/dashboard/${bankAccount.id}/transactions`}
        className="flex flex-row items-center gap-1 text-primary justify-center lg:justify-end group text-sm"
      >
        See more{" "}
        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-150" />
      </Link>
    </div>
  )
}
