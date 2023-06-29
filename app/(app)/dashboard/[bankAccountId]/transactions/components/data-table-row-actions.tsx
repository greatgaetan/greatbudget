"use client"

import { Row, Table } from "@tanstack/react-table"
import { Copy, Loader2, MoreVertical, Pencil, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import React from "react"
import { TransactionRow } from "./columns"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
  bankAccountId: string
}

function deleteTransactions(rowIds: string[], bankAccountId: string) {
  try {
    return fetch(
      `/api/bank-accounts/${bankAccountId}/transactions?ids=${encodeURIComponent(
        JSON.stringify(rowIds)
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

export function DataTableRowActions<TData>({
  row,
  table,
  bankAccountId,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showMultipleDeleteAlert, setShowMultipleDeleteAlert] =
    React.useState<boolean>(false)
  const [isMultipleDeleteLoading, setIsMultipleDeleteLoading] =
    React.useState<boolean>(false)

  const currentRowIsSelected = row.getIsSelected()
  const transaction = row.original as TransactionRow
  const router = useRouter()

  const handleDeleteSelectedRows = async () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original as TransactionRow)
    const rowIds = selectedRows.map((row) => row.id)
    const response = await deleteTransactions(rowIds, bankAccountId)

    if (response.ok) {
      toast({
        title: "Success",
        description: `Successfully deleted ${selectedRows.length} transaction(s).`,
      })
      router.refresh()
      return true
    } else {
      toast({
        title: "An error occurred",
        description: "Unable to delete transaction(s). Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteRow = async () => {
    const response = await deleteTransactions([transaction.id], bankAccountId)

    if (response.ok) {
      toast({
        title: "Success",
        description: `Successfully deleted 1 transaction.`,
      })
      return true
    } else {
      toast({
        title: "An error occurred",
        description: "Unable to delete the transaction. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {table.getIsAllRowsSelected() ||
          (table.getSelectedRowModel().rows.length > 1 &&
            currentRowIsSelected) ? (
            <DropdownMenuItem
              className="text-destructive dark:text-red-500"
              onClick={() => setShowMultipleDeleteAlert(true)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete all selected
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(transaction.amount + "")
                }
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    `[${transaction.createdAt}] ${transaction.amount} for ${transaction.category}`
                  )
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive dark:text-red-500"
                onClick={() => setShowDeleteAlert(true)}
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this transaction?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await handleDeleteRow()

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
            >
              {isDeleteLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showMultipleDeleteAlert}
        onOpenChange={setShowMultipleDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete{" "}
              {table.getSelectedRowModel().rows.length} transactions?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsMultipleDeleteLoading(true)

                const deleted = await handleDeleteSelectedRows()

                if (deleted) {
                  setIsMultipleDeleteLoading(false)
                  setShowMultipleDeleteAlert(false)
                  table.toggleAllPageRowsSelected(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
            >
              {isMultipleDeleteLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
