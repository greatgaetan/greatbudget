import BankAccountDashboard from "@/components/bank-account-dashboard"
import BankAccountPanel from "@/components/bank-account-panel"
import React from "react"

export default function LoadingBankAccount() {
  return (
    <div className="space-y-8">
      <BankAccountDashboard.Skeleton />
      <BankAccountPanel.Skeleton />
    </div>
  )
}
