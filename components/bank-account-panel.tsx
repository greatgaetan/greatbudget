import { cn } from "@/lib/utils"
import { BankAccountWithTransactions } from "@/types"
import { Loader, Loader2 } from "lucide-react"
import React from "react"
import { BankAccountCharts } from "./bank-account-charts"
import { TransactionsHistory } from "./transactions-history"
import { Heading } from "./ui/heading"
import { Skeleton } from "./ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export default function BankAccountPanel({
  bankAccount,
}: {
  bankAccount: BankAccountWithTransactions
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-1 gap-8">
      <BankAccountCharts bankAccount={bankAccount} />
      <TransactionsHistory bankAccount={bankAccount} />
    </div>
  )
}

BankAccountPanel.Skeleton = function BankAccountPanelSkeleton() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-1 gap-8">
      <div className="col-span-3 p-6 rounded-lg border bg-card text-card-foreground shadow-sm h-[619px] lg:h-[606px] flex flex-col">
        <div>
          <Heading variant={"h3"}>Summary</Heading>
          <p className="text-muted-foreground mb-4">
            Check your monthly incomes, expenses and savings.
          </p>
          <Tabs defaultValue="incomes" className="mb-12">
            <TabsList>
              <TabsTrigger className="hidden sm:block" value="incomes">
                Incomes
              </TabsTrigger>
              <TabsTrigger className="hidden sm:block" value="expenses">
                Expenses
              </TabsTrigger>
              <TabsTrigger className="hidden sm:block" value="savings">
                Savings
              </TabsTrigger>
              <TabsTrigger className="block sm:hidden" value="incomes">
                Inc.
              </TabsTrigger>
              <TabsTrigger className="block sm:hidden" value="expenses">
                Exp.
              </TabsTrigger>
              <TabsTrigger className="block sm:hidden" value="savings">
                Sav.
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-grow flex flex-row items-end justify-evenly mb-">
          <Skeleton className="w-4 lg:w-12 animate-pulse-height h-64" />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-72"
            style={{ animationDelay: "0.1s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-56"
            style={{ animationDelay: "0.2s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-80"
            style={{ animationDelay: "0.3s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-48"
            style={{ animationDelay: "0.4s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-72"
            style={{ animationDelay: "0.5s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-56"
            style={{ animationDelay: "0.6s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-96"
            style={{ animationDelay: "0.7s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-64"
            style={{ animationDelay: "0.8s" }}
          />
          <Skeleton
            className="w-4 lg:w-12 animate-pulse-height h-72"
            style={{ animationDelay: "0.9s" }}
          />
        </div>
      </div>
      <div className="col-start-4 col-span-2 rounded-lg lg:ml-0 border bg-card text-card-foreground shadow-sm p-6 flex flex-col h-[619px] lg:h-[606px]">
        <div className="flex-grow">
          <Heading variant={"h3"}>Latest transactions</Heading>
          <p className="text-muted-foreground mb-4 inline-flex items-center">
            This bank account has 0 transactions registered.
          </p>
          <div className="space-y-4 flex-grow">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="bg-accent p-2 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground " />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="line-clamp-1">
                      <Skeleton className="h-5 w-32" />
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <Skeleton className="h-3 w-16 rounded-sm" />
                    </span>
                  </div>
                </div>
                <span className={cn("pl-4 min-w-fit font-bold")}>
                  <Skeleton className="h-4 w-24" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
