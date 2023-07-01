"use client"

import { TransactionType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { DataTableColumnHeader } from "./column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionRow = {
  id: string
  bankAccountId: string
  category: string
  description: string | null
  amount: number
  type: TransactionType
  createdAt: Date
}

export const columns: ColumnDef<TransactionRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const transaction = row.original
      const income = transaction.type === TransactionType.INCOME
      return (
        <div className={income ? "text-green-500" : ""}>
          {income ? "+ " : "- "}{" "}
          {(row.getValue("amount") as string).toLocaleString()} €
        </div>
      )
    },
  },
  {
    accessorKey: "created at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const transaction = row.original
      return <div>{format(transaction.createdAt, "dd MMM, yyyy")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const transaction = row.original

      return (
        <DataTableRowActions
          bankAccountId={transaction.bankAccountId}
          row={row}
          table={table}
        />
      )
    },
  },
]
