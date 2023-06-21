import { BankAccount } from "@prisma/client"
import React from "react"
import BankAccountForm from "./bank-account-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

type DialogProps = {
  inDropdown?: boolean
  className?: string
  formType: "create" | "update"
  bankAccount?: Pick<BankAccount, "id" | "name">
}

type WithChildren = DialogProps & {
  children: React.ReactNode
  inDropdown?: false
}

type WithoutChildren = DialogProps & { inDropdown: true }

export default function BankAccountDialog(
  props: WithChildren | WithoutChildren
) {
  const core = (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {props.formType === "create" ? "New" : "Edit"} bank account
        </DialogTitle>
        <DialogDescription>
          A bank account is a way to group your transactions. For example, you
          can create a bank account for your credit card, and another one for
          your savings account.
        </DialogDescription>
      </DialogHeader>
      <BankAccountForm
        formType={props.formType}
        bankAccount={props.bankAccount}
      />
    </DialogContent>
  )

  if (props.inDropdown) return core

  return (
    <Dialog>
      <DialogTrigger className={props.className}>
        {props.children}
      </DialogTrigger>
      {core}
    </Dialog>
  )
}
