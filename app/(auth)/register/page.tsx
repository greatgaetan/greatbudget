import { Metadata } from "next"
import Link from "next/link"

import UserRegisterForm from "@/components/user-register-form"

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
}

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold flex flex-row items-center justify-center gap-1">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your personal informations to create an account
        </p>
      </div>
      <UserRegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </p>
    </div>
  )
}
