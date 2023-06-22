import BankAccountDashboard from "@/components/bank-account-dashboard"
import BankAccountPanel from "@/components/bank-account-panel"
import HeadingSelector from "@/components/heading-selector"
import React from "react"

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <HeadingSelector.Skeleton />
        <BankAccountDashboard.Skeleton />
      </div>
      <BankAccountPanel.Skeleton />
    </div>
  )
}
