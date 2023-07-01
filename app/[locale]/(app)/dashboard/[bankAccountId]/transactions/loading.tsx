import React from "react"
import { TransactionRow, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export default function TransactionsLoading() {
  // fake loading data
  const data = [
    {
      id: "fake-id-loading-purposes",
      description: "Fake transaction",
      amount: 100,
      type: "expense",
      createdAt: new Date(),
      category: "Fake category",
    },
  ] as unknown as TransactionRow[]
  return (
    <DataTable
      columns={columns}
      data={data}
      usersCategories={[]}
      bankAccountId={""}
    />
  )
}
