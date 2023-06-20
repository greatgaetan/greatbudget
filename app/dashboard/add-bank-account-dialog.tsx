import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import BankAccountForm from "./bank-account-form"

type DialogProps = {
  inDropdown?: boolean
  className?: string
}

type WithChildren = DialogProps & {
  children: React.ReactNode
  inDropdown?: false
}

type WithoutChildren = DialogProps & { inDropdown: true }

export default function AddBankAccountDialog(
  props: WithChildren | WithoutChildren
) {
  const core = (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New bank account</DialogTitle>
        <DialogDescription>
          A bank account is a way to group your transactions. For example, you
          can create a bank account for your credit card, and another one for
          your savings account.
        </DialogDescription>
      </DialogHeader>
      <BankAccountForm />
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
