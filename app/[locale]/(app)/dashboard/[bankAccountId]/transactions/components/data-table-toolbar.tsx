"use client"

import { Table } from "@tanstack/react-table"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { TransactionCategory } from "@prisma/client"
import { TransactionRow } from "./columns"
import DataTableAddTransaction from "./data-table-add-transaction"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  data: TData[]
  usersCategories: TransactionCategory[]
  bankAccountId: string
}

export function DataTableToolbar<TData>({
  table,
  data,
  usersCategories,
  bankAccountId,
}: DataTableToolbarProps<TData>) {
  let uniqueCategories = (data as TransactionRow[]).reduce(
    (accumulator: string[], item) => {
      if (!accumulator.find((category) => category === item.category)) {
        accumulator.push(item.category)
      }
      return accumulator
    },
    []
  )

  let categories = uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }))

  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter transactions..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Categories"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableAddTransaction
        usersCategories={usersCategories}
        bankAccountId={bankAccountId}
      />
      <DataTableViewOptions table={table} />
    </div>
  )
}
