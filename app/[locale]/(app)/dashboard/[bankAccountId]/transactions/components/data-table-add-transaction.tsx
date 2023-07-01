import TransactionForm from "@/components/transaction-form"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TransactionCategory } from "@prisma/client"
import { Plus } from "lucide-react"
import React from "react"

export default function DataTableAddTransaction({
  usersCategories,
  bankAccountId,
}: {
  usersCategories: TransactionCategory[]
  bankAccountId: string
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="ml-auto mr-2 hidden h-8 lg:flex">
          <Plus className="mr-2 h-4 w-4" />
          Add transaction
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Create a new transaction</SheetTitle>
          <SheetDescription>
            Fill in the fields below to create a new transaction. Click create
            when you are done.
          </SheetDescription>
        </SheetHeader>
        <TransactionForm
          formType="create"
          usersCategories={usersCategories}
          bankAccountId={bankAccountId}
        />
      </SheetContent>
    </Sheet>
  )
}
