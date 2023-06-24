"use client"

import { BarChart2, LogOut, UserIcon } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}
export default function UserMenu({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:rounded-full">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={user.image || "go-to-fallback"}
            alt={`${user.name}'s avatar`}
          />
          <AvatarFallback className="text-sm">
            {user.name ? user.name[0] : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:text-white" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link className="cursor-default" href="/profile">
          <DropdownMenuItem className="gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link className="cursor-default" href="/dashboard">
          <DropdownMenuItem className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-destructive dark:text-red-500 flex flex-row items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
