import { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import { Heading } from "@/components/ui/heading"
import UserLoginForm from "@/components/user-login-form"
import { HeartHandshake } from "lucide-react"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Heading
          variant="h2"
          className="flex flex-row items-center justify-center gap-1"
        >
          Welcome back
          <HeartHandshake className="h-6 w-6 ml-1 text-primary" />
        </Heading>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to log in
        </p>
      </div>
      <UserLoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </div>
  )
}
