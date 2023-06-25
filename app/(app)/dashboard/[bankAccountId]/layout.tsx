import BankAccountNavigationBar from "@/components/bank-account-navigation-bar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function BankAccountLayout({
  params,
  children,
}: {
  params: { bankAccountId: string }
  children: React.ReactNode
}) {
  return (
    <div>
      <Badge variant="outline" className="mb-4 md:hidden">
        🚀 <Separator className="mx-2 my-0 h-4" orientation="vertical" />{" "}
        {siteConfig.name} is easier to use on desktop
      </Badge>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "link", size: "sm" }),
          "group hover:no-underline -ml-3 mb-2"
        )}
      >
        <ChevronLeft className="h-4 w-4 -translate-x-1 group-hover:-translate-x-2 transition-transform ease-in-out" />
        Back to dashboard
      </Link>
      <BankAccountNavigationBar
        links={[
          { name: "Overview", href: `/dashboard/${params.bankAccountId}` },
          {
            name: "Transactions",
            href: `/dashboard/${params.bankAccountId}/transactions`,
          },
        ]}
      />
      {children}
    </div>
  )
}
