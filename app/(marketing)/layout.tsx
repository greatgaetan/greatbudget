import Link from "next/link"

import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import UserMenu from "@/components/user-menu"
import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            {!user ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "px-4 group hover:no-underline"
                )}
              >
                Login
                <ChevronRight className="h-4 w-4 translate-x-1 group-hover:translate-x-2 transition-transform ease-in-out" />
              </Link>
            ) : (
              <UserMenu
                user={{ name: user.name, email: user.email, image: user.image }}
              />
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
