import { CommandMenu } from "@/components/command-menu"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import UserMenu from "@/components/user-menu"
import { dashboardConfig } from "@/config/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { BankAccount } from "@prisma/client"
import { notFound } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  const bankAccounts = (await db.bankAccount.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      userId: user.id,
    },
  })) as BankAccount[]

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex flex-row items-center gap-4">
            <CommandMenu
              userIsAuthentified={!!user}
              bankAccounts={bankAccounts}
            />
            <UserMenu
              user={{ name: user.name, email: user.email, image: user.image }}
            />
          </div>
        </div>
      </header>
      <div className="container flex-1 ">
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>

      <Footer className="border-t" />
    </div>
  )
}
