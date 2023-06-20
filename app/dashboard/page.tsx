import { Button } from "@/components/ui/button"
import { Heading, headingVariants } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccountWithCategory } from "@/types"
import { format } from "date-fns"
import {
  ArrowLeftRight,
  BadgePlus,
  Dot,
  Edit,
  MoreVertical,
  Pencil,
} from "lucide-react"

import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your budget with a clean dashboard.",
}

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const bankAccounts = (await db.bankAccount.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      createdAt: true,
      updatedAt: true,
    },
  })) as unknown as BankAccountWithCategory[]

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Heading variant="h1">Dashboard</Heading>
      <p className="text-lg text-muted-foreground text-center">
        Create and manage your bank accounts.
      </p>
      <div className="-ml-2 mt-4 sm:w-2/3 lg:w-1/2 divide-y divide-border">
        {bankAccounts.map((bankAccount) => (
          // <div
          //   key={bankAccount.id}
          //   className="flex flex-row justify-between items-center divide-y divide-border hover:bg-accent rounded-md"
          // >
          //   <Link href={`/dashboard/${bankAccount.id}`}>
          //     <div className="py-4 px-2">
          //       <div>
          //         <Heading variant="h2">{bankAccount.name}</Heading>
          //         <div className="flex flex-row items-center gap-4 mt-2">
          //           <div className="flex flex-row items-center gap-2">
          //             <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          //             <span>0</span>
          //           </div>
          //           <div className="flex flex-row items-center gap-2">
          //             <BadgePlus className="h-4 w-4 text-muted-foreground" />
          //             <span>{format(bankAccount.createdAt, "dd MMM")}</span>
          //           </div>
          //           <div className="flex flex-row items-center gap-2">
          //             <Pencil className="h-4 w-4 text-muted-foreground" />
          //             <span>{format(bankAccount.updatedAt, "dd MMM")}</span>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </Link>
          //   <Button>
          //     <Edit className="h-4 w-4" />
          //   </Button>
          // </div>
          <div
            key={bankAccount.id}
            className="flex items-center justify-between p-4 -ml-2"
          >
            <div className="grid gap-1">
              <Link
                href={`/dashboard/${bankAccount.id}`}
                className={"font-semibold text-xl lg:text-2xl hover:underline"}
              >
                {bankAccount.name}
              </Link>
              <div className="flex flex-row items-center gap-4 mt-2">
                <div className="flex flex-row items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-flex items-center gap-2">
                          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm lg:text-base">0</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of transactions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-flex items-center gap-2">
                          <BadgePlus className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm lg:text-base">
                            {format(bankAccount.createdAt, "dd MMM")}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Created on</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-flex items-center gap-2">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm lg:text-base">
                            {format(bankAccount.updatedAt, "dd MMM")}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Last modified</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <Button variant={"outline"} className="z-40">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
