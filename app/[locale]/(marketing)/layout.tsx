import Link from "next/link"

import { CommandMenu } from "@/components/command-menu"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import UserMenu from "@/components/user-menu"
import { marketingConfig } from "@/config/marketing"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { BankAccount } from "@prisma/client"
import { ChevronRight } from "lucide-react"

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const user = await getCurrentUser()
  const bankAccounts =
    user &&
    ((await db.bankAccount.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userId: user.id,
      },
    })) as BankAccount[])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav
            items={marketingConfig.mainNav}
            configKey="marketing-config"
          />
          <div className="flex flex-row flex-1 md:flex-none items-center gap-4">
            <CommandMenu
              userIsAuthentified={!!user}
              bankAccounts={bankAccounts}
            />
            <nav>
              {!user ? (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "px-4 group hover:no-underline"
                  )}
                >
                  {params.locale === "fr" ? "Connexion" : "Login"}
                  <ChevronRight className="h-4 w-4 translate-x-1 group-hover:translate-x-2 transition-transform ease-in-out" />
                </Link>
              ) : (
                <UserMenu
                  user={{
                    name: user.name,
                    email: user.email,
                    image: user.image,
                  }}
                />
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer className="border-t" />
    </div>
  )
}
