"use client"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { footerConfig } from "@/config/footer"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { BankAccount } from "@prisma/client"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  BarChart2,
  Bookmark,
  File,
  Landmark,
  Laptop,
  Moon,
  SunMedium,
  UserIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import * as React from "react"

type CommandeMenuProps = DialogProps & {
  userIsAuthentified?: boolean
  bankAccounts?: BankAccount[]
}

export function CommandMenu({ ...props }: CommandeMenuProps) {
  const marketingTranslate = useTranslations("marketing-config")
  const footerTranslate = useTranslations("footer-config")
  const commandTranslate = useTranslations("command-config")
  const { userIsAuthentified, bankAccounts, ...rest } = props
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <div className="flex-grow">
      <Button
        variant="outline"
        className={cn(
          "relative h-9 justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 w-full md:w-64"
        )}
        onClick={() => setOpen(true)}
        {...rest}
      >
        <span className="inline-flex">{commandTranslate("search")}</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={commandTranslate("search-placeholder")} />
        <CommandList>
          <CommandEmpty>{commandTranslate("no-results")}</CommandEmpty>
          <CommandGroup heading={commandTranslate("links-section")}>
            <CommandItem
              key={"home"}
              value={"Home"}
              onSelect={() => {
                runCommand(() => router.push("/"))
              }}
            >
              <File className="mr-2 h-4 w-4" />
              {commandTranslate("home")}
            </CommandItem>
            {marketingConfig.mainNav.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={marketingTranslate(navItem.key)}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href as string))
                }}
              >
                <File className="mr-2 h-4 w-4" />
                {marketingTranslate(navItem.key)}
              </CommandItem>
            ))}
          </CommandGroup>
          {userIsAuthentified && (
            <CommandGroup heading={commandTranslate("my-account-section")}>
              <CommandItem
                id="profile"
                value={"Profile"}
                onSelect={() => {
                  runCommand(() => router.push(`/profile`))
                }}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                {commandTranslate("user-profile")}
              </CommandItem>
              <CommandItem
                id="dashboard"
                value={"Dashboard"}
                onSelect={() => {
                  runCommand(() => router.push(`/dashboard`))
                }}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                {commandTranslate("user-dashboard")}
              </CommandItem>
            </CommandGroup>
          )}
          {bankAccounts && (
            <CommandGroup heading={commandTranslate("bank-account-section")}>
              {bankAccounts.map((bankAccount) => (
                <CommandItem
                  key={bankAccount.id}
                  value={bankAccount.name}
                  onSelect={() => {
                    runCommand(() =>
                      router.push(`/dashboard/${bankAccount.id}`)
                    )
                  }}
                >
                  <Landmark className="mr-2 h-4 w-4" />
                  {bankAccount.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading={commandTranslate("about-section")}>
            {footerConfig.mainNav.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={footerTranslate(navItem.key)}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href as string))
                }}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {footerTranslate(navItem.key)}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={commandTranslate("theme-section")}>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunMedium className="mr-2 h-4 w-4" />
              {commandTranslate("theme-light")}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              {commandTranslate("theme-dark")}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              {commandTranslate("theme-system")}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
