"use client"
import { cn } from "@/lib/utils"
import { BankAccountWithTransactions, TransactionsFilter } from "@/types"
import { calculateMonthlyTotals } from "@/utils/transactions"
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

export default function BankAccountPanel({
  bankAccount,
}: {
  bankAccount: BankAccountWithTransactions
}) {
  const [activeTab, setActiveTab] =
    React.useState<TransactionsFilter>("incomes")
  const noTransactions = bankAccount.transactions.length === 0
  const { theme } = useTheme()

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
          <div className="col-span-3 border border-dashed text-accent-foreground flex items-center justify-center rounded-lg row-auto h-[400px]">
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
            <BarChart data={calculateMonthlyTotals(bankAccount, activeTab)}>
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
                cursor={{
                  fill: theme === "light" ? "#FDF1E7" : "#1C1E2B",
                  opacity: 0.7,
                }}
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
