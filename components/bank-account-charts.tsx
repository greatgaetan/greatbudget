"use client"
import { cn } from "@/lib/utils"
import { BankAccountWithTransactions, TransactionsFilter } from "@/types"
import { calculateMonthlyTotals } from "@/utils/transactions"
import { BarChartBig } from "lucide-react"
import { useTheme } from "next-themes"
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
import { Heading } from "./ui/heading"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function BankAccountCharts({
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
    <div className="col-span-3 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <Heading variant={"h3"}>Summary</Heading>
      <p className="text-muted-foreground mb-4">
        Check your monthly incomes, expenses and savings.
      </p>
      <Tabs defaultValue="incomes" className="mb-12">
        <TabsList>
          <TabsTrigger value="incomes" onClick={() => setActiveTab("incomes")}>
            Incomes
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </TabsTrigger>
          <TabsTrigger value="savings" onClick={() => setActiveTab("savings")}>
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
  )
}
