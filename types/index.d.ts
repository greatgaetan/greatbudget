import type { BankAccount } from "@prisma/client"
export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type BankAccountWithCategory = BankAccount & {
  category: Category[]
}
