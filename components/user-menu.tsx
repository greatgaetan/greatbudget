"use client"

import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <span className="text-sm text-foreground">
              Hello,
              <br />
            </span>
            {user.name ? (
              <p className="font-medium">{user.name}</p>
            ) : user.email ? (
              <p className="font-medium">{user.email}</p>
            ) : (
              <p className="font-medium">Unknown</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link className="cursor-default" href="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-destructive dark:text-red-500"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
