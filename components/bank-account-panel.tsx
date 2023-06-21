"use client"
import { cn } from "@/lib/utils"
import { BankAccountWithTransactions } from "@/types"
import { TransactionType } from "@prisma/client"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { format } from "date-fns"
import {
  BarChartBig,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import { Badge } from "./ui/badge"
import { Heading } from "./ui/heading"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

type tabsValues = "incomes" | "expenses" | "savings"

export default function BankAccountPanel({
  bankAccount,
}: {
  bankAccount: BankAccountWithTransactions
}) {
  const [activeTab, setActiveTab] = React.useState<tabsValues>("incomes")
  const noTransactions = bankAccount.transactions.length === 0
  const { theme } = useTheme()
  // Calculate the monthly totals for the chart
  const calculateMonthlyTotals = (type: tabsValues) => {
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
        if (type === "incomes" && transaction.type === TransactionType.INCOME) {
          monthlyTotals[month - startMonth] += transaction.amount
        } else if (
          type === "expenses" &&
          transaction.type === TransactionType.EXPENSE
        ) {
          monthlyTotals[month - startMonth] += transaction.amount
        } else if (type === "savings") {
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

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <p className="label">{`${label} : ${payload?.[0].value} €`}</p>
        </div>
      )
    }

    return null
  }

  const CustomCursorFill = () => {
    const isLight = theme === "light"
    const green = isLight ? "#B6F3CC" : "#006E30"
    const red = isLight ? "#FBC7C8" : "#B50203"
    const primary = isLight ? "#9DB3F3" : "#0B38B4"
    return {
      fill:
        activeTab === "incomes"
          ? green
          : activeTab === "expenses"
          ? red
          : primary,
    }
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-1 gap-8">
      <div className="col-span-3 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <Heading variant={"h3"}>Summary</Heading>
        <p className="text-muted-foreground mb-4">
          Check your monthly incomes, expenses and savings.
        </p>
        <Tabs defaultValue="incomes" className="mb-12">
          <TabsList>
            <TabsTrigger
              value="incomes"
              onClick={() => setActiveTab("incomes")}
            >
              Incomes
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              onClick={() => setActiveTab("expenses")}
            >
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="savings"
              onClick={() => setActiveTab("savings")}
            >
              Savings
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {noTransactions ? (
          <div className="col-span-3 border border-dashed text-accent-foreground flex items-center justify-center rounded-lg row-auto">
            <div className="flex flex-col items-center">
              <div className="bg-accent p-4 rounded-full mb-4">
                <BarChartBig className="h-8 w-8" />
              </div>
              <Heading variant="h2" className="mb-2">
                Awaiting first transaction
              </Heading>
              <span className="text-muted-foreground text-sm">
                Add your first transaction to start tracking your finances! 🚀
              </span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={calculateMonthlyTotals(activeTab)}>
              <CartesianGrid strokeDasharray={"3"} vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={CustomCursorFill()}
              />
              <Bar
                dataKey="total"
                className={cn(
                  activeTab === "incomes" && "fill-green-500",
                  activeTab === "expenses" && "fill-red-500",
                  activeTab === "savings" && "fill-primary"
                )}
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
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
                    transaction.type === TransactionType.EXPENSE &&
                      "text-red-500"
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
    </div>
  )
}
